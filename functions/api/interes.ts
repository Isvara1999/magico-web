// Cloudflare Pages Function — paneo de interés de las landings de validación
// (primero: /sunset-y-rio). Guarda en la tabla `interes_eventos` (ver
// add_interes_eventos.sql) dos cosas:
//   { tipo: 'click', evento, valor }                         → evento fecha_elegida
//   { tipo: 'form',  evento, valor, nombre, modalidad, cantidad? } → formulario
// No toma reservas ni datos de contacto: el contacto sigue por WhatsApp.

const ALLOWED_ORIGINS = [
  'https://experienciamagico.com',
];
const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const EVENTOS = ['sunset-y-rio'];
const VALORES = ['24', '31', 'ambas', 'grupo'];

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

export async function onRequestOptions({ request }: any) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestPost({ request, env }: any) {
  const headers = corsHeaders(request);

  let body: any;
  try {
    // sendBeacon manda text/plain — se parsea igual como JSON.
    body = JSON.parse(await request.text());
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400, headers);
  }

  const { tipo, evento, valor } = body || {};
  if (!EVENTOS.includes(evento)) return json({ error: 'evento desconocido.' }, 400, headers);
  if (!VALORES.includes(valor)) return json({ error: "valor debe ser '24', '31', 'ambas' o 'grupo'." }, 400, headers);

  if (tipo === 'click') {
    await env.DB
      .prepare('INSERT INTO interes_eventos (evento, tipo, valor) VALUES (?, ?, ?)')
      .bind(evento, 'click', valor)
      .run();
    return json({ ok: true }, 200, headers);
  }

  if (tipo !== 'form') return json({ error: "tipo debe ser 'click' o 'form'." }, 400, headers);

  const nombre = typeof body.nombre === 'string' ? body.nombre.trim().slice(0, 80) : '';
  if (!nombre) return json({ error: 'Falta el nombre.' }, 400, headers);
  if (valor === 'grupo') return json({ error: 'En el formulario la fecha es 24, 31 o ambas.' }, 400, headers);

  const modalidad = body.modalidad;
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

  await env.DB
    .prepare('INSERT INTO interes_eventos (evento, tipo, valor, nombre, modalidad, cantidad) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(evento, 'form', valor, nombre, modalidad, cantidad)
    .run();

  return json({ ok: true }, 200, headers);
}
