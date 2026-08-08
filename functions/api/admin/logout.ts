// Cloudflare Pages Function — cierra la sesión del Panel de Reservas
// borrando la cookie. Ver functions/api/admin/login.ts.

import { clearSessionCookieHeader } from '../../_lib/session';

export async function onRequestPost() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Set-Cookie': clearSessionCookieHeader() },
  });
}
