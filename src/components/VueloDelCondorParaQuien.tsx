import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorParaQuien: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 px-6 bg-[#F4F3EF] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_450px] gap-16 md:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div className="order-2 lg:order-1">
            <div data-reveal className="mb-12">
              <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">
                {t.vuelo_condor.para_quien.title}
              </p>
              <h2 className="text-3xl md:text-5xl serif-title brand-green leading-tight">
                {t.vuelo_condor.para_quien.subtitle}
              </h2>
            </div>

            <div className="space-y-2">
              {t.vuelo_condor.para_quien.items.map((item: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-5 py-6 border-b border-gray-200 last:border-0 group"
                  data-reveal
                  data-delay={String(i + 1)}
                >
                  <span className="font-serif text-2xl text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-500 leading-none flex-shrink-0 mt-0.5 w-8 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-gray-800 text-base md:text-lg font-light leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="order-1 lg:order-2 relative" data-reveal data-delay="3">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
              <img 
                src="/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 4.47.08 PM.webp" 
                alt="Expansión en los Andes" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-green/10 mix-blend-multiply"></div>
            </div>
            {/* Floating decorative card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block animate-float">
              <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">Presencia</p>
              <p className="text-xs text-gray-500 italic font-serif">"El Cóndor no vuela, es el viento quien lo lleva."</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorParaQuien;
