// Lógica compartida de cotización, precios y disponibilidad — usada por
// functions/api/cotizar.ts y functions/api/manychat.ts. El prefijo "_" hace
// que Cloudflare Pages ignore esta carpeta como ruta (no es un endpoint).

export type TipoAlojamiento = 'domo' | 'refugio';

export type Cotizacion = {
  tipo_alojamiento: TipoAlojamiento;
  cantidad_personas: number;
  noches: number;
  precio_por_noche: number;
  subtotal: number;
  exclusividad_gratis: boolean;
};

export type Disponibilidad = {
  estado: 'disponible' | 'ocupado';
  // Alojamiento concreto a reservar si estado === 'disponible' (domo específico,
  // o el único registro del Refugio). null si no hay lugar.
  alojamiento_id: number | null;
};

const MENSAJE_PRIVACIDAD_REFUGIO =
  'Por la cantidad que son, podríamos ubicarlos en una habitación privada dentro del refugio sin cargo extra (sujeto a disponibilidad al momento de asignar camas).';

// El Refugio tiene 4 habitaciones (una de 3 camas, tres de 4 camas) dentro de
// las 15 camas totales. Grupos de exactamente 3 o 4 personas entran justo en
// una habitación propia — se lo avisamos, pero es un tema de asignación de
// camas al llegar, no una reserva exclusiva del espacio (ver chequearDisponibilidad).
export function mensajePrivacidad(tipo: TipoAlojamiento, personas: number): string {
  return tipo === 'refugio' && (personas === 3 || personas === 4) ? MENSAJE_PRIVACIDAD_REFUGIO : '';
}

// Reglas de precio — todos los montos son "por noche".
export function calcularPrecio(tipo: TipoAlojamiento, personas: number, noches: number): Cotizacion | { error: string } {
  if (tipo === 'refugio') {
    if (personas < 1 || personas > 15) return { error: 'El Refugio Compartido admite entre 1 y 15 personas.' };
    const precioPorNoche = 50000 * personas;
    return {
      tipo_alojamiento: tipo,
      cantidad_personas: personas,
      noches,
      precio_por_noche: precioPorNoche,
      subtotal: precioPorNoche * noches,
      exclusividad_gratis: personas >= 3 && personas <= 7,
    };
  }

  // domo
  if (personas < 1 || personas > 7) return { error: 'El Domo admite entre 1 y 7 personas.' };
  let precioPorNoche: number;
  if (personas === 1) precioPorNoche = 150000;
  else if (personas === 2) precioPorNoche = 75000;
  else if (personas <= 5) precioPorNoche = 65000 * personas;
  else precioPorNoche = 50000 * personas; // 6-7 personas

  return {
    tipo_alojamiento: tipo,
    cantidad_personas: personas,
    noches,
    precio_por_noche: precioPorNoche,
    subtotal: precioPorNoche * noches,
    exclusividad_gratis: personas >= 6, // domo lleno = exclusivo por definición
  };
}

export function nochesEntre(entrada: string, salida: string): number | null {
  const inMs = Date.parse(entrada);
  const outMs = Date.parse(salida);
  if (Number.isNaN(inMs) || Number.isNaN(outMs)) return null;
  const noches = Math.round((outMs - inMs) / 86400000);
  return noches > 0 ? noches : null;
}

export async function chequearDisponibilidad(
  db: any,
  tipo: TipoAlojamiento,
  personas: number,
  fechaEntrada: string,
  fechaSalida: string
): Promise<Disponibilidad> {
  if (tipo === 'domo') {
    // Un domo se alquila entero por grupo (aun 1 persona paga la tarifa fija
    // completa), así que alcanza con que exista AL MENOS un domo sin
    // solapamiento de fechas con una reserva 'pendiente' o 'confirmada'.
    const libre = await db
      .prepare(
        `SELECT a.id FROM alojamientos a
         WHERE a.tipo = 'domo'
         AND a.id NOT IN (
           SELECT r.alojamiento_id FROM reservas r
           WHERE r.estado IN ('pendiente', 'confirmada')
           AND r.fecha_checkin < ?2 AND r.fecha_checkout > ?1
         )
         LIMIT 1`
      )
      .bind(fechaEntrada, fechaSalida)
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
