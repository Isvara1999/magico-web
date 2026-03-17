import React from 'react';
import { IconCalendar, IconLocation } from '../icons.tsx';

const GondorbowsHero: React.FC = () => {
  return (
    <section id="heroSec" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          width="100vw" 
          height="100vh" 
          src="https://www.youtube.com/embed/Kd1RCM1LcmI?autoplay=1&mute=1&controls=0&loop=1&playlist=Kd1RCM1LcmI&modestbranding=1&showinfo=0" 
          frameBorder="0" 
          allow="autoplay; encrypted-media" 
          allowFullScreen 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.8)',
            width: '177.78vh',
            height: '100vh',
            minWidth: '100vw',
            zIndex: 1
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/30 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-gold/20 via-transparent to-transparent mix-blend-soft-light"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-8">
        
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
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4 mb-12 md:mb-16">
          <a href="#precios" target="_self" className="group relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/50 to-[#D4AF37]/20 backdrop-blur-md border border-white/40 text-white uppercase tracking-widest text-[0.7rem] font-bold py-3 px-8 rounded-full shadow-[0_4px_15px_0_rgba(0,0,0,0.15)] hover:bg-[#D4AF37]/70 transition-all duration-300 transform hover:-translate-y-0.5 min-w-[180px] w-full sm:w-auto text-center">
             <span className="relative z-10">Quiero reservar mi lugar</span>
             <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
          </a>
          <a href="#comodidad" className="group relative overflow-hidden bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30 text-white/95 uppercase tracking-widest text-[0.7rem] font-bold py-3 px-8 rounded-full shadow-[0_4px_15px_0_rgba(0,0,0,0.1)] hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 min-w-[180px] w-full sm:w-auto text-center">
            <span className="relative z-10">Ver detalles</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
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
