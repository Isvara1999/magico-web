import React from 'react';
import { useNavigate } from 'react-router-dom';
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

const INCLUSIONES = [
  { icon: <House weight="duotone" className="w-8 h-8" />, label: 'Alojamiento', sub: 'Domo, habitación o camping' },
  { icon: <Towel weight="duotone" className="w-8 h-8" />, label: 'Ropa blanca', sub: 'Sábanas, toalla y toallón' },
  { icon: <WifiHigh weight="duotone" className="w-8 h-8" />, label: 'Starlink WiFi', sub: 'Conexión en la montaña' },
  { icon: <Campfire weight="duotone" className="w-8 h-8" />, label: 'Espacios comunes', sub: 'Fogón, huerta y jardines' },
  { icon: <SolarPanel weight="duotone" className="w-8 h-8" />, label: 'Energía solar', sub: '100% renovable' },
  { icon: <BookOpen weight="duotone" className="w-8 h-8" />, label: 'Reset Vital', sub: 'Guía PDF de retiro autoguiado' },
  { icon: <Drop weight="duotone" className="w-8 h-8" />, label: 'Biokit Ecológico', sub: 'Jabón, shampoo y acondicionador biodegradables' },
];

export const SectionInclusiones: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <span id="inclusiones" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-20 bg-brand text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-12" data-reveal>
            <p className="text-gold font-bold tracking-widest uppercase text-xs mb-3 opacity-90">
              TODO INCLUIDO
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4">
              Lo que incluye tu estadía
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">
              Sin sorpresas. Un precio claro que incluye todo lo que necesitás para desconectarte y reconectarte.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12" data-reveal>
            {INCLUSIONES.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center bg-white/10 rounded-2xl px-5 py-7 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors duration-300"
              >
                <span className="text-gold mb-3">{item.icon}</span>
                <span className="font-semibold text-white text-sm mb-1">{item.label}</span>
                <span className="text-white/60 text-xs">{item.sub}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-5" data-reveal>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/10 border border-white/20 rounded-2xl px-7 py-5 text-center backdrop-blur-sm">
                <p className="text-white/70 font-bold tracking-widest uppercase text-xs mb-1">Solo alojamiento</p>
                <p className="text-white text-3xl md:text-4xl font-serif">
                  $40.000 <span className="text-xl font-sans font-light">/ noche</span>
                </p>
                <p className="text-white/50 text-xs mt-1">Incluye ropa blanca, biocosmética y Reset Vital</p>
              </div>
              <div className="bg-gold/20 border border-gold/40 rounded-2xl px-7 py-5 text-center backdrop-blur-sm">
                <p className="text-gold font-bold tracking-widest uppercase text-xs mb-1">Pensión completa</p>
                <p className="text-white text-3xl md:text-4xl font-serif">
                  $95.000 <span className="text-xl font-sans font-light">/ noche</span>
                </p>
                <p className="text-white/50 text-xs mt-1">+ desayuno, almuerzo y cena · todo incluido</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/estadia')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand rounded-full hover:bg-gold hover:text-white transition-[background-color,color] duration-300 text-xs tracking-widest uppercase font-bold"
            >
              Ver todos los alojamientos <ArrowRight weight="bold" className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};
