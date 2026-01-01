import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Usamos las imágenes del array si existen, si no, usamos la imagen única como fallback
  const images = (t.hero as any).bgImages || [t.hero.bgImage];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="heroSec" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {images.map((img: string, index: number) => (
          <img
            key={index}
            src={img}
            alt={t.hero.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            loading={index === 0 ? "eager" : "lazy"} 
          />
        ))}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/30 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/20 via-transparent to-transparent mix-blend-soft-light"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-32 md:pt-40 pb-10">
        
        {/* Logo Container */}
        <div className="mb-8 md:mb-12 transition-all duration-500">
          <img
            src="https://tawaapukuntur.com/wp-content/uploads/2025/10/logotipo-marron-magico.svg"
            alt="Mágico Ensueño"
            className="h-12 md:h-16 w-auto mx-auto brightness-0 invert opacity-90"
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight mb-6 tracking-wide drop-shadow-xl font-light">
          {t.hero.title}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-lg mx-auto mb-10 leading-relaxed drop-shadow-sm">
          {t.hero.subtitle}
        </p>

        {/* Glass Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4 mb-16 md:mb-20">
          <a href={t.hero.bookLink} target={t.hero.bookLink.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer" className="group relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/50 to-[#D4AF37]/20 backdrop-blur-md border border-white/40 text-white uppercase tracking-widest text-[0.7rem] font-bold py-3 px-8 rounded-full shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] hover:bg-[#D4AF37]/70 transition-all duration-300 transform hover:-translate-y-0.5 min-w-[180px] w-full sm:w-auto text-center">
             <span className="relative z-10">{t.hero.btnBook}</span>
             <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
          </a>
          <a href={t.hero.retreatLink} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30 text-white/95 uppercase tracking-widest text-[0.7rem] font-bold py-3 px-8 rounded-full shadow-[0_4px_15px_0_rgba(0,0,0,0.1)] hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 min-w-[180px] w-full sm:w-auto text-center">
            <span className="relative z-10">{t.hero.btnRetreat}</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/60 text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium px-4">
          <span>{t.hero.stats_years}</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>{t.hero.stats_trees}</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>{t.hero.stats_sus}</span>
        </div>
      </div>
    </section>
  );
};