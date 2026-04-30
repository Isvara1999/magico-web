import React from 'react';
import { Quotes } from '@phosphor-icons/react';

const testimonios = [
  {
    nombre: "M. A.",
    origen: "Buenos Aires",
    texto: "Volví siendo otro. No sé cómo explicarlo, pero el Ausangate me devolvió algo que no sabía que había perdido.",
  },
  {
    nombre: "F. L.",
    origen: "Córdoba",
    texto: "El equipo de Mágico Ensueño te sostiene de una manera que pocas veces sentí. Seguro, contenido, y al mismo tiempo completamente libre.",
  },
  {
    nombre: "R. G.",
    origen: "Montevideo",
    texto: "La noche de Ayahuasca fue la experiencia más honesta de mi vida. El Valle Sagrado te desnuda. Y ese es exactamente el punto.",
  },
];

const VueloDelCondorTestimonios: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#F4F3EF]">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14" data-reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">Lo que dice el grupo</p>
          <h2 className="text-3xl md:text-4xl serif-title brand-green">Voces del Camino</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6"
              data-reveal
              data-delay={String(i + 1)}
            >
              <Quotes weight="thin" className="w-8 h-8 text-brand-gold/50" />
              <p className="text-gray-700 text-base md:text-lg font-light italic leading-relaxed flex-1">
                "{t.texto}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-semibold text-sm">
                  {t.nombre[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.nombre}</p>
                  <p className="text-xs text-gray-400">{t.origen}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video testimonial placeholder — add real video when ready */}
        <div className="mt-12 text-center" data-reveal data-delay="4">
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">Video testimonios · próximamente</p>
          <div className="inline-flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-20 h-20 rounded-2xl bg-brand-green/5 border border-brand-green/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-brand-green/20 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-brand-green/30 ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VueloDelCondorTestimonios;
