import React from 'react';
import { WA_CICLO_VITAL_FEMENINO } from '../data/config';
import { RETREATS_DATA } from '../data/retreats';

const INCLUYE = [
  'Todas las comidas',
  'Acompañamiento personalizado',
  'Kit de proceso de transformación',
  'Dos noches en Pueblo Mágico (biocosmética y blancos incluidos)',
];

const CicloVitalFemeninoPrecios: React.FC = () => {
  const {
    dates, priceSola, priceAcompanada, senia, segundoPago, segundoPagoFecha,
    valorReferenciaARS, currency, message, cupos, fechaLimiteInscripcion,
  } = RETREATS_DATA.cicloVitalFemenino;
  const waMain = 'https://wa.me/' + WA_CICLO_VITAL_FEMENINO + '?text=' + encodeURIComponent(message);
  const waFechas = 'https://wa.me/' + WA_CICLO_VITAL_FEMENINO + '?text=' +
    encodeURIComponent('¡Hola! Me encantó la propuesta de Ciclo Vital Femenino pero no puedo en esta fecha. ¿Me avisás cuando lancen la próxima edición? 🌙');

  return (
    <section id="inversion" className="relative py-24 md:py-36 px-6 bg-brand text-white overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#AA3E11]/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[380px] h-[380px] rounded-full bg-[#9D005E]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-16 md:mb-24" data-reveal>
          <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-bold border border-gold/40 px-5 py-2 rounded-full">
            {dates}
          </span>
          <span className="text-[#E88A5C] text-[11px] tracking-[0.25em] uppercase font-bold border border-[#E88A5C]/40 px-5 py-2 rounded-full">
            Los Gigantes, Córdoba
          </span>
          <span className="text-[#E894C0] text-[11px] tracking-[0.25em] uppercase font-bold border border-[#E894C0]/40 px-5 py-2 rounded-full">
            Quedan {cupos} lugares
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_1.15fr] gap-16 md:gap-20 items-end">

          {/* ── Izquierda: narrativa + stats ── */}
          <div data-reveal>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Tu inversión</p>
            <h2 className="serif-title text-white leading-[0.95] mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}>
              Regalate<br />este tiempo<br />para vos.
            </h2>
            <p className="text-white/55 text-sm md:text-base leading-relaxed" style={{ maxWidth: '40ch' }}>
              Elegimos un precio accesible porque queremos que puedas ser parte de algo profundamente transformador, sin que el dinero sea la barrera.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-white/10">
              <div>
                <p className="serif-title text-[#E88A5C] leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>10%</p>
                <p className="text-white/50 text-xs leading-relaxed">regenera la sierra con tabaquillos nativos</p>
              </div>
              <div>
                <p className="serif-title text-[#E894C0] leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>100%</p>
                <p className="text-white/50 text-xs leading-relaxed">de devolución si sentís que no fue transformador</p>
              </div>
            </div>
          </div>

          {/* ── Derecha: precio dominante ── */}
          <div data-reveal data-delay="1">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
              Valor real de mercado{' '}
              <span className="line-through decoration-[#E88A5C]/60">${valorReferenciaARS.toLocaleString('es-AR')}</span>
            </p>
            <p className="font-serif text-white leading-none mb-3" style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)' }}>
              ${priceAcompanada.toLocaleString('es-AR')}
            </p>
            <p className="text-gold text-sm uppercase tracking-widest font-bold mb-1">{currency} · por persona</p>
            <p className="text-white/45 text-sm mb-8">en pareja o grupo · ¿venís sola? ${priceSola.toLocaleString('es-AR')}</p>

            <p className="text-white/60 text-sm leading-relaxed mb-2" style={{ maxWidth: '42ch' }}>
              Seña de <strong className="text-white">${senia.toLocaleString('es-AR')}</strong> para reservar, otros <strong className="text-white">${segundoPago.toLocaleString('es-AR')}</strong> antes del {segundoPagoFecha}, saldo en el retiro.
            </p>
            <p className="text-[#E894C0] text-xs uppercase tracking-widest font-bold mb-8">
              Inscripciones cierran el {fechaLimiteInscripcion} o al completar los cupos
            </p>

            <a href={waMain} target="_blank" rel="noopener noreferrer" className="btn-gold inline-block mb-4">
              RESERVAR MI LUGAR
            </a>
            <p className="text-white/35 text-xs italic max-w-xs leading-relaxed font-serif mb-4">
              Si sentís el llamado a regalarte este tiempo, será una alegría recibirte.
            </p>
            <a href={waFechas} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-[#E88A5C] transition-colors text-xs underline underline-offset-4">
              ¿No podés en esta fecha? Avisame de la próxima edición.
            </a>
          </div>
        </div>

        {/* ── Incluye ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 mt-20 pt-10 border-t border-white/10" data-reveal data-delay="2">
          {INCLUYE.map((item) => (
            <div key={item} className="text-white/70 text-sm leading-relaxed">
              <span className="block text-[#E88A5C] mb-1.5">✧</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CicloVitalFemeninoPrecios;
