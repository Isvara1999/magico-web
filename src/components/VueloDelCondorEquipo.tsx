import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorEquipo: React.FC = () => {
  const { t } = useLanguage();

  const getInitials = (nombre: string) =>
    nombre.split(' ').filter((_: string, i: number) => i === 0 || i === nombre.split(' ').length - 1)
      .map((n: string) => n[0]).join('').toUpperCase();

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14" data-reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">Acompañamiento</p>
          <h2 className="text-3xl md:text-5xl serif-title brand-green mb-4">
            {t.vuelo_condor.equipo.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm md:text-base font-light">
            {t.vuelo_condor.equipo.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {t.vuelo_condor.equipo.members.map((p: any, i: number) => (
            <div
              key={i}
              className="text-center"
              data-reveal
              data-delay={String(i + 1)}
            >
              <div className="w-20 h-20 rounded-full bg-[#005333]/8 border border-[#005333]/15 flex items-center justify-center mx-auto mb-5">
                <span className="font-serif text-xl text-[#005333]">{getInitials(p.nombre)}</span>
              </div>
              <h4 className="text-lg md:text-xl serif-title brand-green mb-2">{p.nombre}</h4>
              <div className="w-6 h-px bg-brand-gold/40 mx-auto mb-3" />
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto font-light">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-[#F9F8F4] p-7 md:p-8 rounded-2xl text-center" data-reveal>
          <p className="text-gray-600 italic font-serif leading-relaxed text-sm md:text-base">
            {t.vuelo_condor.equipo.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorEquipo;
