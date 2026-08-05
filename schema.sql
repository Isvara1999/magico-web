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
