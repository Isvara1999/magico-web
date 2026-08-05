/**
 * Fallback de disponibilidad — el BookingWidget ahora consulta en vivo
 * GET /api/disponibilidad (functions/api/disponibilidad.ts), que calcula
 * estas mismas listas a partir de las reservas reales en D1. Estos arrays
 * solo se usan como respaldo mientras esa consulta está en curso o si falla
 * (por ejemplo en `npm run dev`, donde no corren las Pages Functions).
 * BLOCKED_DATES_DOMO / BLOCKED_DATES_REFUGIO: string[] de 'YYYY-MM-DD'.
 */

export const CAPACITY_PER_DAY = 30;

// Domos: llenos todos los fines de semana de agosto (viernes a domingo,
// el finde largo del Pachamama Fest / Familion se extiende al lunes) —
// EXCEPTO el finde 31 jul-2 ago, que todavía tiene 1 domo libre.
// El refugio (eco-refugio compartido) sigue con lugar toda la temporada.
//
// ⚠️ Manual por ahora: cuando ese último domo del 31/7-2/8 se reserve,
// agregá esas 3 fechas de vuelta a esta lista (o avisale a Claude en el
// chat). Más adelante esto se puede conectar a una planilla/Sheet.
export const BLOCKED_DATES_DOMO: string[] = [
  '2026-08-07', '2026-08-08', '2026-08-09',                // finde 7-9 ago
  '2026-08-14', '2026-08-15', '2026-08-16', '2026-08-17',  // finde largo (Pachamama Fest / Familion)
  '2026-08-21', '2026-08-22', '2026-08-23',                // finde 21-23 ago
  '2026-08-28', '2026-08-29', '2026-08-30',                // finde 28-30 ago (Ciclo Vital Femenino)
];

export const BLOCKED_DATES_REFUGIO: string[] = [];

// Última fecha para reservar y acceder a la Promo Parejas de domo privado
// (la estadía en sí puede ser más adelante, lo que vence es la reserva).
export const PROMO_PAREJAS_RESERVA_HASTA = '2026-07-31';

// Mensaje de urgencia manual por mes — lo activás vos por chat cuando un mes
// se está por llenar (no se calcula solo, es una etiqueta a mano).
// 'normal': no muestra nada. 'pocos-lugares' / 'ultimos-lugares': muestra un
// badge en el widget de reserva sobre ese mes.
export type MonthUrgency = 'normal' | 'pocos-lugares' | 'ultimos-lugares';
export const MONTHLY_URGENCY: Record<string, MonthUrgency> = {
  '2026-07': 'normal',
  '2026-08': 'normal',
  '2026-09': 'normal',
};

export const PRECIO_NOCHE_ARS = 50_000; // pensión completa (desayuno: $20.000)
