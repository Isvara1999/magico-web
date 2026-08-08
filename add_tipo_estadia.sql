-- Cloudflare D1 · Agrega tipo_estadia a reservas — Pueblo Mágico
-- Aplicar con: npx wrangler d1 execute magico-ensueno-db --file=./add_tipo_estadia.sql [--remote]
--
-- Distingue huéspedes (pagan) de staff/voluntario/residente (no pagan), para
-- que contabilidad pueda cruzar volumen de gente alojada/alimentada contra
-- gastos reales. Default 'huesped' para las reservas históricas: antes de
-- este campo, todo lo cargado en esta tabla era efectivamente una reserva de
-- huésped pago — no había estadías de staff registradas acá.
--
-- SQLite no permite agregar una columna con CHECK vía ALTER TABLE de forma
-- segura en todas las versiones — la validación de valores válidos
-- ('huesped'|'staff'|'voluntario'|'residente') se hace en código
-- (functions/api/admin/crear.ts), no acá.

ALTER TABLE reservas ADD COLUMN tipo_estadia TEXT NOT NULL DEFAULT 'huesped';
