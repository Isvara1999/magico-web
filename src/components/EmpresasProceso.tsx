import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const FORMATO_PHOTOS = [
  '/uploads/Aula Verde/IMG-20251120-WA0107.jpg',
  '/uploads/fogon_nocturno.webp',
  '/uploads/domos.webp',
];

const EmpresasProceso: React.FC = () => {
  const { t } = useLanguage();
  const pr = t.empresas.proceso;
  const f = t.empresas.formatos;

  return (
    <>
      {/* ====== PROCESO ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            {pr.title}
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-12 font-light">
            {pr.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {pr.steps.map((step: any, i: number) => (
              <div key={step.num} data-reveal data-delay={String((i % 3) + 1)} className="bg-white rounded-2xl border border-[#E8E4D9] p-6">
                <span className="serif-title text-3xl font-light block leading-none mb-3" style={{ color: 'rgba(0,83,51,0.2)' }}>
                  {step.num}
                </span>
                <h4 className="font-bold brand-green text-sm uppercase tracking-widest mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FORMATOS ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-12 md:mb-16 max-w-2xl" style={{ lineHeight: '1.1' }}>
            {f.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {f.items.map((item: any, i: number) => (
              <div key={i} data-reveal data-delay={String(i + 1)} className="relative rounded-2xl overflow-hidden text-white min-h-[260px] flex flex-col justify-end p-7 md:p-8">
                <img src={FORMATO_PHOTOS[i]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,20,14,0.95) 10%, rgba(0,40,27,0.55) 60%, rgba(0,40,27,0.25) 100%)' }} />
                <div className="relative z-10">
                  <h3 className="text-xl serif-title text-white mb-3">{item.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed font-light">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p data-reveal data-delay="4" className="text-gray-500 text-sm leading-relaxed font-light italic max-w-xl">
            {f.note}
          </p>
        </div>
      </section>
    </>
  );
};

export default EmpresasProceso;
