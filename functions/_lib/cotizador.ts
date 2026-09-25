// Lógica compartida de cotización y disponibilidad — usada por
// functions/api/cotizar.ts, functions/api/manychat.ts y
// functions/api/disponibilidad.ts. El prefijo "_" hace que Cloudflare Pages
// ignore esta carpeta como ruta (no es un endpoint).
//
// Los precios NO están acá: se leen de las tablas `tarifas`, `extras` y
// `feriados` de D1 (ver add_tarifas.sql) y se calculan con src/lib/tarifas.ts,
// el mismo código que usa el widget de la web.

import type { Precios, Tarifa, TipoAlojamiento } from '../../src/lib/tarifas';

export type Disponibilidad = {
  estado: 'disponible' | 'ocupado';
  // Alojamiento concreto a reservar si estado === 'disponible' (domo específico,
  // o el único registro del Refugio). null si no hay lugar, o para Camping
  // (sin unidades cargadas en `alojamientos`).
  alojamiento_id: number | null;
};

export async function leerPrecios(db: any): Promise<Precios> {
  const [tarifas, extras, feriados] = await Promise.all([
    db.prepare(
      `SELECT tipo, nombre, precio_noche, precio_pension_completa, precio_noche_finde,
              precio_pension_completa_finde, minimo_personas_facturadas
       FROM tarifas`
    ).all(),
    db.prepare(`SELECT codigo, precio FROM extras`).all(),
    db.prepare(`SELECT fecha FROM feriados ORDER BY fecha ASC`).all(),
  ]);

  return {
    tarifas: (tarifas.results || []).map((t: any): Tarifa => ({
      tipo: t.tipo,
      nombre: t.nombre,
      precio_noche: Number(t.precio_noche),
      precio_pension_completa: Number(t.precio_pension_completa),
      precio_noche_finde: t.precio_noche_finde === null ? null : Number(t.precio_noche_finde),
      precio_pension_completa_finde: t.precio_pension_completa_finde === null ? null : Number(t.precio_pension_completa_finde),
      minimo_personas_facturadas: Number(t.minimo_personas_facturadas),
    })),
    extras: Object.fromEntries((extras.results || []).map((e: any) => [e.codigo, Number(e.precio)])),
    feriados: (feriados.results || []).map((f: any) => String(f.fecha)),
  };
}

const MENSAJE_PRIVACIDAD_REFUGIO =
  'Por la cantidad que son, podríamos ubicarlos en una habitación privada dentro del refugio sin cargo extra (sujeto a disponibilidad al momento de asignar camas).';

// El Refugio tiene 4 habitaciones (una de 3 camas, tres de 4 camas) dentro de
// las 15 camas totales. Grupos de exactamente 3 o 4 personas entran justo en
// una habitación propia — se lo avisamos, pero es un tema de asignación de
// camas al llegar, no una reserva exclusiva del espacio (ver chequearDisponibilidad).
export function mensajePrivacidad(tipo: TipoAlojamiento, personas: number): string {
  return tipo === 'refugio' && (personas === 3 || personas === 4) ? MENSAJE_PRIVACIDAD_REFUGIO : '';
}

export async function chequearDisponibilidad(
  db: any,
  tipo: TipoAlojamiento,
  personas: number,
  fechaEntrada: string,
  fechaSalida: string
): Promise<Disponibilidad> {
  // Camping no tiene cupo cargado en D1 todavía — se coordina por WhatsApp,
  // igual que en el widget de la web. Nunca se informa como ocupado.
  if (tipo === 'camping') {
    return { estado: 'disponible', alojamiento_id: null };
  }

  if (tipo === 'domo') {
    // Un domo se alquila entero por grupo, así que alcanza con que exista AL
    // MENOS un domo con capacidad para el grupo y sin solapamiento de fechas
    // con una reserva 'pendiente' o 'confirmada'.
    const libre = await db
      .prepare(
        `SELECT a.id FROM alojamientos a
         WHERE a.tipo = 'domo'
         AND a.capacidad_total >= ?3
         AND a.id NOT IN (
           SELECT r.alojamiento_id FROM reservas r
           WHERE r.estado IN ('pendiente', 'confirmada')
           AND r.fecha_checkin < ?2 AND r.fecha_checkout > ?1
         )
         LIMIT 1`
      )
      .bind(fechaEntrada, fechaSalida, personas)
      .first();
    return { estado: libre ? 'disponible' : 'ocupado', alojamiento_id: libre ? Number(libre.id) : null };
  }

  // Refugio: compartido, NO se bloquea entero. Comparamos personas ya
  // ocupadas (con solapamiento de fechas) contra la capacidad total (15).
  // La habitación privada para grupos de 3-4 (ver mensajePrivacidad) es un
  // tema de asignación de camas, no de bloqueo de disponibilidad.
  const row = await db
    .prepare(
      `SELECT a.id AS id, a.capacidad_total AS capacidad_total,
              COALESCE(SUM(
                CASE WHEN r.estado IN ('pendiente', 'confirmada')
                  AND r.fecha_checkin < ?2 AND r.fecha_checkout > ?1
                THEN r.cantidad_personas ELSE 0 END
              ), 0) AS ocupadas
       FROM alojamientos a
       LEFT JOIN reservas r ON r.alojamiento_id = a.id
       WHERE a.tipo = 'refugio'
       GROUP BY a.id`
    )
    .bind(fechaEntrada, fechaSalida)
    .first();

  const capacidad = row ? Number(row.capacidad_total) : 15;
  const ocupadas = row ? Number(row.ocupadas) : 0;
  const disponible = ocupadas + personas <= capacidad;
  return { estado: disponible ? 'disponible' : 'ocupado', alojamiento_id: row ? Number(row.id) : null };
}
