// Cloudflare Pages Function — reemplaza a Netlify Identity / git-gateway
// como backend de login para Decap CMS (public/admin).
//
// Requiere estas variables de entorno en Cloudflare Pages
// (Settings → Environment variables):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
//
// Se generan creando una GitHub OAuth App en:
// https://github.com/settings/developers
//   Homepage URL:              https://tu-dominio.com
//   Authorization callback URL: https://tu-dominio.com/callback

export async function onRequestGet({ request, env }: any) {
  const url = new URL(request.url);
  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response('Falta configurar GITHUB_CLIENT_ID en Cloudflare Pages.', { status: 500 });
  }

  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/callback`;
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': `cms_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
