// prebuild — baja los precios vigentes de D1 (vía /api/disponibilidad de
// producción) y los guarda en src/data/precios-build.json, que usan las
// páginas prerenderizadas (Estadía, Home) para mostrar "Desde $X" en el HTML
// estático — Google los ve y siguen saliendo de la base.
//
// Un cambio de precio en D1 llega al instante al widget, a /api/cotizar y al
// agente; a estos textos estáticos, recién en el próximo build/deploy.
//
// Si la API falla (sin red, o producción todavía sin la tabla `tarifas`), se
// mantiene el último precios-build.json commiteado y el build sigue. Solo
// falla si no hay ningún archivo previo.
//
// Uso: se corre solo con `npm run build` (script "prebuild").
// PRECIOS_API_URL=http://localhost:8788 node scripts/fetch-precios.mjs → contra otro entorno.

import { existsSync, readFileSync, writeFileSync } from 'fs';

const OUT = new URL('../src/data/precios-build.json', import.meta.url);
const BASE = process.env.PRECIOS_API_URL || 'https://experienciamagico.com';
const TIPOS = ['domo', 'refugio', 'camping'];
const EXTRAS = ['almuerzo', 'cena', 'reset_presencial'];

function validar(precios) {
  if (!precios || !Array.isArray(precios.tarifas)) throw new Error('la respuesta no trae precios.tarifas');
  for (const tipo of TIPOS) {
    const t = precios.tarifas.find(x => x.tipo === tipo);
    if (!t || !(t.precio_noche > 0) || !(t.precio_pension_completa > 0)) throw new Error(`falta la tarifa de '${tipo}'`);
  }
  for (const codigo of EXTRAS) {
    if (!(precios.extras?.[codigo] >= 0)) throw new Error(`falta el extra '${codigo}'`);
  }
  return precios;
}

const hoy = new Date().toISOString().slice(0, 10);
const manana = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);

try {
  const res = await fetch(`${BASE}/api/disponibilidad?desde=${hoy}&hasta=${manana}`, { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const precios = validar((await res.json()).precios);

  const nuevo = JSON.stringify({ tarifas: precios.tarifas, extras: precios.extras, feriados: precios.feriados || [] }, null, 2) + '\n';
  const anterior = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  writeFileSync(OUT, nuevo);
  console.log(`fetch-precios: precios de ${BASE} ${nuevo === anterior ? '(sin cambios)' : '(ACTUALIZADOS)'}`);
} catch (err) {
  if (!existsSync(OUT)) {
    console.error(`fetch-precios: no se pudieron obtener precios de ${BASE} (${err.message}) y no hay precios-build.json previo.`);
    process.exit(1);
  }
  validar(JSON.parse(readFileSync(OUT, 'utf8')));
  console.warn(`fetch-precios: ⚠️ no se pudieron obtener precios de ${BASE} (${err.message}) — se usa el precios-build.json commiteado.`);
}
