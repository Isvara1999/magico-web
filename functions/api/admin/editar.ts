// Cloudflare Pages Function — edita cualquier campo editable de una reserva
// desde el Panel de Reservas (nombre, teléfono, fechas, montos, alojamiento,
// canal, unidad asignada). También se usa para "cancelar": no existe un
// endpoint de borrado — cancelar es simplemente estado = 'cancelada', así
// la reserva queda registrada en el historial en vez de desaparecer.
//
// Protegido por sesión propia, roles super_admin/editor — ver
// functions/_lib/authGuard.ts y nota en functions/api/admin/reservas.ts.
//
// Update parcial: solo se tocan los campos presentes en el body. Las
// validaciones de fechas/estado/cantidad_personas las hace el propio CHECK
// del schema (schema.sql) — si el UPDATE las viola, D1 tira el error y acá
// simplemente lo devolvemos legible, en vez de duplicar esa lógica.

import { requireRole } from '../../_lib/authGuard';
import { registrarAuditoria } from '../../_lib/auditoria';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const CAMPOS_EDITABLES = [
  'cliente_nombre',
  'cliente_telefono',
  'cliente_email',
  'alojamiento_id',
  'fecha_checkin',
  'fecha_checkout',
  'cantidad_personas',
  'monto_total',
  'monto_sena',
  'estado',
  'canal_origen',
  'unidad_asignada',
];

export async function onRequestPost({ request, env }: any) {
  const auth = await requireRole(request, env, ['super_admin', 'editor']);
  if (auth instanceof Response) return auth;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400);
  }

  const { reserva_id, ...resto } = body || {};
  const id = Number(reserva_id);
  if (!Number.isInteger(id) || id < 1) {
    return json({ error: 'reserva_id debe ser un entero válido.' }, 400);
  }

  const entradas = Object.entries(resto).filter(([campo]) => CAMPOS_EDITABLES.includes(campo));
  if (entradas.length === 0) {
    return json({ error: `Nada para actualizar. Campos válidos: ${CAMPOS_EDITABLES.join(', ')}.` }, 400);
  }

  if ('estado' in resto && !['pendiente', 'confirmada', 'cancelada'].includes(resto.estado)) {
    return json({ error: "estado debe ser 'pendiente', 'confirmada' o 'cancelada'." }, 400);
  }

  const setClause = entradas.map(([campo]) => `${campo} = ?`).join(', ');
  const valores = entradas.map(([, valor]) => valor);

  const db = env.DB;
  try {
    const row: any = await db
      .prepare(`UPDATE reservas SET ${setClause} WHERE id = ? RETURNING id`)
      .bind(...valores, id)
      .first();

    if (!row) return json({ error: `No existe la reserva #${id}.` }, 404);

    const accion = resto.estado === 'cancelada' ? 'cancelar_reserva' : 'editar_reserva';
    const detalle = entradas.map(([campo, valor]) => `${campo}=${valor}`).join(', ');
    await registrarAuditoria(db, auth.email, accion, `Reserva #${id}: ${detalle}`);

    return json({ ok: true, reserva_id: row.id });
  } catch (e: any) {
    // Típicamente un CHECK violado (fecha_checkout <= fecha_checkin, estado
    // inválido, cantidad_personas <= 0) o un alojamiento_id que no existe.
    return json({ error: `No se pudo actualizar: ${e.message}` }, 400);
  }
}
