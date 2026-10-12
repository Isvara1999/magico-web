// Cloudflare Pages Function — registro de interesados de las landings de
// eventos (primero: /sunset-y-rio). Guarda en la tabla `registros_eventos`
// (ver add_registros_eventos.sql) dos cosas:
//   { tipo: 'click', evento, valor }                               → clic en un botón
//   { tipo: 'form',  evento, valor, nombre, telefono, email, edad,
//     genero, fuente, modalidad, cantidad? }                       → formulario
// Cada formulario dispara un mail de aviso (Resend) si están configurados
// RESEND_API_KEY y NOTIFY_EMAIL; si el mail falla, el registro igual queda
// guardado. La descarga en CSV está en /api/admin/interesados.

const ALLOWED_ORIGINS = [
  'https://experienciamagico.com',
];
const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const EVENTOS: Record<string, string> = { 'sunset-y-rio': 'Sunset y Río (30/10 al 1/11)' };
const VALORES = ['30-1', 'grupo'];
const GENEROS = ['mujer', 'hombre', 'no_binario', 'prefiero_no_decir'];
const FUENTES = ['instagram', 'facebook', 'tiktok', 'whatsapp', 'amigos', 'google', 'runclub_cordoba', 'ya_vine', 'otro'];

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || LOCALHOST_ORIGIN.test(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

async function avisarPorMail(env: any, evento: string, datos: Record<string, string | number | null>) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;
  const filas = Object.entries(datos)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(String(v ?? '—'))}</strong></td></tr>`)
    .join('');
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.RESEND_FROM || 'Pueblo Mágico <onboarding@resend.dev>',
        to: String(env.NOTIFY_EMAIL).split(',').map((s: string) => s.trim()).filter(Boolean),
        subject: `Nuevo interesado · ${EVENTOS[evento]} · ${datos['Nombre']}`,
        html: `<p>Alguien completó el formulario de <strong>${EVENTOS[evento]}</strong>.</p><table>${filas}</table><p style="color:#888;font-size:12px">Todos los registros se descargan en CSV desde el Dashboard → Interesados.</p>`,
      }),
    });
  } catch { /* el aviso es best-effort: el registro ya quedó en D1 */ }
}

export async function onRequestOptions({ request }: any) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestPost({ request, env, waitUntil }: any) {
  const headers = corsHeaders(request);

  let body: any;
  try {
    // sendBeacon manda text/plain — se parsea igual como JSON.
    body = JSON.parse(await request.text());
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400, headers);
  }

  const { tipo, evento, valor } = body || {};
  if (!(evento in EVENTOS)) return json({ error: 'evento desconocido.' }, 400, headers);
  if (!VALORES.includes(valor)) return json({ error: "valor debe ser '30-1' o 'grupo'." }, 400, headers);

  if (tipo === 'click') {
    await env.DB
      .prepare('INSERT INTO registros_eventos (evento, tipo, valor) VALUES (?, ?, ?)')
      .bind(evento, 'click', valor)
      .run();
    return json({ ok: true }, 200, headers);
  }

  if (tipo !== 'form') return json({ error: "tipo debe ser 'click' o 'form'." }, 400, headers);
  if (valor === 'grupo') return json({ error: "En el formulario la fecha es '30-1'." }, 400, headers);

  const nombre = texto(body.nombre, 100);
  const telefono = texto(body.telefono, 30);
  const email = texto(body.email, 120).toLowerCase();
  const edad = Number(body.edad);
  const genero = texto(body.genero, 30);
  const fuente = texto(body.fuente, 30);
  const fuenteOtro = texto(body.fuenteOtro, 80);
  const modalidad = body.modalidad;
  const pagina = texto(body.pagina, 300) || null;

  if (nombre.length < 3) return json({ error: 'Falta el nombre y apellido.' }, 400, headers);
  if (telefono.replace(/\D/g, '').length < 8) return json({ error: 'Teléfono inválido.' }, 400, headers);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Email inválido.' }, 400, headers);
  if (!Number.isInteger(edad) || edad < 14 || edad > 99) return json({ error: 'Edad inválida.' }, 400, headers);
  if (!GENEROS.includes(genero)) return json({ error: 'Género inválido.' }, 400, headers);
  if (!FUENTES.includes(fuente)) return json({ error: 'Falta cómo te enteraste.' }, 400, headers);
  if (modalidad !== 'solo' && modalidad !== 'grupo') {
    return json({ error: "modalidad debe ser 'solo' o 'grupo'." }, 400, headers);
  }
  let cantidad: number | null = null;
  if (modalidad === 'grupo') {
    cantidad = Number(body.cantidad);
    if (!Number.isInteger(cantidad) || cantidad < 2 || cantidad > 30) {
      return json({ error: 'cantidad debe ser un entero entre 2 y 30.' }, 400, headers);
    }
  }
  const fuenteFinal = fuente === 'otro' && fuenteOtro ? `otro: ${fuenteOtro}` : fuente;

  await env.DB
    .prepare(
      `INSERT INTO registros_eventos (evento, tipo, valor, nombre, telefono, email, edad, genero, fuente, modalidad, cantidad, pagina)
       VALUES (?, 'form', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(evento, valor, nombre, telefono, email, edad, genero, fuenteFinal, modalidad, cantidad, pagina)
    .run();

  waitUntil(avisarPorMail(env, evento, {
    Nombre: nombre,
    Teléfono: telefono,
    Email: email,
    Edad: edad,
    Género: genero,
    'Cómo se enteró': fuenteFinal,
    Viene: modalidad === 'grupo' ? `En grupo (${cantidad})` : 'Solo/a',
    Landing: pagina ? `experienciamagico.com${pagina}` : '—',
  }));

  return json({ ok: true }, 200, headers);
}
