/// <reference types="react" />
import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { marked } from 'marked';

export const SectionNosotros: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = (t.about as any).images || [t.about.image];
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <span id="nosotros" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-24 bg-bone relative overflow-hidden">
        <div className="max-w-[90%] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Header Section (Title moved up) */}
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <span className="text-brand font-bold tracking-widest text-xs uppercase mb-3 block opacity-70">
              {t.about.tag}
            </span>
            <h2 
              className="text-3xl md:text-5xl text-brand leading-tight font-serif"
              dangerouslySetInnerHTML={{ __html: marked.parse(t.about.title as string) as string }}
            />
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* Image Container */}
            <div className="md:col-span-6 relative order-last md:order-first group">
              <div className="rounded-xl overflow-hidden shadow-md relative aspect-[4/3]">
                <img
                  src={images[currentIndex]}
                  alt="Vista Mágico Ensueño"
                  className="w-full h-full object-cover transition-all duration-500"
                  loading="lazy"
                />
                
                {/* Flechas de Navegación (Solo visibles en hover) */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full text-brand shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full text-brand shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="md:col-span-6 order-first md:order-last">
              <div className="prose prose-lg text-dark/80 text-justify font-light leading-relaxed">
                <p>{t.about.p1}</p>
                <p className="mt-4">{t.about.p2}</p>
              </div>
            </div>

          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="#pilares"
              className="group text-brand font-bold text-sm border-b border-gold pb-1 hover:text-gold transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
            >
              {t.about.link}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};