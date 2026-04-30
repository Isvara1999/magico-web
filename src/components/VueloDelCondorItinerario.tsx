import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorItinerario: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="itinerario" className="py-20 md:py-28 px-6 bg-[#FDFBF7]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">Día a día</p>
          <h2 className="text-3xl md:text-5xl serif-title brand-green mb-3">
            {t.vuelo_condor.itinerario.title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light">
            {t.vuelo_condor.itinerario.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[1.85rem] top-3 bottom-3 w-px bg-[#005333]/12" />

          <div className="space-y-2">
            {t.vuelo_condor.itinerario.days.map((d: any, i: number) => (
              <div
                key={i}
                className="relative flex gap-7 pb-10 last:pb-0"
                data-reveal
                data-delay={String((i % 3) + 1)}
              >
                {/* Day circle */}
                <div className="flex-shrink-0">
                  <div className="w-[3.7rem] h-[3.7rem] rounded-full bg-white border border-[#005333]/20 flex items-center justify-center shadow-sm z-10 relative">
                    <span className="font-serif text-base text-brand-gold font-semibold">{i + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-brand-gold mb-1">{d.dia}</p>
                  <h3 className="text-lg md:text-xl serif-title brand-green mb-3">{d.titulo}</h3>
                  <ul className="space-y-2">
                    {d.items.map((item: string, j: number) => (
                      <li key={j} className="text-gray-500 text-sm md:text-base leading-relaxed flex items-start gap-2">
                        <span className="text-[#005333]/25 mt-[0.45rem] flex-shrink-0 text-[7px]">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorItinerario;
