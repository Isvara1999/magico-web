import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { marked } from 'marked';

export const SectionRetiros: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <span id="retiros" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-24 bg-brand text-white relative overflow-hidden">
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-gold font-bold tracking-widest uppercase text-xs mb-4 opacity-90">
                {t.retreats.tag}
              </p>
              <h2 
                className="text-3xl md:text-6xl text-white mb-6 leading-tight font-serif"
                dangerouslySetInnerHTML={{ __html: marked(t.retreats.title as string) }}
              />
              <p className="text-gray-300 text-base mb-8 leading-relaxed font-light">
                {t.retreats.description}
              </p>
              <ul className="space-y-4 text-gray-300/80 mb-10 font-sans text-sm">
                {t.retreats.list.map((item: any, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-gold" /> {item.text}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <a
                  href="#contacto"
                  className="px-8 py-3 bg-gold text-white rounded-full hover:bg-white hover:text-brand transition-all duration-300 text-xs tracking-widest uppercase font-bold"
                >
                  {t.retreats.btn}
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
              <img
                src={(t.retreats.images[0] as any).image}
                alt="Yoga"
                className="rounded-xl w-full h-48 md:h-64 object-cover mt-8 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
              <img
                src={(t.retreats.images[1] as any).image}
                alt="Grupo"
                className="rounded-xl w-full h-48 md:h-64 object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};