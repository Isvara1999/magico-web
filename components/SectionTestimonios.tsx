import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionTestimonios: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonios" className="py-24 bg-bone">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-brand font-serif">
            {t.testimonials.title}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item: any) => (
            <div key={item.id} className="text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                loading="lazy"
              />
              <p className="text-dark/80 italic mb-4">"{item.text}"</p>
              <p className="font-bold text-brand">{item.name}</p>
              <p className="text-sm text-dark/60">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};