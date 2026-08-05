// Script temporal — recupera el canal (WP/IG/Airbnb) de huespedes.csv para las
// reservas históricas ya insertadas, y genera update_canal.sql para revisar.
// Empareja por (cliente_nombre, fecha_checkin) — no toca la base directamente.
//
// Uso: node backfill-canal.ts
// Después: revisar update_canal.sql y correr
//   npx wrangler d1 execute magico-ensueno-db --file=./update_canal.sql --local
//   npx wrangler d1 execute magico-ensueno-db --file=./update_canal.sql --remote

import { readFileSync, writeFileSync } from 'fs';

const CSV_PATH = './huespedes.csv';
const OUT_PATH = './update_canal.sql';

const CANAL_MAP: Record<string, string> = {
  WP: 'WhatsApp',
  IG: 'Instagram',
  AIRBNB: 'Airbnb',
};

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQuotes = false; }
      else cur += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { result.push(cur); cur = ''; }
    else cur += c;
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

function sqlEscape(s: string): string {
  return s.replace(/'/g, "''");
}

const raw = readFileSync(CSV_PATH, 'utf-8');
const lineas = raw.split(/\r?\n/).filter(l => l.trim().length > 0).slice(1);

const filasSql: string[] = [];
const sinCanal: string[] = [];

for (const linea of lineas) {
  const cols = parseCsvLine(linea);
  const nombre = (cols[0] || '').trim();
  const checkin = parseFecha((cols[1] || '').trim());
  const canalRaw = (cols[8] || '').trim().toUpperCase();

  if (!nombre || !checkin) continue;

  const canal = CANAL_MAP[canalRaw];
  if (!canal) { sinCanal.push(`${nombre} (${checkin}): canal "${canalRaw}" no reconocido`); continue; }

  filasSql.push(
    `UPDATE reservas SET canal_origen = '${canal}' WHERE cliente_nombre = '${sqlEscape(nombre)}' AND fecha_checkin = '${checkin}' AND canal_origen IS NULL;`
  );
}

const lineasEncabezado = [
  '-- Generado por backfill-canal.ts a partir de huespedes.csv',
  `-- ${filasSql.length} UPDATEs generados.`,
];
if (sinCanal.length) {
  lineasEncabezado.push(`-- ${sinCanal.length} filas sin canal reconocible:`);
  lineasEncabezado.push(...sinCanal.map(w => `--   ${w}`));
}
const encabezado = lineasEncabezado.join('\n') + '\n\n';

writeFileSync(OUT_PATH, encabezado + filasSql.join('\n') + '\n');
console.log(`${filasSql.length} UPDATEs escritos en ${OUT_PATH}.`);
if (sinCanal.length) {
  console.log(`${sinCanal.length} sin canal reconocible:`);
  sinCanal.forEach(w => console.log(' -', w));
}
