import React from 'react';
import { Check } from 'lucide-react';
import { WA_MAGICO } from '../data/config';
import { RETREATS_DATA } from '../data/retreats';
import { useLanguage } from '../../contexts/LanguageContext';

const FamilionPrecios: React.FC = () => {
  const { t } = useLanguage();
  const waLink = "https://wa.me/" + WA_MAGICO + "?text=" +
    encodeURIComponent(RETREATS_DATA.familion.message);

  return (
    <section id="precios" className="py-16 md:py-24 px-6 bg-brand-green text-white rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 border border-white/20 rounded-3xl backdrop-blur-sm pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl serif-title mb-4 md:mb-6 tracking-[0.15em] uppercase text-white/90">
        {t.familion.precios.title}
      </h2>
      <p className="text-white/80 text-sm md:text-base mb-8 md:mb-10 max-w-2xl mx-auto">
        {t.familion.precios.subtitle}
      </p>
      
      {/* Fechas Alert */}
      <div className="max-w-2xl mx-auto mb-10 flex flex-col md:flex-row gap-4 justify-center items-center">
        {t.familion.cronograma.dates.map((date: string, i: number) => (
          <div key={i} className={`bg-white/10 border ${i === 0 ? 'border-brand-gold/30' : 'border-white/20'} rounded-2xl px-6 py-4 flex-1 w-full md:w-auto`}>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{t.familion.precios.editions[i] || "EDICIÓN"}</p>
            <p className="text-lg serif-title font-bold text-white">{date.split('·')[0].trim()}</p>
            <p className="text-xs font-bold text-[#D4AF37] mt-1">{t.familion.precios.spots[i] || "¡CUPOS LIMITADOS!"}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl p-8 md:p-12 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 items-stretch">
          {/* Camping */}
          <div className="p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border border-white/20 shadow-inner bg-[#003d26]">
            <h3 className="serif-title text-lg md:text-xl font-bold text-white mb-3">{t.familion.precios.cards.camping.title}</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl serif-title font-extrabold tracking-tight mb-3" style={{ color: '#D4AF37' }}>${t.familion.precios.items[0].price}</p>
            <p className="text-white/80 text-sm md:text-base">{t.familion.precios.cards.camping.text}</p>
          </div>

          {/* Eco-Refugio y Domos - Destacado */}
          <div className="relative p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border-2 border-[#D4AF37] bg-white shadow-xl overflow-hidden">
            <h3 className="serif-title text-lg md:text-xl font-bold mb-3" style={{ color: '#005333' }}>{t.familion.precios.cards.refugio.title}</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl serif-title font-extrabold tracking-tight mb-3" style={{ color: '#D4AF37' }}>${t.familion.precios.items[1].price}</p>
            <p className="text-sm md:text-base leading-relaxed break-words" style={{ color: '#005333' }}>{t.familion.precios.cards.refugio.text}</p>
          </div>

          {/* Domo Privado */}
          <div className="relative p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border-2 border-[#D4AF37] bg-[#002e1c] shadow-xl overflow-hidden">
            <h3 className="serif-title text-lg md:text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>{t.familion.precios.cards.privado.title}</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl serif-title font-extrabold tracking-tight mb-3" style={{ color: '#ffffff' }}>${t.familion.precios.items[2].price}</p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed break-words">{t.familion.precios.cards.privado.text}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 border border-white/20 p-6 md:p-8 mb-8 text-left shadow-inner">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{t.familion.precios.includes.title}</h4>
          <ul className="space-y-3 text-white/85 text-sm md:text-base">
            {t.familion.precios.includes.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-brand-gold flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 border border-[#D4AF37]/30 p-6 md:p-8 mb-8 text-center shadow-inner">
          <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-3">{t.familion.precios.exchange.title}</h4>
          <p className="text-white/90 text-sm md:text-base leading-relaxed italic">
            {t.familion.precios.exchange.text}
          </p>
        </div>

        <a
          href={waLink}
          className="btn-gold w-full md:w-auto block md:inline-block mb-6"
        >
          {t.familion.precios.btn}
        </a>

        <p className="text-white/70 text-xs md:text-sm leading-relaxed italic">
          {t.familion.precios.footer}
        </p>
      </div>
    </div>
  </section>
  );
};

export default FamilionPrecios;
