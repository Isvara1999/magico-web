import React from 'react';
import { WA_GONDOR } from '../../constants';

const GondorbowsMagico: React.FC = () => {
  const consultLink = "https://wa.me/" + WA_GONDOR + "?text=" +
    encodeURIComponent("¡Hola Fausto! Estoy organizando mi viaje para el retiro de Gondorbows y quería consultar bien la ubicación y cómo llegar a Mágico Ensueño en Los Gigantes. ⛰️🗺️");

  return (
    <>
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-green text-white rounded-3xl relative overflow-hidden mt-16 md:mt-24 mx-2 md:mx-0">
    {/* glassy overlay (no border) */}
    <div className="absolute inset-0 rounded-3xl backdrop-blur-sm pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl">
        <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 text-center">Mágico Ensueño</h2>
        
          <div className="max-w-3xl mx-auto mb-10">
          <p className="text-white/95 text-base md:text-lg leading-relaxed">
            En el corazón de <span className="text-gold font-bold">Los Gigantes, Córdoba</span>, a solo 1h de Tanti y 1:30h de Villa Carlos Paz. Un lugar donde la naturaleza marca el ritmo, la montaña habla en silencio, y una comunidad que acompaña se encuentran en perfecta armonía. Acceso para todo tipo de vehiculos hasta la puerta del lugar .
          </p>
        </div>
        
        {/* Video Principal (Reemplaza Imágenes Anteriores) */}
        <div className="flex justify-center mb-10 w-full relative z-20">
          <div className="relative inline-block group w-full max-w-sm">
            {/* Bordes decorativos detrás del video */}
            <div className="absolute -inset-3 border border-gold/20 rounded-2xl -z-10 rotate-3 transition-transform duration-700 group-hover:rotate-6"></div>
            <div className="absolute -inset-3 border border-white/10 rounded-2xl -z-10 -rotate-3 transition-transform duration-700 group-hover:-rotate-6"></div>

            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/hxE7Ksy7IsY?autoplay=1&mute=1&loop=1&playlist=hxE7Ksy7IsY"
                title="Mágico Ensueño - Experiencia en la Montaña"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gold/10 rounded-2xl p-6 md:p-8 border border-gold/30">
            <h4 className="text-gold font-bold text-lg mb-4">Cómo Este Lugar Mejora Tu Experiencia</h4>
            <ul className="text-white/90 text-sm leading-relaxed space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">✓</span>
                <span><strong>Regeneración activa:</strong> +15.000 árboles plantados transforman el aire que respiras</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">✓</span>
                <span><strong>Comunidad:</strong> 20+ años de coherencia manifestando el propósito</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">✓</span>
                <span><strong>Energía solar:</strong> 100% sustentable, sin huella de carbono</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gold/10 rounded-2xl p-6 md:p-8 border border-gold/30">
            <h4 className="text-gold font-bold text-lg mb-4">Tu Inversión Genera Regeneración</h4>
            <div className="text-white/90 text-sm leading-relaxed space-y-4">
              <p>El 10% de tu inversión se destina directamente a reforestar los tabaquillos y restaurar las sierras de Los Gigantes.</p>
              <p className="italic">Cada familia que nos elige es una semilla de cambio en la montaña.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center mt-8">
          <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
            Mágico Ensueño es más que un destino; aquí <span className="text-gold font-bold">la ubicación en la naturaleza regenera</span> mientras tu familia se reconecta, el cuerpo se sana y el alma vuelve a respirar en armonía con el ritmo de la montaña.
          </p>
        </div>
      </div>
      {/* Mapa del Lugar */}
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <div className="relative group cursor-zoom-in mb-12" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt="Mapa de Gondorbows - Los Gigantes" loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-12 mb-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-30">
            <a href="/uploads/mapa_magico.webp" download="Mapa_Gondorbows_Los_Gigantes.webp" className="btn-glass inline-block w-full sm:w-auto text-center">Descargar Mapa</a>
            <a href={consultLink} className="btn-gold inline-block w-full sm:w-auto text-center">Consultar ubicación</a>
          </div>
        </div>
      </div>
    </div>
    </section>

    {/* ====== EL ARTE DETRÁS DE TU ARCO ====== */}
    <section className="py-16 md:py-24 px-6 bg-slate-50 mt-16 md:mt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl serif-title brand-green text-center mb-8 md:mb-10">
          El Arte detrás de tu Arco: Nuestro Proceso
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center mb-12 max-w-4xl mx-auto">
          Si te da curiosidad la técnica, mirá cómo trabajamos la madera respetando su veta natural, el alineamiento por calor y el tillerizado fino.
        </p>
        
        {/* Grid de 3 videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Columna 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe 
                src="https://www.youtube.com/embed/o3m_A68JC0M" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* Columna 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe 
                src="https://www.youtube.com/embed/JtkYFlsBEW8" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* Columna 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe 
                src="https://www.youtube.com/embed/rkgQ2e-gEco" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default GondorbowsMagico;
