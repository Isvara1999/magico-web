import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionTestimonios: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <span id="testimonios" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center text-3xl md:text-4xl text-brand mb-12 md:mb-16 font-serif">
            {t.testimonials.title}
          </h2>
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white text-brand shadow-lg hover:text-gold transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <div
              ref={scrollRef}
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4"
            >
              <div className="flex gap-4 md:gap-6 px-4">
                {t.testimonials.items.map((t) => (
                  <div
                    key={t.id}
                    className="snap-center shrink-0 w-[80vw] md:w-[400px] bg-bone p-6 md:p-8 rounded-xl border border-brand/5 shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <p className="font-serif text-base text-brand">{t.name}</p>
                        <p className="text-xs uppercase tracking-wider text-gold">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-dark/70 italic text-sm leading-relaxed font-light">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white text-brand shadow-lg hover:text-gold transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};