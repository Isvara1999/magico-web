import React from 'react';

const VueloDelCondorVideo: React.FC = () => {
  return (
    <section className="py-24 md:py-36 px-6 bg-[#F4F3EF]">
      <div className="max-w-3xl mx-auto text-center" data-reveal>
        <div className="w-8 h-px bg-brand-gold/40 mx-auto mb-10" />
        <p className="font-serif italic text-gray-600 text-xl md:text-3xl leading-relaxed md:leading-relaxed">
          "Hay momentos en la vida de un hombre en que el camino ya recorrido deja de alcanzar. No porque haya fallado — sino porque es hora de volar más alto."
        </p>
        <div className="w-8 h-px bg-brand-gold/40 mx-auto mt-10 mb-7" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Valle Sagrado de los Incas · 7 días · Julio 2026</p>
      </div>
    </section>
  );
};

export default VueloDelCondorVideo;
