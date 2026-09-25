import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { WA_MAGICO } from '../src/data/config';
import { BLOCKED_DATES_DOMO, BLOCKED_DATES_REFUGIO, RETIRO_DATES_DOMO, RETIRO_DATES_REFUGIO, MONTHLY_URGENCY } from '../src/data/availability';
import { calcularCotizacion, calcularSena, OPCIONES_COMIDAS, type Comidas, type Precios, type TipoAlojamiento } from '../src/lib/tarifas';

// ── Constantes ────────────────────────────────────────────────────────────────
// Ventana móvil: el mes actual + los 5 siguientes. Se calcula en el navegador
// (createRoot, sin hidratación), así nunca queda un calendario vencido.
const MESES_VISIBLES = 6;
const MONTH_DATES = Array.from({ length: MESES_VISIBLES }, (_, i) => {
  const d = new Date(new Date().getFullYear(), new Date().getMonth() + i, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
});
const TODAY = new Date().toISOString().slice(0, 10);
// Rango que cubre el calendario del widget (1° del primer mes hasta el 1°
// del mes siguiente al último), para pedirle a /api/disponibilidad solo lo
// que se va a mostrar.
const DISPONIBILIDAD_DESDE = `${MONTH_DATES[0].year}-${String(MONTH_DATES[0].month).padStart(2, '0')}-01`;
const DISPONIBILIDAD_HASTA = (() => {
  const ultimo = MONTH_DATES[MONTH_DATES.length - 1];
  return new Date(ultimo.year, ultimo.month, 1).toISOString().slice(0, 10); // mes 1° del mes siguiente
})();
export const G = { green: '#005333', gold: '#D4AF37', muted: '#4A6070' };

export function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
export function fmt(iso: string, monthAbbr: string[]) {
  const [, m, d] = iso.split('-');
  return `${parseInt(d)} ${monthAbbr[parseInt(m) - 1]}`;
}
export function nightsBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}
export function getStatus(iso: string, blockedList: string[], retiroList: string[] = []): 'available' | 'blocked' | 'retiro' | 'past' {
  if (iso < TODAY) return 'past';
  if (blockedList.includes(iso)) return 'blocked';
  if (retiroList.includes(iso)) return 'retiro';
  return 'available';
}
// 'retiro' se puede elegir igual que 'available' — solo cambia el color y
// dispara el aviso de consultar por WhatsApp (ver RETIRO_DATES_* arriba).
export function esPickable(status: ReturnType<typeof getStatus>): boolean {
  return status === 'available' || status === 'retiro';
}
export function initialMonth() {
  const i = MONTH_DATES.findIndex(mo => toISO(mo.year, mo.month, new Date(mo.year, mo.month, 0).getDate()) >= TODAY);
  return i >= 0 ? i : 0;
}
function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}
function fillTemplate(tpl: string, vars: Record<string, string>) {
  return tpl.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

// ── Widget ────────────────────────────────────────────────────────────────────
export const BookingWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useLanguage();
  const b = (t as any).booking;
  const MONTHS = MONTH_DATES.map(d => {
    const abbr: string = b.monthAbbr[d.month - 1];
    return { ...d, label: b.monthNames[d.month - 1], short: abbr.charAt(0).toUpperCase() + abbr.slice(1) };
  });

  const [calOpen, setCalOpen]   = useState(false);
  const [monthIdx, setMonthIdx] = useState(initialMonth);
  const [start, setStart]       = useState<string | null>(null);
  const [end, setEnd]           = useState<string | null>(null);
  const [pickEnd, setPickEnd]   = useState(false);
  const [personas, setPersonas] = useState(2);
  // Sin selección inicial: si domo apareciera pre-marcado por defecto, el
  // calendario se ve "siempre lleno" (por los findes bloqueados) antes de
  // que la persona elija algo. Que elija ella misma tipo y habitación.
  const [tipo, setTipo]         = useState<'domo' | 'refugio' | 'carpa' | null>(null);
  const [comidas, setComidas]   = useState<Comidas>('desayuno');
  const [reset, setReset]       = useState(false);
  // Precios desde D1 (tablas tarifas/extras/feriados), vía /api/disponibilidad.
  // Sin fallback con montos: si la consulta falla no mostramos un precio
  // inventado, derivamos a WhatsApp.
  const [precios, setPrecios]   = useState<Precios | null>(null);
  const tipoEfectivo: 'domo' | 'refugio' | 'carpa' = tipo ?? 'domo';
  const esCarpa = tipoEfectivo === 'carpa';

  // Disponibilidad real desde D1 (Panel de Reservas). Arranca con el
  // fallback estático y, si /api/disponibilidad responde a tiempo, lo
  // reemplaza — así el calendario nunca queda "todo disponible" mientras
  // carga, y sigue funcionando si la consulta falla (p. ej. en dev local).
  const [blockedDomo, setBlockedDomo] = useState<string[]>(BLOCKED_DATES_DOMO);
  const [blockedRefugio, setBlockedRefugio] = useState<string[]>(BLOCKED_DATES_REFUGIO);
  // Carpa todavía no tiene disponibilidad real cargada en D1 — de momento
  // queda siempre "disponible" y toda la coordinación se resuelve por
  // WhatsApp con los datos que la persona completó acá.
  const CARPA_SIN_BLOQUEOS: string[] = [];
  const retiroByTipo = useMemo(() => ({ domo: RETIRO_DATES_DOMO, refugio: RETIRO_DATES_REFUGIO, carpa: CARPA_SIN_BLOQUEOS }), []);

  useEffect(() => {
    let cancelado = false;
    fetch(`/api/disponibilidad?desde=${DISPONIBILIDAD_DESDE}&hasta=${DISPONIBILIDAD_HASTA}`)
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then(data => {
        if (cancelado) return;
        if (Array.isArray(data?.domo?.blocked)) setBlockedDomo(data.domo.blocked);
        if (Array.isArray(data?.refugio?.blocked)) setBlockedRefugio(data.refugio.blocked);
        if (Array.isArray(data?.precios?.tarifas)) setPrecios(data.precios);
      })
      .catch(() => { /* se queda con el fallback estático */ });
    return () => { cancelado = true; };
  }, []);

  const blockedByTipo = useMemo(() => ({ domo: blockedDomo, refugio: blockedRefugio, carpa: CARPA_SIN_BLOQUEOS }), [blockedDomo, blockedRefugio]);

  // En vez de borrar las fechas elegidas cuando no aplican al otro tipo de
  // alojamiento, directamente deshabilitamos ese botón — así la persona ve
  // por qué no puede cambiar, en lugar de perder su selección sin aviso.
  function tipoDisponibleParaFechas(op: 'domo' | 'refugio' | 'carpa'): boolean {
    if (start && !esPickable(getStatus(start, blockedByTipo[op], retiroByTipo[op]))) return false;
    if (end && !esPickable(getStatus(end, blockedByTipo[op], retiroByTipo[op]))) return false;
    return true;
  }

  const mo          = MONTHS[monthIdx];
  const firstDay    = new Date(mo.year, mo.month - 1, 1).getDay();
  const offset      = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(mo.year, mo.month, 0).getDate();
  const monthKey     = `${mo.year}-${String(mo.month).padStart(2, '0')}`;
  const monthUrgency = MONTHLY_URGENCY[monthKey] ?? 'normal';

  const handleDay = useCallback((iso: string) => {
    if (!esPickable(getStatus(iso, blockedByTipo[tipoEfectivo], retiroByTipo[tipoEfectivo]))) return;
    if (!pickEnd || !start) {
      setStart(iso); setEnd(null); setPickEnd(true);
    } else {
      if (iso <= start) { setStart(iso); setEnd(null); }
      else { setEnd(iso); setPickEnd(false); }
    }
  }, [pickEnd, start, tipoEfectivo, blockedByTipo, retiroByTipo]);

  function dayStyle(iso: string) {
    const s = getStatus(iso, blockedByTipo[tipoEfectivo], retiroByTipo[tipoEfectivo]);
    const isStart = iso === start;
    const isEnd   = iso === end;
    const inRange = !!(start && end && iso > start && iso < end);
    if (s === 'past')     return { bg: 'transparent', color: '#cbd5e1', cursor: 'default',      opacity: 0.35, radius: 6 };
    if (s === 'blocked')  return { bg: '#f1f5f9',     color: '#cbd5e1', cursor: 'not-allowed',  opacity: 0.6,  radius: 6 };
    if (isStart || isEnd) return { bg: G.green,        color: 'white',   cursor: 'pointer',      opacity: 1,    radius: 6 };
    if (inRange)          return { bg: 'rgba(0,83,51,0.1)', color: G.green, cursor: 'pointer',  opacity: 1,    radius: 0 };
    if (s === 'retiro')   return { bg: 'rgba(212,175,55,0.16)', color: '#8B6A00', cursor: 'pointer', opacity: 1, radius: 6 };
    return                       { bg: 'transparent', color: '#1A2B3C', cursor: 'pointer',      opacity: 1,    radius: 6 };
  }

  // Capacidad física real: un domo entra hasta 7 personas (7 camas — por
  // ahora todas individuales, sin armar la opción matrimonial), el refugio
  // hasta 15. Por encima de eso no se puede reservar solo — se coordina por
  // WhatsApp (combinar domos + refugio, etc.).
  const CAPACIDAD_DOMO = 7;
  const CAPACIDAD_REFUGIO = 15;
  const capacidadMax = tipoEfectivo === 'domo' ? CAPACIDAD_DOMO : CAPACIDAD_REFUGIO;
  // Carpa no tiene un tope de capacidad cargado (sin inventario real en D1
  // todavía) — cualquier grupo se coordina por WhatsApp, nunca la bloqueamos acá.
  const excedeCapacidad = !esCarpa && personas > capacidadMax;

  const enRangoGrupo = esCarpa ? false : tipoEfectivo === 'domo'
    ? personas >= 3 && personas <= CAPACIDAD_DOMO
    : personas >= 3 && personas <= CAPACIDAD_REFUGIO;

  // Si la estadía elegida cae en fechas de retiro/evento (ver RETIRO_DATES_*),
  // no la bloqueamos, pero avisamos que hay que confirmar por WhatsApp: puede
  // que el evento no use este alojamiento, o lo use solo parcialmente.
  const enRetiro = (start != null && getStatus(start, blockedByTipo[tipoEfectivo], retiroByTipo[tipoEfectivo]) === 'retiro')
    || (end != null && getStatus(end, blockedByTipo[tipoEfectivo], retiroByTipo[tipoEfectivo]) === 'retiro');

  // Precio: mismo cálculo que /api/cotizar (src/lib/tarifas.ts) con los
  // valores de D1. null si todavía no llegaron los precios o la API falló.
  const nights       = start && end ? nightsBetween(start, end) : 0;
  const tipoTarifa: TipoAlojamiento = tipoEfectivo === 'carpa' ? 'camping' : tipoEfectivo;
  const tarifa       = precios?.tarifas.find(t => t.tipo === tipoTarifa) ?? null;
  const cotizacionRaw = precios && start && end
    ? calcularCotizacion(precios, tipoTarifa, personas, start, end, comidas, reset)
    : null;
  const cotizacion   = cotizacionRaw && !('error' in cotizacionRaw) ? cotizacionRaw : null;
  const sena         = cotizacion ? calcularSena(cotizacion.subtotal) : null;
  const minimoFacturado = tarifa && personas < tarifa.minimo_personas_facturadas ? tarifa.minimo_personas_facturadas : null;
  const tipoLabel    = tipoEfectivo === 'domo' ? b.domoFull : tipoEfectivo === 'refugio' ? b.refugioFull : b.carpaFull;
  const regimenLabel = reset ? `${b.meals[comidas]} + ${b.breakdownReset}` : b.meals[comidas];
  const waMsg        = start && end
    ? fillTemplate(b.waTemplateWithDates, {
        tipo: tipoLabel,
        regimen: regimenLabel,
        start: fmt(start, b.monthAbbr),
        end: fmt(end, b.monthAbbr),
        nights: plural(nights, b.nightWord),
        personas: plural(personas, b.guestWord),
      })
    : b.waTemplateDefault;
  const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(waMsg)}`;
  const clear = () => { setStart(null); setEnd(null); setPickEnd(false); setCalOpen(false); };

  return (
    <div style={{ padding: compact ? '10px 14px 14px' : '14px 18px 18px' }}>

      {/* Fechas */}
      <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: G.muted, marginBottom: 8 }}>
        {b.selectDates}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
        {([{ label: b.arrival, val: start }, { label: b.departure, val: end }] as const).map(({ label, val }) => (
          <button key={label} onClick={() => setCalOpen(true)}
            style={{ border: `1.5px solid ${calOpen ? G.green : 'rgba(0,83,51,0.18)'}`, borderRadius: 10, padding: '9px 11px', textAlign: 'left', background: val ? 'rgba(0,83,51,0.05)' : 'white', cursor: 'pointer' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: G.muted, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: val ? G.green : '#94a3b8', marginTop: 2 }}>{val ? fmt(val, b.monthAbbr) : '—'}</div>
          </button>
        ))}
      </div>

      {/* Calendario */}
      {calOpen && (
        <div style={{ border: '1px solid rgba(0,83,51,0.12)', borderRadius: 14, marginBottom: 12, overflow: 'hidden', background: 'white' }}>
          <div style={{ display: 'flex', padding: 5, gap: 3, borderBottom: '1px solid rgba(0,83,51,0.07)', background: 'rgba(0,83,51,0.02)' }}>
            {MONTHS.map((m, i) => (
              <button key={m.label} onClick={() => setMonthIdx(i)}
                style={{ flex: 1, padding: '5px 3px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                  background: monthIdx === i ? G.green : 'transparent', color: monthIdx === i ? 'white' : G.muted }}>
                {m.short}
              </button>
            ))}
            <button onClick={() => setCalOpen(false)}
              style={{ width: 26, height: 26, borderRadius: 7, border: 'none', background: 'rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <X size={12} color={G.muted} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 4px' }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#1A2B3C' }}>{mo.label} {mo.year}</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {[{ Icon: ChevronLeft, dir: -1 }, { Icon: ChevronRight, dir: 1 }].map(({ Icon, dir }) => {
                const disabled = dir < 0 ? monthIdx === 0 : monthIdx === MONTHS.length - 1;
                return (
                  <button key={dir} onClick={() => setMonthIdx(i => Math.max(0, Math.min(MONTHS.length - 1, i + dir)))} disabled={disabled}
                    style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: 'rgba(0,83,51,0.06)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={12} color={G.muted} />
                  </button>
                );
              })}
            </div>
          </div>
          {monthUrgency !== 'normal' && (
            <div style={{ margin: '0 10px 8px', padding: '6px 10px', borderRadius: 8, background: 'rgba(212,175,55,0.14)', textAlign: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#8B6A00' }}>
                {fillTemplate(b.monthUrgency[monthUrgency === 'ultimos-lugares' ? 'ultimosLugares' : 'pocosLugares'], { month: mo.label })}
              </span>
            </div>
          )}
          <div style={{ padding: '0 10px 10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 2 }}>
              {b.dayNames.map((d: string, i: number) => <div key={`${d}${i}`} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', padding: '2px 0' }}>{d}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
              {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const iso = toISO(mo.year, mo.month, day);
                const { bg, color, cursor, opacity, radius } = dayStyle(iso);
                return (
                  <button key={day} onClick={() => handleDay(iso)}
                    style={{ height: 34, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, background: bg, color, cursor, opacity, borderRadius: radius, border: 'none', padding: 0, WebkitTapHighlightColor: 'transparent' }}>
                    {day}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, textAlign: 'center' }}>
              {!start ? b.tapArrival : !end ? b.chooseDeparture : `${fmt(start, b.monthAbbr)} → ${fmt(end, b.monthAbbr)} · ${plural(nights, b.nightWord)}`}
            </p>
          </div>
        </div>
      )}

      {enRetiro && (
        <p style={{ fontSize: 11, fontWeight: 600, color: '#8B6A00', background: 'rgba(212,175,55,0.14)', borderRadius: 8, padding: '8px 10px', marginBottom: 10 }}>
          {b.retiroNote}
        </p>
      )}

      {/* Personas */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>{b.guestsLabel}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setPersonas(p => Math.max(1, p - 1))}
            style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(0,83,51,0.2)', background: 'white', cursor: 'pointer', fontSize: 16, color: G.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1A2B3C', minWidth: 18, textAlign: 'center' }}>{personas}</span>
          <button onClick={() => setPersonas(p => Math.min(CAPACIDAD_REFUGIO, p + 1))}
            style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: G.green, cursor: 'pointer', fontSize: 16, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
        </div>
      </div>
      {esCarpa ? (
        <p style={{ fontSize: 10, color: '#8B6A00', marginTop: -6, marginBottom: 10, fontWeight: 600 }}>
          {b.carpaNote}
        </p>
      ) : excedeCapacidad && nights === 0 ? (
        <p style={{ fontSize: 10, color: '#94a3b8', marginTop: -6, marginBottom: 10 }}>
          {fillTemplate(b.capacityExceeded, { tipo: (tipoEfectivo === 'domo' ? b.domoShort : b.refugioShort).toLowerCase(), max: String(capacidadMax) })}
        </p>
      ) : excedeCapacidad ? null : enRangoGrupo ? (
        <p style={{ fontSize: 10, color: G.green, marginTop: -6, marginBottom: 10, fontWeight: 600 }}>
          {tipoEfectivo === 'domo' ? b.groupNote.domo : b.groupNote.refugio}
        </p>
      ) : (
        <p style={{ fontSize: 10, color: '#8B6A00', marginTop: -6, marginBottom: 10, fontWeight: 600 }}>
          {b.groupTeaser}
        </p>
      )}

      {/* Alojamiento */}
      <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: G.muted, marginBottom: 6 }}>{b.accommodation}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 6 }}>
        {(['domo', 'refugio', 'carpa'] as const).map(op => {
          const disabled = !tipoDisponibleParaFechas(op);
          const active = tipo === op;
          return (
            <button key={op} disabled={disabled} onClick={() => !disabled && setTipo(op)}
              style={{
                padding: '9px 6px', borderRadius: 9,
                border: `1.5px solid ${active ? G.green : 'rgba(0,83,51,0.18)'}`,
                background: active ? G.green : disabled ? '#f1f5f9' : 'white',
                color: active ? 'white' : disabled ? '#cbd5e1' : G.muted,
                fontSize: 11, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
              }}>
              {op === 'domo' ? `⬡ ${b.domoShort}` : op === 'refugio' ? `🏔 ${b.refugioShort}` : `⛺ ${b.carpaShort}`}
            </button>
          );
        })}
      </div>
      {(!tipoDisponibleParaFechas('domo') || !tipoDisponibleParaFechas('refugio')) && (
        <p style={{ fontSize: 10, color: '#94a3b8', marginTop: -2, marginBottom: 10 }}>{b.unavailableForDates}</p>
      )}

      {/* Comidas — alojamiento incluye desayuno; almuerzo, cena o pensión completa se suman aparte */}
      <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: G.muted, marginBottom: 6 }}>{b.mealsLabel}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
        {OPCIONES_COMIDAS.map(op => {
          const active = comidas === op;
          return (
            <button key={op} onClick={() => setComidas(op)}
              style={{
                padding: '9px 8px', borderRadius: 9,
                border: `1.5px solid ${active ? G.green : 'rgba(0,83,51,0.18)'}`,
                background: active ? G.green : 'white',
                color: active ? 'white' : G.muted,
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
              }}>
              {b.meals[op]}
            </button>
          );
        })}
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: G.muted, fontWeight: 600, marginBottom: 12, cursor: 'pointer' }}>
        <input type="checkbox" checked={reset} onChange={e => setReset(e.target.checked)} style={{ accentColor: G.green, width: 15, height: 15 }} />
        {b.resetLabel}
      </label>
      {minimoFacturado !== null && (
        <p style={{ fontSize: 10, color: '#8B6A00', marginTop: -6, marginBottom: 12, fontWeight: 600 }}>
          {fillTemplate(b.minimumBilledNote, { min: String(minimoFacturado) })}
        </p>
      )}

      {/* Resumen — sin precio si el grupo excede la capacidad real: esas
          tarifas por persona no aplican a un grupo que no entra en el
          alojamiento, así que no mostramos un total inventado. */}
      {nights > 0 && excedeCapacidad && (
        <div style={{ background: 'rgba(212,175,55,0.14)', borderRadius: 9, padding: '9px 11px', marginBottom: 10 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#8B6A00', margin: 0 }}>
            {fillTemplate(b.capacityExceeded, { tipo: (tipoEfectivo === 'domo' ? b.domoShort : b.refugioShort).toLowerCase(), max: String(capacidadMax) })}
          </p>
          <button onClick={clear} style={{ fontSize: 11, color: '#8B6A00', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 6, textDecoration: 'underline' }}>{b.clear}</button>
        </div>
      )}
      {nights > 0 && !excedeCapacidad && (
        <div style={{ background: 'rgba(0,83,51,0.05)', borderRadius: 9, padding: '9px 11px', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{plural(nights, b.nightWord)} · {plural(personas, b.guestWord)}</p>
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{regimenLabel.toLowerCase()}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              {cotizacion && (
                <p style={{ fontWeight: 700, fontSize: 17, color: G.green, margin: 0 }}>${cotizacion.subtotal.toLocaleString('es-AR')}</p>
              )}
              <button onClick={clear} style={{ fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>{b.clear}</button>
            </div>
          </div>
          {cotizacion && sena ? (
            <>
              <div style={{ margin: '6px 0 0', fontSize: 10, color: G.muted }}>
                {([
                  [b.breakdownLodging, cotizacion.alojamiento],
                  [b.breakdownMeals, cotizacion.comidas_total],
                  [b.breakdownReset, cotizacion.reset_total],
                ] as const).filter(([, monto]) => monto > 0).map(([label, monto]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{label}</span>
                    <span>${monto.toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 10, color: '#94a3b8', margin: '6px 0 0', paddingTop: 6, borderTop: '1px solid rgba(0,83,51,0.08)' }}>
                {fillTemplate(b.senaNote, { monto: sena.monto.toLocaleString('es-AR'), pct: String(sena.porcentaje * 100) })}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 10, color: '#94a3b8', margin: '6px 0 0' }}>{b.priceUnavailable}</p>
          )}
        </div>
      )}

      {/* CTA — "Confirmar" solo tiene sentido si hay un total real; si el
          grupo excede la capacidad, siempre se deriva a consultar. */}
      <a href={waUrl} target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: nights > 0 && !excedeCapacidad ? '#25D366' : G.green, color: 'white', borderRadius: 11, padding: '12px 14px', fontWeight: 700, fontSize: 12, textDecoration: 'none', width: '100%', boxSizing: 'border-box' }}>
        💬 {nights > 0 && !excedeCapacidad ? b.confirmWhatsapp : b.checkAvailability}
      </a>
    </div>
  );
};
