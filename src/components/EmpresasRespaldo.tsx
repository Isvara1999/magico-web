import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ROUTES } from '../routes';

const ITEM_PHOTOS = [
  '/uploads/habitaciones.webp',
  '/uploads/comida.jpg',
  '/uploads/domos_2.jpg',
  '/uploads/grupo.jpg',
  '/uploads/mesadas.webp',
  '/uploads/botica.webp',
];

const EmpresasRespaldo: React.FC = () => {
  const { t } = useLanguage();
  const r = t.empresas.respaldo;
  const red = t.empresas.red;

  return (
    <>
      {/* ====== RESPALDO / TRAYECTORIA ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div data-reveal>
              <h2 className="text-3xl md:text-5xl serif-title brand-green mb-3" style={{ lineHeight: '1.1' }}>
                {r.title}
              </h2>
              <p className="text-[#D4AF37] font-semibold text-base mb-6">{r.subtitle}</p>
              <p className="text-gray-600 text-base leading-relaxed font-light mb-5">{r.text1}</p>
              <p className="text-gray-600 text-base leading-relaxed font-light mb-6">{r.aula_verde_note}</p>
              <a href={ROUTES.ESCUELAS} className="inline-flex items-center gap-2 text-sm font-bold brand-green hover:text-gold transition-colors">
                {r.aula_verde_cta} →
              </a>
            </div>

            <div data-reveal data-delay="1">
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src="/uploads/campoentero.webp"
                  alt=""
                  loading="lazy"
                  className="w-full h-56 md:h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {r.items.map((item: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-[#E8E4D9] bg-white">
                    <div className="h-16 md:h-20 overflow-hidden">
                      <img src={ITEM_PHOTOS[i]} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-600 text-[11px] md:text-xs font-light px-2 py-2 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p data-reveal data-delay="2" className="text-gray-500 text-base leading-relaxed font-light italic mt-12 pt-8 border-t border-[#E8E4D9] max-w-3xl">
            {r.text3}
          </p>
        </div>
      </section>

      {/* ====== RED DE ORGANIZACIONES ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            {red.title}
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-12 font-light">
            {red.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {red.partners.map((partner: any, i: number) => (
              <div key={i} data-reveal data-delay={String((i % 4) + 1)} className="bg-[#005333]/[0.04] rounded-2xl p-6 border border-[#005333]/10">
                <h4 className="font-bold brand-green text-sm uppercase tracking-widest mb-2">{partner.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">{partner.text}</p>
              </div>
            ))}
          </div>

          <p data-reveal data-delay="2" className="text-gray-500 text-sm leading-relaxed font-light italic max-w-3xl">
            {red.benchmark}
          </p>
        </div>
      </section>
    </>
  );
};

export default EmpresasRespaldo;
