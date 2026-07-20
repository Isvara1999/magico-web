import React, { useRef } from 'react';
import { Laptop, Heartbeat, Heart, Compass, UsersThree, Globe } from '@phosphor-icons/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WA_MAGICO } from '../src/data/config';
import { useLanguage } from '../contexts/LanguageContext';

const ICONS = [
  <Laptop weight="duotone" className="w-8 h-8" />,
  <Heartbeat weight="duotone" className="w-8 h-8" />,
  <Heart weight="duotone" className="w-8 h-8" />,
  <Compass weight="duotone" className="w-8 h-8" />,
  <UsersThree weight="duotone" className="w-8 h-8" />,
  <Globe weight="duotone" className="w-8 h-8" />,
];

export const SectionParaQuien: React.FC = () => {
  const { t } = useLanguage();
  const pq = t.para_quien;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <span id="para-quien" className="block -mt-20 pt-20" aria-hidden="true" />
      <section className="py-14 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-8" data-reveal>
            <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3 opacity-80">
              {pq.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              {pq.title}
            </h2>
          </div>

          {/* Carrusel: -mx-6 para que las tarjetas lleguen a los bordes del viewport */}
          <div ref={scrollRef}
            className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 md:mx-0">
            {(pq.profiles as any[]).slice(0, 4).map((profile: { title: string; desc: string; wa: string }, i: number) => {
              const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(profile.wa)}`;
              return (
                <a key={i} href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="w-[100vw] md:w-auto snap-start flex-shrink-0 group flex flex-col bg-white border-y md:border md:rounded-2xl border-stone-200 px-8 py-6 md:p-5 hover:bg-stone-50 md:hover:border-brand md:hover:shadow-lg transition-all duration-300">
                  <span className="text-brand mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {ICONS[i]}
                  </span>
                  <h3 className="font-serif text-xl text-gray-900 mb-3 leading-snug">{profile.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {profile.desc}
                  </p>
                  <span className="mt-auto text-xs font-bold tracking-widest uppercase text-brand opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {pq.cta_label} →
                  </span>
                </a>
              );
            })}
          </div>

          {/* Flechas debajo del carrusel en mobile */}
          <div className="md:hidden flex justify-between items-center mt-4 px-1">
            <button onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-white shadow-md text-brand border border-stone-200 hover:border-brand transition-colors"
              aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <p className="text-[11px] text-center text-gray-400">Deslizá para ver más</p>
            <button onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-white shadow-md text-brand border border-stone-200 hover:border-brand transition-colors"
              aria-label="Siguiente">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};
