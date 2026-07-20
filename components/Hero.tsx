import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tree, UsersThree, CurrencyCircleDollar, MapPin } from '@phosphor-icons/react';
import { ReservasSection } from '../src/components/ReservasSection';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = (t.hero as any).bgImages || [t.hero.bgImage];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextEvent = (t.hero as any).nextEvent;

  return (
    <section id="heroSec" className="relative w-full min-h-screen overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        {images.map((img: string, index: number) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
          />
        ))}
        {/* Overlays originales */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/20 via-transparent to-transparent mix-blend-soft-light" />
        {/* Overlay extra: oscurece la parte superior donde aparece la franja */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-12">

        {/* Mobile/tablet: columna única centrada (igual al diseño original).
            Desktop lg+: dos columnas sin gap — la separación viene del padding del texto. */}
        <div className="flex flex-col lg:flex-row lg:items-start">

          {/* ── Columna izquierda ── */}
          <div className="flex-1 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-12">

            <p className="text-white/45 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
              {(t.hero as any).tag}
            </p>

            <div className="mb-5 md:mb-7">
              <img
                src="/uploads/logo negro.svg"
                alt="Pueblo Mágico"
                width="900" height="900"
                className="h-16 md:h-22 w-auto brightness-0 invert opacity-95 drop-shadow-2xl"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif text-white leading-tight mb-4 tracking-wide drop-shadow-xl font-light">
              {t.hero.title}
            </h1>

            <p className="text-sm sm:text-base text-white/75 font-light max-w-md mb-6 leading-relaxed drop-shadow-sm">
              {t.hero.subtitle}
            </p>

            {/* Trust chips */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-8">
              {nextEvent && (
                <a
                  href={nextEvent.link}
                  className="flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/40 rounded-full px-4 py-1.5 hover:bg-gold/30 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                  <span className="text-white/95 text-[10px] font-bold tracking-widest uppercase">{nextEvent.label}</span>
                </a>
              )}
              <a
                href="https://maps.app.goo.gl/4c1nrpBbQf5hYrsE9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 hover:bg-white/20 transition-colors"
              >
                <span className="text-yellow-300 text-sm leading-none">★★★★★</span>
                <span className="text-white/90 text-[11px] font-semibold tracking-wide">{(t.hero as any).stats_google}</span>
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full px-4 sm:px-0 mb-5">
              <a
                href={t.hero.bookLink as string}
                className="group relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/50 to-[#D4AF37]/20 backdrop-blur-md border border-white/40 text-white uppercase tracking-widest text-[0.7rem] font-bold py-3 px-8 rounded-full hover:bg-[#D4AF37]/70 transition-colors duration-300 min-w-[180px] w-full sm:w-auto text-center"
              >
                {t.hero.btnBook}
              </a>
              <a
                href={(t.hero as any).retreatLink}
                className="group relative overflow-hidden bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30 text-white/95 uppercase tracking-widest text-[0.7rem] font-bold py-3 px-8 rounded-full hover:bg-white/20 transition-colors duration-300 min-w-[180px] w-full sm:w-auto text-center"
              >
                {t.hero.btnRetreat}
              </a>
            </div>

            {/* Cómo llegar */}
            <a
              href="#como-llegar"
              className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-sm font-medium mb-10 md:mb-12"
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" weight="fill" />
              {(t.hero as any).linkComoLlegar}
            </a>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-y-3 gap-x-7 md:gap-x-10 text-[10px] md:text-xs tracking-[0.18em] uppercase font-bold px-4 sm:px-0">
              <div className="flex items-center gap-1.5 text-gold">
                <Tree className="w-3.5 h-3.5 opacity-80 flex-shrink-0" weight="fill" />
                <span>{t.hero.stats_years}</span>
              </div>
              <span className="hidden sm:inline text-gold/20">|</span>
              <div className="flex items-center gap-1.5 text-gold">
                <UsersThree className="w-3.5 h-3.5 opacity-80 flex-shrink-0" weight="fill" />
                <span>{t.hero.stats_trees}</span>
              </div>
              <span className="hidden sm:inline text-gold/20">|</span>
              <div className="flex items-center gap-1.5 text-gold">
                <CurrencyCircleDollar className="w-3.5 h-3.5 opacity-80 flex-shrink-0" weight="fill" />
                <span>{t.hero.stats_sus}</span>
              </div>
            </div>
          </div>

          {/* ── Columna derecha — solo desktop ── */}
          <div className="hidden lg:flex lg:flex-shrink-0 lg:w-[400px]">
            <div
              className="w-full rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.97)' }}
            >
              <div
                className="px-5 py-4 text-center"
                style={{ borderBottom: '1px solid rgba(0,83,51,0.1)' }}
              >
                <p className="text-[9px] uppercase tracking-[0.35em] font-bold mb-0.5" style={{ color: '#D4AF37' }}>
                  Invierno 2026 · Jul · Ago · Sep
                </p>
                <p className="font-bold text-base" style={{ color: '#005333' }}>
                  Reservá tu estadía
                </p>
              </div>
              <ReservasSection showTitle={false} bgColor="transparent" compact />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
