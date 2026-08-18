-- Generado a partir de "Huespedes - CONSULTAS.csv" (exportado de la hoja de
-- cálculo). 6 consultas — leads que llegaron al último estadio del flujo de
-- ManyChat (fecha, alojamiento y monto ya cotizados) pero no pagaron.
-- Aplicar DESPUÉS de add_consultas.sql:
--   npx wrangler d1 execute magico-ensueno-db --file=./insert_consultas.sql [--remote]
--
-- Nota: "Alcides Osvaldo Garetto" estaba en el CSV original de consultas,
-- pero el dueño confirmó que ya cerró y pagó seña — es una reserva real
-- (ver insert_nuevas_reservas_2026-08-17.sql), así que se sacó de acá para
-- no dejarlo duplicado como lead sin convertir.

INSERT INTO consultas (cliente_nombre, cliente_telefono, alojamiento_interes, fecha_desde, fecha_hasta, cantidad_personas, monto_estimado, subscriber_id, fecha_consulta) VALUES
  ('Fernando Suárez', '3517422759', 'Domo privado', '2026-09-03', '2026-09-04', 2, 100000, '473843790', '2026-08-10T23:56:00'),
  ('Carlos Monserrat', '3436338812', 'Pachamama Fest', '2026-08-15', '2026-08-18', 2, 500000, '942173911', '2026-08-11T08:03:00'),
  ('Paz Tettamanti', '3512357154', 'Domo privado', '2026-08-19', '2026-08-21', 2, 200000, '895640142', '2026-08-11T14:18:00'),
  ('Verónica Oyola', '2915328851', 'Ecorefugio', '2026-10-03', '2026-10-08', 1, 250000, '1362355773', '2026-08-11T11:39:00'),
  ('Enzo Lopez', '3543517950', 'Domo privado', '2026-08-19', '2026-08-20', 2, 100000, '988416659', '2026-08-11T13:17:00'),
  ('Lucas Amiconi', '5492216075969', 'Ecorefugio', '2026-11-20', '2026-11-23', 20, 3000000, '2026445288', '2026-08-13T15:03:00');
