/**
 * Static availability — edit RESERVADOS_POR_DIA to reduce available spots.
 * BLOCKED_DATES: string[] of 'YYYY-MM-DD' to block specific days.
 * Refresh this file each time a reservation is confirmed.
 */

export const CAPACITY_PER_DAY = 30;

export const BLOCKED_DATES: string[] = [];

// Reservation counts per month (increment when a booking is confirmed)
export const MONTHLY_RESERVATIONS: Record<string, number> = {
  '2026-07': 0,
  '2026-08': 0,
  '2026-09': 0,
};

export const PRECIO_NOCHE_ARS = 85_000;
