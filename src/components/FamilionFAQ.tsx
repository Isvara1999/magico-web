import React, { useState } from 'react';
import { CaretDownIcon, UsersThreeIcon, CloudRainIcon, HouseIcon, ForkKnifeIcon, LeafIcon } from '@phosphor-icons/react';
import { useLanguage } from '../../contexts/LanguageContext';

const FAQ_ICONS = [UsersThreeIcon, CloudRainIcon, HouseIcon, ForkKnifeIcon, LeafIcon];

const FamilionFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="py-16 md:py-24 px-6 bg-[#005333]/[0.04]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12" data-reveal>
          <h2 className="text-3xl md:text-5xl serif-title brand-green mb-4">{t.familion.faq.title}</h2>
          <p className="text-gray-500 text-base md:text-lg font-light">{t.familion.faq.subtitle}</p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {t.familion.faq.items.map((faq: any, index: number) => {
            const isActive = activeIndex === index;
            const Icon = FAQ_ICONS[index % FAQ_ICONS.length];

            return (
              <div key={index} data-reveal>
                <div
                  className={`bg-white rounded-2xl border transition-colors duration-300 overflow-hidden ${
                    isActive ? 'border-[#D4AF37] shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <button
                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005333]/40"
                    onClick={() => toggle(index)}
                    aria-expanded={isActive}
                  >
                    <span className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-[#005333]' : 'text-[#005333]/30'}`}>
                      <Icon weight="light" className="w-5 h-5" aria-hidden="true" />
                    </span>

                    <h3 className={`flex-1 serif-title text-base md:text-lg leading-snug transition-colors duration-300 ${isActive ? 'text-[#005333]' : 'text-gray-800'}`}>
                      {faq.question}
                    </h3>

                    <span
                      className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-300 ${
                        isActive ? 'bg-[#005333] text-[#D4AF37] rotate-180' : 'bg-gray-100 text-[#005333]'
                      }`}
                      aria-hidden="true"
                    >
                      <CaretDownIcon weight="bold" className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </span>
                  </button>

                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isActive ? '1fr' : '0fr',
                      opacity: isActive ? 1 : 0
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pl-[3.75rem] pr-6 md:pl-[4.5rem] md:pr-8 pb-6 md:pb-7 pt-1">
                        <div className="w-full h-px bg-gray-100 mb-5"></div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FamilionFAQ;
