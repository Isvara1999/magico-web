// Cloudflare Pages Function — exporta la ocupación de un alojamiento como
// calendario iCal, para pegar en "Sincronizar calendarios" de Airbnb (o
// cualquier otra plataforma que acepte importar un .ics).
//
// GET /api/ical?alojamiento_id=1
//
// SIN AUTENTICACIÓN A PROPÓSITO: Airbnb necesita poder buscar esta URL sola,
// periódicamente, sin login. Por eso el contenido es deliberadamente mínimo:
// solo fechas ocupadas, SIN nombre de huésped, teléfono, email ni montos —
// nada de eso debería quedar expuesto en una URL pública sin protección.
//
// OJO: esto trata cada alojamiento como una unidad reservable completa
// (correcto para Domo 1 / Domo 2, que se alquilan enteros). El Refugio tiene
// 15 camas compartidas — si en algún momento se lista en Airbnb de forma
// que permita ocupación parcial, este export bloquearía el Refugio entero
// apenas hubiera UNA reserva, lo cual estaría mal. Revisar antes de usarlo
// para el Refugio si se lista ahí.

import { generarIcs } from '../_lib/ical';

export async function onRequestGet({ request, env }: any) {
  const url = new URL(request.url);
  const alojamientoId = Number(url.searchParams.get('alojamiento_id'));
  if (!Number.isInteger(alojamientoId) || alojamientoId < 1) {
    return new Response('Falta o es inválido el parámetro alojamiento_id.', { status: 400 });
  }

  const db = env.DB;
  const alojamiento: any = await db.prepare('SELECT id, nombre FROM alojamientos WHERE id = ?').bind(alojamientoId).first();
  if (!alojamiento) {
    return new Response(`No existe el alojamiento #${alojamientoId}.`, { status: 404 });
  }

  const { results } = await db
    .prepare(
      `SELECT id, fecha_checkin, fecha_checkout, estado FROM reservas
       WHERE alojamiento_id = ? AND estado IN ('confirmada', 'pendiente')
       ORDER BY fecha_checkin ASC`
    )
    .bind(alojamientoId)
    .all();

  const eventos = (results || []).map((r: any) => ({
    uid: `pueblo-magico-reserva-${r.id}@experienciamagico.com`,
    dtstart: String(r.fecha_checkin).slice(0, 10),
    dtend: String(r.fecha_checkout).slice(0, 10),
    summary: r.estado === 'pendiente' ? 'Pendiente de confirmación' : 'Reservado',
  }));

  const ics = generarIcs(`Pueblo Mágico — ${alojamiento.nombre}`, eventos);

  return new Response(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'public, max-age=1800', // 30 min — no hace falta regenerar en cada request
    },
  });
}
