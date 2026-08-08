// Cloudflare Pages Function — webhook de Mercado Pago. Valida la firma HMAC,
// confirma el pago contra la API de MP (nunca confiamos en el body a ciegas),
// marca la reserva 'confirmada' en D1 y dispara la acción de Growth en ManyChat.
//
// Requiere estas variables de entorno en Cloudflare Pages:
//   MP_ACCESS_TOKEN               — access token de Mercado Pago (para GET /v1/payments/:id)
//   MP_WEBHOOK_SECRET             — "Clave secreta" de la notificación webhook (MP > Tus integraciones > Webhooks)
//   MANYCHAT_API_KEY              — API key de ManyChat (Bearer, para setCustomFields + sendFlow)
//   MANYCHAT_CONFIRMATION_FLOW_NS — flow_ns del flow de confirmación a disparar en ManyChat
//
// IMPORTANTE — esto no se pudo probar contra un webhook real de Mercado Pago
// (no hay credenciales de test en este entorno). El esquema de x-signature
// sigue la documentación oficial de MP al momento de escribir esto, pero
// verificalo con el simulador de webhooks de MP o un pago de prueba real
// antes de confiar en esto en producción.

const CUSTOM_FIELD_CHECKIN = 'Fecha_Checkin';
const CUSTOM_FIELD_CHECKOUT = 'Fecha_Checkout';

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Comparación en tiempo constante — un `===` filtraría por timing dónde
// diverge el hash, lo que en teoría permite reconstruir una firma válida
// byte a byte contra un endpoint público.
function hashesIguales(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// https://www.mercadopago.com.ar/developers/es/docs/checkout-api/additional-content/your-integrations/notifications/webhooks#editor_10
async function firmaValida(request: Request, env: any): Promise<{ ok: boolean; dataId: string | null }> {
  const url = new URL(request.url);
  const dataId = url.searchParams.get('data.id');
  const xSignature = request.headers.get('x-signature');
  const xRequestId = request.headers.get('x-request-id');

  if (!dataId || !xSignature || !xRequestId || !env.MP_WEBHOOK_SECRET) {
    return { ok: false, dataId };
  }

  const parts: Record<string, string> = {};
  for (const chunk of xSignature.split(',')) {
    const [k, v] = chunk.split('=');
    if (k && v) parts[k.trim()] = v.trim();
  }
  const { ts, v1 } = parts;
  if (!ts || !v1) return { ok: false, dataId };

  const manifest = `id:${dataId.toLowerCase()};request-id:${xRequestId};ts:${ts};`;
  const hash = await hmacSha256Hex(env.MP_WEBHOOK_SECRET, manifest);

  return { ok: hashesIguales(hash, v1), dataId };
}

async function dispararGrowth(env: any, manychatUserId: string, fechaCheckin: string, fechaCheckout: string) {
  const headers = {
    Authorization: `Bearer ${env.MANYCHAT_API_KEY}`,
    'Content-Type': 'application/json',
  };

  await fetch('https://api.manychat.com/fb/subscriber/setCustomFields', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      subscriber_id: manychatUserId,
      fields: [
        { field_name: CUSTOM_FIELD_CHECKIN, field_value: fechaCheckin },
        { field_name: CUSTOM_FIELD_CHECKOUT, field_value: fechaCheckout },
      ],
    }),
  });

  await fetch('https://api.manychat.com/fb/sending/sendFlow', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      subscriber_id: manychatUserId,
      flow_ns: env.MANYCHAT_CONFIRMATION_FLOW_NS,
    }),
  });
}

export async function onRequestPost({ request, env }: any) {
  // CRÍTICO: una firma inválida se rechaza (401), no se procesa. Una vez que
  // la firma es válida (es realmente Mercado Pago), cualquier error interno
  // de acá en adelante (falla al consultar el pago, falla al llamar a
  // ManyChat, etc.) se maneja sin romper el webhook: siempre 200, para que
  // MP no reintente sobre algo que ya procesamos de nuestro lado.
  const { ok: firmaOk, dataId } = await firmaValida(request, env);
  if (!firmaOk || !dataId) {
    console.warn('webhook-mp: firma inválida o datos faltantes — petición rechazada', { dataId });
    return new Response('Firma inválida', { status: 401 });
  }

  try {
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
      headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
    });
    if (!paymentRes.ok) {
      console.error('webhook-mp: no se pudo obtener el pago', dataId, paymentRes.status);
      return new Response('OK', { status: 200 });
    }

    const payment: any = await paymentRes.json();
    const reservaId = Number(payment.external_reference);
    if (!reservaId) {
      console.error('webhook-mp: pago sin external_reference válido', dataId);
      return new Response('OK', { status: 200 });
    }

    const db = env.DB;

    if (payment.status === 'approved') {
      // El guard "estado != 'confirmada'" evita disparar el growth action dos
      // veces si Mercado Pago reintenta el mismo webhook (algo frecuente).
      const row: any = await db
        .prepare(
          `UPDATE reservas SET estado = 'confirmada', mp_payment_id = ?
           WHERE id = ? AND estado != 'confirmada'
           RETURNING manychat_user_id, fecha_checkin, fecha_checkout`
        )
        .bind(String(payment.id), reservaId)
        .first();

      if (row?.manychat_user_id) {
        try {
          await dispararGrowth(env, row.manychat_user_id, row.fecha_checkin, row.fecha_checkout);
        } catch (growthErr) {
          console.error('webhook-mp: growth action falló (pago igual quedó confirmado)', growthErr);
        }
      }
    } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
      await db
        .prepare(`UPDATE reservas SET estado = 'cancelada', mp_payment_id = ? WHERE id = ? AND estado = 'pendiente'`)
        .bind(String(payment.id), reservaId)
        .run();
    }
    // Otros estados (in_process, pending, etc.) no tocan la reserva — sigue 'pendiente'.

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('webhook-mp: error inesperado', err);
    return new Response('OK', { status: 200 });
  }
}
