// Cloudflare Pages Function — tool "Agregar interesados" del agente de
// Instagram en n8n. Reemplaza el appendOrUpdate sobre la hoja "Consultas" de
// Google Sheets: guarda el lead en la tabla `consultas` de D1 (la misma que
// muestra la pestaña Consultas del Panel de Reservas).
//
// POST /api/agente/consulta
// Header: X-Agente-Secret: <AGENTE_API_KEY>
// Body JSON: { subscriber_id, nombre, apellido?, telefono?, alojamiento?,
//              desde?, hasta?, personas?, monto_total? }
//   desde/hasta aceptan DD/MM/AAAA (lo que ya manda el agente) o YYYY-MM-DD.
//
// Upsert por subscriber_id, igual que la hoja: si ese SubscriberID ya tiene
// una consulta, se actualiza; si no, se crea. Los campos que no vienen (o
// vienen vacíos) no pisan lo que ya estaba guardado.
//
// Requiere la env var AGENTE_API_KEY en Cloudflare Pages.

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// DD/MM/AAAA → YYYY-MM-DD. Devuelve null si viene vacío, undefined si es inválido.
function normalizarFecha(valor: unknown): string | null | undefined {
  const s = String(valor ?? '').trim();
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return undefined;
  return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

function numeroONull(valor: unknown): number | null {
  if (valor === null || valor === undefined || valor === '') return null;
  const n = Number(String(valor).replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function textoONull(valor: unknown): string | null {
  const s = String(valor ?? '').trim();
  return s ? s : null;
}

// Hora de Argentina (UTC-3, sin horario de verano), sin "Z" — mismo formato
// que las consultas históricas importadas del Sheet (ver insert_consultas.sql).
function ahoraArgentina(): string {
  return new Date(Date.now() - 3 * 3_600_000).toISOString().slice(0, 19);
}

export async function onRequestPost({ request, env }: any) {
  if (!env.AGENTE_API_KEY || request.headers.get('X-Agente-Secret') !== env.AGENTE_API_KEY) {
    return json({ error: 'No autorizado.' }, 401);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400);
  }

  const subscriberId = textoONull(body?.subscriber_id);
  if (!subscriberId) {
    return json({ error: 'Falta subscriber_id.' }, 400);
  }

  const desde = normalizarFecha(body.desde);
  const hasta = normalizarFecha(body.hasta);
  if (desde === undefined || hasta === undefined) {
    return json({ error: 'Fechas inválidas: usar DD/MM/AAAA.' }, 400);
  }

  const nombreCompleto = textoONull([body.nombre, body.apellido].map(v => String(v ?? '').trim()).filter(Boolean).join(' '));
  const telefono = textoONull(body.telefono);
  const alojamiento = textoONull(body.alojamiento);
  const personas = numeroONull(body.personas);
  const monto = numeroONull(body.monto_total);
  const fechaConsulta = ahoraArgentina();

  const db = env.DB;

  const existente: any = await db
    .prepare(`SELECT id FROM consultas WHERE subscriber_id = ? ORDER BY id DESC LIMIT 1`)
    .bind(subscriberId)
    .first();

  if (existente) {
    await db
      .prepare(
        `UPDATE consultas SET
           cliente_nombre      = COALESCE(?, cliente_nombre),
           cliente_telefono    = COALESCE(?, cliente_telefono),
           alojamiento_interes = COALESCE(?, alojamiento_interes),
           fecha_desde         = COALESCE(?, fecha_desde),
           fecha_hasta         = COALESCE(?, fecha_hasta),
           cantidad_personas   = COALESCE(?, cantidad_personas),
           monto_estimado      = COALESCE(?, monto_estimado),
           fecha_consulta      = ?
         WHERE id = ?`
      )
      .bind(nombreCompleto, telefono, alojamiento, desde, hasta, personas, monto, fechaConsulta, existente.id)
      .run();
    return json({ ok: true, accion: 'actualizada', id: existente.id }, 200);
  }

  // cliente_nombre es NOT NULL en el schema — si el agente todavía no tiene
  // el nombre, guardamos un placeholder identificable (mismo criterio que
  // functions/api/manychat.ts).
  const inserted: any = await db
    .prepare(
      `INSERT INTO consultas
         (cliente_nombre, cliente_telefono, alojamiento_interes, fecha_desde, fecha_hasta,
          cantidad_personas, monto_estimado, subscriber_id, fecha_consulta)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       RETURNING id`
    )
    .bind(nombreCompleto || `Instagram #${subscriberId}`, telefono, alojamiento, desde, hasta, personas, monto, subscriberId, fechaConsulta)
    .first();

  return json({ ok: true, accion: 'creada', id: inserted?.id ?? null }, 200);
}
