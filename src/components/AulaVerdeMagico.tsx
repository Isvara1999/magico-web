import React from 'react';
import { HeartPulse, User, Activity } from 'lucide-react';

const AulaVerdeMagico: React.FC = () => {
  const consultLink = "https://wa.me/5493516765820?text=" +
    encodeURIComponent("Hola! Vengo de Aula Verde y quiero consultar la ubicación exacta y cómo llegar.");

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
          <div className="relative inline-block group w-full max-w-sm">
            {/* Bordes decorativos detrás del video */}
            <div className="absolute -inset-3 border border-brand-gold/20 rounded-2xl -z-10 rotate-3 transition-transform duration-700 group-hover:rotate-6"></div>
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
          <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold text-lg mb-4">Cómo Este Lugar Fortalece Tu Empresa</h4>
            <ul className="text-white/90 text-sm leading-relaxed space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-1">✓</span>
                <span><strong>Reconectar:</strong> El grupo se reconecta mientras aprenden y trabajan juntos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-1">✓</span>
                <span><strong>Aprender:</strong> Los estudiantes aprenden en un ambiente natural y de alta calidad.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold mt-1">✓</span>
                <span><strong>Fortalecer al Equipo Docente:</strong> El equipo docente se fortalece en armonía con el ritmo de la montaña.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold text-lg mb-4">Tu Inversión Fortalece El Equipo Docente</h4>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              La inversión en Mágico Ensueño es una inversión en el talento humano.
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center">
          <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
            Mágico Ensueño es más que un destino; aquí la ubicación en la naturaleza <span className="text-brand-gold font-bold">regenera el talento humano</span> mientras el grupo se reconecta, los estudiantes aprenden y el equipo docente se fortalece en armonía con el ritmo de la montaña.
          </p>
        </div>
      </div>
      {/* ====== SEGURIDAD INSTITUCIONAL ====== */}
      <div className="mt-8 p-6 md:p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Guías Profesionales */}
          <div className="text-center bg-gradient-to-br from-brand-green to-green-600 rounded-2xl p-4 md:p-6 border border-brand-gold/30 shadow-lg transform hover:scale-105 hover:shadow-brand-gold/30 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="100">
            <div className="flex justify-center mb-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="mb-2">
              <h4 className="text-white font-bold text-lg mb-3">Guías Profesionales</h4>
            </div>
            <div>
              <p className="text-white/90 font-medium text-sm leading-relaxed">Coordinación permanente</p>
            </div>
          </div>
          
          {/* Asistencia Médica */}
          <div className="text-center bg-gradient-to-br from-brand-gold to-yellow-600 rounded-2xl p-4 md:p-6 border border-white/30 shadow-lg transform hover:scale-105 hover:shadow-white/40 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="200">
            <div className="flex justify-center mb-3">
              <HeartPulse className="w-8 h-8 text-brand-green" />
            </div>
            <div className="mb-2">
              <h4 className="text-brand-green font-bold text-lg mb-3">Asistencia Médica</h4>
            </div>
            <div>
              <p className="text-brand-green/90 font-medium text-sm leading-relaxed">Cobertura durante la estadía</p>
            </div>
          </div>
          
          {/* Seguros Incluidos */}
          <div className="text-center bg-gradient-to-br from-green-600 to-brand-green rounded-2xl p-4 md:p-6 border border-brand-gold/30 shadow-lg transform hover:scale-105 hover:shadow-brand-gold/30 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="300">
            <div className="flex justify-center mb-3">
              <Activity className="w-8 h-8 text-white" />
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
      {/* Mapa del Lugar */}
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <div className="relative group cursor-zoom-in" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt="Mapa de Aula Verde - Los Gigantes" loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
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
