-- Generado a partir de "Huespedes - NUEVOS.csv" y "Huespedes - ANTIGUOS.csv"
-- (export del 17/08/2026), cruzado con lo ya cargado en `reservas` desde
-- insert_historico.sql (05/08/2026) y con las aclaraciones del dueño sobre
-- los casos ambiguos (ver chat). REVISAR ANTES DE EJECUTAR.
--
-- Aplicar con:
--   npx wrangler d1 execute magico-ensueno-db --file=./insert_nuevas_reservas_2026-08-17.sql [--remote]
-- DESPUÉS de update_reservas_2026-08-17.sql (ese corrige registros
-- existentes; este solo agrega filas nuevas, no debería importar el orden
-- pero mantiene la asignación de domos consistente con lo documentado ahí).
--
-- alojamiento_id: 1 = Domo 1, 2 = Domo 2, 3 = Refugio (Ecorefugio).

-- 8 huéspedes nuevos, sin ambigüedad, montos completos:
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Gonzalo Fessia', '3512 37-7368', 3, '2026-08-15', '2026-08-17', 2, 130000, 60000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Fabian Barbieria', '11 4412-1904', 3, '2026-08-15', '2026-08-16', 1, 100000, 30000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Marcos Iacono', '3512 67-7686', 3, '2026-08-15', '2026-08-17', 1, 190000, 57000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Gabriel Kummer', '3512 39-1154', 3, '2026-08-15', '2026-08-17', 1, 190000, 57000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Alberto Casas', NULL, 3, '2026-08-16', '2026-08-17', 3, 105000, 45000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Gloria Cuello', '3512131606', 3, '2026-08-22', '2026-08-23', 3, 105000, 45000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Lorena Grisanti', '3584372300', 2, '2026-09-22', '2026-09-23', 2, 140000, 60000, 'confirmada');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Carolina Carmona', '3513882322', 1, '2026-09-29', '2026-09-30', 2, 70000, 30000, 'confirmada');

-- dayromero93: confirmaste que el total real es $105.000 (la hoja decía "$105" por error).
-- Domo 2 porque Domo 1 ya tiene a magda_7283 el 21/08 (solapa).
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('dayromero93', '3516304445', 2, '2026-08-21', '2026-08-23', 2, 105000, 45000, 'confirmada');

-- Lucas Ratti, 2ª estadía: confirmaste que va "en el otro domo" (no el de
-- Antonio Amuschategui). Con la corrección de Judith Hid (ver archivo de
-- updates) Domo 1 queda libre esa noche, así que va ahí.
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Lucas Ratti', '3515 92-8761', 1, '2026-09-05', '2026-09-06', 2, 100000, 30000, 'confirmada');

-- Alcides Garetto: confirmaste que es UNA sola estadía continua, no 3 leads
-- distintos — llega el 18/08, 2 noches en Ecorefugio + 1 noche en Domo, seña
-- $90.000 ya paga. El total a cobrar todavía no lo diste — queda en 0 como
-- placeholder ("a cobrar"), actualizalo en el panel cuando lo sepas. La seña
-- se carga solo en el primer tramo para no contarla dos veces.
-- (Nota: por esto mismo, ya saqué a Alcides de insert_consultas.sql — dejarlo
-- ahí como "lead sin convertir" además de acá como reserva real sería
-- inconsistente.)
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado, canal_origen) VALUES ('Alcides Garetto', '3536 56-3849', 3, '2026-08-18', '2026-08-20', 1, 0, 90000, 'confirmada', 'ManyChat');
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado, canal_origen) VALUES ('Alcides Garetto', '3536 56-3849', 2, '2026-08-20', '2026-08-21', 1, 0, NULL, 'confirmada', 'ManyChat');

-- Romina Vergara: confirmaste que se cobra por Airbnb, no por acá — se
-- carga igual para bloquear el domo en la grilla, monto_total en 0 como
-- placeholder ("a cobrar" vía Airbnb). Domo 2 porque Domo 1 tiene a
-- Santiago Spika el 01/08 (solapa).
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado, canal_origen) VALUES ('Romina Vergara', NULL, 2, '2026-07-31', '2026-08-03', 2, 0, NULL, 'confirmada', 'Airbnb');

-- Formación Diego: confirmaste 18 personas, sin precio todavía ("a cobrar").
-- Ojo: Refugio tiene capacidad_total=15 en `alojamientos` — 18 personas la
-- supera. El sistema no bloquea por capacidad (igual que no bloquea
-- solapamiento), pero convendría revisarlo antes de confirmar el alquiler.
INSERT INTO reservas (cliente_nombre, cliente_telefono, alojamiento_id, fecha_checkin, fecha_checkout, cantidad_personas, monto_total, monto_sena, estado) VALUES ('Formación Diego', NULL, 3, '2026-09-19', '2026-09-20', 18, 0, NULL, 'confirmada');
