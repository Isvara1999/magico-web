import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionEventos: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="eventos" className="py-24 bg-bone">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <p className="text-gold font-bold tracking-widest uppercase text-xs md:text-sm mb-2 opacity-90">
              {t.events.tag}
            </p>
            <h2 className="text-3xl md:text-4xl text-brand font-serif leading-tight">
              {t.events.title}
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-block text-brand border-b border-brand pb-1 text-sm font-medium hover:text-gold hover:border-gold transition-colors"
          >
            {t.events.link}
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.events.cards.map((event, index) => (
            <article key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-xs font-bold text-gold uppercase tracking-wider mb-3">{event.date}</div>
                <h3 className="font-serif text-xl text-brand mb-3">{event.title}</h3>
                <p className="text-sm text-dark/70 mb-6 flex-1 font-light leading-relaxed">
                  {event.desc}
                </p>
                <a
                  href="#contacto"
                  className="text-brand font-bold text-xs hover:text-gold uppercase tracking-widest self-start border-b border-transparent hover:border-gold transition-all pb-0.5"
                >
                  {event.btn}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
             href="#"
             className="inline-block text-brand border-b border-brand pb-1 text-sm font-medium hover:text-gold hover:border-gold transition-colors"
           >
             {t.events.link}
           </a>
        </div>
      </div>
    </section>
  );
};