// Script temporal — lee huespedes.csv, resuelve a qué alojamiento va cada
// reserva y genera insert_historico.sql para revisar a mano antes de correrlo
// contra D1. No inserta nada en la base directamente.
//
// Uso: node seed-csv.ts
// Después: revisar insert_historico.sql, y luego
//   npx wrangler d1 execute magico-ensueno-db --file=./insert_historico.sql --local
//   npx wrangler d1 execute magico-ensueno-db --file=./insert_historico.sql --remote
// Borrar seed-csv.ts y huespedes.csv cuando termines.

import { readFileSync, writeFileSync } from 'fs';

const CSV_PATH = './huespedes.csv';
const OUT_PATH = './insert_historico.sql';

// IDs fijos según el orden de inserción en schema.sql (Domo 1, Domo 2, Refugio).
const DOMO1_ID = 1;
const DOMO2_ID = 2;
const REFUGIO_ID = 3;

type Fila = {
  linea: number;
  nombre: string;
  desdeRaw: string;
  hastaRaw: string;
  nochesRaw: string;
  personasRaw: string;
  tipoRaw: string;
  abonadoRaw: string;
  cobrarRaw: string;
  telefonoRaw: string;
};

type Reserva = {
  linea: number;
  nombre: string;
  telefono: string | null;
  checkin: string;
  checkout: string;
  personas: number;
  montoTotal: number;
  montoSena: number | null;
  tipo: 'domo' | 'refugio';
};

const warnings: string[] = [];

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

