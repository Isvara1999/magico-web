import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Users, CalendarDays, MessageCircle, Moon } from 'lucide-react';
import { WA_MAGICO } from './data/config';
import { CAPACITY_PER_DAY, BLOCKED_DATES, PRECIO_NOCHE_ARS } from './data/availability';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
  { label: 'Julio',      year: 2026, month: 7 },
  { label: 'Agosto',     year: 2026, month: 8 },
  { label: 'Septiembre', year: 2026, month: 9 },
];

const DAY_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const TIPOS = [
  { value: 'domo',      label: 'Domo estándar' },
  { value: 'premium',   label: 'Domo premium' },
  { value: 'membresia', label: 'Membresía invierno' },
  { value: 'equipo',    label: 'Descuento equipos (7+)' },
];

function toISO(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDisplay(iso: string) {
  const [, m, d] = iso.split('-');
  const monthNames = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(d)} ${monthNames[parseInt(m)]}`;
}

function nightsBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000);
}

function getDayStatus(iso: string): 'available' | 'blocked' {
  if (BLOCKED_DATES.includes(iso)) return 'blocked';
  return 'available';
}

export default function Reservas() {
  const [monthIdx, setMonthIdx]     = useState(0);
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
    if (status === 'blocked') return;

    if (!pickingEnd || !startDate) {
      setStartDate(iso);
      setEndDate(null);
      setPickingEnd(true);
    } else {
      if (iso <= startDate) {
        setStartDate(iso);
        setEndDate(null);
      } else {
        setEndDate(iso);
        setPickingEnd(false);
      }
    }
  }, [pickingEnd, startDate]);

  function dayClass(iso: string): string {
    const status = getDayStatus(iso);
    if (status === 'blocked') return 'blocked';
    if (startDate && endDate) {
      if (iso === startDate) return 'sel-start';
      if (iso === endDate)   return 'sel-end';
      if (iso > startDate && iso < endDate) return 'in-range';
    } else if (startDate && iso === startDate) {
      return 'sel-single';
    }
    return 'available';
  }

  const nights = startDate && endDate ? nightsBetween(startDate, endDate) : 0;
  const totalPrice = nights * PRECIO_NOCHE_ARS * personas;

  const tipoLabel = TIPOS.find(t => t.value === tipo)?.label ?? 'Domo estándar';

  const waMsg = startDate && endDate
    ? `¡Hola! Quiero reservar en Pueblo Mágico.\n\n🏕 ${tipoLabel}\n📅 Llegada: ${formatDisplay(startDate)}\n📅 Salida: ${formatDisplay(endDate)}\n🌙 ${nights} noches\n👥 ${personas} persona${personas > 1 ? 's' : ''}\n\n¿Está disponible?`
    : `¡Hola! Me interesa reservar en Pueblo Mágico durante el invierno 2026. ¿Me pueden dar más info?`;

  const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(waMsg)}`;

  const libre = CAPACITY_PER_DAY; // no reservations yet

  return (
    <>
      <Header />

      {/* ── Hero / Booking bar ── */}
      <section style={{ backgroundColor: C.dark, paddingTop: 0 }}>
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
          <p className="text-[10px] tracking-widest uppercase font-bold mb-3 text-center" style={{ color: 'rgba(212,175,55,0.7)' }}>
            Invierno 2026 · julio · agosto · septiembre
          </p>
          <h1 className="text-3xl md:text-4xl text-center font-bold mb-2 serif-title" style={{ color: 'white', letterSpacing: '-0.02em' }}>
            Reservá tu estadía
          </h1>
          <p className="text-center text-sm mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Todo el invierno en la montaña · Los Gigantes, Córdoba
          </p>

          {/* Widget bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] tracking-widest uppercase font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Tipo de estadía</label>
              <select
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                className="w-full rounded-xl px-3 py-3 text-sm font-medium appearance-none outline-none"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
              >
                {TIPOS.map(t => <option key={t.value} value={t.value} style={{ background: C.dark }}>{t.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-widests uppercase font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Llegada</label>
              <div
                className="rounded-xl px-3 py-3 text-sm font-medium flex items-center gap-2"
                style={{
                  background: startDate ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${startDate ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.12)'}`,
                  color: startDate ? C.gold : 'rgba(255,255,255,0.4)',
                  cursor: 'default',
                }}
              >
                <CalendarDays size={14} />
                {startDate ? formatDisplay(startDate) : 'Seleccioná'}
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Salida</label>
              <div
                className="rounded-xl px-3 py-3 text-sm font-medium flex items-center gap-2"
                style={{
                  background: endDate ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${endDate ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.12)'}`,
                  color: endDate ? C.gold : 'rgba(255,255,255,0.4)',
                  cursor: 'default',
                }}
              >
                <CalendarDays size={14} />
                {endDate ? formatDisplay(endDate) : 'Seleccioná'}
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Personas</label>
              <select
                value={personas}
                onChange={e => setPersonas(Number(e.target.value))}
                className="w-full rounded-xl px-3 py-3 text-sm font-medium appearance-none outline-none"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} style={{ background: C.dark }}>{n} persona{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>

          {/* Availability indicator */}
          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
            {libre} camas disponibles por día · invierno 2026
          </div>
        </div>
      </section>

      {/* ── Calendar + Summary ── */}
      <section className="py-16 px-4" style={{ backgroundColor: C.cream }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">

            {/* Calendar */}
            <div>
              {/* Month tabs */}
              <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: 'white', border: `1px solid rgba(0,83,51,0.1)` }}>
                {MONTHS.map((mo, i) => (
                  <button
                    key={mo.label}
                    onClick={() => setMonthIdx(i)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: monthIdx === i ? C.green : 'transparent',
                      color: monthIdx === i ? 'white' : C.muted,
                    }}
                  >
                    {mo.label}
                  </button>
                ))}
              </div>

              {/* Month nav */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold serif-title" style={{ color: C.dark }}>
                  {m.label} {m.year}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMonthIdx(i => Math.max(0, i - 1))}
                    disabled={monthIdx === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                    style={{ background: 'white', border: `1px solid rgba(0,83,51,0.12)`, color: C.muted }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setMonthIdx(i => Math.min(2, i + 1))}
                    disabled={monthIdx === 2}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                    style={{ background: 'white', border: `1px solid rgba(0,83,51,0.12)`, color: C.muted }}
                  >
                    <ChevronRight size={16} />
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
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startOffset }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const iso = toISO(m.year, m.month, day);
                  const cls = dayClass(iso);
                  const isBlocked = cls === 'blocked';
                  const isStart   = cls === 'sel-start' || cls === 'sel-single';
                  const isEnd     = cls === 'sel-end' || cls === 'sel-single';
                  const isRange   = cls === 'in-range';

                  let bg = 'rgba(0,83,51,0.06)';
                  let color = C.green;
                  let border = 'transparent';
                  let borderRadius = '10px';
                  let cursor = 'pointer';
                  let opacity = 1;

                  if (isBlocked) {
                    bg = '#f1f5f9'; color = '#cbd5e1'; cursor = 'not-allowed'; opacity = 0.5;
                  } else if (isStart || isEnd) {
                    bg = C.green; color = 'white'; border = C.green;
                  } else if (isRange) {
                    bg = 'rgba(0,83,51,0.1)'; borderRadius = '0';
                  }

                  return (
                    <div
                      key={day}
                      onClick={() => handleDayClick(iso)}
                      className="aspect-square flex flex-col items-center justify-center text-sm font-semibold transition-all"
                      style={{
                        background: bg,
                        color,
                        border: `1.5px solid ${border}`,
                        borderRadius,
                        cursor,
                        opacity,
                        userSelect: 'none',
                      }}
                    >
                      <span>{day}</span>
                      {!isBlocked && (
                        <span
                          className="block mt-0.5"
                          style={{ width: 4, height: 4, borderRadius: '50%', background: isStart || isEnd ? 'rgba(255,255,255,0.7)' : C.green }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-5 pt-5" style={{ borderTop: `1px solid rgba(0,83,51,0.1)` }}>
                {[
                  { color: 'rgba(0,83,51,0.1)', label: 'Disponible' },
                  { color: C.green,              label: 'Seleccionado' },
                  { color: '#f1f5f9',             label: 'Bloqueado' },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
                    <span className="inline-block w-3 h-3 rounded" style={{ background: color, border: `1px solid rgba(0,83,51,0.15)` }} />
                    {label}
                  </div>
                ))}
                <div className="flex items-center gap-1.5 text-xs ml-auto" style={{ color: C.faint }}>
                  Tocá un día para empezar · tocá otro para terminar el rango
                </div>
              </div>
            </div>

            {/* Summary panel */}
            <div className="flex flex-col gap-4">

              {/* Selection card */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: `1px solid rgba(0,83,51,0.1)` }}>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid rgba(0,83,51,0.08)` }}>
                  <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: C.muted }}>Tu selección</p>
                </div>
                <div className="px-5 py-4">
                  {!startDate ? (
                    <p className="text-sm text-center py-4" style={{ color: C.faint }}>
                      Seleccioná tu fecha de llegada en el calendario
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: C.muted }}>Estadía</span>
                        <span className="font-semibold" style={{ color: C.dark }}>{tipoLabel}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: C.muted }}>Llegada</span>
                        <span className="font-semibold" style={{ color: C.dark }}>{formatDisplay(startDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: C.muted }}>Salida</span>
                        <span className="font-semibold" style={{ color: endDate ? C.dark : C.faint }}>
                          {endDate ? formatDisplay(endDate) : '(elegí en el cal.)'}
                        </span>
                      </div>
                      {nights > 0 && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span style={{ color: C.muted }}>Noches</span>
                            <span className="font-semibold flex items-center gap-1" style={{ color: C.dark }}>
                              <Moon size={12} /> {nights}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span style={{ color: C.muted }}>Personas</span>
                            <span className="font-semibold flex items-center gap-1" style={{ color: C.dark }}>
                              <Users size={12} /> {personas}
                            </span>
                          </div>
                          <div
                            className="flex justify-between text-sm pt-3 mt-3"
                            style={{ borderTop: `1px solid rgba(0,83,51,0.08)` }}
                          >
                            <span className="font-bold" style={{ color: C.dark }}>Precio estimado</span>
                            <span className="font-bold" style={{ color: C.green }}>
                              ${totalPrice.toLocaleString('es-AR')} ARS
                            </span>
                          </div>
                          <p className="text-[10px]" style={{ color: C.faint }}>
                            20% de descuento pagando en efectivo / transferencia · el precio final se confirma por WhatsApp
                          </p>
                        </>
                      )}

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold mt-2"
                        style={{ background: '#25D366', color: 'white' }}
                      >
                        <MessageCircle size={16} />
                        {nights > 0 ? 'Confirmar por WhatsApp' : 'Consultar disponibilidad'}
                      </a>

                      {nights > 0 && (
                        <div className="text-[11px] p-3 rounded-xl italic" style={{ background: 'rgba(37,211,102,0.06)', color: C.muted }}>
                          "{waMsg.replace(/\n/g, ' ')}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Availability summary */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: `1px solid rgba(0,83,51,0.1)` }}>
                <div className="px-5 py-4" style={{ borderBottom: `1px solid rgba(0,83,51,0.08)` }}>
                  <p className="text-[10px] tracking-widest uppercase font-bold" style={{ color: C.muted }}>Disponibilidad</p>
                </div>
                <div className="px-5 py-4 space-y-3">
                  {MONTHS.map(mo => (
                    <div key={mo.label} className="flex items-center gap-3">
                      <span className="text-xs font-bold w-8" style={{ color: C.dark }}>{mo.label.slice(0, 3)}</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,83,51,0.08)' }}>
                        <div className="h-full rounded-full" style={{ width: '100%', background: C.green }} />
                      </div>
                      <span className="text-[11px] font-semibold" style={{ color: C.green }}>{CAPACITY_PER_DAY} camas/día</span>
                    </div>
                  ))}
                  <p className="text-[10px] pt-1" style={{ color: C.faint }}>
                    Sin fechas bloqueadas · cupos actualizados en tiempo real
                  </p>
                </div>
              </div>

              {/* Reset */}
              {startDate && (
                <button
                  onClick={() => { setStartDate(null); setEndDate(null); setPickingEnd(false); }}
                  className="text-xs underline text-center"
                  style={{ color: C.faint }}
                >
                  Limpiar selección
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section className="py-14 px-4" style={{ backgroundColor: C.night }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[10px] tracking-widest uppercase font-bold mb-8" style={{ color: C.muted }}>
            ¿Cómo funciona?
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Elegís tus fechas', desc: 'Seleccioná llegada y salida en el calendario. Todos los días de julio, agosto y septiembre están disponibles.' },
              { num: '02', title: 'Confirmás por WhatsApp', desc: 'Tocás el botón y te abrimos una conversación con tu selección ya escrita. Sin formularios largos.' },
              { num: '03', title: 'Asegurás tu lugar con seña', desc: 'Te pasamos los datos para la transferencia del 30% de seña. El resto lo pagás al llegar.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3"
                  style={{ background: 'rgba(0,83,51,0.08)', color: C.green }}
                >
                  {num}
                </div>
                <p className="font-bold mb-1 text-sm" style={{ color: C.dark }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
