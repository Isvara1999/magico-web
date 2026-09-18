import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WA_MAGICO } from '../data/config';

const EmpresasCTAFinal: React.FC = () => {
  const { t } = useLanguage();
  const emp = t.empresas.empezar;
  const cta = t.empresas.cta_final;

  const waPrograma = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(t.empresas.hero.wa_query_programa)}`;
  const waJornada = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(t.empresas.hero.wa_query_jornada)}`;

  return (
    <>
      {/* ====== DOS FORMAS DE EMPEZAR ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-12 md:mb-16 text-center" style={{ lineHeight: '1.1' }}>
            {emp.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-reveal className="bg-white rounded-2xl border border-[#E8E4D9] p-8 md:p-10 flex flex-col">
              <h3 className="text-2xl serif-title brand-green mb-4">{emp.option1.title}</h3>
              <p className="text-gray-500 text-base leading-relaxed font-light mb-8 flex-grow">{emp.option1.text}</p>
              <a href={waPrograma} target="_blank" rel="noopener noreferrer" className="btn-gold inline-block text-center" style={{ whiteSpace: 'normal' }}>
                {emp.option1.cta}
              </a>
            </div>

            <div data-reveal data-delay="1" className="bg-[#005333] rounded-2xl p-8 md:p-10 text-white flex flex-col">
              <h3 className="text-2xl serif-title text-white mb-4">{emp.option2.title}</h3>
              <p className="text-white/70 text-base leading-relaxed font-light mb-8 flex-grow">{emp.option2.text}</p>
              <a
                href={waJornada}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center border border-white/30 rounded-full px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#005333] transition-colors"
              >
                {emp.option2.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CIERRE ====== */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/uploads/dji_0074.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,20,14,0.88) 0%, rgba(0,30,20,0.82) 100%)' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title text-white mb-6" style={{ lineHeight: '1.12' }}>
            {cta.title}
          </h2>
          <p data-reveal data-delay="1" className="text-white/75 text-base md:text-lg leading-relaxed mb-9 max-w-xl mx-auto font-light">
            {cta.subtitle}
          </p>

          <div data-reveal data-delay="2" className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a href={waPrograma} target="_blank" rel="noopener noreferrer" className="btn-gold inline-block text-center" style={{ whiteSpace: 'normal' }}>
              {cta.cta_primary}
            </a>
            <a
              href={waJornada}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/30 rounded-full px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#005333] transition-colors"
            >
              {cta.cta_secondary}
            </a>
          </div>

          <p className="text-white/50 text-xs uppercase tracking-widest">{cta.location}</p>
        </div>
      </section>
    </>
  );
};

export default EmpresasCTAFinal;
