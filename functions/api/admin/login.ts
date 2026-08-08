// Cloudflare Pages Function — login del Panel de Reservas. Reemplaza el
// One-Time PIN de Cloudflare Access por usuario+contraseña propios, en D1
// (tabla usuarios_admin — ver migration_usuarios_admin.sql). La sesión
// resultante es la cookie que valida functions/_lib/authGuard.ts en el resto
// de los endpoints /api/admin/*.
//
// Anti fuerza bruta simple: 5 intentos fallidos seguidos para un email
// bloquean ese email por 15 minutos (columnas intentos_fallidos/bloqueado_hasta).

import { verifyPassword } from '../../_lib/passwords';
import { createSessionToken, sessionCookieHeader } from '../../_lib/session';

const MAX_INTENTOS = 5;
const BLOQUEO_MINUTOS = 15;

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

export async function onRequestPost({ request, env }: any) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400);
  }

  const email = String(body?.email || '').trim().toLowerCase();
  const password = String(body?.password || '');
  if (!email || !password) {
    return json({ error: 'Faltan email y/o contraseña.' }, 400);
  }

  const db = env.DB;
  const usuario: any = await db
    .prepare(`SELECT id, email, password_hash, rol, activo, intentos_fallidos, bloqueado_hasta FROM usuarios_admin WHERE LOWER(email) = ?`)
    .bind(email)
    .first();

  // Mensaje genérico siempre — no revela si el email existe.
  const credencialesInvalidas = () => json({ error: 'Email o contraseña incorrectos.' }, 401);

  if (!usuario || !usuario.activo) return credencialesInvalidas();

  if (usuario.bloqueado_hasta && new Date(usuario.bloqueado_hasta).getTime() > Date.now()) {
    return json({ error: 'Demasiados intentos fallidos. Probá de nuevo en unos minutos.' }, 401);
  }

  const ok = await verifyPassword(password, usuario.password_hash);
  if (!ok) {
    const intentos = (usuario.intentos_fallidos || 0) + 1;
    const bloqueadoHasta = intentos >= MAX_INTENTOS ? new Date(Date.now() + BLOQUEO_MINUTOS * 60_000).toISOString() : null;
    await db
      .prepare(`UPDATE usuarios_admin SET intentos_fallidos = ?, bloqueado_hasta = ? WHERE id = ?`)
      .bind(intentos, bloqueadoHasta, usuario.id)
      .run();
    return credencialesInvalidas();
  }

  await db
    .prepare(`UPDATE usuarios_admin SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id = ?`)
    .bind(usuario.id)
    .run();

  const token = await createSessionToken(usuario.email, env.SESSION_SECRET);
  return json({ ok: true, email: usuario.email, rol: usuario.rol }, 200, { 'Set-Cookie': sessionCookieHeader(token) });
}
