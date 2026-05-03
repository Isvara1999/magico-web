import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CaretDown, MapPin, Compass, Mountains, Sparkle, Sun, Wind, Moon, Star } from '@phosphor-icons/react';

const ITINERARIO_ICONS = [Compass, Mountains, Sparkle, Sun, Wind, Moon, Star];

const DAY_PALETTES = [
  { iconActive: 'bg-brand text-white',        iconInactive: 'bg-brand/10 text-brand',              badge: 'bg-gold',         dot: 'bg-brand/50'        },
  { iconActive: 'bg-gold text-white',          iconInactive: 'bg-gold/15 text-gold',                badge: 'bg-brand',        dot: 'bg-gold/60'         },
  { iconActive: 'bg-magico-green text-white',  iconInactive: 'bg-magico-green/10 text-magico-green', badge: 'bg-gold',        dot: 'bg-magico-green/50' },
  { iconActive: 'bg-magico-gold text-white',   iconInactive: 'bg-magico-gold/15 text-magico-gold',  badge: 'bg-brand',        dot: 'bg-magico-gold/60'  },
  { iconActive: 'bg-brand text-white',         iconInactive: 'bg-brand/10 text-brand',              badge: 'bg-gold',         dot: 'bg-brand/50'        },
  { iconActive: 'bg-gold text-white',          iconInactive: 'bg-gold/15 text-gold',                badge: 'bg-magico-green', dot: 'bg-gold/60'         },
  { iconActive: 'bg-magico-green text-white',  iconInactive: 'bg-magico-green/10 text-magico-green', badge: 'bg-gold',        dot: 'bg-magico-green/50' },
];

const VueloDelCondorItinerario: React.FC = () => {
  const { t } = useLanguage();
  const [activeDay, setActiveDay] = useState<number | null>(0);

  const toggleDay = (index: number) => {
    setActiveDay(prev => prev === index ? null : index);
  };

  return (
    <section id="itinerario" className="py-24 md:py-32 px-6 bg-[#FDFBF7] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24" data-reveal>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold/40" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold">Día a día</p>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h2 className="text-4xl md:text-6xl serif-title text-brand mb-6">
            {t.vuelo_condor.itinerario.title}
          </h2>
          <p className="text-charcoal/60 text-base md:text-lg font-light max-w-xl mx-auto">
            {t.vuelo_condor.itinerario.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.vuelo_condor.itinerario.days.map((d: any, i: number) => {
            const isActive = activeDay === i;
            const Icon = ITINERARIO_ICONS[i % ITINERARIO_ICONS.length];
            const p = DAY_PALETTES[i % DAY_PALETTES.length];

            return (
              /*
               * IMPORTANT: data-reveal must be on a wrapper div that has NO className prop.
               * React replaces className entirely on every render, which would strip the
               * `visible` class added by IntersectionObserver, permanently hiding the element.
               * A wrapper with no className is never touched by React's reconciler.
               */
              <div key={i} data-reveal data-delay={String((i % 4) + 1)}>
                <div className={`transition-transform duration-500 ${isActive ? 'scale-[1.015]' : 'hover:scale-[1.005]'}`}>
                  <div className={`bg-white rounded-3xl border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? 'border-gold/50 shadow-xl ring-1 ring-gold/10'
                      : 'border-brand/8 shadow-sm hover:border-brand/20 hover:shadow-md'
                  }`}>

                    {/* ── Clickable header ── */}
                    <button
                      type="button"
                      onClick={() => toggleDay(i)}
                      className="w-full text-left px-6 py-6 md:px-10 md:py-8 flex items-center gap-5 group/btn"
                    >
                      {/* Icon bubble */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isActive ? `${p.iconActive} rotate-[8deg] shadow-lg` : `${p.iconInactive} group-hover/btn:${p.iconActive}`
                        }`}>
                          <Icon weight={isActive ? 'fill' : 'thin'} className="w-6 h-6 transition-all duration-500" />
                        </div>
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${p.badge} text-white text-[10px] font-bold flex items-center justify-center border-2 border-white transition-all duration-500 ${
                          isActive ? 'scale-110 opacity-100' : 'scale-0 opacity-0'
                        }`}>
                          {i + 1}
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-[0.28em] uppercase font-bold mb-1.5 text-gold flex items-center gap-2">
                          {d.dia}
                          {isActive && <span className="w-1 h-1 bg-gold rounded-full inline-block" />}
                        </p>
                        <h3 className={`text-lg md:text-2xl serif-title leading-snug transition-colors duration-300 ${
                          isActive ? 'text-brand' : 'text-dark group-hover/btn:text-brand'
                        }`}>
                          {d.titulo}
                        </h3>
                        <p className={`mt-2 text-sm md:text-base leading-relaxed transition-all duration-500 ${
                          isActive ? 'text-charcoal/70' : 'text-charcoal/45 line-clamp-1'
                        }`}>
                          {d.resumen}
                        </p>
                      </div>

                      {/* Caret */}
                      <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-brand text-white rotate-180 shadow-md'
                          : 'border border-charcoal/20 text-charcoal/50 group-hover/btn:border-brand/40 group-hover/btn:text-brand'
                      }`}>
                        <CaretDown weight="bold" className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {/* ── Expandable content ──
                        Uses max-height transition: reliable, no conflict with any CSS class.
                        overflow-hidden on this div clips the content when collapsed.         */}
                    <div
                      style={{
                        maxHeight: isActive ? '600px' : '0',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out',
                      }}
                    >
                      <div className="px-6 pb-10 md:px-10 md:pb-12 pt-2 border-t border-brand/8">
                        <div className="ml-0 md:ml-20 mt-6">

                          {/* Label */}
                          <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-5 h-5 rounded-full bg-gold/12 flex items-center justify-center flex-shrink-0">
                              <MapPin weight="fill" className="w-2.5 h-2.5 text-gold" />
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-magico-gold">
                              Detalles del tramo
                            </span>
                          </div>

                          {/* Items */}
                          <ul className="space-y-3.5">
                            {d.items.map((item: string, j: number) => (
                              <li key={j} className="flex items-start gap-4 group/li">
                                <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 transition-all duration-300 group-hover/li:scale-150 group-hover/li:bg-gold ${p.dot}`} />
                                <span className="text-dark/80 text-sm md:text-base leading-relaxed flex-1 group-hover/li:text-dark transition-colors duration-200">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing phrase */}
        <div className="mt-20 text-center" data-reveal>
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-12 h-px bg-gold/30" />
            <div className="w-2 h-2 rounded-full bg-gold/40" />
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <p className="text-charcoal/50 font-serif italic text-base md:text-lg px-8 leading-relaxed">
            "Siete días, siete portales. El camino está servido para tu transformación."
          </p>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorItinerario;
