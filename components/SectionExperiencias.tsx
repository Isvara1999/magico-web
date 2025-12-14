import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionExperiencias: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experiencias" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">
            {t.experiences.tag}
          </p>
          <h2 className="text-3xl md:text-5xl text-brand mb-6 font-serif">
            {t.experiences.title}
          </h2>
          <p className="text-dark/70 text-lg max-w-2xl mx-auto">
            {t.experiences.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.experiences.cards.map((card: any) => (
            <div key={card.id} className="bg-bone rounded-xl overflow-hidden shadow-lg">
              <img src={card.image} alt={card.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-serif text-brand mb-2">{card.title}</h3>
                <p className="text-dark/70 mb-4">{card.description}</p>
                <a href={card.ctaLink} className="text-gold font-bold uppercase text-sm">
                  {card.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#contacto" className="bg-gold text-white px-8 py-3 rounded-full hover:bg-brand transition-colors">
            {t.experiences.btn}
          </a>
        </div>
      </div>
    </section>
  );
};