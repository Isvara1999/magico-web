import React, { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { marked } from 'marked';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const SectionVoluntariados: React.FC = () => {
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
    <section id="voluntariados" className="py-24 bg-bone">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-premium p-8 md:p-16 shadow-sm flex flex-col md:flex-row items-center gap-12 border-t-4 border-gold">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 
              className="text-3xl md:text-4xl font-serif text-brand mb-6"
              dangerouslySetInnerHTML={{ __html: t.volunteer.title as string }}
            />
            <div 
              className="text-charcoal/80 text-base leading-relaxed mb-10 font-light [&_strong]:text-gold [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: marked.parse(t.volunteer.description as string) as string }}
            />
            <a
              href={t.volunteer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-white px-8 py-3 rounded-full hover:bg-brand transition-colors text-xs font-bold uppercase tracking-widest shadow-lg"
            >
              {t.volunteer.btn}
            </a>
          </div>
          <div className="md:w-1/2 h-64 md:h-96 w-full order-1 md:order-2">
            <img
              src={t.volunteer.image}
              className="w-full h-full object-cover rounded-premium shadow-lg"
              alt="Voluntariado"
              loading="lazy"
            />
          </div>
        </div>

        {/* Volunteer Testimonials Carousel */}
        <div className="mt-12">
          <p className="text-center text-brand/60 font-bold tracking-widest uppercase text-xs mb-8">VOCES DE LA COMUNIDAD</p>
          
          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg text-brand border border-brand/10 -ml-3 hover:bg-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg text-brand border border-brand/10 -mr-3 hover:bg-white transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
            >
            {(t.volunteer as any).testimonials?.map((item: any, index: number) => (
              <div key={index} className="min-w-[85vw] md:min-w-[350px] md:max-w-[350px] snap-center bg-white p-6 rounded-xl shadow-sm border border-brand/5 flex flex-col relative">
                <Quote className="w-8 h-8 text-gold/20 absolute top-4 right-4" />
                <p className="text-dark/70 text-sm italic leading-relaxed mb-4 flex-grow">
                  "{item.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-brand/5">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-full object-cover shadow-sm" 
                  />
                  <p className="text-brand font-bold text-sm font-serif">{item.name}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};