function parseFecha(raw: string): string | null {
  const s = raw.trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

// Devuelve null si el campo está vacío, 0 si es "-" (no abonó nada),
// o el número si se pudo parsear. Texto no numérico (ej. "capaz cancela")
// también devuelve null, con warning aparte a cargo del llamador.
function parseMonto(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;
  if (s === '-') return 0;
  const cleaned = s.replace(/[$\s]/g, '').replace(/,/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function nochesEntre(checkin: string, checkout: string): number {
  return Math.round((Date.parse(checkout) - Date.parse(checkin)) / 86400000);
}

function sqlEscape(s: string): string {
  return s.replace(/'/g, "''");
}

// ─── 1. Leer y parsear el CSV ────────────────────────────────────────────────
const raw = readFileSync(CSV_PATH, 'utf-8');
const lineas = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
const filas: Fila[] = lineas.slice(1).map((linea, idx) => {
  const cols = parseCsvLine(linea);
  return {
    linea: idx + 2, // +2: nos saltamos el header y las líneas son 1-indexed
    nombre: (cols[0] || '').trim(),
    desdeRaw: (cols[1] || '').trim(),
    hastaRaw: (cols[2] || '').trim(),
    nochesRaw: (cols[3] || '').trim(),
    personasRaw: (cols[4] || '').trim(),
    tipoRaw: (cols[5] || '').trim(),
    abonadoRaw: (cols[6] || '').trim(),
    cobrarRaw: (cols[7] || '').trim(),
    // cols[8] = canal (WP/IG/Airbnb) — no existe columna en el schema, se ignora.
    telefonoRaw: (cols[9] || '').trim(),
    // cols[10] = feedback — no existe columna en el schema, se ignora.
  };
});

// ─── 2. Validar cada fila y armar la lista de reservas a insertar ───────────
const candidatas: Reserva[] = [];

for (const f of filas) {
  const contexto = `Fila ${f.linea} (${f.nombre || 'sin nombre'})`;

  if (!f.nombre) { warnings.push(`${contexto}: sin nombre, se omite.`); continue; }

  const checkin = parseFecha(f.desdeRaw);
  const checkout = parseFecha(f.hastaRaw);
  if (!checkin || !checkout) {
    warnings.push(`${contexto}: fecha inválida ("${f.desdeRaw}" / "${f.hastaRaw}"), se omite.`);
    continue;
  }
  if (checkout <= checkin) {
    warnings.push(`${contexto}: checkout (${checkout}) no es posterior al checkin (${checkin}) — parece error de tipeo en el Excel. Se omite, corregilo en el CSV y volvé a correr el script.`);
    continue;
  }

  const personas = Number(f.personasRaw);
  if (!Number.isInteger(personas) || personas < 1) {
    warnings.push(`${contexto}: cantidad de personas inválida ("${f.personasRaw}"), se omite.`);
    continue;
  }

  const tipoNorm = f.tipoRaw.toLowerCase();
  let tipo: 'domo' | 'refugio' | null = null;
  if (tipoNorm.includes('domo')) tipo = 'domo';
  else if (tipoNorm.includes('refugio')) tipo = 'refugio';
  if (!tipo) {
    warnings.push(`${contexto}: no se pudo determinar domo/refugio a partir de "${f.tipoRaw}", se omite.`);
    continue;
  }

  const montoTotal = parseMonto(f.cobrarRaw);
  if (montoTotal === null) {
    warnings.push(`${contexto}: "Monto a cobrar" vacío o inválido ("${f.cobrarRaw}"), se omite (monto_total es obligatorio).`);
    continue;
  }

  let montoSena = parseMonto(f.abonadoRaw);
  if (montoSena === null && f.abonadoRaw && f.abonadoRaw !== '-') {
    warnings.push(`${contexto}: "Monto abonado" no es un número ("${f.abonadoRaw}"), se guarda la seña como NULL.`);
  }

  const nochesDeclaradas = Number(f.nochesRaw);
  const nochesCalculadas = nochesEntre(checkin, checkout);
  if (f.nochesRaw && Number.isFinite(nochesDeclaradas) && nochesDeclaradas !== nochesCalculadas) {
    warnings.push(`${contexto}: "Noches" dice ${nochesDeclaradas} pero las fechas dan ${nochesCalculadas} — revisar.`);
  }

  candidatas.push({
    linea: f.linea,
    nombre: f.nombre,
    telefono: f.telefonoRaw || null,
    checkin,
    checkout,
    personas,
    montoTotal,
    montoSena,
    tipo,
  });
}

// ─── 3. Asignar Domo 1 / Domo 2 por orden cronológico, evitando solapamiento ─
type Rango = { checkin: string; checkout: string };
const ocupacionDomo1: Rango[] = [];
const ocupacionDomo2: Rango[] = [];

function seSolapan(a: Rango, b: Rango): boolean {
  return a.checkin < b.checkout && b.checkin < a.checkout;
}

function asignarDomo(rango: Rango, contexto: string): number {
  if (!ocupacionDomo1.some(r => seSolapan(r, rango))) {
    ocupacionDomo1.push(rango);
    return DOMO1_ID;
  }
  if (!ocupacionDomo2.some(r => seSolapan(r, rango))) {
    ocupacionDomo2.push(rango);
    return DOMO2_ID;
  }
  // Los dos domos ya están ocupados esas fechas — conflicto real de la
  // planilla (¿doble reserva? ¿grupo compartiendo?). Lo mandamos a Domo 2
  // igual para no perder el registro, pero queda flageado para revisión manual.
  warnings.push(`${contexto}: Domo 1 y Domo 2 ya estaban ocupados para ${rango.checkin}→${rango.checkout} — CONFLICTO, revisar manualmente qué domo fue realmente.`);
  ocupacionDomo2.push(rango);
  return DOMO2_ID;
}

// Orden cronológico por checkin — la asignación de domos depende del orden
// en que se van "ocupando", así que tiene que ser consistente con la realidad.
candidatas.sort((a, b) => (a.checkin < b.checkin ? -1 : a.checkin > b.checkin ? 1 : 0));

const filasSql: string[] = [];
let insertadas = 0;

for (const r of candidatas) {
  const contexto = `Fila ${r.linea} (${r.nombre})`;
  const alojamientoId =
    r.tipo === 'refugio' ? REFUGIO_ID : asignarDomo({ checkin: r.checkin, checkout: r.checkout }, contexto);

  const telefonoSql = r.telefono ? `'${sqlEscape(r.telefono)}'` : 'NULL';
  const senaSql = r.montoSena === null ? 'NULL' : r.montoSena;

  filasSql.push(
    `INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ` +
      `('${sqlEscape(r.nombre)}', ${telefonoSql}, ${alojamientoId}, '${r.checkin}', '${r.checkout}', ${r.personas}, ${r.montoTotal}, ${senaSql}, 'confirmada');`
  );
  insertadas++;
}

// ─── 4. Escribir el .sql para revisión ───────────────────────────────────────
const encabezado = [
  '-- Generado por seed-csv.ts a partir de huespedes.csv',
  `-- ${insertadas} reservas listas para insertar, ${filas.length - insertadas} filas omitidas (ver warnings abajo).`,
  '-- REVISAR ANTES DE EJECUTAR. Advertencias:',
  ...warnings.map(w => `--   ${w}`),
  '',
].join('\n');

writeFileSync(OUT_PATH, encabezado + filasSql.join('\n') + '\n');

console.log(`\n${insertadas} de ${filas.length} filas convertidas a INSERT en ${OUT_PATH}.`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} advertencias:`);
  warnings.forEach(w => console.log(' -', w));
} else {
  console.log('Sin advertencias.');
}
