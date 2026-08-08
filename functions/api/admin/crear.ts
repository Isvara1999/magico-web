// Cloudflare Pages Function — carga una reserva manual desde el Panel de
// Reservas. Para cuando ManyChat falla, se cierra una reserva a mano
// (teléfono, en persona) o viene de otro canal (Airbnb, etc.) que no pasa
// por el flujo automático.
//
// Protegido por sesión propia, roles super_admin/editor — ver
// functions/_lib/authGuard.ts y nota en functions/api/admin/reservas.ts.
//
// El chequeo de solapamiento es INFORMATIVO, no bloquea la creación: quien
// carga esto a mano puede saber algo que el sistema todavía no sabe (por
// ejemplo, que la reserva de Airbnb que está cargando YA existe en la
// realidad, aunque nuestra grilla la marque "libre").

import { requireRole } from '../../_lib/authGuard';
import { registrarAuditoria } from '../../_lib/auditoria';

const TIPOS_ESTADIA_VALIDOS = ['huesped', 'staff', 'voluntario', 'residente'];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }: any) {
  const auth = await requireRole(request, env, ['super_admin', 'editor']);
  if (auth instanceof Response) return auth;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400);
  }

  const {
    cliente_nombre,
    cliente_telefono,
    cliente_email,
    alojamiento_id,
    fecha_checkin,
    fecha_checkout,
    cantidad_personas,
    monto_total,
    monto_sena,
    estado,
    canal_origen,
    tipo_estadia,
  } = body || {};

  if (!cliente_nombre || !alojamiento_id || !fecha_checkin || !fecha_checkout || !cantidad_personas || monto_total === undefined || monto_total === null) {
    return json(
      { error: 'Faltan campos obligatorios: cliente_nombre, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total.' },
      400
    );
  }
  if (estado && !['pendiente', 'confirmada', 'cancelada'].includes(estado)) {
    return json({ error: "estado debe ser 'pendiente', 'confirmada' o 'cancelada'." }, 400);
  }
  if (tipo_estadia && !TIPOS_ESTADIA_VALIDOS.includes(tipo_estadia)) {
    return json({ error: `tipo_estadia debe ser uno de: ${TIPOS_ESTADIA_VALIDOS.join(', ')}.` }, 400);
  }

  const db = env.DB;

  const solapa: any = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM reservas
       WHERE alojamiento_id = ? AND estado IN ('pendiente', 'confirmada')
       AND fecha_checkin < ? AND fecha_checkout > ?`
    )
    .bind(alojamiento_id, fecha_checkout, fecha_checkin)
    .first();
  const disponible = !solapa || Number(solapa.n) === 0;

  try {
    const inserted: any = await db
      .prepare(
        `INSERT INTO reservas
          (cliente_nombre, cliente_telefono, cliente_email, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado, canal_origen, tipo_estadia)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         RETURNING id`
      )
      .bind(
        cliente_nombre,
        cliente_telefono || null,
        cliente_email || null,
        alojamiento_id,
        fecha_checkin,
        fecha_checkout,
        cantidad_personas,
        monto_total,
        monto_sena ?? null,
        estado || 'confirmada',
        canal_origen || 'Manual',
        tipo_estadia || 'huesped'
      )
      .first();

    await registrarAuditoria(db, auth.email, 'crear_reserva', `Reserva #${inserted?.id} — ${cliente_nombre}`);
    return json({ ok: true, reserva_id: inserted?.id, disponible }, 200);
  } catch (e: any) {
    return json({ error: `No se pudo crear la reserva: ${e.message}` }, 400);
  }
}
