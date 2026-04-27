import React, { useState, useEffect } from 'react';


const GondorbowsHero: React.FC = () => {
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
            src="https://www.youtube-nocookie.com/embed/Kd1RCM1LcmI?autoplay=1&mute=1&controls=0&loop=1&playlist=Kd1RCM1LcmI&modestbranding=1&showinfo=0" 
            title="Video de fondo — Gondorbows"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 z-[0] pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1.8)',
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
      <div className="absolute inset-0 bg-black/60 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green/95 via-brand-green/30 to-transparent mix-blend-multiply z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-brand-gold/20 via-transparent to-transparent mix-blend-soft-light z-[1]"></div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-8">
        
        {/* Title Container */}
        <div className="mb-6 md:mb-8 transition-all duration-500">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight mb-4 tracking-wide drop-shadow-xl font-light">
            Despertá tu instinto
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-lg mx-auto mb-8 leading-normal drop-shadow-sm">
          Del 10 al 12 de abril. Mágico Ensueño y Gondorbows se unen en Córdoba para tres días de retiro inmersivo. Aprendé un oficio ancestral, trabajá la madera con tus manos y llevate un arco funcional de alta calidad. No requiere experiencia previa.
        </p>

        {/* Glass Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4 mb-12 md:mb-16">
          <a href="#precios" target="_self" className="btn-gold inline-flex items-center justify-center">
            Quiero reservar mi lugar
          </a>
          <a href="#comodidad" className="btn-glass inline-flex items-center justify-center">
            Ver detalles
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/60 text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium px-4">
          <span>10 al 12 de Abril</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>Los Gigantes, Córdoba</span>
        </div>
      </div>
    </section>
  );
};

export default GondorbowsHero;
