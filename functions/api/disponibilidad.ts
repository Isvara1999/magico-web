// Cloudflare Pages Function — disponibilidad pública para el widget de
// reserva del sitio (Home / Estadía). Para cada día del rango pedido calcula
// si queda lugar en Domo (al menos 1 de los domos libre) y en Refugio (no
// se llegó al tope de camas), a partir de las reservas reales en D1 — el
// mismo dato que ya usa el Panel de Reservas, no una lista mantenida a mano.
//
// GET /api/disponibilidad?desde=YYYY-MM-DD&hasta=YYYY-MM-DD

const ALLOWED_ORIGINS = ['https://experienciamagico.com'];
const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || LOCALHOST_ORIGIN.test(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function addDaysIso(iso: string, dias: number) {
  return isoDate(new Date(new Date(`${iso}T00:00:00Z`).getTime() + dias * 86400000));
}

export async function onRequestOptions({ request }: any) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestGet({ request, env }: any) {
  const headers = corsHeaders(request);
  const url = new URL(request.url);
  const desde = url.searchParams.get('desde') || '';
  const hasta = url.searchParams.get('hasta') || '';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(desde) || !/^\d{4}-\d{2}-\d{2}$/.test(hasta) || hasta <= desde) {
    return json({ error: "Parámetros 'desde' y 'hasta' (YYYY-MM-DD, hasta > desde) son requeridos." }, 400, headers);
  }

  const db = env.DB;

  const { results: alojamientosRaw } = await db
    .prepare(`SELECT id, nombre, tipo, capacidad_total FROM alojamientos ORDER BY id ASC`)
    .all();
  const alojamientos = alojamientosRaw || [];

  // Reservas activas que se solapan con el rango pedido.
  const { results: reservasRaw } = await db
    .prepare(
      `SELECT alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas
       FROM reservas
       WHERE estado IN ('pendiente', 'confirmada')
         AND fecha_checkin < ?2 AND fecha_checkout > ?1`
    )
    .bind(desde, hasta)
    .all();
  const reservas = reservasRaw || [];

  const totalDomos = alojamientos.filter((a: any) => a.tipo === 'domo').length;
  const refugio = alojamientos.find((a: any) => a.tipo === 'refugio');
  const capacidadRefugio = refugio ? Number(refugio.capacidad_total) : 15;

  const unidadesBlocked: Record<number, string[]> = {};
  for (const a of alojamientos) unidadesBlocked[a.id] = [];

  const blockedDomo: string[] = [];
  const blockedRefugio: string[] = [];

  for (let dia = desde; dia < hasta; dia = addDaysIso(dia, 1)) {
    const diaFin = addDaysIso(dia, 1);
    const domosOcupados = new Set<number>();
    let personasRefugio = 0;

    for (const r of reservas as any[]) {
      const solapa = String(r.fecha_checkin) < diaFin && String(r.fecha_checkout) > dia;
      if (!solapa) continue;
      const aloj = alojamientos.find((a: any) => a.id === r.alojamiento_id);
      if (!aloj) continue;
      if (aloj.tipo === 'domo') {
        domosOcupados.add(r.alojamiento_id);
        unidadesBlocked[r.alojamiento_id].push(dia);
      } else {
        personasRefugio += Number(r.cantidad_personas) || 0;
      }
    }

    if (totalDomos > 0 && domosOcupados.size >= totalDomos) blockedDomo.push(dia);
    if (personasRefugio >= capacidadRefugio) blockedRefugio.push(dia);
  }

  return json(
    {
      desde,
      hasta,
      domo: { blocked: blockedDomo },
      refugio: { blocked: blockedRefugio },
      unidades: alojamientos.map((a: any) => ({
        id: a.id,
        nombre: a.nombre,
        tipo: a.tipo,
        blocked: unidadesBlocked[a.id] || [],
      })),
    },
    200,
    headers
  );
}
