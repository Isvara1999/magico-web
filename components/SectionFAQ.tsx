import React, { useState } from 'react';
import { CaretDownIcon, HouseIcon, WifiHighIcon, MountainsIcon, MapPinIcon, WhatsappLogoIcon } from '@phosphor-icons/react';
import { WA_MAGICO } from '../src/data/config';
import { useLanguage } from '../contexts/LanguageContext';

const ICONS = [HouseIcon, MountainsIcon, WifiHighIcon, MapPinIcon];

export const SectionFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);
  const { t } = useLanguage();
  const faq = t.faq;
  const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('Hola! Tengo una pregunta sobre Pueblo Mágico.')}`;

  return (
    <>
      <span id="faq" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-20 bg-[#F9F8F4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">

          <div className="mb-12" data-reveal>
            <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3 opacity-80">{faq.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl serif-title brand-green">{faq.title}</h2>
            <p className="text-gray-500 text-base md:text-lg font-light mt-2">{faq.subtitle}</p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faq.items.map((item: { q: string; a: string }, index: number) => {
              const isActive = activeIndex === index;
              const Icon = ICONS[index] ?? HouseIcon;
              return (
                <div key={index} data-reveal>
                  <div className={`bg-white rounded-2xl border transition-colors duration-300 overflow-hidden ${isActive ? 'border-[#D4AF37] shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'}`}>
                    <button
                      className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005333]/40"
                      onClick={() => toggle(index)}
                      aria-expanded={isActive}
                    >
                      <span className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-[#005333]' : 'text-[#005333]/30'}`}>
                        <Icon weight="light" className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <h3 className={`flex-1 serif-title text-base md:text-lg leading-snug transition-colors duration-300 ${isActive ? 'text-[#005333]' : 'text-gray-800'}`}>
                        {item.q}
                      </h3>
                      <span
                        className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-300 ${isActive ? 'bg-[#005333] text-[#D4AF37] rotate-180' : 'bg-gray-100 text-[#005333]'}`}
                        aria-hidden="true"
                      >
                        <CaretDownIcon weight="bold" className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </span>
                    </button>

                    <div
                      className="transition-all duration-500 ease-in-out overflow-hidden"
                      style={{ display: 'grid', gridTemplateRows: isActive ? '1fr' : '0fr', opacity: isActive ? 1 : 0 }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="pl-[3.75rem] pr-6 md:pl-[4.5rem] md:pr-8 pb-6 md:pb-7 pt-1">
                          <div className="w-full h-px bg-gray-100 mb-5"></div>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center" data-reveal>
            <p className="text-gray-500 text-sm mb-4">{faq.footer_text}</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors duration-300 text-xs tracking-widest uppercase font-bold"
            >
              <WhatsappLogoIcon weight="duotone" className="w-5 h-5" />
              {faq.footer_cta}
            </a>
          </div>

        </div>
      </section>
    </>
  );
};
