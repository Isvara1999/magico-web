import React from 'react';
import { Check } from 'lucide-react';

const FamilionPrecios: React.FC = () => {
  const waLink = "https://wa.me/5493516765820?text=" +
    encodeURIComponent("Hola! Vengo de Familion y quiero reservar mi lugar en Familion.");

  return (
    <section id="precios" className="py-16 md:py-24 px-6 bg-brand-green text-white rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 border border-white/20 rounded-3xl backdrop-blur-sm pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl serif-title mb-4 md:mb-6 tracking-[0.15em] uppercase text-white/90">
        COMBOS FAMILIARES
      </h2>
      <p className="text-white/80 text-sm md:text-base mb-8 md:mb-10 max-w-2xl mx-auto">
        Un único valor para que toda la familia viva la experiencia completa sin sorpresas ocultas.
      </p>

      <div className="rounded-3xl p-8 md:p-12 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 items-stretch">
          {/* Camping */}
          <div className="p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border border-white/20 shadow-inner bg-[#003d26]">
            <h3 className="serif-title text-lg md:text-xl font-bold text-white mb-3">Camping</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl serif-title font-extrabold tracking-tight mb-3" style={{ color: '#D4AF37' }}>$280.000</p>
            <p className="text-white/80 text-sm md:text-base">Zona de camping — todo incluido para la familia.</p>
          </div>

          {/* Eco-Refugio y Domos - Destacado */}
          <div className="relative p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border-2 border-[#D4AF37] bg-white shadow-xl overflow-hidden">
            <h3 className="serif-title text-lg md:text-xl font-bold mb-3" style={{ color: '#005333' }}>Eco-Refugio y Domos</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl serif-title font-extrabold tracking-tight mb-3" style={{ color: '#D4AF37' }}>$450.000</p>
            <p className="text-sm md:text-base leading-relaxed break-words" style={{ color: '#005333' }}>Hab. y domos compartidos con ropa blanca y toallas incluidas.</p>
          </div>

          {/* Domo Privado */}
          <div className="relative p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px] border-2 border-[#D4AF37] bg-[#002e1c] shadow-xl overflow-hidden">
            <h3 className="serif-title text-lg md:text-xl font-bold mb-3" style={{ color: '#D4AF37' }}>Domo Privado</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl serif-title font-extrabold tracking-tight mb-3" style={{ color: '#ffffff' }}>$650.000</p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed break-words">Exclusivo para familia de hasta 4 integrantes.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/10 border border-white/20 p-6 md:p-8 mb-8 text-left shadow-inner">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Incluye:</h4>
          <ul className="space-y-3 text-white/85 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Alojamiento en habitaciones incluyen ropa blanca, toallones y toallas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>9 comidas caseras, abundantes y nutritivas incluidas</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Agua caliente 24 hs y Bio-cósmetica en todas las duchas.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Todas las actividades y talleres guiados</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-gold flex-shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </span>
              <span>Seguros y guías de montaña</span>
            </li>
          </ul>
        </div>

        <a
          href={waLink}
          className="btn-gold w-full md:w-auto block md:inline-block mb-6 hover:animate-pulse hover:shadow-yellow-300/60"
        >
          Reservar Nuestro Lugar
        </a>

        <p className="text-white/70 text-xs md:text-sm leading-relaxed italic">
          El 10% de tu inversión se destina a reforestar tabaquillos y restaurar nuestras sierras.
        </p>
      </div>
    </div>
  </section>
  );
};

export default FamilionPrecios;
