import React from 'react';
import { Check } from 'lucide-react';

const GondorbowsPrecios: React.FC = () => {
  const waLink = "https://wa.me/5491157300099?text=" +
    encodeURIComponent("Hola Fausto. Vengo de la página de Mágico Ensueño. Quiero asegurar mi lugar para el retiro de arquería del 10 al 12 de abril. Te escribo para coordinar el pago de la seña de $250.000.");

  return (
    <section id="precios" className="py-16 md:py-24 px-6 bg-brand-green text-white rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 border border-white/20 rounded-3xl backdrop-blur-sm pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl serif-title mb-4 md:mb-6 tracking-[0.15em] uppercase text-white/90">
        Asegurá tu lugar en la forja
      </h2>
      <p className="text-white/80 text-sm md:text-base mb-8 md:mb-10 max-w-2xl mx-auto">
        Para garantizar la excelencia en la enseñanza, habilitamos únicamente 12 plazas para esta edición.
      </p>

      <div className="rounded-3xl p-8 md:p-12 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8 mb-8 items-stretch">
          {/* Precio único */}
          <div className="relative p-8 md:p-10 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border-2 border-[#D4AF37] bg-white shadow-xl overflow-hidden">
            <h3 className="serif-title text-xl md:text-2xl font-bold mb-4" style={{ color: '#005333' }}>Valor total del retiro</h3>
            <p className="text-3xl md:text-4xl lg:text-5xl serif-title font-extrabold tracking-tight mb-4" style={{ color: '#D4AF37' }}>$530.000</p>
            <p className="text-sm md:text-base leading-relaxed break-words" style={{ color: '#005333' }}>Todo incluido para 3 días de inmersión completa</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 border border-white/20 p-6 md:p-8 mb-8 text-left shadow-inner">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Forma de pago:</h4>
          <ul className="space-y-3 text-white/85 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Confirmá tu asistencia con una seña del 50% ($250.000) por transferencia</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>El saldo restante se abona durante el retiro</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Todos los materiales, herramientas y alojamiento incluidos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Gastronomía completa desde viernes 15:00 hs hasta domingo 17:00 hs</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white/10 border border-white/20 p-6 md:p-8 mb-8 text-center">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">¿Qué incluye tu inversión?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/85 text-sm md:text-base">
            <div className="text-left">
              <p className="mb-2">🏹 Arco funcional que te llevas a casa</p>
              <p className="mb-2">🔨 Todas las herramientas y materiales</p>
              <p className="mb-2">🏡 Alojamiento 3 noches en Mágico Ensueño</p>
            </div>
            <div className="text-left">
              <p className="mb-2">🍽️ Gastronomía completa (pensión completa)</p>
              <p className="mb-2">👨‍🏫 Guía experta durante todo el proceso</p>
              <p className="mb-2">🌿 Experiencia inmersiva en la sierra</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-yellow-400/10 border border-yellow-400/30 p-6 md:p-8 mb-8 text-center">
          <h4 className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-2">⚠️ Cupos limitados</h4>
          <p className="text-white/90 text-sm md:text-base mb-4">
            Solo 15 lugares disponibles para garantizar atención personalizada y calidad en el proceso de aprendizaje.
          </p>
          <p className="text-white/80 text-xs md:text-sm italic">
            Las inscripciones cierran el 5 de abril o al completar los cupos.
          </p>
        </div>

        <a
          href={waLink}
          className="btn-gold w-full md:w-auto block md:inline-block mb-6 hover:animate-pulse hover:shadow-yellow-300/60"
        >
          Reservar mi lugar ahora
        </a>

        <p className="text-white/70 text-xs md:text-sm leading-relaxed italic">
          El 10% de tu inversión se destina a reforestar tabaquillos y restaurar nuestras sierras.
        </p>
      </div>
    </div>
  </section>
  );
};

export default GondorbowsPrecios;
