import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorCosmovision: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experiencia" className="py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-6" data-reveal>La Visión</p>

            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] serif-title brand-green mb-8 leading-tight" data-reveal data-delay="1">
              {t.vuelo_condor.cosmovision.title}
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed mb-6" data-reveal data-delay="2">
              {t.vuelo_condor.cosmovision.text1}
            </p>

            <div className="w-10 h-px bg-brand-gold/40 mx-auto lg:mx-0 my-7" data-reveal data-delay="3" />

            <p className="font-serif italic text-brand-green/75 text-base md:text-lg leading-relaxed" data-reveal data-delay="4">
              {t.vuelo_condor.cosmovision.text2}
            </p>
          </div>

          {/* Visual Impact */}
          <div className="relative group" data-reveal data-delay="3">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 4.47.08 PM (1).webp" 
                alt="Ritual Andino — Cosmovisión" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-brand-green/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorCosmovision;
