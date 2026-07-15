import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Users, MessageCircle, Moon, CalendarDays } from 'lucide-react';
import { WA_MAGICO } from '../data/config';
import { CAPACITY_PER_DAY, BLOCKED_DATES, PRECIO_NOCHE_ARS } from '../data/availability';

const C = {
  green: '#005333',
  gold:  '#D4AF37',
  dark:  '#1A2B3C',
  muted: '#4A6070',
  faint: '#6B8090',
  cream: '#F5F9FF',
  night: '#EBF4FA',
};

const MONTHS = [
  { label: 'Julio',      short: 'Jul', year: 2026, month: 7 },
  { label: 'Agosto',     short: 'Ago', year: 2026, month: 8 },
  { label: 'Septiembre', short: 'Sep', year: 2026, month: 9 },
];

const DAY_NAMES = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const TIPOS = [
  { value: 'domo',      label: 'Domo estándar' },
  { value: 'premium',   label: 'Domo premium' },
  { value: 'membresia', label: 'Membresía invierno' },
  { value: 'equipo',    label: 'Equipos (7+)' },
];

function toISO(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDisplay(iso: string) {
  const [, m, d] = iso.split('-');
  const names = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(d)} ${names[parseInt(m)]}`;
}

function nightsBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

const TODAY = new Date().toISOString().slice(0, 10);

function getInitialMonthIdx() {
  const idx = MONTHS.findIndex(m => {
    return toISO(m.year, m.month, new Date(m.year, m.month, 0).getDate()) >= TODAY;
  });
  return idx >= 0 ? idx : 0;
}

function getDayStatus(iso: string): 'available' | 'blocked' | 'past' {
  if (iso < TODAY) return 'past';
  if (BLOCKED_DATES.includes(iso)) return 'blocked';
  return 'available';
}

interface Props {
  /** Fondo de la sección — adaptar al color de la página que lo embebe */
  bgColor?: string;
  /** Si es true muestra título y eyebrow arriba de la sección */
  showTitle?: boolean;
}

export function ReservasSection({ bgColor = C.cream, showTitle = false }: Props) {
  const [monthIdx, setMonthIdx]     = useState(() => getInitialMonthIdx());
  const [startDate, setStartDate]   = useState<string | null>(null);
  const [endDate, setEndDate]       = useState<string | null>(null);
  const [pickingEnd, setPickingEnd] = useState(false);
  const [personas, setPersonas]     = useState(2);
  const [tipo, setTipo]             = useState('domo');

  const m = MONTHS[monthIdx];
  const firstWeekday = new Date(m.year, m.month - 1, 1).getDay();
  const startOffset  = firstWeekday === 0 ? 6 : firstWeekday - 1;
  const daysInMonth  = new Date(m.year, m.month, 0).getDate();

  const handleDayClick = useCallback((iso: string) => {
    const status = getDayStatus(iso);
    if (status !== 'available') return;
    if (!pickingEnd || !startDate) {
      setStartDate(iso); setEndDate(null); setPickingEnd(true);
    } else {
      if (iso <= startDate) { setStartDate(iso); setEndDate(null); }
      else { setEndDate(iso); setPickingEnd(false); }
    }
  }, [pickingEnd, startDate]);

  function dayClass(iso: string) {
    const s = getDayStatus(iso);
    if (s === 'past') return 'past';
    if (s === 'blocked') return 'blocked';
    if (startDate && endDate) {
      if (iso === startDate) return 'sel-start';
      if (iso === endDate)   return 'sel-end';
      if (iso > startDate && iso < endDate) return 'in-range';
    } else if (startDate && iso === startDate) return 'sel-single';
    return 'available';
  }

  const nights     = startDate && endDate ? nightsBetween(startDate, endDate) : 0;
  const totalPrice = nights * PRECIO_NOCHE_ARS * personas;
  const tipoLabel  = TIPOS.find(t => t.value === tipo)?.label ?? 'Domo estándar';

  const waMsg = startDate && endDate
    ? `¡Hola! Quiero reservar en Pueblo Mágico.\n\n🏕 ${tipoLabel}\n📅 Llegada: ${formatDisplay(startDate)}\n📅 Salida: ${formatDisplay(endDate)}\n🌙 ${nights} noches · 👥 ${personas} persona${personas > 1 ? 's' : ''}\n\n¿Está disponible?`
    : `¡Hola! Me interesa reservar en Pueblo Mágico — invierno 2026. ¿Me pueden dar más info?`;

  const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(waMsg)}`;

  const clearSelection = () => { setStartDate(null); setEndDate(null); setPickingEnd(false); };

  return (
    <section className="px-4 py-12 md:py-16" style={{ backgroundColor: bgColor }}>
      <div className="max-w-5xl mx-auto">

        {showTitle && (
          <div className="text-center mb-10" data-reveal>
            <p className="text-[10px] tracking-widest uppercase font-bold mb-3" style={{ color: C.gold }}>
              Invierno 2026 · julio · agosto · septiembre
            </p>
            <h2 className="text-3xl md:text-4xl serif-title font-bold" style={{ color: C.dark, letterSpacing: '-0.02em' }}>
              Reservá tu estadía
            </h2>
            <p className="text-sm mt-2" style={{ color: C.muted }}>
              Seleccioná fechas y confirmá por WhatsApp en segundos
            </p>
          </div>
        )}

        {/* ── Layout: calendar izq + panel der en desktop; stack en mobile ── */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_280px] gap-6 md:gap-8 items-start">

          {/* ── CALENDAR ── */}
          <div className="w-full bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid rgba(0,83,51,0.1)` }}>

            {/* Month tabs */}
            <div className="flex p-1.5 gap-1" style={{ borderBottom: `1px solid rgba(0,83,51,0.08)` }}>
              {MONTHS.map((mo, i) => (
                <button
                  key={mo.label}
                  onClick={() => setMonthIdx(i)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: monthIdx === i ? C.green : 'transparent',
                    color: monthIdx === i ? 'white' : C.muted,
                  }}
                >
                  <span className="hidden sm:inline">{mo.label}</span>
                  <span className="sm:hidden">{mo.short}</span>
                </button>
              ))}
            </div>

            <div className="p-4 md:p-5">
              {/* Month title + nav */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold serif-title" style={{ color: C.dark }}>
                  {m.label} {m.year}
                </h3>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setMonthIdx(i => Math.max(0, i - 1))}
                    disabled={monthIdx === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-25 transition-opacity"
                    style={{ background: 'rgba(0,83,51,0.06)', color: C.muted }}
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={() => setMonthIdx(i => Math.min(2, i + 1))}
                    disabled={monthIdx === 2}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-25 transition-opacity"
                    style={{ background: 'rgba(0,83,51,0.06)', color: C.muted }}
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 mb-1">
                {DAY_NAMES.map(d => (
                  <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider py-1" style={{ color: C.faint }}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                {Array.from({ length: startOffset }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const iso = toISO(m.year, m.month, day);
                  const cls = dayClass(iso);
                  const isPast    = cls === 'past';
                  const isBlocked = cls === 'blocked';
                  const isStart   = cls === 'sel-start' || cls === 'sel-single';
                  const isEnd     = cls === 'sel-end'   || cls === 'sel-single';
                  const isRange   = cls === 'in-range';

                  let bg = 'rgba(0,83,51,0.06)';
                  let color = C.green;
                  let border = 'transparent';
                  let radius = '8px';
                  let cursor = 'pointer';
                  let opacity = 1;

                  if (isPast)               { bg = 'transparent'; color = '#94a3b8'; cursor = 'default'; opacity = 0.3; }
                  else if (isBlocked)       { bg = '#f1f5f9'; color = '#cbd5e1'; cursor = 'not-allowed'; opacity = 0.5; }
                  else if (isStart || isEnd){ bg = C.green; color = 'white'; border = C.green; }
                  else if (isRange)         { bg = 'rgba(0,83,51,0.1)'; radius = '0'; }

                  return (
                    <div
                      key={day}
                      onClick={() => handleDayClick(iso)}
                      className="flex flex-col items-center justify-center font-semibold transition-all select-none"
                      style={{
                        background: bg, color, border: `1.5px solid ${border}`,
                        borderRadius: radius, cursor, opacity,
                        // Celdas táctiles: mínimo 40px, se expanden con el grid
                        minHeight: '40px',
                        fontSize: '13px',
                        padding: '4px 2px',
                      }}
                    >
                      <span>{day}</span>
                      {!isPast && !isBlocked && (
                        <span style={{ width: 3, height: 3, borderRadius: '50%', marginTop: 2, flexShrink: 0,
                          background: isStart || isEnd ? 'rgba(255,255,255,0.7)' : 'rgba(0,83,51,0.4)' }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4" style={{ borderTop: `1px solid rgba(0,83,51,0.08)` }}>
                {[
                  { bg: 'rgba(0,83,51,0.08)', label: 'Disponible' },
                  { bg: C.green,              label: 'Seleccionado' },
                  { bg: '#f1f5f9',            label: 'Bloqueado' },
                ].map(({ bg, label }) => (
                  <span key={label} className="flex items-center gap-1.5 text-[11px]" style={{ color: C.muted }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: bg, display: 'inline-block', flexShrink: 0 }} />
                    {label}
                  </span>
                ))}
                <span className="text-[11px] ml-auto hidden sm:inline" style={{ color: C.faint }}>
                  1er toque: llegada · 2do toque: salida
                </span>
              </div>
            </div>
          </div>

          {/* ── PANEL DE RESERVA ── */}
          <div className="w-full flex flex-col gap-3">

            {/* Tipo + Personas — mobile: arriba del summary en mobile, en panel lateral en desktop */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] tracking-widest uppercase font-bold mb-1.5" style={{ color: C.muted }}>Estadía</label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                  className="w-full rounded-xl px-3 py-2.5 text-sm font-medium appearance-none outline-none"
                  style={{ background: 'white', border: `1px solid rgba(0,83,51,0.15)`, color: C.dark }}
                >
                  {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-widest uppercase font-bold mb-1.5" style={{ color: C.muted }}>Personas</label>
                <select
                  value={personas}
                  onChange={e => setPersonas(Number(e.target.value))}
                  className="w-full rounded-xl px-3 py-2.5 text-sm font-medium appearance-none outline-none"
                  style={{ background: 'white', border: `1px solid rgba(0,83,51,0.15)`, color: C.dark }}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} persona{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fechas seleccionadas (display) */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-medium"
                style={{
                  background: startDate ? 'rgba(0,83,51,0.05)' : 'white',
                  border: `1.5px solid ${startDate ? 'rgba(0,83,51,0.25)' : 'rgba(0,83,51,0.12)'}`,
                  color: startDate ? C.green : C.faint,
                }}
              >
                <CalendarDays size={13} />
                <span className="text-[12px] font-semibold">{startDate ? formatDisplay(startDate) : 'Llegada'}</span>
              </div>
              <div
                className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-medium"
                style={{
                  background: endDate ? 'rgba(212,175,55,0.06)' : 'white',
                  border: `1.5px solid ${endDate ? 'rgba(212,175,55,0.3)' : 'rgba(0,83,51,0.12)'}`,
                  color: endDate ? '#8B6A00' : C.faint,
                }}
              >
                <CalendarDays size={13} />
                <span className="text-[12px] font-semibold">{endDate ? formatDisplay(endDate) : 'Salida'}</span>
              </div>
            </div>

            {/* Summary */}
            {nights > 0 ? (
              <div className="rounded-2xl p-4" style={{ background: 'white', border: `1px solid rgba(0,83,51,0.1)` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-bold mb-0.5" style={{ color: C.muted }}>Resumen</p>
                    <p className="text-sm font-bold" style={{ color: C.dark }}>
                      {formatDisplay(startDate!)} → {formatDisplay(endDate!)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px]" style={{ color: C.faint }}>estimado</p>
                    <p className="text-base font-bold" style={{ color: C.green }}>
                      ${totalPrice.toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs mb-3" style={{ color: C.muted }}>
                  <span className="flex items-center gap-1"><Moon size={11} />{nights} noches</span>
                  <span className="flex items-center gap-1"><Users size={11} />{personas} persona{personas > 1 ? 's' : ''}</span>
                </div>
                <p className="text-[10px] mb-3" style={{ color: C.faint }}>
                  Precio con 20% OFF pagando en efectivo · se confirma por WhatsApp
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold"
                  style={{ background: '#25D366', color: 'white' }}
                >
                  <MessageCircle size={16} />
                  Confirmar por WhatsApp
                </a>
                <button onClick={clearSelection} className="w-full mt-2 text-[11px] underline" style={{ color: C.faint }}>
                  Limpiar selección
                </button>
              </div>
            ) : startDate ? (
              <div className="rounded-2xl p-4 text-sm text-center" style={{ background: 'white', border: `1px solid rgba(0,83,51,0.1)`, color: C.muted }}>
                Ahora tocá tu fecha de <strong style={{ color: C.dark }}>salida</strong> en el calendario
              </div>
            ) : (
              <div className="rounded-2xl p-4" style={{ background: 'white', border: `1px solid rgba(0,83,51,0.1)` }}>
                <p className="text-sm text-center mb-4" style={{ color: C.muted }}>
                  Tocá un día en el calendario para empezar
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold"
                  style={{ background: 'rgba(0,83,51,0.08)', color: C.green }}
                >
                  <MessageCircle size={15} />
                  Consultar disponibilidad
                </a>
              </div>
            )}

            {/* Availability bars */}
            <div className="rounded-2xl p-4" style={{ background: 'rgba(0,83,51,0.03)', border: `1px solid rgba(0,83,51,0.08)` }}>
              <p className="text-[10px] tracking-widest uppercase font-bold mb-3" style={{ color: C.muted }}>Disponibilidad</p>
              <div className="space-y-2.5">
                {MONTHS.map(mo => (
                  <div key={mo.label} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold w-6" style={{ color: C.dark }}>{mo.short}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,83,51,0.1)' }}>
                      <div className="h-full rounded-full" style={{ width: '100%', background: C.green }} />
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: C.green }}>{CAPACITY_PER_DAY} camas/día</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
