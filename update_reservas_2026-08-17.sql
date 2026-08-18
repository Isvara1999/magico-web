-- Correcciones a reservas YA cargadas, según "Huespedes - NUEVOS.csv" del
-- 17/08/2026 (tomado como la versión más actual/correcta, confirmado por el
-- dueño) y confirmaciones directas suyas. Aplicar ANTES de
-- insert_nuevas_reservas_2026-08-17.sql — ese archivo asume que estas
-- correcciones ya se aplicaron (en particular, que Judith Hid libera Domo 1
-- el 05/09 para la 2ª estadía de Lucas Ratti).
--
-- Aplicar con:
--   npx wrangler d1 execute magico-ensueno-db --file=./update_reservas_2026-08-17.sql [--remote]
--
-- Los WHERE incluyen la fecha vieja para que sea seguro correr esto dos
-- veces por error: si ya se aplicó, no van a matchear y no hacen nada.

-- od.cecisocias: la hoja nueva mueve el checkin un día (15/08 -> 16/08),
-- mismo checkout y mismo monto — parece una corrección de fecha, no una
-- estadía nueva.
UPDATE reservas SET fecha_checkin = '2026-08-16'
WHERE cliente_nombre = 'od.cecisocias' AND fecha_checkin = '2026-08-15' AND fecha_checkout = '2026-08-17';

-- albornozdaniella: la hoja nueva cambia fechas Y monto (02/09->04/09 en vez
-- de 04/09->05/09, $210.000/$60.000 en vez de $140.000/sin seña) — se toma
-- como actualización de la reserva existente, no una reserva nueva.
UPDATE reservas SET fecha_checkin = '2026-09-02', fecha_checkout = '2026-09-04', monto_total = 210000, monto_sena = 60000
WHERE cliente_nombre = 'albornozdaniella' AND fecha_checkin = '2026-09-04';

-- Judith Hid: confirmaste que en realidad viene del 19/09 al 20/09 (la hoja
-- vieja tenía 05/09 al 06/09, error de carga). PERO ese 19/09->20/09 ya
-- tiene a Lucia Saavedra en Domo 1 — para no duplicar el domo, la paso a
-- Domo 2 (libre esa noche).
UPDATE reservas SET fecha_checkin = '2026-09-19', fecha_checkout = '2026-09-20', alojamiento_id = 2
WHERE cliente_nombre = 'Judith Hid' AND fecha_checkin = '2026-09-05';
