import React, { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight, RefreshCw, CheckCircle2, MessageCircle, Download, AlertTriangle, Search, LogIn, LogOut, CalendarClock, Plus, Copy, Link2 } from 'lucide-react';

// Dashboard interno de reservas — /admin/reservas. SIN LOGIN a propósito:
// la protección es Cloudflare Zero Trust Access a nivel DNS sobre /admin.
// Este componente asume que quien lo ve ya está autenticado de forma segura.
//
// Tres pestañas, pensadas para dos personas distintas que usan esto:
//   Operativa — "¿quién llega hoy / esta semana?" — cards rápidas + la
//               grilla de ocupación, para asignar camas al vuelo.
//   Métricas  — plata y números de negocio, para quien se sienta a analizar.
//   Historial — buscar cualquier reserva pasada, cualquier estado.
//
// Un mismo modal (ModalReserva) sirve para crear reservas manuales (falla de
// ManyChat, reserva cerrada por teléfono, otro canal como Airbnb) y para
// editar/cancelar las que ya existen. Cancelar NUNCA borra — pone
// estado='cancelada', así queda registrada en el Historial.
//
// Aislamiento de CSS: todo vive bajo la clase .admin-panel-scope. El sitio
// público define reglas globales (`* { font-family: 'Jost' }`,
// `h1,h2,h3,h4 { font-family: 'Gilda Display' }` en index.css) que de otra
// forma se colarían acá — el <style> de abajo las neutraliza con selectores
// más específicos, sin tocar el CSS global del sitio.

type TipoAlojamiento = 'domo' | 'refugio';
type VistaActiva = 'operativa' | 'metricas' | 'historial';
type EstadoReserva = 'pendiente' | 'confirmada' | 'cancelada';

type Alojamiento = {
  id: number;
  nombre: string;
  tipo: TipoAlojamiento;
  capacidad_total: number;
};

type Reserva = {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string | null;
  cliente_email: string | null;
  alojamiento_id: number;
  alojamiento_nombre: string;
  alojamiento_tipo: TipoAlojamiento;
  fecha_checkin: string;
  fecha_checkout: string;
  cantidad_personas: number;
  monto_total: number;
  monto_sena: number | null;
  estado: EstadoReserva;
  unidad_asignada: string | null;
  canal_origen: string | null;
  manychat_user_id: string | null;
  created_at: string;
};

type PendienteVieja = {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string | null;
  monto_sena: number | null;
  created_at: string;
  alojamiento_nombre: string;
};

type Metricas = {
  total_confirmadas: number;
  ingresos_senas: number;
  checkins_hoy: number;
  checkins_semana: number;
  checkouts_hoy: number;
  saldo_pendiente_total: number;
  total_a_facturar: number;
  pendientes_viejas: { cantidad: number; umbral_dias: number; items: PendienteVieja[] };
  conversion_manychat: { total: number; confirmadas: number; pct: number | null };
};

const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;
const toISODate = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (iso: string, days: number) => {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return toISODate(d);
};
const fmtDateShort = (iso: string) => {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
};
const fmtDateLong = (iso: string) => {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
};
const diasDesde = (iso: string) => Math.floor((Date.now() - new Date(iso.replace(' ', 'T') + 'Z').getTime()) / 86400000);

const VENTANA_DIAS = 14;
const CANALES_SUGERIDOS = ['ManyChat', 'WhatsApp', 'Instagram', 'Airbnb', 'Teléfono', 'Manual'];

// La reserva ocupa [checkin, checkout) — el día de checkout ya no cuenta como ocupado.
const ocupaFecha = (r: Reserva, fecha: string) => r.fecha_checkin <= fecha && fecha < r.fecha_checkout;

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';

const waLink = (telefono: string) => `https://wa.me/${telefono.replace(/\D/g, '')}`;

