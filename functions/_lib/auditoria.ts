// Registro de "quién hizo qué" desde el Panel de Reservas — alimenta la
// pestaña Actividad (solo super_admin). Ver functions/api/admin/actividad.ts.

export async function registrarAuditoria(db: any, email: string, accion: string, detalle?: string): Promise<void> {
  await db
    .prepare(`INSERT INTO auditoria_admin (email, accion, detalle) VALUES (?, ?, ?)`)
    .bind(email, accion, detalle ?? null)
    .run();
}
