import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export const SectionEventos: React.FC = () => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg text-brand border border-brand/10 -ml-2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg text-brand border border-brand/10 -mr-2"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-8 pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
          >
          {t.events.cards.map((card: any, index: number) => (
            <div
              key={index}
              className="min-w-[85vw] md:min-w-0 snap-center bg-bone rounded-xl p-6 md:p-8 shadow-sm border border-brand/5 hover:shadow-md transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gold shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-gold font-bold text-xs md:text-sm tracking-widest uppercase">{card.date}</p>
              </div>
              
              <h3 className="text-xl md:text-2xl font-serif text-brand mb-3 group-hover:text-gold transition-colors">
                {card.title}
              </h3>
              
              <p className="text-dark/70 mb-6 text-sm leading-relaxed flex-grow">{card.desc}</p>
              
              <a 
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-brand font-bold text-xs uppercase tracking-widest border-b border-brand/20 pb-1 hover:text-gold hover:border-gold transition-colors self-start mt-auto"
              >
                {card.btn}
              </a>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};