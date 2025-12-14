/// <reference types="react" />
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { marked } from 'marked';

export const SectionNosotros: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <span id="nosotros" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-24 bg-bone relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            {/* Image Container */}
            <div className="md:col-span-5 relative order-last md:order-first">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={t.about.image}
                  alt="Vista Mágico Ensueño"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="md:col-span-7 md:pl-8 order-first md:order-last">
              <span className="text-brand font-bold tracking-widest text-xs uppercase mb-3 block opacity-70">
                {t.about.tag}
              </span>
              <h2 
                className="text-3xl md:text-5xl text-brand mb-6 md:mb-8 leading-tight font-serif"
                dangerouslySetInnerHTML={{ __html: marked(t.about.title as string) }}
              />
              <div className="prose prose-lg text-dark/80 text-justify font-light leading-relaxed">
                <p>{t.about.p1}</p>
                <p className="mt-4">{t.about.p2}</p>
              </div>
              <div className="mt-10">
                <a
                  href="#pilares"
                  className="group text-brand font-bold text-sm border-b border-gold pb-1 hover:text-gold transition-colors inline-flex items-center gap-2 uppercase tracking-wider"
                >
                  {t.about.link}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};