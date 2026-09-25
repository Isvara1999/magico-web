// Cálculo de precios de estadía — compartido entre la web (BookingWidget) y
// las Pages Functions (functions/_lib/cotizador.ts). Acá NO hay montos: los
// precios llegan siempre desde las tablas `tarifas` y `extras` de D1 (ver
// add_tarifas.sql). Así la web, /api/cotizar (agente de Instagram) y
// /api/manychat cotizan exactamente igual.

export type TipoAlojamiento = 'domo' | 'refugio' | 'camping';
export type Comidas = 'desayuno' | 'almuerzo' | 'cena' | 'pension_completa';

export const TIPOS_ALOJAMIENTO: TipoAlojamiento[] = ['domo', 'refugio', 'camping'];
export const OPCIONES_COMIDAS: Comidas[] = ['desayuno', 'almuerzo', 'cena', 'pension_completa'];

export type Tarifa = {
  tipo: TipoAlojamiento;
  nombre: string;
  precio_noche: number;
  precio_pension_completa: number;
  precio_noche_finde: number | null;
  precio_pension_completa_finde: number | null;
  minimo_personas_facturadas: number;
};

// codigo → precio por persona por noche (almuerzo, cena, reset_presencial)
export type Extras = Record<string, number>;

export type Precios = {
  tarifas: Tarifa[];
  extras: Extras;
  feriados: string[];
};

export type NocheCotizada = {
  fecha: string;
  finde: boolean;
  alojamiento: number;
  comidas: number;
  reset: number;
  total: number;
};

export type Cotizacion = {
  tipo_alojamiento: TipoAlojamiento;
  cantidad_personas: number;
  personas_facturadas: number;
  comidas: Comidas;
  reset_presencial: boolean;
  noches: number;
  detalle_noches: NocheCotizada[];
  alojamiento: number;
  comidas_total: number;
  reset_total: number;
  subtotal: number;
};

function sumarDias(iso: string, dias: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + dias * 86_400_000).toISOString().slice(0, 10);
}

// Una noche se cobra como "finde" si la mañana siguiente es sábado, domingo
// o feriado: viernes y sábado a la noche, más la víspera de cada feriado.
export function esNocheDeFinde(fecha: string, feriados: string[]): boolean {
  const manana = sumarDias(fecha, 1);
  const dia = new Date(`${manana}T00:00:00Z`).getUTCDay();
  return dia === 6 || dia === 0 || feriados.includes(manana);
}

export function calcularCotizacion(
  precios: Precios,
  tipo: TipoAlojamiento,
  personas: number,
  entrada: string,
  salida: string,
  comidas: Comidas = 'desayuno',
  resetPresencial = false
): Cotizacion | { error: string } {
  const tarifa = precios.tarifas.find(t => t.tipo === tipo);
  if (!tarifa) return { error: `No hay tarifa cargada para '${tipo}'.` };
  if (!Number.isInteger(personas) || personas < 1) return { error: 'cantidad_personas debe ser un entero positivo.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entrada) || !/^\d{4}-\d{2}-\d{2}$/.test(salida) || salida <= entrada) {
    return { error: 'Fechas inválidas: usar YYYY-MM-DD y fecha_salida posterior a fecha_entrada.' };
  }

  const extraComida = comidas === 'almuerzo' || comidas === 'cena' ? precios.extras[comidas] : 0;
  if (extraComida === undefined) return { error: `No hay precio cargado para '${comidas}'.` };
  const extraReset = resetPresencial ? precios.extras.reset_presencial : 0;
  if (extraReset === undefined) return { error: "No hay precio cargado para 'reset_presencial'." };

  const facturadas = Math.max(personas, tarifa.minimo_personas_facturadas);
  const detalle: NocheCotizada[] = [];

  for (let fecha = entrada; fecha < salida; fecha = sumarDias(fecha, 1)) {
    const finde = esNocheDeFinde(fecha, precios.feriados);
    const noche = finde ? tarifa.precio_noche_finde ?? tarifa.precio_noche : tarifa.precio_noche;
    // Sin pensión completa de finde cargada, las comidas valen lo mismo que en
    // semana (se suman a la noche de finde, no se restan de ella).
    const pensionSoloComidas = finde && tarifa.precio_pension_completa_finde !== null
      ? tarifa.precio_pension_completa_finde - noche
      : tarifa.precio_pension_completa - tarifa.precio_noche;
    const comidaPorPersona = comidas === 'pension_completa' ? pensionSoloComidas : extraComida;

    const alojamiento = noche * facturadas;
    const comidasNoche = comidaPorPersona * personas;
    const reset = extraReset * personas;
    detalle.push({ fecha, finde, alojamiento, comidas: comidasNoche, reset, total: alojamiento + comidasNoche + reset });
  }

  const sumar = (k: 'alojamiento' | 'comidas' | 'reset') => detalle.reduce((s, n) => s + n[k], 0);
  const alojamiento = sumar('alojamiento');
  const comidasTotal = sumar('comidas');
  const resetTotal = sumar('reset');

  return {
    tipo_alojamiento: tipo,
    cantidad_personas: personas,
    personas_facturadas: facturadas,
    comidas,
    reset_presencial: resetPresencial,
    noches: detalle.length,
    detalle_noches: detalle,
    alojamiento,
    comidas_total: comidasTotal,
    reset_total: resetTotal,
    subtotal: alojamiento + comidasTotal + resetTotal,
  };
}

// Seña para congelar la tarifa: 50% si el total es ≤ $100.000, 30% si es mayor.
// Es una regla comercial, no un precio — por eso vive en código y no en D1.
export function calcularSena(subtotal: number): { porcentaje: number; monto: number; saldo: number } {
  const porcentaje = subtotal <= 100_000 ? 0.5 : 0.3;
  const monto = Math.round(subtotal * porcentaje);
  return { porcentaje, monto, saldo: subtotal - monto };
}
