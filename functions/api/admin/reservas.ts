// Cloudflare Pages Function — datos para el Dashboard interno (/admin/reservas).
//
// Protegido por sesión propia (login de usuario/contraseña en D1) — ver
// functions/_lib/authGuard.ts y functions/api/admin/login.ts. Reemplaza al
// One-Time PIN de Cloudflare Access que protegía esta ruta antes.
//
// Dos vistas, mismo endpoint:
//   GET /api/admin/reservas                 -> vista operativa (default)
//   GET /api/admin/reservas?vista=historial -> todas las reservas, cualquier
//                                               estado/fecha, para búsqueda
//
// La vista operativa trae 'confirmada'/'pendiente' cuya estadía todavía no
// terminó (fecha_checkout >= hoy) — es la que alimenta la Grilla de Ocupación.
// Las métricas de las tarjetas SIEMPRE se calculan sobre esa vista operativa,
// sin importar qué vista se pidió — son números de "ahora", no un acumulado
// histórico. También devuelve el listado completo de alojamientos, para que
// el frontend pueda dibujar las filas de la grilla aunque un día esté vacío.

import { requireAuth } from '../../_lib/authGuard';

const DIAS_PENDIENTE_VIEJA = 3;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const CAMPOS_RESERVA = `
  r.id, r.cliente_nombre, r.cliente_telefono, r.cliente_email,
  r.alojamiento_id, a.nombre AS alojamiento_nombre, a.tipo AS alojamiento_tipo,
  r.fecha_checkin, r.fecha_checkout, r.cantidad_personas,
  r.monto_total, r.monto_sena, r.estado, r.unidad_asignada, r.canal_origen,
  r.mp_preference_id, r.mp_payment_id, r.manychat_user_id, r.created_at
`;

export async function onRequestGet({ request, env }: any) {
  const auth = await requireAuth(request, env);
  if (auth instanceof Response) return auth;

  const db = env.DB;
  const url = new URL(request.url);
  const vistaHistorial = url.searchParams.get('vista') === 'historial';

  const { results: alojamientos } = await db
    .prepare(`SELECT id, nombre, tipo, capacidad_total FROM alojamientos ORDER BY id ASC`)
    .all();

  // Vista operativa — siempre se calcula, es la base de las métricas.
  const { results: resultsOperativa } = await db
    .prepare(
      `SELECT ${CAMPOS_RESERVA}
       FROM reservas r
       JOIN alojamientos a ON a.id = r.alojamiento_id
       WHERE r.estado IN ('confirmada', 'pendiente')
         AND DATE(r.fecha_checkout) >= DATE('now')
       ORDER BY r.fecha_checkin ASC`
    )
    .all();
  const reservasOperativa = resultsOperativa || [];

  let reservas = reservasOperativa;
  if (vistaHistorial) {
    const { results: resultsHistorial } = await db
      .prepare(
        `SELECT ${CAMPOS_RESERVA}
         FROM reservas r
         JOIN alojamientos a ON a.id = r.alojamiento_id
         ORDER BY r.fecha_checkin DESC`
      )
      .all();
    reservas = resultsHistorial || [];
  }

  // Pendientes "viejas": no se filtran por fecha de estadía a propósito — una
  // reserva pendiente para fechas que YA PASARON y nunca se confirmó es
  // exactamente el caso que más nos interesa detectar (seña nunca pagada,
  // lugar que capaz sigue "reservado" fantasma).
  const { results: pendientesViejasRaw } = await db
    .prepare(
      `SELECT r.id, r.cliente_nombre, r.cliente_telefono, r.monto_sena, r.created_at,
              a.nombre AS alojamiento_nombre
       FROM reservas r
       JOIN alojamientos a ON a.id = r.alojamiento_id
       WHERE r.estado = 'pendiente' AND r.created_at < datetime('now', '-${DIAS_PENDIENTE_VIEJA} days')
       ORDER BY r.created_at ASC`
    )
    .all();
  const pendientesViejas = pendientesViejasRaw || [];

  // Conversión ManyChat: de todas las reservas que se originaron ahí (en
  // cualquier fecha, cualquier estado), cuántas terminaron confirmadas. No
  // captura las cotizaciones que dijeron "ocupado" y nunca llegaron a crear
  // una fila en D1 — ese paso no se registra en ningún lado hoy.
  const conversionRow = await db
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN estado = 'confirmada' THEN 1 ELSE 0 END) AS confirmadas
       FROM reservas
       WHERE manychat_user_id IS NOT NULL`
    )
    .first();

  // Nota de huso horario: "hoy" se calcula en UTC (el reloj de D1/Workers).
  // Pueblo Mágico está en UTC-3, así que cerca de la medianoche esto puede
  // desalinearse por un par de horas con el día calendario real en Córdoba.
  const hoy = new Date().toISOString().slice(0, 10);
  const en7dias = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);

  const confirmadas = reservasOperativa.filter((r: any) => r.estado === 'confirmada');
  const pendientesOperativa = reservasOperativa.filter((r: any) => r.estado === 'pendiente');

  const totalManychat = conversionRow ? Number(conversionRow.total) || 0 : 0;
  const confirmadasManychat = conversionRow ? Number(conversionRow.confirmadas) || 0 : 0;

  const metricas = {
    total_confirmadas: confirmadas.length,
    ingresos_senas: confirmadas.reduce((sum: number, r: any) => sum + (r.monto_sena || 0), 0),
    checkins_hoy: confirmadas.filter((r: any) => String(r.fecha_checkin).slice(0, 10) === hoy).length,
    checkins_semana: confirmadas.filter((r: any) => {
      const c = String(r.fecha_checkin).slice(0, 10);
      return c >= hoy && c < en7dias;
    }).length,
    checkouts_hoy: confirmadas.filter((r: any) => String(r.fecha_checkout).slice(0, 10) === hoy).length,
    saldo_pendiente_total: confirmadas.reduce((sum: number, r: any) => sum + (r.monto_total - (r.monto_sena || 0)), 0),
    total_a_facturar: [...confirmadas, ...pendientesOperativa].reduce((sum: number, r: any) => sum + r.monto_total, 0),
    pendientes_viejas: {
      cantidad: pendientesViejas.length,
      umbral_dias: DIAS_PENDIENTE_VIEJA,
      items: pendientesViejas,
    },
    conversion_manychat: {
      total: totalManychat,
      confirmadas: confirmadasManychat,
      pct: totalManychat > 0 ? Math.round((confirmadasManychat / totalManychat) * 1000) / 10 : null,
    },
  };

  return json({ metricas, alojamientos: alojamientos || [], reservas, vista: vistaHistorial ? 'historial' : 'operativa' });
}
