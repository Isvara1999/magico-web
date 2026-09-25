// Precios para textos estáticos (páginas prerenderizadas): "Desde $X", tarjetas
// de precio, meta descriptions. NO editar montos acá — salen de D1:
// scripts/fetch-precios.mjs los baja en cada build a precios-build.json.
// Para cotizar una estadía concreta usar src/lib/tarifas.ts (lo hace el widget).

import preciosBuild from './precios-build.json';
import type { Precios, TipoAlojamiento } from '../lib/tarifas';

export const PRECIOS_BUILD = preciosBuild as Precios;

function tarifa(tipo: TipoAlojamiento) {
  const t = PRECIOS_BUILD.tarifas.find(x => x.tipo === tipo);
  if (!t) throw new Error(`precios-build.json no tiene la tarifa '${tipo}'`);
  return t;
}

// "Desde": la noche más barata (semana o finde), alojamiento + desayuno, por persona.
export function precioDesde(tipo: TipoAlojamiento): number {
  const t = tarifa(tipo);
  return Math.min(t.precio_noche, t.precio_noche_finde ?? t.precio_noche);
}

// Pensión completa "desde", total por persona/noche.
export function pensionCompletaDesde(tipo: TipoAlojamiento): number {
  const t = tarifa(tipo);
  return Math.min(t.precio_pension_completa, t.precio_pension_completa_finde ?? t.precio_pension_completa);
}

export function minimoPersonas(tipo: TipoAlojamiento): number {
  return tarifa(tipo).minimo_personas_facturadas;
}

export function precioExtra(codigo: 'almuerzo' | 'cena' | 'reset_presencial'): number {
  return PRECIOS_BUILD.extras[codigo];
}

// El precio de entrada a Pueblo Mágico: el alojamiento más barato.
export function precioEntrada(): number {
  return Math.min(...PRECIOS_BUILD.tarifas.map(t => precioDesde(t.tipo)));
}

// "$20.000" (es) / "$20,000" (en)
export function ars(monto: number, lang: 'es' | 'en' = 'es'): string {
  return `$${monto.toLocaleString(lang === 'en' ? 'en-US' : 'es-AR')}`;
}
