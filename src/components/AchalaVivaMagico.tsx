import React from 'react';
import { Recycle, Sun, Leaf } from '@phosphor-icons/react';
import { WA_MAGICO } from '../data/config';

const AchalaVivaMagico: React.FC = () => {
  const consultLink = "https://wa.me/" + WA_MAGICO + "?text=" +
    encodeURIComponent("¡Hola! Estoy organizando mi viaje para el retiro de Achala Viva y quería consultar bien la ubicación y cómo llegar a Pueblo Mágico en Los Gigantes. ⛰️🗺️");

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-green text-white rounded-3xl relative overflow-hidden mt-16 md:mt-24 mx-2 md:mx-0">
    {/* glassy overlay (no border) */}
    <div className="absolute inset-0 rounded-3xl backdrop-blur-sm pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl">
        <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 text-center">Pueblo Mágico</h2>
        
          <div className="max-w-3xl mx-auto mb-10">
          <p className="text-white/95 text-base md:text-lg leading-relaxed text-center">
            En el corazón de <span className="text-gold font-bold">Los Gigantes, Córdoba</span>, a solo 1h de Tanti y 1:30h de Villa Carlos Paz. Un lugar donde la naturaleza marca el ritmo, la montaña habla en silencio, y una comunidad que acompaña se encuentran en perfecta armonía. Acceso para todo tipo de vehículos hasta la puerta del lugar.
          </p>
        </div>
        
        {/* Video Principal */}
        <div className="flex justify-center mb-10 w-full relative z-20">
          <div className="relative w-full max-w-sm">
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#001a0d]">
              {/* Poster as fallback when iframe is blocked (Brave) */}
              <img
                src="/uploads/img_6948.webp"
                alt="Pueblo Mágico — Experiencia en la Montaña"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/hxE7Ksy7IsY?autoplay=1&mute=1&loop=1&playlist=hxE7Ksy7IsY"
                title="Pueblo Mágico - Experiencia en la Montaña"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-gold/10 rounded-2xl p-8 md:p-12 border border-gold/30 text-center">
            <h2 className="text-2xl md:text-4xl serif-title brand-gold mb-8 uppercase tracking-wide">
              Tu Inversión Genera Regeneración
            </h2>
            <ul className="text-white/90 text-base md:text-lg leading-relaxed space-y-6 text-left max-w-2xl mx-auto mb-8">
              <li className="flex items-start gap-4">
                <Recycle weight="light" className="w-7 h-7 text-gold flex-shrink-0 mt-0.5" />
                <span><strong>+15.000 árboles plantados</strong> en nuestra reserva.</span>
              </li>
              <li className="flex items-start gap-4">
                <Sun weight="light" className="w-7 h-7 text-gold flex-shrink-0 mt-0.5" />
                <span><strong>100% Energía Solar</strong> (Cero huella de carbono).</span>
              </li>
              <li className="flex items-start gap-4">
                <Leaf weight="light" className="w-7 h-7 text-gold flex-shrink-0 mt-0.5" />
                <span>El <strong>10% de tu inversión</strong> va directo a reforestar tabaquillos y restaurar nuestras sierras.</span>
              </li>
            </ul>
            <p className="text-white font-serif text-lg md:text-xl italic">
              Venir al Mágico no solo te regenera a vos, regenera a la montaña.
            </p>
          </div>
        </div>
      </div>
      {/* Mapa del Lugar */}
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <div className="relative group cursor-zoom-in mb-12" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt="Mapa de Pueblo Mágico - Los Gigantes" loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-12 mb-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-30">
            <a href="/uploads/mapa_magico.webp" download="Mapa_Pueblo_Magico.webp" className="btn-glass inline-block w-full sm:w-auto text-center">Descargar Mapa</a>
            <a href={consultLink} className="btn-gold inline-block w-full sm:w-auto text-center">Consultar ubicación</a>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default AchalaVivaMagico;
