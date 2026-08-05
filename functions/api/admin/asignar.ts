// Cloudflare Pages Function — asigna un lugar físico concreto (ej. "Domo 2" o
// "Cama 3 Habitación 1") a una reserva desde el Panel de Reservas.
//
// CERO LOGIN A PROPÓSITO — ver nota en functions/api/admin/reservas.ts.

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }: any) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400);
  }

  const { reserva_id, unidad_asignada } = body || {};
  const id = Number(reserva_id);

  if (!Number.isInteger(id) || id < 1) {
    return json({ error: 'reserva_id debe ser un entero válido.' }, 400);
  }
  if (typeof unidad_asignada !== 'string') {
    return json({ error: 'unidad_asignada debe ser un texto.' }, 400);
  }

  const db = env.DB;
  const row: any = await db
    .prepare(`UPDATE reservas SET unidad_asignada = ? WHERE id = ? RETURNING id, unidad_asignada`)
    .bind(unidad_asignada.trim(), id)
    .first();

  if (!row) {
    return json({ error: `No existe la reserva #${id}.` }, 404);
  }

  return json({ ok: true, reserva_id: row.id, unidad_asignada: row.unidad_asignada });
}
