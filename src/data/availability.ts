/**
 * Static availability — edit RESERVADOS_POR_DIA to reduce available spots.
 * BLOCKED_DATES: string[] of 'YYYY-MM-DD' to block specific days.
 * Refresh this file each time a reservation is confirmed.
 */

export const CAPACITY_PER_DAY = 30;

// Agosto 2026: domos completos, sin disponibilidad.
export const BLOCKED_DATES: string[] = [
  '2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04', '2026-08-05',
  '2026-08-06', '2026-08-07', '2026-08-08', '2026-08-09', '2026-08-10',
  '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14', '2026-08-15',
  '2026-08-16', '2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20',
  '2026-08-21', '2026-08-22', '2026-08-23', '2026-08-24', '2026-08-25',
  '2026-08-26', '2026-08-27', '2026-08-28', '2026-08-29', '2026-08-30',
  '2026-08-31',
];

// La opción "Privada" recién tiene lugar disponible a partir de septiembre.
export const PRIVATE_AVAILABLE_FROM = '2026-09-01';

// Reservation counts per month (increment when a booking is confirmed)
export const MONTHLY_RESERVATIONS: Record<string, number> = {
  '2026-07': 0,
  '2026-08': 0,
  '2026-09': 0,
};

export const PRECIO_NOCHE_ARS = 50_000; // pensión completa (desayuno: $20.000)
