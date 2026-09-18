import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const EmpresasEquipo: React.FC = () => {
  const { t } = useLanguage();
  const e = t.empresas.equipo;

  return (
    <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-10 md:gap-12 items-start">
          <div>
            <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-6" style={{ lineHeight: '1.1' }}>
              {e.title}
            </h2>
            <p data-reveal data-delay="1" className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 font-light">
              {e.intro}
            </p>
            <p data-reveal data-delay="1" className="text-gray-500 text-base leading-relaxed font-light">
              {e.text2}
            </p>
          </div>

          <div data-reveal data-delay="2" className="rounded-2xl overflow-hidden h-56 md:h-full min-h-[240px]">
            <img src="/uploads/f2d5nat1pa6uihnwj480.webp" alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>

        <div data-reveal data-delay="2" className="bg-white rounded-2xl border border-[#E8E4D9] p-8 md:p-10 mt-10">
          <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green mb-4">{e.example_label}</p>
          <p className="text-gray-700 text-base leading-relaxed mb-4">{e.example_text}</p>
          <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">{e.example_result}</p>
          <p className="serif-title text-lg brand-green pt-5 border-t border-[#E8E4D9]">{e.formula}</p>
        </div>
      </div>
    </section>
  );
};

export default EmpresasEquipo;
