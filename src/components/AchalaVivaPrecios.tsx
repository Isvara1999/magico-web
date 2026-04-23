import React from 'react';
import { Check, Target, ForkKnife, Hammer, ChalkboardTeacher, House, Plant, Warning, Binoculars, Star } from '@phosphor-icons/react';

const AchalaVivaPrecios: React.FC = () => {
  const waLinkMain = "https://wa.me/5493516765820?text=" +
    encodeURIComponent("¡Hola! Vengo de la web y me encantaría reservar mi lugar para la inmersión Achala Viva. Quisiera hacer una seña para asegurar mi participación, ¿cómo podemos hacer? ✨");

  const waLinkFechas = "https://wa.me/5493516765820?text=" +
    encodeURIComponent("¡Hola! Me encantó la propuesta de Achala Viva pero no puedo asistir en esta fecha. ¿Me podrías avisar cuando lancen nuevas fechas disponibles? 🗓️✨");

  return (
    <>
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

        <div className="max-w-4xl mx-auto relative z-10 text-center pt-16 md:pt-24 pb-8">
          <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 tracking-[0.05em] uppercase text-white/95">
            Reservá tu lugar en la inmersión
          </h2>

          <div className="flex justify-center items-center mb-12 md:mb-16">
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 px-6 md:px-8 py-2 md:py-3 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm backdrop-blur-sm shadow-lg shadow-black/20">
              9 y 10 de Mayo | Los Gigantes, Córdoba
            </span>
          </div>

          {/* Main Pricing Card (White) */}
          <div className="w-full flex justify-center px-4 mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative w-full max-w-2xl p-8 md:p-14 text-center flex flex-col items-center animate-float-soft focus-within:shadow-yellow-500/30 hover:shadow-yellow-500/30 transition-shadow duration-500 border-t-4 border-[#005333]">
              <p className="font-bold text-lg md:text-2xl mb-4 md:mb-6 uppercase tracking-widest" style={{ color: '#005333' }}>Valor total de la experiencia</p>
              <div className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-6 md:mb-8 font-serif" style={{ color: '#D4AF37' }}>$150.000 ARS</div>
              <p className="text-sm md:text-base opacity-90 font-medium tracking-wide" style={{ color: '#005333' }}>(Opciones de financiación disponibles y seña del 50%)</p>
            </div>
          </div>

          {/* Qué incluye */}
          <div className="bg-white/5 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 max-w-4xl mx-auto">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm md:text-base mb-8 text-center serif-title">¿QUÉ INCLUYE TU INVERSIÓN?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-left">
              <div className="flex items-center gap-3 text-white/90">
                <Check weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span><strong>Alojamiento inmersivo</strong> (2 Días / 1 Noche).</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Check weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span><strong>Pensión completa</strong> (4 comidas riquísimas, de sábado a domingo).</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Check weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span><strong>Guía experta 24/7</strong> (Biólogo Walter Cejas).</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Check weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span><strong>Todos los talleres</strong> (Astroturismo, Avistaje, Fotografía).</span>
              </div>
              <div className="flex items-center gap-3 text-white/90 md:col-span-2">
                <Check weight="thin" className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <span><strong>Uso libre</strong> de las instalaciones de la reserva de 200 hectáreas.</span>
              </div>
            </div>
          </div>

          {/* Cupos */}
          <div className="bg-white/5 border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-12 max-w-4xl mx-auto text-center">
            <h4 className="text-white font-bold tracking-widest text-base mb-4 uppercase flex items-center justify-center gap-2">
              <Warning weight="thin" className="w-6 h-6 text-[#D4AF37]" /> CUPOS ESTRICTAMENTE LIMITADOS A 15 PERSONAS
            </h4>
            <p className="text-white/90 text-sm md:text-base mb-4">
              Para garantizar el silencio, el respeto por la fauna y la atención personalizada del guía, no podemos sumar a nadie más.
            </p>
            <p className="text-[#D4AF37] font-bold text-sm md:text-base mt-2">
              👉 Inscripciones cierran el 30 de Abril.
            </p>
          </div>

          {/* Button */}
          <div className="mt-8 md:mt-12 pb-16 flex flex-col items-center">
            
            {/* Beneficios Especiales */}
            <div className="mb-8 text-center bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 w-full max-w-lg shadow-xl shadow-black/10">
              <p className="font-bold text-[#D4AF37] mb-4 text-lg">🎁 Beneficios Extra:</p>
              <ul className="text-white/95 text-sm md:text-base space-y-3 text-left w-fit mx-auto font-medium">
                <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">10% OFF</span> viniendo de a dos.</li>
                <li className="flex items-start gap-3"><span className="text-[#D4AF37] font-bold">10% OFF</span> Ex-alumnos (o referidos).</li>
              </ul>
            </div>

            <a href={waLinkMain}
              style={{ backgroundColor: '#E5B84A', color: '#005333' }}
              className="inline-flex justify-center items-center transition-all hover:bg-yellow-400 py-3 md:py-4 px-8 md:px-12 w-fit mx-auto rounded-full font-bold text-sm md:text-base tracking-[0.1em] uppercase shadow-lg shadow-black/20 hover:shadow-2xl hover:-translate-y-1 duration-300 text-center">
              HABLAR POR WHATSAPP PARA RESERVAR
            </a>
            
            {/* CTA Secundario */}
            <a href={waLinkFechas} className="text-white/90 hover:text-[#D4AF37] transition-colors text-sm md:text-base underline underline-offset-4 mt-6 font-medium">
              ¿No podés en esta fecha? Consultá por otras fechas disponibles.
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default AchalaVivaPrecios;
