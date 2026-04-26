import React from 'react';
import { Check, Target, ForkKnife, Hammer, ChalkboardTeacher, House, Plant, Warning } from '@phosphor-icons/react';
import { WA_GONDOR } from '../../constants';

const GondorbowsPrecios: React.FC = () => {
  const waLinkMain = "https://wa.me/" + WA_GONDOR + "?text=" +
    encodeURIComponent("¡Hola Fausto! Vengo de la web y me encantaría reservar mi lugar para Gondorbows. Quisiera hacer una seña para asegurar mi participación, ¿cómo podemos hacer? ✨");

  const waLinkFechas = "https://wa.me/" + WA_GONDOR + "?text=" +
    encodeURIComponent("¡Hola Fausto! Me encantó la propuesta de Gondorbows pero no puedo asistir en esta fecha. ¿Me podrías avisar cuando lancen nuevas fechas disponibles? 🗓️✨");
  return (
    <>
      {/* ====== TESTIMONIOS (SHORTS) ====== */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-white mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-5xl serif-title text-center text-brand mb-3 md:mb-4 px-2">
            La experiencia Gondorbows
          </h2>
          <p className="text-gray-600 text-base md:text-lg text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            Escucha a la comunidad de arqueros
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Testimonio 1 */}
            <div className="bg-stone-800 rounded-2xl border border-stone-700/50 shadow-2xl overflow-hidden hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/uQy7HgK-L_E"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  title="Testimonio de la comunidad 1"
                ></iframe>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-stone-800 rounded-2xl border border-stone-700/50 shadow-2xl overflow-hidden hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/4pQ2DTh2rd8"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  title="Testimonio de la comunidad 2"
                ></iframe>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-stone-800 rounded-2xl border border-stone-700/50 shadow-2xl overflow-hidden hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative aspect-[9/16] w-full">
                <iframe
                  src="https://www.youtube.com/embed/wRamh8nZXNQ"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  title="Testimonio de la comunidad 3"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="precios" className="py-16 md:py-24 px-4 md:px-6 bg-[#005333] text-white rounded-2xl md:rounded-3xl relative mx-2 md:mx-0 mt-16 md:mt-24 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 border border-white/20 rounded-2xl md:rounded-3xl backdrop-blur-sm pointer-events-none"></div>
        <style>{`
          @keyframes float-soft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-soft {
            animation: float-soft 5s ease-in-out infinite;
          }
        `}</style>

        <div className="max-w-4xl mx-auto relative z-10 text-center pt-32 md:pt-48 pb-8">
          <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 tracking-[0.05em] uppercase text-white/95">
            ASEGURÁ TU LUGAR EN LA FORJA
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-12 md:mb-16">
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 px-6 md:px-8 py-2 md:py-3 rounded-full font-bold uppercase tracking-widest text-[11px] md:text-sm backdrop-blur-sm shadow-lg shadow-black/20">
              10 AL 12 DE ABRIL
            </span>
            <span className="hidden sm:block text-[#D4AF37] opacity-60">•</span>
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 px-6 md:px-8 py-2 md:py-3 rounded-full font-bold uppercase tracking-widest text-[11px] md:text-sm backdrop-blur-sm shadow-lg shadow-black/20">
              LOS GIGANTES, CÓRDOBA
            </span>
          </div>

          <p className="text-white/90 text-sm md:text-base mb-16 md:mb-24 max-w-2xl mx-auto px-4">
            Para garantizar la excelencia en la enseñanza, habilitamos únicamente 12 plazas para esta edición.
          </p>

          {/* Main Pricing Card (White) - Centered unconditionally */}
          <div className="w-full flex justify-center px-4 mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative w-full max-w-2xl p-8 md:p-14 text-center flex flex-col items-center animate-float-soft focus-within:shadow-yellow-500/30 hover:shadow-yellow-500/30 transition-shadow duration-500">
              <p className="font-bold text-lg md:text-2xl mb-4 md:mb-6 uppercase tracking-widest" style={{ color: '#005333' }}>Valor total del retiro</p>
              <div className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-6 md:mb-8 font-serif" style={{ color: '#D4AF37' }}>$530.000</div>
              <p className="text-sm md:text-lg opacity-90 font-medium tracking-wide" style={{ color: '#005333' }}>Todo incluido para 3 días de inmersión completa</p>
            </div>
          </div>

          {/* Forma de Pago (Translucent) */}
          <div className="bg-white/5 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 max-w-4xl mx-auto text-left">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">FORMA DE PAGO:</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-white/90">
                <Check weight="thin" className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <span>Confirmá tu asistencia con una seña y el saldo restante se abona durante el retiro.</span>
              </li>
              <li className="flex items-start gap-4 text-white/90">
                <Check weight="thin" className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <span>Consulta por opciones de financiación y otras opciones de intercambio.</span>
              </li>
              <li className="flex items-start gap-4 text-white/90">
                <Check weight="thin" className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <span>Todos los materiales, herramientas y alojamiento incluidos</span>
              </li>
              <li className="flex items-start gap-4 text-white/90">
                <Check weight="thin" className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <span>Gastronomía completa desde viernes 15:00 hs hasta domingo 17:00 hs</span>
              </li>
            </ul>
          </div>

          {/* Qué incluye (Translucent) */}
          <div className="bg-white/5 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 max-w-4xl mx-auto">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm md:text-base mb-8 text-center serif-title">¿QUÉ INCLUYE TU INVERSIÓN?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-left">
              <div className="flex items-center gap-3 text-white/90">
                <Target weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span>Arco funcional que te llevas a casa</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <ForkKnife weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span>Gastronomía completa (pensión completa)</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Hammer weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span>Todas las herramientas y materiales</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <ChalkboardTeacher weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span>Guía experta durante todo el proceso</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <House weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span>Alojamiento 3 noches en Mágico Ensueño</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Plant weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span>Experiencia inmersiva en la sierra</span>
              </div>
            </div>
          </div>

          {/* Cupos (Translucent) */}
          <div className="bg-white/5 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-12 max-w-4xl mx-auto text-center">
            <h4 className="text-white font-bold tracking-widest text-sm mb-4 uppercase flex items-center justify-center gap-2">
              <Warning weight="thin" className="w-6 h-6 text-yellow-500" /> CUPOS LIMITADOS
            </h4>
            <p className="text-white/90 text-sm md:text-base mb-4">
              Solo 15 lugares disponibles para garantizar atención personalizada y calidad en el proceso de aprendizaje.
            </p>
            <p className="text-white/70 text-sm italic">
              Las inscripciones cierran el 5 de abril o al completar los cupos.
            </p>
          </div>

          {/* Button */}
          <div className="mt-8 md:mt-12 pb-16 flex flex-col items-center">
            
            {/* Beneficios Especiales */}
            <div className="mb-8 text-center bg-brand-green/20 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 w-full max-w-lg shadow-xl shadow-black/10">
              <p className="font-bold text-[#D4AF37] mb-4 text-lg">🎁 Beneficios Especiales:</p>
              <ul className="text-white/95 text-sm md:text-base space-y-3 text-left w-fit mx-auto font-medium">
                <li className="flex items-start gap-3"><span className="text-[#D4AF37]">•</span> 10% OFF si venís de a dos o más personas.</li>
                <li className="flex items-start gap-3"><span className="text-[#D4AF37]">•</span> 10% OFF para ex-alumnos (o si venís invitado por uno).</li>
              </ul>
              <p className="text-white/70 text-xs md:text-sm italic mt-5">(Escribinos al WhatsApp para aplicar tu descuento)</p>
            </div>

            <a href={waLinkMain}
              style={{ backgroundColor: '#E5B84A', color: '#005333' }}
              className="inline-flex justify-center items-center transition-all hover:bg-yellow-400 py-3 md:py-4 px-8 md:px-12 w-fit mx-auto rounded-full font-bold text-sm md:text-base tracking-[0.1em] uppercase shadow-lg shadow-black/20 hover:shadow-2xl hover:-translate-y-1 duration-300 text-center">
              RESERVAR MI LUGAR AHORA
            </a>
            
            {/* CTA Secundario */}
            <a href={waLinkFechas} className="text-white/90 hover:text-[#D4AF37] transition-colors text-sm md:text-base underline underline-offset-4 mt-6 font-medium">
              ¿No podés en esta fecha? Consultá por otras fechas disponibles.
            </a>

            <p className="text-white/80 text-xs md:text-sm italic mt-8 md:mt-10 mb-4 max-w-lg mx-auto font-serif px-6 text-center">
              El 10% de tu inversión se destina a reforestar tabaquillos y restaurar nuestras sierras.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default GondorbowsPrecios;
