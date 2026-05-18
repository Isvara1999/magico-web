import React, { useState, useEffect } from 'react';
import { MapPin, CalendarBlank } from '@phosphor-icons/react';
import { useLanguage } from '../../contexts/LanguageContext';

const AulaVerdeHero: React.FC = () => {
  const { t } = useLanguage();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="heroSec" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-[0] pointer-events-none">
        {videoLoaded && (
          <iframe
            width="100vw"
            height="100vh"
            src="https://www.youtube-nocookie.com/embed/R5c5r9dNR_M?autoplay=1&mute=1&controls=0&loop=1&playlist=R5c5r9dNR_M&modestbranding=1&showinfo=0&vq=hd1080"
            title={t.aula_verde.hero.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-[0] pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1.4)',
              width: '177.78vh',
              height: '100vh',
              minWidth: '100vw',
              zIndex: 0
            }}
          />
        )}
        {/* Placeholder color before video loads */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-green/90 to-brand-green/80 z-[0]"></div>
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#001a0d]/60 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green/95 via-brand-green/30 to-transparent mix-blend-multiply z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-brand-gold/20 via-transparent to-transparent mix-blend-soft-light z-[1]"></div>

      {/* Content */}
      <div data-reveal className="relative z-[2] text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-8">

        {/* Subtitle */}
        <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-white mb-3 md:mb-4 drop-shadow-md">
          {t.aula_verde.hero.subtitle}
        </p>

        {/* Title Container */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl serif-title text-white leading-tight tracking-wide drop-shadow-xl font-light">
            {t.aula_verde.hero.title}
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-white/90 font-medium max-w-2xl mx-auto mb-4 md:mb-6 drop-shadow-md">
          {t.aula_verde.hero.tagline}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-xl mx-auto mb-6 md:mb-8 leading-relaxed drop-shadow-sm">
          {t.aula_verde.hero.description}
        </p>

        {/* Discipline pills */}
        {t.aula_verde.hero.disciplines && (
          <div className="flex flex-col items-center gap-3 mb-8 md:mb-12 px-4">
            {/* Pilar central */}
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold px-5 py-2 rounded-full border border-brand-gold/60 text-brand-gold bg-brand-gold/10 backdrop-blur-sm">
              {(t.aula_verde.hero.disciplines as string[])[0]}
            </span>
            {/* Áreas derivadas */}
            <div className="flex flex-wrap justify-center gap-2">
              {(t.aula_verde.hero.disciplines as string[]).slice(1).map((d: string, i: number) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-[0.18em] font-medium px-3 py-1.5 rounded-full border border-white/15 text-white/55 bg-white/5 backdrop-blur-sm"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom Premium Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-5 justify-center items-center w-full px-4 mb-12 md:mb-16">
          <a
            href="#precios"
            target="_self"
            className="relative overflow-hidden group bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-[#003823] font-extrabold tracking-widest uppercase text-sm px-10 py-4 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">{t.aula_verde.hero.cta_budget}</span>
            {/* Shimmer Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] skew-x-12"></div>
          </a>

          <a
            href="#comodidad"
            className="relative group bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/50 text-white font-semibold tracking-widest uppercase text-sm px-10 py-4 rounded-full shadow-lg hover:bg-white/10 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-1"
          >
            {t.aula_verde.hero.cta_facilities}
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 text-white/60 text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium px-4">
          <div className="flex items-center gap-2">
            <CalendarBlank weight="thin" className="w-5 h-5 text-brand-gold/80" />
            <span>{t.aula_verde.hero.stat_open}</span>
          </div>
          <span className="hidden sm:inline opacity-30">|</span>
          <div className="flex items-center gap-2">
            <MapPin weight="thin" className="w-5 h-5 text-brand-gold/80" />
            <span>{t.aula_verde.hero.stat_location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AulaVerdeHero;
