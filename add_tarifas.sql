-- Cloudflare D1 · Tarifas, extras y feriados — Pueblo Mágico
-- Aplicar con: npx wrangler d1 execute magico-ensueno-db --file=./add_tarifas.sql [--remote]
-- Aditivo (CREATE TABLE IF NOT EXISTS) — no toca reservas ni alojamientos.
--
-- ÚNICA fuente de verdad de precios: la web (BookingWidget vía
-- /api/disponibilidad), /api/cotizar (agente de Instagram) y /api/manychat
-- leen de acá. El cálculo vive en src/lib/tarifas.ts.
--
-- Valores iniciales: "Propuesta Comercial Temporada 2026/27" (tarifas base
-- lunes a viernes, sección 3). Las tarifas de fin de semana/feriado todavía no
-- están definidas: quedan en NULL = misma tarifa que en semana.
--
-- Por tipo y no por alojamiento: Domo 1 y Domo 2 comparten precio, y Camping
-- no es una unidad física de `alojamientos` (no tiene capacidad cargada ni
-- debe aparecer en la grilla/ocupación del Panel de Reservas).

-- ─── tarifas ────────────────────────────────────────────────────────────────
-- Todos los montos son por persona por noche.
--   precio_noche             → alojamiento + desayuno
--   precio_pension_completa  → total con desayuno + almuerzo + cena
--   *_finde                  → noches cuya mañana siguiente es sábado, domingo
--                              o feriado. NULL = igual que en semana (en
--                              pensión completa: noche de finde + las mismas
--                              comidas que en semana).
--   minimo_personas_facturadas → el alojamiento se cobra como mínimo por esta
--                              cantidad de personas (Domo: 2 — una persona sola
--                              paga el domo como si fueran dos). Las comidas se
--                              cobran siempre por las personas reales.
CREATE TABLE IF NOT EXISTS tarifas (
  tipo                           TEXT PRIMARY KEY CHECK (tipo IN ('domo', 'refugio', 'camping')),
  nombre                         TEXT NOT NULL,
  precio_noche                   REAL NOT NULL CHECK (precio_noche > 0),
  precio_pension_completa        REAL NOT NULL CHECK (precio_pension_completa >= precio_noche),
  precio_noche_finde             REAL,
  precio_pension_completa_finde  REAL,
  minimo_personas_facturadas     INTEGER NOT NULL DEFAULT 1 CHECK (minimo_personas_facturadas >= 1),
  updated_at                     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

INSERT OR IGNORE INTO tarifas (tipo, nombre, precio_noche, precio_pension_completa, minimo_personas_facturadas) VALUES
  ('camping', 'Carpa / Camping',  20000, 45000, 1),
  ('refugio', 'Eco-Refugio',      35000, 60000, 1),
  ('domo',    'Domo privado',     50000, 75000, 2);

-- ─── extras ─────────────────────────────────────────────────────────────────
-- Adicionales por persona por noche de estadía. Los códigos los usa el
-- cotizador: no renombrarlos sin actualizar src/lib/tarifas.ts.
CREATE TABLE IF NOT EXISTS extras (
  codigo      TEXT PRIMARY KEY,
  nombre      TEXT NOT NULL,
  precio      REAL NOT NULL CHECK (precio >= 0),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

INSERT OR IGNORE INTO extras (codigo, nombre, precio) VALUES
  ('almuerzo',         'Almuerzo',                                    20000),
  ('cena',             'Cena',                                        20000),
  ('reset_presencial', 'Reset Vital presencial (2 actividades/día)',   5000);

-- ─── feriados ───────────────────────────────────────────────────────────────
-- La noche anterior a un feriado se cobra con tarifa de fin de semana.
-- Se cargan a medida que se definan (vacía por ahora).
CREATE TABLE IF NOT EXISTS feriados (
  fecha        TEXT PRIMARY KEY,   -- 'YYYY-MM-DD'
  descripcion  TEXT
);
