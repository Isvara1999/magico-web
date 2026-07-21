import { WEB3FORMS_ACCESS_KEY } from '../data/config';

/**
 * Reemplaza los envíos de Netlify Forms (no disponible fuera de Netlify).
 * Envía los datos del formulario a Web3Forms, que los reenvía por email.
 *
 * Importante: el body va como FormData (no JSON) y sin fijar Content-Type
 * a mano — así el request queda dentro de los headers "simples" de CORS
 * y el navegador no dispara un preflight, que la API de Web3Forms no
 * responde correctamente (bloquea el request con un falso error de CORS).
 */
export async function submitForm(formName: string, data: FormData | Record<string, unknown>) {
  const formData = data instanceof FormData ? data : new FormData();
  if (!(data instanceof FormData)) {
    Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));
  }

  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', `Pueblo Mágico — ${formName}`);
  formData.append('from_name', 'Pueblo Mágico Web');

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  });

  const result = await res.json().catch(() => null);
  if (!res.ok || !result?.success) {
    throw new Error(result?.message || 'No se pudo enviar el formulario');
  }
  return result;
}
