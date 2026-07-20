import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { WA_MAGICO } from '../src/data/config';
import { BLOCKED_DATES } from '../src/data/availability';

// ── Constantes ────────────────────────────────────────────────────────────────
const MONTH_DATES = [
  { year: 2026, month: 7 },
  { year: 2026, month: 8 },
  { year: 2026, month: 9 },
];
const TODAY = new Date().toISOString().slice(0, 10);
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
export function getStatus(iso: string): 'available' | 'blocked' | 'past' {
  if (iso < TODAY) return 'past';
  if (BLOCKED_DATES.includes(iso)) return 'blocked';
  return 'available';
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
  const MONTHS = MONTH_DATES.map((d, i) => ({ ...d, label: b.months[i].label, short: b.months[i].short }));

  const [calOpen, setCalOpen]   = useState(false);
  const [monthIdx, setMonthIdx] = useState(initialMonth);
  const [start, setStart]       = useState<string | null>(null);
  const [end, setEnd]           = useState<string | null>(null);
  const [pickEnd, setPickEnd]   = useState(false);
  const [personas, setPersonas] = useState(2);
  const [tipo, setTipo]         = useState<'domo' | 'refugio'>('domo');
  const [desayuno, setDesayuno] = useState(true);

  const mo          = MONTHS[monthIdx];
  const firstDay    = new Date(mo.year, mo.month - 1, 1).getDay();
  const offset      = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(mo.year, mo.month, 0).getDate();

  const handleDay = useCallback((iso: string) => {
    if (getStatus(iso) !== 'available') return;
    if (!pickEnd || !start) {
      setStart(iso); setEnd(null); setPickEnd(true);
    } else {
      if (iso <= start) { setStart(iso); setEnd(null); }
      else { setEnd(iso); setPickEnd(false); setCalOpen(false); }
    }
  }, [pickEnd, start]);

  function dayStyle(iso: string) {
    const s = getStatus(iso);
    const isStart = iso === start;
    const isEnd   = iso === end;
    const inRange = !!(start && end && iso > start && iso < end);
    if (s === 'past')     return { bg: 'transparent', color: '#cbd5e1', cursor: 'default',      opacity: 0.35, radius: 6 };
    if (s === 'blocked')  return { bg: '#f1f5f9',     color: '#cbd5e1', cursor: 'not-allowed',  opacity: 0.6,  radius: 6 };
    if (isStart || isEnd) return { bg: G.green,        color: 'white',   cursor: 'pointer',      opacity: 1,    radius: 6 };
    if (inRange)          return { bg: 'rgba(0,83,51,0.1)', color: G.green, cursor: 'pointer',  opacity: 1,    radius: 0 };
    return                       { bg: 'transparent', color: '#1A2B3C', cursor: 'pointer',      opacity: 1,    radius: 6 };
  }

  const nights       = start && end ? nightsBetween(start, end) : 0;
  const pxNoche      = desayuno ? 50_000 : 20_000;
  const total        = nights * pxNoche * personas;
  const tipoLabel    = tipo === 'domo' ? b.domoFull : b.refugioFull;
  const regimenLabel = desayuno ? b.fullBoard : b.breakfastOnly;
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
          <button key={label} onClick={() => setCalOpen(o => !o)}
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
                const disabled = dir < 0 ? monthIdx === 0 : monthIdx === 2;
                return (
                  <button key={dir} onClick={() => setMonthIdx(i => Math.max(0, Math.min(2, i + dir)))} disabled={disabled}
                    style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: 'rgba(0,83,51,0.06)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={12} color={G.muted} />
                  </button>
                );
              })}
            </div>
          </div>
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

      {/* Personas */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>{b.guestsLabel}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setPersonas(p => Math.max(1, p - 1))}
            style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(0,83,51,0.2)', background: 'white', cursor: 'pointer', fontSize: 16, color: G.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1A2B3C', minWidth: 18, textAlign: 'center' }}>{personas}</span>
          <button onClick={() => setPersonas(p => p + 1)}
            style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: G.green, cursor: 'pointer', fontSize: 16, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
        </div>
      </div>

      {/* Alojamiento — solo en versión completa */}
      {!compact && (
        <>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: G.muted, marginBottom: 6 }}>{b.accommodation}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
            {(['domo', 'refugio'] as const).map(op => (
              <button key={op} onClick={() => setTipo(op)}
                style={{ padding: '9px 8px', borderRadius: 9, border: `1.5px solid ${tipo === op ? G.green : 'rgba(0,83,51,0.18)'}`, background: tipo === op ? G.green : 'white', color: tipo === op ? 'white' : G.muted, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                {op === 'domo' ? `⬡ ${b.domoShort}` : `🏔 ${b.refugioShort}`}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Régimen — siempre visible */}
      <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: G.muted, marginBottom: 6 }}>{b.regimen}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
        {([true, false] as const).map(op => (
          <button key={String(op)} onClick={() => setDesayuno(op)}
            style={{ padding: '9px 8px', borderRadius: 9, border: `1.5px solid ${desayuno === op ? G.green : 'rgba(0,83,51,0.18)'}`, background: desayuno === op ? G.green : 'white', color: desayuno === op ? 'white' : G.muted, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
            {op ? b.fullBoard : b.breakfastOnly}
          </button>
        ))}
      </div>

      {/* Resumen */}
      {nights > 0 && (
        <div style={{ background: 'rgba(0,83,51,0.05)', borderRadius: 9, padding: '9px 11px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{plural(nights, b.nightWord)} · {plural(personas, b.guestWord)}</p>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 0' }}>{regimenLabel.toLowerCase()}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 700, fontSize: 17, color: G.green, margin: 0 }}>${total.toLocaleString('es-AR')}</p>
            <button onClick={clear} style={{ fontSize: 11, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>{b.clear}</button>
          </div>
        </div>
      )}

      {/* CTA */}
      <a href={waUrl} target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: nights > 0 ? '#25D366' : G.green, color: 'white', borderRadius: 11, padding: '12px 14px', fontWeight: 700, fontSize: 12, textDecoration: 'none', width: '100%', boxSizing: 'border-box' }}>
        💬 {nights > 0 ? b.confirmWhatsapp : b.checkAvailability}
      </a>
    </div>
  );
};
