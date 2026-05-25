import React from 'react';
import { img } from '../lib/img';

const KINTU_PARAGRAPHS = [
  "KINTU es Es una productora pionera en experiencias transformadoras que diseña viajes y procesos con corazón y propósito.",
  "Creamos espacios para que las personas reconecten con su potencial, expandan su mirada y generen cambios reales en su vida.",
  "Inspirada en la cosmovisión andina —donde el kintu es una ofrenda—, cada experiencia nace Desde la intención, el cuidado y la coherencia.",
  "Nos basamos en la filosofía del Buen Vivir, integrando bienestar personal, comunidad y conexión con la naturaleza.",
  "Estamos co-creando una red que conecta y visibiliza proyectos y organizaciones que están dando forma a una nueva manera de habitar el mundo.",
];

const VueloDelCondorCoproduccion: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-brand-green text-white overflow-hidden relative">
      {/* Glow decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Eyebrow */}
        <div className="text-center mb-12" data-reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase text-brand-gold/70 mb-5">Detrás del viaje</p>
          <h2 className="text-2xl md:text-4xl serif-title text-white font-light leading-snug">
            Una Co-Producción de
          </h2>
        </div>

        {/* Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 mb-16" data-reveal data-delay="1">
          {/* Logo Acan */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/8 border border-white/15 rounded-2xl px-8 py-6 flex items-center justify-center backdrop-blur-sm hover:bg-white/12 transition-colors duration-300">
              <img
                src={img('/uploads/vuelo-condor/Logo Acan.png', 300)}
                alt="Acan del Fuego"
                className="h-16 md:h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Separador */}
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-px h-8 bg-brand-gold hidden sm:block" />
            <span className="text-brand-gold font-serif text-2xl">×</span>
            <div className="w-px h-8 bg-brand-gold hidden sm:block" />
          </div>

          {/* Logo Kintu */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/8 border border-white/15 rounded-2xl px-8 py-6 flex items-center justify-center backdrop-blur-sm hover:bg-white/12 transition-colors duration-300">
              <img
                src={img('/uploads/vuelo-condor/PRODUCCIONES.png', 300)}
                alt="Kintu Producciones"
                className="h-16 md:h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-12" data-reveal data-delay="2">
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Descripción Kintu */}
        <div className="max-w-2xl mx-auto space-y-5" data-reveal data-delay="3">
          {KINTU_PARAGRAPHS.map((p, i) => (
            <p key={i} className="text-white/75 text-sm md:text-base leading-relaxed font-light text-center">
              {p}
            </p>
          ))}
        </div>

        {/* Frase cierre */}
        <div className="mt-12 pt-10 border-t border-white/10 text-center" data-reveal data-delay="4">
          <p className="text-white font-serif italic text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            "Kintu es mucho más que una productora.
            <br />
            Es un movimiento hacia una nueva forma de vivir, co-crear y vincularnos con la vida en todas sus formas."
          </p>
        </div>

      </div>
    </section>
  );
};

export default VueloDelCondorCoproduccion;
