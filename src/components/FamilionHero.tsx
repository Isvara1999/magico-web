import React from 'react';
import { IconCalendar, IconLocation } from '../icons.tsx';

const FamilionHero: React.FC = () => (
<section className="relative w-full px-4 sm:px-8 md:px-6 bg-white rounded-3xl overflow-hidden flex items-center justify-center py-16 md:py-20 lg:py-24">
    <div className="max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center justify-center mx-auto max-w-6xl">
        {/* Left Content - centered (text first on mobile) */}
        <div className="flex flex-col justify-center text-center order-1 lg:order-1 lg:relative lg:z-20 lg:transform lg:-translate-y-2 lg:text-center">
          {/* Subtitle */}
          <p className="text-xs uppercase tracking-widest font-bold text-brand-green mb-2">
            Mágico Ensueño Presenta
          </p>

          {/* Main Title with gold accent */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-green leading-tight mb-4 md:mb-5 tracking-wide" style={{ fontFamily: "'Marcellus', serif" }}>
            <span className="brand-gold">Familion</span><span className="text-brand-green">: Una experiencia para compartir con la Tribu en la montaña!</span>
          </h1>

          {/* Tagline with subtle gold highlights */}
          <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto mb-5 leading-relaxed">
            "Cambiamos pantallas por naturaleza, velocidad por presencia y soledad por <span className="brand-gold">tribu</span>.  Una invitación a despedir el verano con toda la Familia."
          </p>

          {/* Meta Info - Compact with icons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-5 md:mb-6">
            <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-semibold">
              <IconCalendar className="w-4 h-4 text-brand-green" />
              <span>Finde Largo del 21 al 24 de Marzo</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm md:text-base text-gray-700 font-semibold">
              <IconLocation className="w-4 h-4 text-brand-green" />
              <span>Los Gigantes, Córdoba</span>
            </div>
            <div className="sm:hidden flex items-center gap-2 text-sm md:text-base text-gray-700 font-semibold">
              <IconLocation className="w-4 h-4 text-brand-green" />
              <span>Los Gigantes</span>
            </div>
          </div>

          {/* CTA - stack in mobile */}
          <div className="hero-cta flex flex-col items-center justify-center text-center sm:flex-row gap-3 flex-nowrap max-w-4xl mx-auto mt-6 md:mt-8">
            <a href="#precios" className="btn-gold inline-flex items-center justify-center w-full sm:w-auto max-w-xs">
              Sumarse
            </a>
            <a href="#comodidad" className="btn-glass inline-flex items-center justify-center w-full sm:w-auto max-w-xs">
              Ver detalles
            </a>
          </div>
        </div>

        {/* Right Image - appears AFTER text on mobile */}
        <div className="flex items-center justify-center order-2 lg:order-2">
          <div className="relative w-full sm:max-w-[420px] lg:max-w-[720px]">
            <img
              src="/uploads/portada familion.webp"
              alt="Familion - Los Gigantes" loading="lazy"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover lg:h-[520px]"
            />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-green/5 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FamilionHero;
