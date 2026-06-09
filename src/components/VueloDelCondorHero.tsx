import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WA_VUELO_CONDOR } from '../data/config';
import { RETREATS_DATA } from '../data/retreats';
import { img } from '../lib/img';

const VueloDelCondorHero: React.FC = () => {
  const { t } = useLanguage();
  const MSG_VUELO = encodeURIComponent(RETREATS_DATA.vueloDelCondor.message);

  return (
    <section id="heroSec" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <picture>
          <source media="(orientation: portrait)" srcSet="/uploads/vuelo-condor/hero-mobile.webp" />
          <img
            src={img('/uploads/vuelo-del-condor-hero.webp', 1920)}
            alt="El Vuelo del Cóndor — Valle Sagrado, Perú"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        {/* Optimized Overlays for Clarity & Readability */}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-transparent to-black/20 z-[2]"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-12">
        
        {/* Badge or Tagline */}
        <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <span className="px-4 py-1.5 rounded-full bg-brand-gold text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] shadow-xl">
            {t.vuelo_condor.hero.dates}
          </span>
        </div>

        {/* Main Titles */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl serif-title text-white leading-tight mb-4 tracking-tight drop-shadow-2xl font-light">
            {t.vuelo_condor.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white font-serif mt-2 tracking-wide drop-shadow-lg opacity-95">
            {t.vuelo_condor.hero.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-white font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          {t.vuelo_condor.hero.text}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <a href={`https://wa.me/${WA_VUELO_CONDOR}?text=${MSG_VUELO}`} className="btn-gold min-w-[240px] shadow-2xl shadow-brand-gold/20">
            {t.vuelo_condor.hero.btn_info}
          </a>
          <a href="#itinerario" className="btn-glass min-w-[240px]">
            {t.vuelo_condor.hero.btn_itinerary}
          </a>
        </div>

        {/* Location Footer */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <div className="flex items-center gap-3 text-white text-[10px] tracking-[0.4em] uppercase font-bold">
            <div className="w-10 h-px bg-white/40"></div>
            <span>{t.vuelo_condor.hero.location}</span>
            <div className="w-10 h-px bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade for transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-[5]"></div>
    </section>
  );
};

export default VueloDelCondorHero;
