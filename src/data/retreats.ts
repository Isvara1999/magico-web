/**
 * Retreats pricing, dates and specific configuration
 */

export const RETREATS_DATA = {
  vueloDelCondor: {
    price: 1800,
    currency: 'USD',
    dates: '22 al 29 de Julio',
    location: 'Valle Sagrado, Perú',
    message: "¡Hola! Vengo desde la web y me interesa el viaje iniciático 'El Vuelo del Cóndor' en Perú. ✨",
  },
  familion: {
    prices: {
      camping: 280000,
      refugio: 450000,
      domoPrivado: 650000,
    },
    dates: ['13 al 15 de Junio'],
    message: 'Hola! Vengo de Familion y quiero consultar la experiencia.',
  },
  achalaViva: {
    price: 180000,
    currency: 'ARS',
    dates: '9 y 10 de Mayo',
    message: '¡Hola! Terminé de leer todo sobre la inmersión Achala Viva y no me lo quiero perder. Me comunico para coordinar la seña y asegurar mi lugar. ✨',
  },
  gondorbows: {
    price: 640000,
    currency: 'ARS',
    dates: '29 al 31 de Mayo',
    message: '¡Hola Fausto! Terminé de leer todo sobre el retiro de Gondorbows y no me lo quiero perder. Me comunico para coordinar la seña y asegurar mi lugar. 🌲✨',
  }
};

export const ESTADIA_PRICES = {
  base: 40000,
  pensionCompleta: 95000,
  weekdayDiscount: 0.20, // 20%
};
