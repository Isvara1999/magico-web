import React from 'react';
import { User, Heartbeat, ShieldCheck } from '@phosphor-icons/react';
import { WA_MAGICO } from '../../constants';

const AulaVerdeMagico: React.FC = () => {
  const consultLink = "https://wa.me/" + WA_MAGICO + "?text=" +
    encodeURIComponent("Hola! Vengo de Aula Verde y quiero consultar la ubicación exacta y cómo llegar.");

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-green text-white rounded-3xl relative overflow-hidden mt-16 md:mt-24 mx-2 md:mx-0">
    {/* glassy overlay (no border) */}
    <div className="absolute inset-0 rounded-3xl backdrop-blur-sm pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl" data-reveal>
        <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 text-center">Mágico Ensueño</h2>
        
          <div className="max-w-4xl mx-auto mb-10">
          <p className="text-white/95 text-base md:text-lg leading-relaxed text-center">
            En el corazón de <span className="text-gold font-bold">Los Gigantes, Córdoba</span>, a solo 1h de Tanti y 1:30h de Villa Carlos Paz. Un lugar donde la naturaleza marca el ritmo, la montaña habla en silencio, y una comunidad que acompaña se encuentran en perfecta armonía. Acceso para todo tipo de vehiculos hasta la puerta del lugar.
          </p>
          
          <div className="bg-[#005333]/40 border border-gold/30 rounded-2xl p-6 md:p-8 mt-8 shadow-lg backdrop-blur-sm relative overflow-hidden group">
            {/* Destello decorativo */}
            <div className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:translate-x-[200%] transition-transform duration-[2000ms] ease-in-out"></div>
            
            <h4 className="text-gold font-bold text-center text-lg md:text-xl mb-4 tracking-wide uppercase">
              Comodidades e Infraestructura
            </h4>
            <p className="text-white/95 text-sm md:text-base leading-relaxed text-center font-medium">
              Hemos anfitrionado experiencias de hasta <strong className="text-white">180 jóvenes</strong>. Disponemos de un salón de más de 100 mt², un comedor, un <strong className="text-gold">eco-refugio premium</strong> con habitaciones compartidas, <strong className="text-gold">domos geodésicos</strong>, baños y duchas con agua caliente 24 hs, WiFi satelital y todas las comodidades en medio de la montaña para que el grupo viva una experiencia inolvidable.
            </p>
          </div>
        </div>
        
        {/* Video Principal (Reemplaza Imágenes Anteriores) */}
        <div className="flex justify-center mb-10 w-full relative z-20" data-reveal data-delay="1">
          <div className="relative inline-block group w-full max-w-sm">
            {/* Bordes decorativos detrás del video */}
            <div className="absolute -inset-3 border border-gold/20 rounded-2xl -z-10 rotate-3 transition-transform duration-700 group-hover:rotate-6"></div>
            <div className="absolute -inset-3 border border-white/10 rounded-2xl -z-10 -rotate-3 transition-transform duration-700 group-hover:-rotate-6"></div>

            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <img
                src="/uploads/img_6948.webp"
                alt="Mágico Ensueño — Experiencia en la Montaña"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/hxE7Ksy7IsY?autoplay=1&mute=1&loop=1&playlist=hxE7Ksy7IsY"
                title="Mágico Ensueño - Experiencia en la Montaña"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10" data-reveal data-delay="2">
          <div className="bg-gold/10 rounded-2xl p-6 md:p-8 border border-gold/30">
            <h4 className="text-gold font-bold text-lg mb-4">Cómo Este Lugar Fortalece la Experiencia</h4>
            <ul className="text-white/90 text-sm leading-relaxed space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">✓</span>
                <span><strong>Reconectar:</strong> El grupo se reconecta mientras aprenden y trabajan juntos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">✓</span>
                <span><strong>Aprender:</strong> Los estudiantes aprenden en un ambiente natural y de alta calidad.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-bold mt-0.5">✓</span>
                <span><strong>Fortalecer al Equipo Docente:</strong> El equipo docente se fortalece en armonía con el ritmo de la montaña.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gold/10 rounded-2xl p-6 md:p-8 border border-gold/30 flex flex-col justify-between">
            <div>
              <h4 className="text-gold font-bold text-lg mb-4">Momentos que fortalecen al grupo</h4>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                La inversión en Mágico Ensueño es una inversión en el talento humano y en el respeto por nuestra naturaleza.
              </p>
            </div>
            <div className="bg-[#005333]/50 border border-gold/20 rounded-xl p-4 mt-2">
              <h5 className="text-gold font-bold text-sm mb-2 flex items-center gap-2">
                <span>🌱</span> Reforestación Activa
              </h5>
              <p className="text-white/90 text-sm leading-relaxed">
                Durante todo el año estamos reforestando el lugar y ya superamos los <strong>15.000 árboles</strong> plantados. Venir a Mágico Ensueño también aporta de forma directa a este gran objetivo ambiental.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center mt-8" data-reveal data-delay="3">
          <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
            Mágico Ensueño es más que un destino; aquí la ubicación en la naturaleza <span className="text-gold font-bold">regenera el talento humano</span> mientras el grupo se reconecta, los estudiantes aprenden y el equipo docente se fortalece en armonía con el ritmo de la montaña.
          </p>
        </div>
      </div>
      {/* ====== SEGURIDAD INSTITUCIONAL ====== */}
      <div className="mt-8 p-6 md:p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Guías Profesionales Habilitados*/}
          <div className="text-center bg-gradient-to-br from-brand to-green-600 rounded-2xl p-4 md:p-6 border border-gold/30 shadow-lg transform hover:scale-105 hover:shadow-gold/30 transition-all duration-300"
            data-reveal
            data-delay="1">
            <div className="flex justify-center mb-3">
              <User weight="thin" className="w-8 h-8 text-white" />
            </div>
            <div className="mb-2">
              <h4 className="text-white font-bold text-lg mb-3">Guías Profesionales Habilitados</h4>
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm leading-relaxed">Coordinación permanente</p>
            </div>
          </div>
          
          {/* Asistencia Médica */}
          <div className="text-center bg-gradient-to-br from-gold to-yellow-600 rounded-2xl p-4 md:p-6 border border-white/30 shadow-lg transform hover:scale-105 hover:shadow-white/40 transition-all duration-300"
            data-reveal
            data-delay="2">
            <div className="flex justify-center mb-3">
              <Heartbeat weight="thin" className="w-8 h-8 text-brand" />
            </div>
            <div className="mb-2">
              <h4 className="text-brand font-bold text-lg mb-3">Asistencia Médica</h4>
            </div>
            <div>
              <p className="text-brand/90 font-medium text-sm leading-relaxed">Cobertura durante la estadía</p>
            </div>
          </div>
          
          {/* Seguros Incluidos */}
          <div className="text-center bg-gradient-to-br from-green-600 to-brand rounded-2xl p-4 md:p-6 border border-gold/30 shadow-lg transform hover:scale-105 hover:shadow-gold/30 transition-all duration-300"
            data-reveal
            data-delay="3">
            <div className="flex justify-center mb-3">
              <ShieldCheck weight="thin" className="w-8 h-8 text-white" />
            </div>
            <div className="mb-2">
              <h4 className="text-white font-bold text-lg mb-3">Seguros Incluidos</h4>
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm leading-relaxed">Accidentes personales y Responsabilidad Civil</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* ====== GALERÍA DE LA EXPERIENCIA ====== */}
      <div className="mt-16 max-w-5xl mx-auto px-4" data-reveal>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl text-gold font-serif mb-3">Viviendo la Experiencia 100% Real</h3>
          <p className="text-white/80 text-sm md:text-base">Grupos que ya pasaron por Aula Verde desconectando de todo.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251118-WA0056.jpg" alt="Río en Aula Verde" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251118-WA0085.jpg" alt="Actividades en naturaleza" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251120-WA0061.jpg" alt="Caminata en Los Gigantes" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251120-WA0036.jpg" alt="Grupo disfrutando" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>

      {/* Mapa del Lugar */}
      <div className="mt-16 max-w-4xl mx-auto text-center px-4">
        <div className="relative group cursor-zoom-in mb-12" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt="Mapa de Aula Verde - Los Gigantes" loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-12 mb-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-30">
            <a href="/uploads/mapa_magico.webp" download="Mapa_AulaVerde_Los_Gigantes.webp" className="btn-glass inline-block w-full sm:w-auto text-center">Descargar Mapa</a>
            <a href={consultLink} className="btn-gold inline-block w-full sm:w-auto text-center">Consultar ubicación</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default AulaVerdeMagico;
