import React from 'react';
import { WA_MAGICO } from '../../constants';

const FamilionMagico: React.FC = () => {
  const consultLink = "https://wa.me/" + WA_MAGICO + "?text=" +
    encodeURIComponent("Hola! Vengo de Familion y quiero consultar la ubicación exacta y cómo llegar.");

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-green text-white rounded-3xl relative overflow-hidden">
    {/* glassy overlay (no border) */}
    <div className="absolute inset-0 rounded-3xl backdrop-blur-sm pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl">
        <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 text-center">Mágico Ensueño</h2>
        
          <div className="max-w-3xl mx-auto mb-10">
          <p className="text-white/95 text-base md:text-lg leading-relaxed">
            En el corazón de <span className="text-brand-gold font-bold">Los Gigantes, Córdoba</span>, a solo 1h de Tanti y 1:30h de Villa Carlos Paz. Un lugar donde la naturaleza marca el ritmo, la montaña habla en silencio, y una comunidad que acompaña se encuentran en perfecta armonía. Acceso para todo tipo de vehiculos hasta la puerta del lugar .
          </p>
        </div>
        
        {/* Video Principal (Reemplaza Imágenes Anteriores) */}
        <div className="flex justify-center mb-10 w-full relative z-20">
          <div className="relative w-full max-w-sm">
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#001a0d]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/hxE7Ksy7IsY?autoplay=1&mute=1&loop=1&playlist=hxE7Ksy7IsY"
                title="Mágico Ensueño - Experiencia en la Montaña"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold text-lg mb-4">Cómo Este Lugar Mejora Tu Experiencia</h4>
            <ul className="text-white/90 text-sm leading-relaxed space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-1">✓</span>
                <span><strong>Regeneración activa:</strong> +15.000 árboles plantados transforman el aire que respiras</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-1">✓</span>
                <span><strong>Comunidad:</strong> 25+ años de coherencia manifestando el propósito</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-1">✓</span>
                <span><strong>Energía solar:</strong> 100% sustentable, sin huella de carbono</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold text-lg mb-4">Tu Inversión Genera Regeneración</h4>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              El 10% de tu inversión se destina directamente a reforestar los tabaquillos y restaurar las sierras de Los Gigantes.
            </p>
            <p className="text-white/90 italic text-sm leading-relaxed">
              Cada familia que nos elige es una semilla de cambio en la montaña.
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center">
          <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
            Mágico Ensueño es más que un destino; aquí <span className="text-brand-gold font-bold">la ubicación en la naturaleza regenera</span> mientras tu familia se reconecta, el cuerpo se sana y el alma vuelve a respirar en armonía con el ritmo de la montaña.
          </p>
        </div>
      </div>
      {/* Mapa del Lugar */}
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <div className="relative group cursor-zoom-in" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt="Mapa de Familion - Los Gigantes" loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="/uploads/mapa_magico.webp" download="Mapa_Familion_Los_Gigantes.webp" className="btn-glass inline-block w-full sm:w-auto text-center">Descargar Mapa</a>
            <a href={consultLink} className="btn-gold inline-block w-full sm:w-auto text-center">Consultar ubicación</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default FamilionMagico;
