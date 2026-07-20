import React from 'react';
import { WA_CICLO_VITAL_FEMENINO } from '../data/config';
import { RETREATS_DATA } from '../data/retreats';
import { img } from '../lib/img';

const CicloVitalFemeninoHero: React.FC = () => {
  const MSG = encodeURIComponent(RETREATS_DATA.cicloVitalFemenino.message);

  return (
    <section id="heroSec" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">

      {/* ── Fondo: círculo de meditación al sol, en Pueblo Mágico ── */}
      <div className="absolute inset-0 z-0 bg-[#0B0F17]">
        <img
          src={img('/uploads/bienestar-balance.webp', 1800)}
          alt="Círculo de meditación al sol en Pueblo Mágico"
          className="w-full h-full object-cover scale-105"
          style={{ objectPosition: 'center 55%', animation: 'ciclo-hero-zoom 20s ease-in-out infinite alternate' }}
        />
        <style>{`@keyframes ciclo-hero-zoom { from { transform: scale(1.0); } to { transform: scale(1.08); } }`}</style>
      </div>

      {/* ── Overlays — cálidos, tono otoño-invierno en vez de negro puro ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A0F06]/60 via-[#1a0906]/22 to-[#210a05]/65 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-[3]" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-12">

        {/* Badge — dos píldoras para que nunca se corte el texto */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3" data-reveal>
          <span className="px-4 py-1.5 rounded-full bg-gold text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
            {RETREATS_DATA.cicloVitalFemenino.dates}
          </span>
          <span className="hidden sm:inline text-white/40 text-xs">·</span>
          <span className="px-4 py-1.5 rounded-full bg-[#AA3E11] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
            Los Gigantes, Córdoba
          </span>
        </div>

        {/* Titles */}
        <div className="mb-6" data-reveal data-delay="1">
          <p className="text-white/60 text-[11px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Ciclo Vital Femenino
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl serif-title text-white leading-tight tracking-tight drop-shadow-2xl font-light">
            Capítulo Muerte<span className="text-gold">·</span>Invierno
          </h1>
        </div>

        {/* Description */}
        <p
          className="text-lg md:text-2xl text-white/85 font-serif italic max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-sm"
          data-reveal data-delay="2"
        >
          Para transmutar todo lo que no ES.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full" data-reveal data-delay="3">
          <a
            href={`https://wa.me/${WA_CICLO_VITAL_FEMENINO}?text=${MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold min-w-[220px] shadow-2xl shadow-gold/20"
          >
            Reservar mi lugar
          </a>
          <a href="#que-viviras" className="btn-glass min-w-[220px]">
            Ver la experiencia
          </a>
        </div>
      </div>

      {/* ── Location footer ── */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-center z-10" data-reveal data-delay="4">
        <div className="flex items-center gap-3 text-white text-[10px] tracking-[0.4em] uppercase font-bold">
          <div className="w-10 h-px bg-white/40" />
          <span>Encuentro de Mujeres en Invierno</span>
          <div className="w-10 h-px bg-white/40" />
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-[5]" />
    </section>
  );
};

export default CicloVitalFemeninoHero;
