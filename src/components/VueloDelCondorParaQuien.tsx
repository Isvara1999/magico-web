import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorParaQuien: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6 bg-[#F4F3EF]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div data-reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">
            {t.vuelo_condor.para_quien.title}
          </p>
          <h2 className="text-3xl md:text-4xl serif-title brand-green leading-tight mb-5">
            {t.vuelo_condor.para_quien.subtitle}
          </h2>
        </div>

        <div>
          {t.vuelo_condor.para_quien.items.map((item: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-5 py-5 border-b border-gray-200 last:border-0"
              data-reveal
              data-delay={String(i + 1)}
            >
              <span className="font-serif text-2xl text-brand-gold/50 leading-none flex-shrink-0 mt-0.5 w-8 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-800 text-base md:text-lg leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorParaQuien;
