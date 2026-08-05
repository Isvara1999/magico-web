// Parser y generador de iCalendar (RFC 5545) — lo mínimo necesario para
// sincronizar disponibilidad con Airbnb (y cualquier otra plataforma que
// use el mismo estándar de calendario: Booking.com, Google Calendar, etc.).
// Usado por functions/api/ical/[id].ts (exportar) y
// functions/api/admin/sync-airbnb.ts (importar).

export type IcsEvento = {
  uid: string;
  dtstart: string; // 'YYYY-MM-DD'
  dtend: string;   // 'YYYY-MM-DD', exclusivo (igual que fecha_checkout en nuestro schema)
  summary: string;
};

// RFC 5545: una línea que empieza con espacio o tab es continuación de la anterior.
function unfold(texto: string): string[] {
  const crudas = texto.split(/\r\n|\n|\r/);
  const lineas: string[] = [];
  for (const linea of crudas) {
    if ((linea.startsWith(' ') || linea.startsWith('\t')) && lineas.length > 0) {
      lineas[lineas.length - 1] += linea.slice(1);
    } else {
      lineas.push(linea);
    }
  }
  return lineas;
}

// Acepta 'YYYYMMDD' (VALUE=DATE, lo que usa Airbnb) o 'YYYYMMDDTHHMMSSZ' —
// en cualquier caso nos quedamos solo con la fecha calendario.
function fechaDeValor(valor: string): string | null {
  const m = valor.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

export function parseIcs(texto: string): IcsEvento[] {
  const lineas = unfold(texto);
  const eventos: IcsEvento[] = [];
  let actual: Partial<IcsEvento> | null = null;

  for (const lineaCruda of lineas) {
    const linea = lineaCruda.trim();
    if (linea === 'BEGIN:VEVENT') {
      actual = {};
      continue;
    }
    if (linea === 'END:VEVENT') {
      if (actual?.uid && actual.dtstart && actual.dtend) {
        eventos.push({ uid: actual.uid, dtstart: actual.dtstart, dtend: actual.dtend, summary: actual.summary || '' });
      }
      actual = null;
      continue;
    }
    if (!actual) continue;

    const idx = linea.indexOf(':');
    if (idx === -1) continue;
    const clave = linea.slice(0, idx).split(';')[0].toUpperCase();
    const valor = linea.slice(idx + 1);

    if (clave === 'UID') actual.uid = valor.trim();
    else if (clave === 'DTSTART') { const f = fechaDeValor(valor); if (f) actual.dtstart = f; }
    else if (clave === 'DTEND') { const f = fechaDeValor(valor); if (f) actual.dtend = f; }
    else if (clave === 'SUMMARY') actual.summary = valor.trim();
  }

  return eventos;
}

// dtstamp fijo por llamada — no hace falta que sea "ahora" exacto, solo un
// timestamp válido en formato iCal (YYYYMMDDTHHMMSSZ).
function dtstampAhora(): string {
  return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generarIcs(nombreCalendario: string, eventos: IcsEvento[]): string {
  const dtstamp = dtstampAhora();
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pueblo Magico//Reservas//ES',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${nombreCalendario}`,
  ];
  for (const ev of eventos) {
    lineas.push(
      'BEGIN:VEVENT',
      `UID:${ev.uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${ev.dtstart.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${ev.dtend.replace(/-/g, '')}`,
      `SUMMARY:${ev.summary}`,
      'END:VEVENT'
    );
  }
  lineas.push('END:VCALENDAR');
  return lineas.join('\r\n') + '\r\n';
}
