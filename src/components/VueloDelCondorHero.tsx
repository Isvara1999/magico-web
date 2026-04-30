import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WA_VUELO_CONDOR } from '../data/config';
import { RETREATS_DATA } from '../data/retreats';

const VueloDelCondorHero: React.FC = () => {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const MSG_VUELO = encodeURIComponent(RETREATS_DATA.vueloDelCondor.message);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="heroSec" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {videoLoaded && (
          <iframe 
            src="https://www.youtube-nocookie.com/embed/PjGkVCAo8Fw?autoplay=1&mute=1&controls=0&loop=1&playlist=PjGkVCAo8Fw&modestbranding=1&showinfo=0&rel=0" 
            title="Video de fondo — El Vuelo del Cóndor"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.35] md:scale-[1.6]"
            style={{
              pointerEvents: 'none',
              aspectRatio: '16/9'
            }}
          />
        )}
        {/* Fallback & Overlays */}
        <div className="absolute inset-0 bg-brand-green/40 backdrop-blur-[2px] z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/20 to-transparent z-[2]"></div>
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-12">
        
        {/* Badge or Tagline */}
        <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <span className="px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md">
            {t.vuelo_condor.hero.dates}
          </span>
        </div>

        {/* Main Titles */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl serif-title text-white leading-tight mb-4 tracking-tight drop-shadow-2xl font-light">
            {t.vuelo_condor.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-brand-gold font-serif mt-2 tracking-wide drop-shadow-lg opacity-90">
            {t.vuelo_condor.hero.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '600ms' }}>
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
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <div className="flex items-center gap-3 text-white/60 text-[10px] tracking-[0.4em] uppercase font-medium">
            <div className="w-8 h-px bg-white/20"></div>
            <span>{t.vuelo_condor.hero.location}</span>
            <div className="w-8 h-px bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Overlays for smooth transitions */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]"></div>
    </section>
  );
};

export default VueloDelCondorHero;
