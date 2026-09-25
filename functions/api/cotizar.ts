// Cloudflare Pages Function — motor de cotización del sistema de reservas.
// Recibe fechas + tipo de alojamiento + personas (+ comidas y Reset Vital
// presencial opcionales) y devuelve disponibilidad, desglose de precio, seña y
// saldo. No crea la reserva — es solo el "cotizador". Lo usa la tool
// "Disponibilidad" del agente de Instagram en n8n.
//
// POST /api/cotizar
// Body JSON:
//   fecha_entrada, fecha_salida  'YYYY-MM-DD' (también acepta DD/MM/AAAA)
//   cantidad_personas            entero ≥ 1
//   tipo_alojamiento             'domo' | 'refugio' | 'camping'
//   comidas?                     'desayuno' (default) | 'almuerzo' | 'cena' | 'pension_completa'
//   reset_presencial?            boolean (default false)
//
// Precios: tablas `tarifas`, `extras` y `feriados` de D1 (add_tarifas.sql).

import { chequearDisponibilidad, leerPrecios, mensajePrivacidad } from '../_lib/cotizador';
import { calcularCotizacion, calcularSena, OPCIONES_COMIDAS, TIPOS_ALOJAMIENTO, type Comidas, type TipoAlojamiento } from '../../src/lib/tarifas';

const ALLOWED_ORIGINS = [
  'https://experienciamagico.com',
];
const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) || LOCALHOST_ORIGIN.test(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

// El agente trabaja en DD/MM/AAAA — lo aceptamos además de YYYY-MM-DD.
function normalizarFecha(valor: unknown): string {
  const s = String(valor ?? '').trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : s;
}

export async function onRequestOptions({ request }: any) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestPost({ request, env }: any) {
  const headers = corsHeaders(request);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body inválido — se espera JSON.' }, 400, headers);
  }

  const { cantidad_personas, tipo_alojamiento } = body || {};
  const fechaEntrada = normalizarFecha(body?.fecha_entrada);
  const fechaSalida = normalizarFecha(body?.fecha_salida);
  const comidas: Comidas = body?.comidas || 'desayuno';
  const resetPresencial = body?.reset_presencial === true || body?.reset_presencial === 'true';

  if (!fechaEntrada || !fechaSalida || !cantidad_personas || !tipo_alojamiento) {
    return json(
      { error: 'Faltan campos: fecha_entrada, fecha_salida, cantidad_personas, tipo_alojamiento son todos requeridos.' },
      400,
      headers
    );
  }
  if (!TIPOS_ALOJAMIENTO.includes(tipo_alojamiento)) {
    return json({ error: `tipo_alojamiento debe ser uno de: ${TIPOS_ALOJAMIENTO.join(', ')}.` }, 400, headers);
  }
  if (!OPCIONES_COMIDAS.includes(comidas)) {
    return json({ error: `comidas debe ser uno de: ${OPCIONES_COMIDAS.join(', ')}.` }, 400, headers);
  }
  const tipo = tipo_alojamiento as TipoAlojamiento;
  const personas = Number(cantidad_personas);

  // Capacidad por unidad (Domo 7, Refugio 15) desde `alojamientos` — si el
  // grupo no entra, es un error explícito y no un "ocupado" engañoso.
  if (tipo !== 'camping') {
    const cap: any = await env.DB.prepare(`SELECT MAX(capacidad_total) AS max FROM alojamientos WHERE tipo = ?`).bind(tipo).first();
    if (cap?.max && personas > Number(cap.max)) {
      return json({ error: `El ${tipo === 'domo' ? 'Domo' : 'Refugio'} admite hasta ${cap.max} personas por unidad.` }, 400, headers);
    }
  }

  const precios = await leerPrecios(env.DB);
  const cotizacion = calcularCotizacion(precios, tipo, personas, fechaEntrada, fechaSalida, comidas, resetPresencial);
  if ('error' in cotizacion) {
    return json({ error: cotizacion.error }, 400, headers);
  }

  const { estado } = await chequearDisponibilidad(env.DB, tipo, personas, fechaEntrada, fechaSalida);
  const sena = calcularSena(cotizacion.subtotal);

  return json(
    {
      estado,
      fecha_entrada: fechaEntrada,
      fecha_salida: fechaSalida,
      desglose: cotizacion,
      subtotal: cotizacion.subtotal,
      sena: {
        porcentaje: sena.porcentaje,
        monto: sena.monto,
      },
      saldo_checkin: sena.saldo,
      mensaje_privacidad: mensajePrivacidad(tipo, personas),
    },
    200,
    headers
  );
}
