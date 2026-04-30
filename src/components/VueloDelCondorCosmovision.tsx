import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorCosmovision: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="py-24 md:py-36 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-6" data-reveal>La Visión</p>

        <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] serif-title brand-green text-center mb-8 leading-tight" data-reveal data-delay="1">
          {t.vuelo_condor.cosmovision.title}
        </h2>

        <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed mb-6" data-reveal data-delay="2">
          {t.vuelo_condor.cosmovision.text1}
        </p>

        <div className="w-10 h-px bg-brand-gold/40 mx-auto my-7" data-reveal data-delay="3" />

        <p className="font-serif italic text-brand-green/75 text-base md:text-lg leading-relaxed" data-reveal data-delay="4">
          {t.vuelo_condor.cosmovision.text2}
        </p>
      </div>
    </section>
  );
};

export default VueloDelCondorCosmovision;
