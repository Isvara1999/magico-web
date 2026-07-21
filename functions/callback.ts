// Segunda mitad del flujo de login de Decap CMS (ver functions/auth.ts).
// GitHub redirige acá con ?code=...&state=...; canjeamos el code por un
// access_token y se lo pasamos de vuelta a la ventana del CMS via postMessage.

function readCookie(request: any, name: string): string | null {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

function renderResult(provider: string, payload: Record<string, unknown>, status: 'success' | 'error') {
  const message = `authorization:${provider}:${status}:${JSON.stringify(payload)}`;
  return `<!doctype html><html><body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:${provider}', '*');
  })();
</script>
</body></html>`;
}

export async function onRequestGet({ request, env }: any) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = readCookie(request, 'cms_oauth_state');

  if (!code || !state || !cookieState || state !== cookieState) {
    return new Response(renderResult('github', { message: 'Estado inválido — reintentá el login.' }, 'error'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json() as { access_token?: string; error_description?: string };

  if (!tokenData.access_token) {
    return new Response(
      renderResult('github', { message: tokenData.error_description || 'No se pudo obtener el token de GitHub.' }, 'error'),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  return new Response(
    renderResult('github', { token: tokenData.access_token, provider: 'github' }, 'success'),
    {
      headers: {
        'Content-Type': 'text/html',
        'Set-Cookie': 'cms_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      },
    }
  );
}
