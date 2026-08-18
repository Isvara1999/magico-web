-- Cloudflare D1 · Tabla "consultas" — Pueblo Mágico
-- Aplicar con: npx wrangler d1 execute magico-ensueno-db --file=./add_consultas.sql [--remote]
--
-- Gente que llegó al último estadio del flujo de ManyChat (fecha, alojamiento,
-- monto ya cotizado) pero nunca completó el pago — no llegan a ser una fila en
-- `reservas` (esa tabla exige monto_total, fechas y un alojamiento_id válido;
-- forzar leads sin pagar ahí ensuciaría el Panel de Reservas y las métricas de
-- ocupación). Tabla separada y liviana, sin FK a alojamientos, para no perder
-- el registro de la consulta y poder reengancharlos por WhatsApp.

CREATE TABLE IF NOT EXISTS consultas (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_nombre       TEXT NOT NULL,
  cliente_telefono     TEXT,
  alojamiento_interes  TEXT,   -- texto libre: 'Domo privado', 'Ecorefugio', 'Pachamama Fest', etc.
  fecha_desde          TEXT,
  fecha_hasta          TEXT,
  cantidad_personas    INTEGER,
  monto_estimado       REAL,
  subscriber_id        TEXT,   -- ManyChat SubscriberID
  fecha_consulta       TEXT NOT NULL,   -- cuándo llegó al último estadio del flujo, ISO8601
  created_at           TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_consultas_fecha_consulta ON consultas (fecha_consulta);
CREATE INDEX IF NOT EXISTS idx_consultas_subscriber_id ON consultas (subscriber_id);
