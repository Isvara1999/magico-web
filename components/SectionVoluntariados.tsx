import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionVoluntariados: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="voluntariados" className="py-24 bg-bone">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-premium p-8 md:p-16 shadow-sm flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 
              className="text-3xl md:text-4xl font-serif text-brand mb-6"
              dangerouslySetInnerHTML={{ __html: t.volunteer.title as string }}
            />
            <p className="text-charcoal/80 text-base leading-relaxed mb-10 font-light">
              {t.volunteer.description}
            </p>
            <a
              href="#contacto"
              className="text-brand font-bold uppercase tracking-widest border-b-2 border-brand pb-2 hover:text-gold hover:border-gold transition-colors text-xs md:text-sm"
            >
              {t.volunteer.btn}
            </a>
          </div>
          <div className="md:w-1/2 h-64 md:h-96 w-full order-1 md:order-2">
            <img
              src="https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg"
              className="w-full h-full object-cover rounded-premium shadow-lg"
              alt="Voluntariado"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};