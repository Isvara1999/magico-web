import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const PHOTOS = [
  '/uploads/domos.webp',
  '/uploads/habitaciones.webp',
  '/uploads/refu.webp',
  '/uploads/mesadas.webp',
  '/uploads/botica.webp',
  '/uploads/coworking.webp',
  '/uploads/pachamama-fogon-grupo-cielo.webp',
  '/uploads/469731807_3987061274856806_2943773444767775905_n.jpg',
];

const EmpresasGaleria: React.FC = () => {
  const { t } = useLanguage();
  const g = t.empresas.galeria;

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-4" style={{ lineHeight: '1.1' }}>
          {g.title}
        </h2>
        <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light">
          {g.subtitle}
        </p>
      </div>

      <div data-reveal data-delay="2" className="flex gap-4 overflow-x-auto pb-2 px-6 snap-x snap-mandatory scrollbar-hide">
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            className="snap-start flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[300px] md:h-[360px] rounded-2xl overflow-hidden"
          >
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
        {/* trailing spacer so the last card isn't flush against the viewport edge */}
        <div className="flex-shrink-0 w-2" aria-hidden="true" />
      </div>
    </section>
  );
};

export default EmpresasGaleria;
