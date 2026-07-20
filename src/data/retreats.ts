/**
 * Retreats pricing, dates and specific configuration
 */

export const RETREATS_DATA = {
  vueloDelCondor: {
    price: 1800,
    currency: 'USD',
    dates: '22 al 29 de Julio',
    location: 'Valle Sagrado, Perú',
    message: "¡Hola! Vengo Desde la web y me interesa el viaje iniciático 'El Vuelo del Cóndor' en Perú. ✨",
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
    dates: '24, 25 y 26 de Julio',
    message: '¡Hola Fausto! Terminé de leer todo sobre el retiro de Gondorbows y no me lo quiero perder. Me comunico para coordinar la seña y asegurar mi lugar. 🌲✨',
  },
  cicloVitalFemenino: {
    priceSola: 400000,
    priceAcompanada: 300000,
    senia: 100000,
    segundoPago: 100000,
    segundoPagoFecha: '15 de Agosto',
    valorReferenciaARS: 900000,
    currency: 'ARS',
    dates: '28, 29 y 30 de Agosto',
    cupos: 21,
    fechaLimiteInscripcion: '24 de Agosto',
    message: '¡Hola! Vengo de la web y me interesa el retiro "Ciclo Vital Femenino - Capítulo Muerte-Invierno". Me gustaría reservar mi lugar. ✨',
  }
};

export const ESTADIA_PRICES = {
  base: 20000,           // alojamiento + desayuno
  pensionCompleta: 50000, // + almuerzo y cena
};

export const COLIVING_PRICES = {
  currency: 'ARS',
  precioPorNocheInvierno: 50000, // temporada de invierno — estadías cortas, a la carta
  formatos: [
    { noches: 10, precio: 350000, label: '10 noches', desc: 'Un proceso más profundo, ideal para integrar hábitos' },
    { noches: 20, precio: 420000, label: '20 noches', desc: 'Estadía extendida para instalar un ritmo y una rutina real de trabajo' },
  ],
  paseMensual: {
    precio: 480000,
    label: 'Pase Libre Mensual',
    desc: 'La opción más completa para vivir la experiencia en profundidad',
  },
  message: 'Hola! Vengo de la web y quiero sumarme a Coliving Mágico ✨',
};
