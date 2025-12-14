import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionExperiencias: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <span id="experiencias" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-gold font-bold tracking-widest uppercase text-xs mb-3 opacity-80">
              {t.experiences.tag}
            </p>
            <h2 className="text-3xl md:text-5xl text-brand mb-6 font-serif">{t.experiences.title}</h2>
            <p className="text-base text-dark/60 font-light">
              {t.experiences.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.experiences.cards.map((exp) => (
              <div key={exp.id} className="bg-white rounded-premium shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,83,51,0.15)] group overflow-hidden">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-brand mb-4">{exp.title}</h3>
                  <p className="font-sans text-sm text-charcoal/70 mb-6 leading-relaxed font-light">
                    {exp.description}
                  </p>
                  <a
                    href={exp.ctaLink}
                    className="font-sans text-xs text-gold font-bold uppercase tracking-widest border-b border-transparent hover:border-gold transition-all"
                  >
                    {exp.ctaText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#contacto"
              className="inline-block px-8 py-3 border border-brand text-brand rounded-full hover:bg-brand hover:text-white transition-all duration-300 text-xs tracking-widest uppercase font-bold"
            >
              {t.experiences.btn}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};