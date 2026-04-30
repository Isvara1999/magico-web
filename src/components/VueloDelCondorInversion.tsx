import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CheckIcon, AirplaneTiltIcon, InfoIcon, WarningIcon } from '@phosphor-icons/react';
import { WA_VUELO_CONDOR } from '../data/config';
import { RETREATS_DATA } from '../data/retreats';

const VueloDelCondorInversion: React.FC = () => {
  const { t } = useLanguage();
  const MSG_VUELO = encodeURIComponent(RETREATS_DATA.vueloDelCondor.message);
  const WA_HREF = `https://wa.me/${WA_VUELO_CONDOR}?text=${MSG_VUELO}`;

  return (
    <section id="reservar" className="py-16 md:py-24 px-4 md:px-6 bg-[#005333] text-white rounded-2xl md:rounded-3xl relative mx-2 md:mx-0 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 border border-white/20 rounded-2xl md:rounded-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center pt-8 md:pt-16 pb-8">
        <h2 className="text-3xl md:text-5xl serif-title mb-4 tracking-[0.05em] uppercase text-white/95" data-reveal>
          {t.vuelo_condor.inversion.title}
        </h2>

        {/* Dates badge */}
        <div className="flex justify-center mb-10" data-reveal>
          <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-black/20">
            {RETREATS_DATA.vueloDelCondor.dates} · {RETREATS_DATA.vueloDelCondor.location}
          </span>
        </div>

        {/* Price card */}
        <div className="w-full flex justify-center px-4 mb-10" data-reveal>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm p-8 md:p-12 text-center flex flex-col items-center">
            <p className="font-bold text-sm md:text-base mb-3 uppercase tracking-widest text-[#005333]">
              {t.vuelo_condor.inversion.total_title}
            </p>
            <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide mb-4 font-serif text-[#005333]">
              {t.vuelo_condor.inversion.currency} {t.vuelo_condor.inversion.price}
            </div>
            <p
              className="text-sm md:text-base opacity-70 font-medium tracking-wide text-[#005333]"
              dangerouslySetInnerHTML={{ __html: t.vuelo_condor.inversion.note }}
            />
          </div>
        </div>

        {/* Qué incluye */}
        <div className="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-10 mb-6 max-w-4xl mx-auto" data-reveal>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 text-center serif-title">
            {t.vuelo_condor.inversion.incluye_title}
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
            {t.vuelo_condor.inversion.incluye.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-white/90">
                <CheckIcon weight="light" className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* No incluye */}
        <div className="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-8 mb-6 max-w-4xl mx-auto text-left" data-reveal>
          <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
            {t.vuelo_condor.inversion.no_incluye_title}
          </h4>
          <p className="text-white/80 text-sm md:text-base mb-4">{t.vuelo_condor.inversion.no_incluye}</p>
          <div className="flex items-start gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-xl p-4">
            <AirplaneTiltIcon weight="light" className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <p
              className="text-white/75 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.vuelo_condor.inversion.vuelos_help }}
            />
          </div>
        </div>

        {/* Cupos */}
        <div className="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-8 mb-10 max-w-4xl mx-auto text-center" data-reveal>
          <h4 className="text-white font-bold tracking-widest text-sm mb-3 uppercase flex items-center justify-center gap-2">
            <WarningIcon weight="light" className="w-5 h-5 text-[#D4AF37]" />
            {t.vuelo_condor.inversion.slots}
          </h4>
          <p className="text-white/70 text-sm md:text-base">
            {t.vuelo_condor.inversion.msg}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center pb-8" data-reveal>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center py-4 px-14 text-sm md:text-base"
          >
            {t.vuelo_condor.inversion.btn}
          </a>
          <div className="flex items-center gap-2 mt-5 text-white/40 text-xs italic font-serif">
            <InfoIcon weight="light" className="w-4 h-4" />
            <span>Reservá con el 30% de seña · USD 540</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorInversion;
