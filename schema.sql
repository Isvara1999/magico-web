-- Cloudflare D1 · Sistema de reservas — Pueblo Mágico
-- Aplicar con: npx wrangler d1 execute <DB_NAME> --file=./schema.sql [--remote]

PRAGMA foreign_keys = ON;

-- ─── alojamientos ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alojamientos (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre           TEXT NOT NULL,
  tipo             TEXT NOT NULL,
  capacidad_total  INTEGER NOT NULL CHECK (capacidad_total > 0)
);

INSERT INTO alojamientos (nombre, tipo, capacidad_total) VALUES
  ('Domo 1',        'domo',    7),
  ('Domo 2',        'domo',    7),
  ('Refugio',        'refugio', 15);

-- ─── reservas ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservas (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_nombre     TEXT NOT NULL,
  cliente_telefono   TEXT,
  cliente_email      TEXT,
  alojamiento_id     INTEGER NOT NULL REFERENCES alojamientos(id),
  fecha_checkin      TEXT NOT NULL,   -- ISO8601, ej. '2026-08-14T13:00:00Z'
  fecha_checkout     TEXT NOT NULL,   -- ISO8601
  cantidad_personas  INTEGER NOT NULL CHECK (cantidad_personas > 0),
  monto_total        REAL NOT NULL,
  monto_sena         REAL,
  estado             TEXT NOT NULL DEFAULT 'pendiente'
                        CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  mp_preference_id   TEXT,
  mp_payment_id      TEXT,
  created_at         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  manychat_user_id   TEXT,
  unidad_asignada    TEXT,   -- lugar físico concreto, ej. 'Domo 2' o 'Cama 3 Habitación 1' (Panel de Reservas)
  canal_origen       TEXT,   -- 'ManyChat', 'WhatsApp', 'Instagram', 'Airbnb', etc. — de dónde vino la reserva
  ical_uid           TEXT,   -- UID del VEVENT del calendario externo (Airbnb, etc.) — permite hacer upsert en cada sync sin duplicar
  tipo_estadia       TEXT NOT NULL DEFAULT 'huesped'
                        CHECK (tipo_estadia IN ('huesped', 'staff', 'voluntario', 'residente')),
                        -- huésped paga, staff/voluntario/residente no — ver add_tipo_estadia.sql
                        -- (en la DB real esta columna se agregó con ALTER TABLE, sin el CHECK:
                        -- ver ese archivo para el motivo)

  CHECK (fecha_checkout > fecha_checkin)
);

-- Índices para las consultas más frecuentes: disponibilidad por alojamiento/fecha,
-- lookup de webhooks de Mercado Pago y lookup desde ManyChat.
CREATE INDEX IF NOT EXISTS idx_reservas_alojamiento_fechas
  ON reservas (alojamiento_id, fecha_checkin, fecha_checkout);

CREATE INDEX IF NOT EXISTS idx_reservas_estado
  ON reservas (estado);

CREATE INDEX IF NOT EXISTS idx_reservas_mp_preference_id
  ON reservas (mp_preference_id);

CREATE INDEX IF NOT EXISTS idx_reservas_mp_payment_id
  ON reservas (mp_payment_id);

CREATE INDEX IF NOT EXISTS idx_reservas_manychat_user_id
  ON reservas (manychat_user_id);

CREATE INDEX IF NOT EXISTS idx_reservas_ical_uid
  ON reservas (ical_uid);

-- ─── usuarios_admin ─────────────────────────────────────────────────────────
-- Login del Panel de Reservas (/admin/reservas y /api/admin/*) — reemplaza el
-- One-Time PIN de Cloudflare Access. Ver migration_usuarios_admin.sql: esta
-- tabla se agregó después de crear la base original, así que en la DB real
-- se aplicó con ese archivo suelto, no reejecutando este schema.sql completo.
CREATE TABLE IF NOT EXISTS usuarios_admin (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  email              TEXT NOT NULL UNIQUE,
  password_hash      TEXT NOT NULL,
  rol                TEXT NOT NULL DEFAULT 'editor'
                        CHECK (rol IN ('super_admin', 'editor', 'viewer')),
  activo             INTEGER NOT NULL DEFAULT 1,
  intentos_fallidos  INTEGER NOT NULL DEFAULT 0,
  bloqueado_hasta    TEXT,   -- ISO8601; NULL = no bloqueado
  created_at         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_usuarios_admin_email ON usuarios_admin (email);

-- ─── auditoria_admin ────────────────────────────────────────────────────────
-- Quién hizo qué desde el Panel de Reservas — pestaña "Actividad" (solo
-- super_admin). email en texto plano (no FK) para que el registro sobreviva
-- aunque el usuario se desactive más adelante.
CREATE TABLE IF NOT EXISTS auditoria_admin (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT NOT NULL,
  accion      TEXT NOT NULL,
  detalle     TEXT,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_auditoria_admin_created_at ON auditoria_admin (created_at);

-- Tarifas, extras y feriados — única fuente de verdad de precios. Se agregó
-- después de crear la base original: en la DB real se aplicó con
-- add_tarifas.sql (ver ese archivo para el detalle de cada columna).

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
