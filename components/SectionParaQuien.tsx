import React from 'react';
import { Laptop, Heartbeat, Heart, Compass, UsersThree, Globe } from '@phosphor-icons/react';
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

  return (
    <>
      <span id="para-quien" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-12" data-reveal>
            <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3 opacity-80">
              {pq.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              {pq.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal>
            {pq.profiles.map((profile: { title: string; desc: string; wa: string }, i: number) => {
              const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(profile.wa)}`;
              return (
                <a
                  key={i}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-2xl border border-stone-200 p-7 hover:border-brand hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-brand mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {ICONS[i]}
                  </span>
                  <h3 className="font-serif text-lg text-gray-900 mb-3 leading-snug">{profile.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{profile.desc}</p>
                  <span className="mt-5 text-xs font-bold tracking-widest uppercase text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {pq.cta_label} →
                  </span>
                </a>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};
