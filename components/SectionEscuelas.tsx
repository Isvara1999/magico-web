import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionEscuelas: React.FC = () => {
  const { t } = useLanguage();
  const data = (t as any).schools;

  if (!data) return null;

  return (
    <>
      <span id="instituciones" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-24 bg-[#FAF9F5] text-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div data-reveal className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-[500px] bg-[#002B18] pointer-events-none group">
                <iframe
                  src="https://www.youtube.com/embed/R5c5r9dNR_M?autoplay=1&mute=1&controls=0&loop=1&playlist=R5c5r9dNR_M&modestbranding=1&showinfo=0&vq=hd1080&playsinline=1"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  className="absolute top-1/2 left-1/2 w-[200%] h-[200%] sm:w-[150%] sm:h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div data-reveal data-delay="1" className="order-1 lg:order-2">
              <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4 opacity-90 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-brand" /> {data.tag}
              </p>
              <h2 className="text-4xl md:text-6xl text-brand mb-6 leading-tight font-serif">
                {data.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
                {data.description}
              </p>
              
              <div className="flex gap-4 mt-8">
                <a
                  href={data.link}
                  className="px-8 py-3 bg-brand text-white rounded-full hover:bg-gold hover:text-white transition-[background-color,color] duration-300 text-xs tracking-widest uppercase font-bold inline-flex items-center gap-2 group shadow-xl"
                >
                  {data.btn}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};
