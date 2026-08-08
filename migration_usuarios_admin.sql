-- Cloudflare D1 · Usuarios del Panel de Reservas (login propio, reemplaza el
-- One-Time PIN de Cloudflare Access) — Pueblo Mágico
-- Aplicar con: npx wrangler d1 execute magico-ensueno-db --file=./migration_usuarios_admin.sql [--remote]
-- Aditivo (CREATE TABLE IF NOT EXISTS) — no toca reservas ni alojamientos.

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
