import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionEventos: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="eventos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">
            {t.events.tag}
          </p>
          <h2 className="text-3xl md:text-5xl text-brand font-serif mb-6">
            {t.events.title}
          </h2>
          <a href="#" className="text-gold underline">
            {t.events.link}
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.events.cards.map((card: any, index: number) => (
            <div
              key={index}
              className="bg-bone rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <p className="text-gold font-bold mb-2">{card.date}</p>
                <h3 className="text-xl font-serif text-brand mb-2">
                  {card.title}
                </h3>
                <p className="text-dark/70 mb-4">{card.desc}</p>
                <button className="bg-gold text-white px-4 py-2 rounded-full text-sm">
                  {card.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};