import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ROUTES } from '../src/routes';
import { ESTADIA_PRICES } from '../src/data/retreats';
import {
  House,
  WifiHigh,
  Campfire,
  SolarPanel,
  BookOpen,
  Towel,
  Drop,
  ArrowRight,
} from '@phosphor-icons/react';

const ICONS = [
  <House weight="duotone" className="w-8 h-8" />,
  <Towel weight="duotone" className="w-8 h-8" />,
  <WifiHigh weight="duotone" className="w-8 h-8" />,
  <Campfire weight="duotone" className="w-8 h-8" />,
  <SolarPanel weight="duotone" className="w-8 h-8" />,
  <BookOpen weight="duotone" className="w-8 h-8" />,
  <Drop weight="duotone" className="w-8 h-8" />,
];

export const SectionInclusiones: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const i = t.inclusiones;

  return (
    <>
      <span id="inclusiones" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-20 bg-brand text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-12" data-reveal>
            <p className="text-gold font-bold tracking-widest uppercase text-xs mb-3 opacity-90">
              {i.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4">
              {i.title}
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">
              {i.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12" data-reveal>
            {i.items.map((item: { label: string; sub: string }, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-white/10 rounded-2xl px-5 py-7 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors duration-300"
              >
                <span className="text-gold mb-3">{ICONS[idx]}</span>
                <span className="font-semibold text-white text-sm mb-1">{item.label}</span>
                <span className="text-white/60 text-xs">{item.sub}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-5" data-reveal>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/10 border border-white/20 rounded-2xl px-7 py-5 text-center backdrop-blur-sm">
                <p className="text-white/70 font-bold tracking-widest uppercase text-xs mb-1">{i.price_solo_label}</p>
                <p className="text-white text-3xl md:text-4xl font-serif">
                  ${ESTADIA_PRICES.base.toLocaleString('es-AR')} <span className="text-xl font-sans font-light">{i.price_unit}</span>
                </p>
                <p className="text-white/50 text-xs mt-1">{i.price_solo_sub}</p>
              </div>
              <div className="bg-gold/20 border border-gold/40 rounded-2xl px-7 py-5 text-center backdrop-blur-sm">
                <p className="text-gold font-bold tracking-widest uppercase text-xs mb-1">{i.price_pension_label}</p>
                <p className="text-white text-3xl md:text-4xl font-serif">
                  ${ESTADIA_PRICES.pensionCompleta.toLocaleString('es-AR')} <span className="text-xl font-sans font-light">{i.price_unit}</span>
                </p>
                <p className="text-white/50 text-xs mt-1">{i.price_pension_sub}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(ROUTES.ESTADIA)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand rounded-full hover:bg-gold hover:text-white transition-[background-color,color] duration-300 text-xs tracking-widest uppercase font-bold"
            >
              {i.cta} <ArrowRight weight="bold" className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};
