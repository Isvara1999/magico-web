import React from 'react';
import { PlayCircle } from '@phosphor-icons/react';

const VueloDelCondorVideo: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10" data-reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">El equipo detrás del viaje</p>
          <h2 className="text-3xl md:text-4xl serif-title brand-green">Conocé a los Guardianes</h2>
          <p className="text-gray-400 text-sm md:text-base font-light mt-3 max-w-xl mx-auto">
            Gustavo, Diego y Juan Cruz te cuentan qué es El Vuelo del Cóndor y por qué eligieron el Valle Sagrado como escenario de transformación.
          </p>
        </div>

        {/* Video placeholder — replace src with real video URL when ready */}
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#0a1a10] shadow-2xl" data-reveal data-delay="1">
          {/* Uncomment and update when video is ready:
          <video
            src="/uploads/vuelo-condor-equipo.mp4"
            poster="/uploads/vuelo-condor-poster.webp"
            controls
            playsInline
            className="w-full h-full object-cover"
          />
          */}

          {/* Placeholder UI */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#005333]/90 to-[#002015]/95">
            <div className="w-20 h-20 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center backdrop-blur-sm">
              <PlayCircle weight="thin" className="w-12 h-12 text-brand-gold" />
            </div>
            <div className="text-center px-6">
              <p className="text-white font-serif text-lg md:text-xl mb-2">Video próximamente</p>
              <p className="text-white/40 text-sm font-light">El equipo está preparando su presentación</p>
            </div>
          </div>

          {/* Corner badge */}
          <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="text-white/70 text-[10px] tracking-widest uppercase">Mágico Ensueño · 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorVideo;