function csvEscape(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function descargarCsv(reservas: Reserva[]) {
  const columnas = ['cliente_nombre', 'cliente_telefono', 'alojamiento_nombre', 'fecha_checkin', 'fecha_checkout', 'cantidad_personas', 'estado', 'canal_origen', 'monto_total', 'monto_sena', 'unidad_asignada'];
  const filas = reservas.map(r => columnas.map(c => csvEscape((r as any)[c])).join(','));
  const csv = [columnas.join(','), ...filas].join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reservas_${toISODate(new Date())}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const MetricCard: React.FC<{ label: string; value: string; accent?: 'brand' | 'gold' | 'red'; hint?: string; compact?: boolean; icon?: React.ReactNode }> = ({
  label, value, accent = 'brand', hint, compact, icon,
}) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${compact ? 'p-4' : 'p-5'}`}>
    <div className="flex items-center gap-1.5 mb-2">
      {icon}
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 truncate">{label}</p>
    </div>
    <p className={`${compact ? 'text-xl sm:text-2xl' : 'text-2xl'} font-bold tabular-nums ${accent === 'gold' ? 'text-gold' : accent === 'red' ? 'text-red-600' : 'text-brand'}`}>
      {value}
    </p>
    {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
  </div>
);

function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onEscape(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onEscape]);
}

const ModalBase: React.FC<{ onClose: () => void; children: React.ReactNode; titulo: string; ancho?: string }> = ({ onClose, children, titulo, ancho = 'sm:max-w-md' }) => {
  useEscapeKey(onClose);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      style={{ backgroundColor: 'rgba(15,20,18,0.55)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
    >
      <div
        className={`bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full ${ancho} p-6 max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-800">{titulo}</h3>
          <button onClick={onClose} className={`text-gray-400 hover:text-gray-700 rounded-full p-1 -m-1 ${FOCUS_RING}`} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

type FormReserva = {
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email: string;
  alojamiento_id: string;
  fecha_checkin: string;
  fecha_checkout: string;
  cantidad_personas: string;
  monto_total: string;
  monto_sena: string;
  estado: EstadoReserva;
  canal_origen: string;
  unidad_asignada: string;
};

const ModalReserva: React.FC<{
  modo: 'crear' | 'editar';
  reserva: Reserva | null;
  alojamientos: Alojamiento[];
  onClose: () => void;
  onGuardado: () => void;
}> = ({ modo, reserva, alojamientos, onClose, onGuardado }) => {
  const [form, setForm] = useState<FormReserva>(() => ({
    cliente_nombre: reserva?.cliente_nombre || '',
    cliente_telefono: reserva?.cliente_telefono || '',
    cliente_email: reserva?.cliente_email || '',
    alojamiento_id: reserva ? String(reserva.alojamiento_id) : (alojamientos[0] ? String(alojamientos[0].id) : ''),
    fecha_checkin: reserva ? reserva.fecha_checkin.slice(0, 10) : '',
    fecha_checkout: reserva ? reserva.fecha_checkout.slice(0, 10) : '',
    cantidad_personas: reserva ? String(reserva.cantidad_personas) : '2',
    monto_total: reserva ? String(reserva.monto_total) : '',
    monto_sena: reserva?.monto_sena != null ? String(reserva.monto_sena) : '',
    estado: reserva?.estado || 'confirmada',
    canal_origen: reserva?.canal_origen || 'Manual',
    unidad_asignada: reserva?.unidad_asignada || '',
  }));
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [confirmandoCancelar, setConfirmandoCancelar] = useState(false);
  const [cancelando, setCancelando] = useState(false);

  const setCampo = (campo: keyof FormReserva, valor: string) => setForm(f => ({ ...f, [campo]: valor }));

  const validar = (): string | null => {
    if (!form.cliente_nombre.trim()) return 'Falta el nombre del huésped.';
    if (!form.alojamiento_id) return 'Elegí un alojamiento.';
    if (!form.fecha_checkin || !form.fecha_checkout) return 'Faltan las fechas.';
    if (form.fecha_checkout <= form.fecha_checkin) return 'El check-out debe ser posterior al check-in.';
    if (!form.cantidad_personas || Number(form.cantidad_personas) < 1) return 'Cantidad de personas inválida.';
    if (form.monto_total === '' || Number(form.monto_total) < 0) return 'Falta el monto total.';
    return null;
  };

  const guardar = async () => {
    const problema = validar();
    if (problema) { setError(problema); return; }

    setGuardando(true);
    setError('');
    setAviso('');
    try {
      if (modo === 'crear') {
        const res = await fetch('/api/admin/crear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cliente_nombre: form.cliente_nombre.trim(),
            cliente_telefono: form.cliente_telefono.trim() || null,
            cliente_email: form.cliente_email.trim() || null,
            alojamiento_id: Number(form.alojamiento_id),
            fecha_checkin: form.fecha_checkin,
            fecha_checkout: form.fecha_checkout,
            cantidad_personas: Number(form.cantidad_personas),
            monto_total: Number(form.monto_total),
            monto_sena: form.monto_sena !== '' ? Number(form.monto_sena) : null,
            estado: form.estado,
            canal_origen: form.canal_origen.trim() || 'Manual',
          }),
        });
        const data: any = await res.json();
        if (!res.ok) throw new Error(data.error || 'No se pudo crear.');
        if (data.disponible === false) {
          setAviso('Se cargó igual, pero esas fechas se solapan con otra reserva en ese alojamiento — revisalo.');
        }
      } else if (reserva) {
        const res = await fetch('/api/admin/editar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reserva_id: reserva.id,
            cliente_nombre: form.cliente_nombre.trim(),
            cliente_telefono: form.cliente_telefono.trim() || null,
            cliente_email: form.cliente_email.trim() || null,
            alojamiento_id: Number(form.alojamiento_id),
            fecha_checkin: form.fecha_checkin,
            fecha_checkout: form.fecha_checkout,
            cantidad_personas: Number(form.cantidad_personas),
            monto_total: Number(form.monto_total),
            monto_sena: form.monto_sena !== '' ? Number(form.monto_sena) : null,
            estado: form.estado,
            canal_origen: form.canal_origen.trim() || null,
            unidad_asignada: form.unidad_asignada.trim() || null,
          }),
        });
        const data: any = await res.json();
        if (!res.ok) throw new Error(data.error || 'No se pudo guardar.');
      }
      setGuardado(true);
      onGuardado();
      setTimeout(onClose, aviso ? 1600 : 700);
    } catch (e: any) {
      setError(e.message || 'Ocurrió un error.');
    } finally {
      setGuardando(false);
    }
  };

  const cancelarReserva = async () => {
    if (!reserva) return;
    setCancelando(true);
    try {
      const res = await fetch('/api/admin/editar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reserva_id: reserva.id, estado: 'cancelada' }),
      });
      if (!res.ok) throw new Error('failed');
      onGuardado();
      onClose();
    } catch {
      setCancelando(false);
      setError('No se pudo cancelar. Probá de nuevo.');
    }
  };

  const inputCls = `w-full text-sm border border-gray-300 rounded-lg px-3 py-2.5 ${FOCUS_RING}`;
  const labelCls = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1';

  return (
    <ModalBase titulo={modo === 'crear' ? 'Nueva reserva' : 'Editar reserva'} onClose={onClose} ancho="sm:max-w-lg">
      {modo === 'crear' && (
        <p className="text-xs text-gray-500 mb-4 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          Para cargar reservas que no vinieron por ManyChat: falló el bot, se cerró por teléfono, vino de Airbnb, etc.
        </p>
      )}

      <div className="space-y-3 mb-4">
        <div>
          <label className={labelCls} htmlFor="f_nombre">Nombre del huésped *</label>
          <input id="f_nombre" autoFocus className={inputCls} value={form.cliente_nombre} onChange={e => setCampo('cliente_nombre', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="f_tel">Teléfono</label>
            <input id="f_tel" className={inputCls} value={form.cliente_telefono} onChange={e => setCampo('cliente_telefono', e.target.value)} placeholder="+54 9 ..." />
          </div>
          <div>
            <label className={labelCls} htmlFor="f_email">Email</label>
            <input id="f_email" type="email" className={inputCls} value={form.cliente_email} onChange={e => setCampo('cliente_email', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="f_aloj">Alojamiento *</label>
            <select id="f_aloj" className={inputCls} value={form.alojamiento_id} onChange={e => setCampo('alojamiento_id', e.target.value)}>
              {alojamientos.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="f_estado">Estado *</label>
            <select id="f_estado" className={inputCls} value={form.estado} onChange={e => setCampo('estado', e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="f_in">Check-in *</label>
            <input id="f_in" type="date" className={`${inputCls} tabular-nums`} value={form.fecha_checkin} onChange={e => setCampo('fecha_checkin', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f_out">Check-out *</label>
            <input id="f_out" type="date" className={`${inputCls} tabular-nums`} value={form.fecha_checkout} onChange={e => setCampo('fecha_checkout', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="f_personas">Personas *</label>
            <input id="f_personas" type="number" inputMode="numeric" min={1} className={inputCls} value={form.cantidad_personas} onChange={e => setCampo('cantidad_personas', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f_canal">Canal</label>
            <input id="f_canal" list="canales-sugeridos" className={inputCls} value={form.canal_origen} onChange={e => setCampo('canal_origen', e.target.value)} />
            <datalist id="canales-sugeridos">
              {CANALES_SUGERIDOS.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="f_total">Monto total *</label>
            <input id="f_total" type="number" inputMode="decimal" min={0} className={`${inputCls} tabular-nums`} value={form.monto_total} onChange={e => setCampo('monto_total', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="f_sena">Seña</label>
            <input id="f_sena" type="number" inputMode="decimal" min={0} className={`${inputCls} tabular-nums`} value={form.monto_sena} onChange={e => setCampo('monto_sena', e.target.value)} />
          </div>
        </div>

        {modo === 'editar' && (
          <div>
            <label className={labelCls} htmlFor="f_unidad">Cama / unidad asignada</label>
            <input id="f_unidad" className={inputCls} value={form.unidad_asignada} onChange={e => setCampo('unidad_asignada', e.target.value)} placeholder="Ej. Cama 3 Habitación 1" />
          </div>
        )}

        {modo === 'editar' && reserva?.cliente_telefono && (
          <a href={waLink(reserva.cliente_telefono)} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs text-brand hover:underline rounded ${FOCUS_RING}`}>
            <MessageCircle size={13} aria-hidden="true" /> Escribirle por WhatsApp
          </a>
        )}
      </div>

      {error && <p className="text-xs text-red-600 mb-3" role="alert">{error}</p>}
      {aviso && !error && <p className="text-xs text-amber-600 mb-3" role="alert">{aviso}</p>}

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className={`text-sm font-semibold px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 ${FOCUS_RING}`}>
          Cerrar
        </button>
        <button
          onClick={guardar}
          disabled={guardando || guardado}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg text-white bg-brand disabled:opacity-60 ${FOCUS_RING}`}
        >
          {guardando && 'Guardando…'}
          {guardado && (<><CheckCircle2 size={16} aria-hidden="true" /> Guardado</>)}
          {!guardando && !guardado && 'Guardar'}
        </button>
      </div>

      {modo === 'editar' && reserva && reserva.estado !== 'cancelada' && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          {!confirmandoCancelar ? (
            <button onClick={() => setConfirmandoCancelar(true)} className={`text-xs font-semibold text-red-600 hover:underline rounded ${FOCUS_RING}`}>
              Cancelar esta reserva
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2 bg-red-50 rounded-lg px-3 py-2.5">
              <p className="text-xs text-red-700">¿Seguro? No se borra — queda registrada como "cancelada".</p>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setConfirmandoCancelar(false)} className={`text-xs font-semibold text-gray-500 hover:text-gray-700 rounded ${FOCUS_RING}`}>
                  No
                </button>
                <button
                  onClick={cancelarReserva}
                  disabled={cancelando}
                  className={`text-xs font-semibold text-white bg-red-600 rounded-lg px-2.5 py-1.5 disabled:opacity-60 ${FOCUS_RING}`}
                >
                  {cancelando ? 'Cancelando…' : 'Sí, cancelar'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ModalBase>
  );
};

const ModalSeleccionarReserva: React.FC<{
  alojamiento: Alojamiento;
  fecha: string;
  reservas: Reserva[];
  onClose: () => void;
  onSeleccionar: (r: Reserva) => void;
}> = ({ alojamiento, fecha, reservas, onClose, onSeleccionar }) => (
  <ModalBase titulo={`${alojamiento.nombre} · ${fmtDateLong(fecha)}`} onClose={onClose}>
    <ul className="space-y-2">
      {reservas.map(r => (
        <li key={r.id}>
          <button
            onClick={() => onSeleccionar(r)}
            className={`w-full text-left text-sm border border-gray-200 rounded-lg px-3 py-2.5 hover:border-brand hover:bg-brand/5 transition-colors ${FOCUS_RING}`}
          >
            <p className="font-semibold text-gray-800">{r.cliente_nombre}</p>
            <p className="text-xs text-gray-500">
              {r.cantidad_personas} persona(s) · {r.unidad_asignada ? `Asignado: ${r.unidad_asignada}` : 'Sin asignar'}
            </p>
          </button>
        </li>
      ))}
    </ul>
  </ModalBase>
);

const PendientesViejasAlerta: React.FC<{ data: Metricas['pendientes_viejas']; onClickReserva: (id: number) => void }> = ({ data, onClickReserva }) => {
  if (data.cantidad === 0) return null;
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-6">
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-amber-800 mb-2">
            {data.cantidad} reserva{data.cantidad !== 1 ? 's' : ''} pendiente{data.cantidad !== 1 ? 's' : ''} hace más de {data.umbral_dias} días sin confirmar pago
          </p>
          <ul className="space-y-1.5">
            {data.items.map(p => (
              <li key={p.id} className="flex items-center justify-between gap-3 text-xs bg-white/60 rounded-lg px-3 py-2">
                <button onClick={() => onClickReserva(p.id)} className={`text-left font-medium text-gray-700 hover:text-brand truncate rounded ${FOCUS_RING}`}>
                  {p.cliente_nombre} · {p.alojamiento_nombre} · hace {diasDesde(p.created_at)} días
                </button>
                {p.cliente_telefono && (
                  <a
                    href={waLink(p.cliente_telefono)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-brand font-semibold flex-shrink-0 hover:underline rounded ${FOCUS_RING}`}
                  >
                    <MessageCircle size={12} aria-hidden="true" /> Escribir
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ESTADO_BADGE: Record<string, string> = {
  confirmada: 'bg-green-100 text-green-800',
  pendiente: 'bg-amber-100 text-amber-800',
  cancelada: 'bg-gray-100 text-gray-500',
};

const EstadoBadge: React.FC<{ estado: string }> = ({ estado }) => (
  <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${ESTADO_BADGE[estado] || 'bg-gray-100 text-gray-600'}`}>
    {estado}
  </span>
);

const TablaHistorial: React.FC<{ reservas: Reserva[]; onSeleccionar: (r: Reserva) => void }> = ({ reservas, onSeleccionar }) => (
  <>
    {/* Tabla — pantallas sm y más grandes */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="text-sm border-collapse w-full">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5">Huésped</th>
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5">Alojamiento</th>
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5 tabular-nums">Fechas</th>
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5">Estado</th>
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5">Canal</th>
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums">Total</th>
            <th scope="col" className="border-b border-gray-200 px-3 py-2.5">Unidad</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(r => (
            <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-3 py-2.5">
                <button onClick={() => onSeleccionar(r)} className={`font-semibold text-gray-800 hover:text-brand text-left rounded ${FOCUS_RING}`}>
                  {r.cliente_nombre}
                </button>
                {r.cliente_telefono && <p className="text-xs text-gray-400">{r.cliente_telefono}</p>}
              </td>
              <td className="px-3 py-2.5 text-gray-600">{r.alojamiento_nombre}</td>
              <td className="px-3 py-2.5 text-gray-600 tabular-nums whitespace-nowrap">{fmtDateShort(r.fecha_checkin)}–{fmtDateShort(r.fecha_checkout)}</td>
              <td className="px-3 py-2.5"><EstadoBadge estado={r.estado} /></td>
              <td className="px-3 py-2.5 text-gray-500">{r.canal_origen || '—'}</td>
              <td className="px-3 py-2.5 text-right text-gray-700 tabular-nums">{fmtMoney(r.monto_total)}</td>
              <td className="px-3 py-2.5 text-gray-500">{r.unidad_asignada || '—'}</td>
            </tr>
          ))}
          {reservas.length === 0 && (
            <tr><td colSpan={7} className="px-3 py-8 text-center text-sm text-gray-400">Sin resultados para esa búsqueda.</td></tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Lista de tarjetas — mobile */}
    <div className="sm:hidden divide-y divide-gray-100">
      {reservas.map(r => (
        <button
          key={r.id}
          onClick={() => onSeleccionar(r)}
          className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 ${FOCUS_RING}`}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-gray-800 text-sm truncate">{r.cliente_nombre}</p>
            <EstadoBadge estado={r.estado} />
          </div>
          <p className="text-xs text-gray-500 tabular-nums mb-0.5">
            {r.alojamiento_nombre} · {fmtDateShort(r.fecha_checkin)}–{fmtDateShort(r.fecha_checkout)}
          </p>
          <div className="flex items-center justify-between gap-2 text-xs text-gray-400">
            <span>{r.canal_origen || 'Sin canal'}{r.unidad_asignada ? ` · ${r.unidad_asignada}` : ''}</span>
            <span className="font-semibold text-gray-600 tabular-nums">{fmtMoney(r.monto_total)}</span>
          </div>
        </button>
      ))}
      {reservas.length === 0 && (
        <p className="px-4 py-8 text-center text-sm text-gray-400">Sin resultados para esa búsqueda.</p>
      )}
    </div>
  </>
);

type ResumenSync = Record<string, { nuevas: number; actualizadas: number; canceladas: number } | { error: string }>;

const SeccionAirbnb: React.FC<{ alojamientos: Alojamiento[]; onSincronizado: () => void }> = ({ alojamientos, onSincronizado }) => {
  const [copiado, setCopiado] = useState<number | null>(null);
  const [sincronizando, setSincronizando] = useState(false);
  const [resumen, setResumen] = useState<ResumenSync | null>(null);
  const [error, setError] = useState('');

  const copiarLink = (id: number) => {
    const link = `${window.location.origin}/api/ical?alojamiento_id=${id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiado(id);
      setTimeout(() => setCopiado(null), 1800);
    });
  };

  const sincronizar = async () => {
    setSincronizando(true);
    setError('');
    setResumen(null);
    try {
      const res = await fetch('/api/admin/sync-airbnb', { method: 'POST' });
      const data: any = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo sincronizar.');
      setResumen(data.resumen);
      onSincronizado();
    } catch (e: any) {
      setError(e.message || 'Ocurrió un error.');
    } finally {
      setSincronizando(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm col-span-2 lg:col-span-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Integración con Airbnb</p>

      <div className="grid sm:grid-cols-3 gap-2 mb-4">
        {alojamientos.map(a => (
          <button
            key={a.id}
            onClick={() => copiarLink(a.id)}
            className={`flex items-center justify-between gap-2 text-xs border border-gray-200 rounded-lg px-3 py-2.5 hover:bg-gray-50 ${FOCUS_RING}`}
          >
            <span className="flex items-center gap-1.5 text-gray-600"><Link2 size={13} className="text-gray-400 flex-shrink-0" aria-hidden="true" />{a.nombre}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand flex-shrink-0">
              <Copy size={12} aria-hidden="true" /> {copiado === a.id ? 'Copiado' : 'Copiar link'}
            </span>
          </button>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 mb-4">
        Pegá el link de cada alojamiento en Airbnb → Calendario → Sincronizar calendarios → Importar calendario. Así Airbnb bloquea tus fechas ocupadas acá.
      </p>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={sincronizar}
          disabled={sincronizando}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg text-white bg-brand disabled:opacity-60 ${FOCUS_RING}`}
        >
          <RefreshCw size={15} className={sincronizando ? 'animate-spin' : ''} aria-hidden="true" />
          {sincronizando ? 'Sincronizando…' : 'Sincronizar con Airbnb'}
        </button>
        <p className="text-[11px] text-gray-400 mt-2">
          Trae las reservas del calendario de Airbnb hacia acá. Hay que configurar la URL del .ics de Airbnb de cada alojamiento primero (variables de entorno AIRBNB_ICS_URL_1/2/3) — sin eso, no hay nada para sincronizar.
        </p>

        {error && <p className="text-xs text-red-600 mt-3" role="alert">{error}</p>}

        {resumen && (
          <ul className="mt-3 space-y-1">
            {Object.entries(resumen).map(([nombre, r]) => (
              <li key={nombre} className="text-xs text-gray-600">
                <span className="font-semibold">{nombre}:</span>{' '}
                {'error' in r ? <span className="text-red-600">{r.error}</span> : `${r.nuevas} nueva(s), ${r.actualizadas} actualizada(s), ${r.canceladas} cancelada(s)`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const PanelReservas: React.FC = () => {
  const [vistaActiva, setVistaActiva] = useState<VistaActiva>('operativa');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservasHistorial, setReservasHistorial] = useState<Reserva[] | null>(null);
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ventanaInicio, setVentanaInicio] = useState(() => toISODate(new Date()));
  const [busqueda, setBusqueda] = useState('');

  const [celdaMultiple, setCeldaMultiple] = useState<{ alojamiento: Alojamiento; fecha: string; reservas: Reserva[] } | null>(null);
  const [modalReserva, setModalReserva] = useState<{ modo: 'crear' | 'editar'; reserva: Reserva | null } | null>(null);

  const cargarOperativa = () => {
    setLoading(true);
    setError(null);
    fetch('/api/admin/reservas')
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(data => {
        setReservas(data.reservas || []);
        setAlojamientos(data.alojamientos || []);
        setMetricas(data.metricas || null);
      })
      .catch(err => setError(err.message || 'Error al cargar las reservas'))
      .finally(() => setLoading(false));
  };

  const cargarHistorial = () => {
    setLoading(true);
    setError(null);
    return fetch('/api/admin/reservas?vista=historial')
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(data => { setReservasHistorial(data.reservas || []); return data.reservas || []; })
      .catch(err => { setError(err.message || 'Error al cargar el historial'); return []; })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = 'Dashboard — Pueblo Mágico';
    cargarOperativa();
  }, []);

  useEffect(() => {
    if (vistaActiva === 'historial' && reservasHistorial === null) cargarHistorial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vistaActiva]);

  const actualizar = () => (vistaActiva === 'historial' ? cargarHistorial() : cargarOperativa());

  // Después de crear/editar/cancelar, refrescamos desde el servidor en vez de
  // parchear el estado a mano — los cambios pueden tocar fechas, alojamiento,
  // montos, todo lo que alimenta la grilla y las métricas.
  const handleGuardado = () => {
    cargarOperativa();
    if (reservasHistorial !== null) cargarHistorial();
  };

  const abrirPorId = async (id: number) => {
    let r = reservas.find(x => x.id === id) || (reservasHistorial || []).find(x => x.id === id);
    if (!r) {
      // No estaba en lo ya cargado — típico de una pendiente vieja para
      // fechas ya pasadas, que no entra en la vista operativa. La buscamos
      // en el historial completo.
      const historial = await cargarHistorial();
      r = historial.find((x: Reserva) => x.id === id);
    }
    if (r) setModalReserva({ modo: 'editar', reserva: r });
  };

  const dias = useMemo(
    () => Array.from({ length: VENTANA_DIAS }, (_, i) => addDays(ventanaInicio, i)),
    [ventanaInicio]
  );

  // % de ocupación de la ventana visible: domo cuenta como unidad completa
  // ocupada (se alquila entero), refugio cuenta por personas/capacidad.
  const ocupacionPct = useMemo(() => {
    if (alojamientos.length === 0) return null;
    let ocupado = 0;
    let total = 0;
    for (const aloj of alojamientos) {
      for (const fecha of dias) {
        total += aloj.capacidad_total;
        const enCelda = reservas.filter(r => r.alojamiento_id === aloj.id && ocupaFecha(r, fecha));
        if (enCelda.length === 0) continue;
        if (aloj.tipo === 'domo') ocupado += aloj.capacidad_total;
        else ocupado += Math.min(enCelda.reduce((s, r) => s + r.cantidad_personas, 0), aloj.capacidad_total);
      }
    }
    return total > 0 ? Math.round((ocupado / total) * 1000) / 10 : null;
  }, [alojamientos, reservas, dias]);

  const abrirCelda = (alojamiento: Alojamiento, fecha: string) => {
    const enEsaCelda = reservas.filter(r => r.alojamiento_id === alojamiento.id && ocupaFecha(r, fecha));
    if (enEsaCelda.length === 0) return;
    if (enEsaCelda.length === 1) setModalReserva({ modo: 'editar', reserva: enEsaCelda[0] });
    else setCeldaMultiple({ alojamiento, fecha, reservas: enEsaCelda });
  };

  const reservasHistorialFiltradas = useMemo(() => {
    const base = reservasHistorial || [];
    const q = busqueda.trim().toLowerCase();
    if (!q) return base;
    return base.filter(r => r.cliente_nombre.toLowerCase().includes(q) || (r.cliente_telefono || '').includes(q));
  }, [reservasHistorial, busqueda]);

  const TABS: { key: VistaActiva; label: string }[] = [
    { key: 'operativa', label: 'Operativa' },
    { key: 'metricas', label: 'Métricas' },
    { key: 'historial', label: 'Historial' },
  ];

  return (
    <div className="admin-panel-scope min-h-screen bg-gray-50">
      <style>{`
        .admin-panel-scope, .admin-panel-scope * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
        }
        .admin-panel-scope h1, .admin-panel-scope h2, .admin-panel-scope h3, .admin-panel-scope h4 {
          font-family: inherit;
        }
      `}</style>

      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-2 mb-3 sm:mb-0">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-400">Pueblo Mágico</p>
              <h1 className="text-lg sm:text-xl font-bold text-brand">Dashboard de Reservas</h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setModalReserva({ modo: 'crear', reserva: null })}
                aria-label="Nueva reserva"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3 sm:px-4 py-2.5 text-white bg-brand hover:opacity-90 transition-opacity ${FOCUS_RING}`}
              >
                <Plus size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Nueva reserva</span>
              </button>
              <button
                onClick={actualizar}
                disabled={loading}
                aria-label="Actualizar"
                className={`inline-flex items-center gap-2 text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2.5 hover:bg-gray-100 transition-colors disabled:opacity-60 ${FOCUS_RING}`}
              >
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1 sm:inline-flex sm:mt-3" role="tablist" aria-label="Vista">
            {TABS.map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={vistaActiva === t.key}
                onClick={() => setVistaActiva(t.key)}
                className={`flex-1 sm:flex-none text-sm font-semibold px-3 sm:px-4 py-2 rounded-md transition-colors ${FOCUS_RING} ${
                  vistaActiva === t.key ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6" role="alert">
            No se pudo cargar: {error}
          </div>
        )}

        {vistaActiva === 'operativa' && (
          <>
            {metricas && <PendientesViejasAlerta data={metricas.pendientes_viejas} onClickReserva={abrirPorId} />}

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
              <MetricCard compact label="Llegan" value={metricas ? String(metricas.checkins_hoy) : '—'} hint="Hoy" icon={<LogIn size={13} className="text-gray-400 flex-shrink-0" aria-hidden="true" />} />
              <MetricCard compact label="Semana" value={metricas ? String(metricas.checkins_semana) : '—'} hint="Llegan" icon={<CalendarClock size={13} className="text-gray-400 flex-shrink-0" aria-hidden="true" />} />
              <MetricCard compact label="Se van" value={metricas ? String(metricas.checkouts_hoy) : '—'} hint="Hoy" icon={<LogOut size={13} className="text-gray-400 flex-shrink-0" aria-hidden="true" />} />
            </div>

            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Grilla de ocupación {loading && <span className="font-normal normal-case text-gray-400">(cargando…)</span>}
              </h2>
              <div className="flex items-center gap-2" role="group" aria-label="Navegar semanas">
                <button onClick={() => setVentanaInicio(prev => addDays(prev, -7))} className={`inline-flex items-center gap-1 text-xs font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 ${FOCUS_RING}`}>
                  <ChevronLeft size={14} aria-hidden="true" /> <span className="hidden xs:inline">Anterior</span>
                </button>
                <button onClick={() => setVentanaInicio(toISODate(new Date()))} className={`text-xs font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 ${FOCUS_RING}`}>
                  Hoy
                </button>
                <button onClick={() => setVentanaInicio(prev => addDays(prev, 7))} className={`inline-flex items-center gap-1 text-xs font-semibold border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 ${FOCUS_RING}`}>
                  <span className="hidden xs:inline">Siguiente</span> <ChevronRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
              {!loading && reservas.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">Todavía no hay reservas cargadas</p>
                  <p className="text-xs text-gray-400 mb-4">Cuando se confirme una reserva (o se cargue el histórico), va a aparecer acá.</p>
                  <button
                    onClick={() => setModalReserva({ modo: 'crear', reserva: null })}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline rounded ${FOCUS_RING}`}
                  >
                    <Plus size={15} aria-hidden="true" /> Cargar una reserva manual
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="text-sm border-collapse w-full">
                    <caption className="sr-only">Ocupación por alojamiento y fecha, {fmtDateLong(dias[0])} a {fmtDateLong(dias[dias.length - 1])}</caption>
                    <thead>
                      <tr>
                        <th scope="col" className="sticky left-0 bg-gray-50 border-b border-r border-gray-200 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                          Alojamiento
                        </th>
                        {dias.map(fecha => (
                          <th key={fecha} scope="col" className="bg-gray-50 border-b border-gray-200 px-2 py-2.5 text-center text-xs font-semibold text-gray-500 whitespace-nowrap min-w-[56px] sm:min-w-[64px] tabular-nums">
                            {fmtDateShort(fecha)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {alojamientos.map(aloj => (
                        <tr key={aloj.id} className="border-b border-gray-100 last:border-0">
                          <th scope="row" className="sticky left-0 bg-white border-r border-gray-200 px-3 py-2.5 text-left font-semibold text-gray-700 whitespace-nowrap text-xs sm:text-sm">
                            {aloj.nombre}
                          </th>
                          {dias.map(fecha => {
                            const enCelda = reservas.filter(r => r.alojamiento_id === aloj.id && ocupaFecha(r, fecha));
                            const vacia = enCelda.length === 0;
                            const hayPendiente = enCelda.some(r => r.estado === 'pendiente');

                            let contenido: string;
                            let colorClases: string;
                            let estadoTexto: string;
                            if (vacia) {
                              contenido = '';
                              colorClases = 'bg-white text-gray-300';
                              estadoTexto = 'libre';
                            } else if (aloj.tipo === 'refugio') {
                              const ocupadas = enCelda.reduce((s, r) => s + r.cantidad_personas, 0);
                              contenido = `${ocupadas}/${aloj.capacidad_total}`;
                              const ratio = ocupadas / aloj.capacidad_total;
                              if (hayPendiente) { colorClases = 'bg-amber-100 text-amber-800'; estadoTexto = 'con reserva pendiente'; }
                              else if (ratio >= 0.9) { colorClases = 'bg-red-100 text-red-800'; estadoTexto = 'casi lleno'; }
                              else { colorClases = 'bg-green-100 text-green-800'; estadoTexto = 'confirmado'; }
                            } else {
                              contenido = enCelda.length === 1 ? enCelda[0].cliente_nombre.split(' ')[0] : `${enCelda.length} res.`;
                              colorClases = hayPendiente ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800';
                              estadoTexto = hayPendiente ? 'con reserva pendiente' : 'confirmado';
                            }

                            const etiqueta = vacia
                              ? `${aloj.nombre}, ${fmtDateLong(fecha)}, libre`
                              : `${aloj.nombre}, ${fmtDateLong(fecha)}, ${estadoTexto}: ${enCelda.map(r => r.cliente_nombre).join(', ')}`;

                            return (
                              <td key={fecha} className="border-b border-gray-100 p-1 text-center align-middle">
                                <button
                                  onClick={() => abrirCelda(aloj, fecha)}
                                  disabled={vacia}
                                  aria-label={etiqueta}
                                  title={enCelda.map(r => r.cliente_nombre).join(', ')}
                                  className={`w-full h-11 rounded-md text-[11px] font-semibold px-1 truncate tabular-nums transition-transform ${FOCUS_RING} ${colorClases} ${
                                    vacia ? 'cursor-default' : 'cursor-pointer active:scale-95 sm:hover:scale-105'
                                  }`}
                                >
                                  {contenido}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-100 border border-green-200 inline-block" aria-hidden="true" /> Confirmada</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-100 border border-amber-200 inline-block" aria-hidden="true" /> Pendiente</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-200 inline-block" aria-hidden="true" /> Refugio casi lleno</span>
              <span className="w-full sm:w-auto">Tocá una celda ocupada para editar, asignar cama o cancelar.</span>
            </div>
          </>
        )}

        {vistaActiva === 'metricas' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <MetricCard label="Reservas confirmadas" value={metricas ? String(metricas.total_confirmadas) : '—'} />
            <MetricCard label="Ingresos por señas" value={metricas ? fmtMoney(metricas.ingresos_senas) : '—'} accent="gold" />
            <MetricCard label="Saldo pendiente a cobrar" value={metricas ? fmtMoney(metricas.saldo_pendiente_total) : '—'} hint="Al check-in, confirmadas" />
            <MetricCard label="Total a facturar" value={metricas ? fmtMoney(metricas.total_a_facturar) : '—'} accent="gold" hint="Si se cobra todo" />
            <MetricCard label="Ocupación (14 días)" value={ocupacionPct !== null ? `${ocupacionPct}%` : '—'} />
            <MetricCard
              label="Conversión ManyChat"
              value={metricas?.conversion_manychat.pct !== null && metricas ? `${metricas.conversion_manychat.pct}%` : 'Sin datos'}
              hint={metricas ? `${metricas.conversion_manychat.confirmadas} de ${metricas.conversion_manychat.total} pagaron` : undefined}
            />
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Exportar</p>
              <button
                onClick={() => descargarCsv(reservas)}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline rounded ${FOCUS_RING}`}
              >
                <Download size={15} aria-hidden="true" /> Descargar CSV (vista operativa)
              </button>
            </div>
            <SeccionAirbnb alojamientos={alojamientos} onSincronizado={handleGuardado} />
          </div>
        )}

        {vistaActiva === 'historial' && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Historial completo {loading && <span className="font-normal normal-case text-gray-400">(cargando…)</span>}
              </h2>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    type="search"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o teléfono…"
                    aria-label="Buscar reservas"
                    className={`text-sm border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 sm:py-2 w-full sm:w-64 ${FOCUS_RING}`}
                  />
                </div>
                <button
                  onClick={() => descargarCsv(reservasHistorialFiltradas)}
                  aria-label="Descargar CSV"
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold border border-gray-300 rounded-lg px-3 py-2.5 sm:py-2 hover:bg-gray-100 flex-shrink-0 ${FOCUS_RING}`}
                >
                  <Download size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <TablaHistorial reservas={reservasHistorialFiltradas} onSeleccionar={r => setModalReserva({ modo: 'editar', reserva: r })} />
            </div>
          </>
        )}
      </main>

      {celdaMultiple && (
        <ModalSeleccionarReserva
          alojamiento={celdaMultiple.alojamiento}
          fecha={celdaMultiple.fecha}
          reservas={celdaMultiple.reservas}
          onClose={() => setCeldaMultiple(null)}
          onSeleccionar={r => { setCeldaMultiple(null); setModalReserva({ modo: 'editar', reserva: r }); }}
        />
      )}

      {modalReserva && (
        <ModalReserva
          modo={modalReserva.modo}
          reserva={modalReserva.reserva}
          alojamientos={alojamientos}
          onClose={() => setModalReserva(null)}
          onGuardado={handleGuardado}
        />
      )}
    </div>
  );
};

export default PanelReservas;
