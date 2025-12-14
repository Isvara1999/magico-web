import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionComoLlegar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="como-llegar" className="py-24 bg-white border-t border-brand/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="rounded-xl overflow-hidden shadow-lg h-80 md:h-[500px]">
            <img
              src="https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Camino a la montaña"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
        <div className="order-1 md:order-2 md:pl-12">
          <h2 
            className="text-3xl md:text-4xl text-brand mb-6 font-serif leading-tight"
            dangerouslySetInnerHTML={{ __html: t.location.title as string }}
          />
          <p className="text-dark/70 text-lg mb-8 leading-relaxed font-light">
            {t.location.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-brand text-white text-center rounded-full hover:bg-gold transition-all duration-300 text-sm font-bold uppercase tracking-widest"
            >
              {t.location.btnMap}
            </a>
            <a
              href="#contacto"
              className="px-8 py-4 border border-brand text-brand text-center rounded-full hover:bg-brand hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-widest"
            >
              {t.location.btnTransfer}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};