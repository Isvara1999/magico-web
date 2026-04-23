import React from 'react';

const AchalaVivaHero: React.FC = () => {
  return (
    <section id="heroSec" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-[0]">
        <img 
          src="/uploads/img_6948.webp" 
          alt="Achala Viva"
          className="w-full h-full object-cover scale-[1.15] md:scale-[1.20]"
        />
        {/* Fallback color */}
        <div className="absolute inset-0 bg-brand-green/20 z-[0]"></div>
      </div>
      
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#003B24]/95 via-[#005333]/40 to-transparent mix-blend-multiply z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-brand-gold/20 via-transparent to-transparent mix-blend-soft-light z-[1]"></div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-8">
        
        {/* Pre-Title */}
        <div className="mb-4">
          <span className="text-brand-gold font-bold tracking-[0.2em] text-xs sm:text-sm uppercase drop-shadow-md">
            9 Y 10 DE MAYO | LOS GIGANTES, CÓRDOBA
          </span>
        </div>

        {/* Title Container */}
        <div className="mb-6 md:mb-8 transition-all duration-500">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight mb-4 tracking-wide drop-shadow-xl font-light uppercase">
            Achala Viva:<br/>Tierra, Cielo y Vida Salvaje
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
          Tus ojos están cansados de las pantallas. Tu mente necesita silencio. Te invitamos a un fin de semana de inmersión total guiada por biólogos para aprender a leer las estrellas, entender la montaña y recuperar tu capacidad de asombro.
        </p>

        {/* Glass Buttons */}
        <div className="flex flex-col items-center w-full px-4 mb-12 md:mb-16">
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
            <a href="#precios" target="_self" className="btn-gold inline-flex items-center justify-center">
              Quiero asegurar mi lugar
            </a>
            <a href="#experiencia" className="btn-glass inline-flex items-center justify-center">
              Ver detalles
            </a>
          </div>
          <span className="text-white/70 text-xs mt-4 italic font-light drop-shadow-sm">
            Solo 15 plazas disponibles para garantizar el silencio del grupo.
          </span>
        </div>

        {/* Stats 
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium px-4">
          <span>9 y 10 de Mayo</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>Los Gigantes, Córdoba</span>
        </div>
        */}
      </div>
    </section>
  );
};

export default AchalaVivaHero;
