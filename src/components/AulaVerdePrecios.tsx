import React from 'react';
import { Check } from 'lucide-react';

const AulaVerdePrecios: React.FC = () => {
  const getWaLink = (plan: string) => "https://wa.me/5493516765820?text=" +
    encodeURIComponent(`Hola! Vengo de Aula Verde y quiero consultar por el plan: ${plan}.`);

  const waLinkGeneral = "https://wa.me/5493516765820?text=" +
    encodeURIComponent("Hola! Vengo de Aula Verde y quiero solicitar presupuesto y disponibilidad.");

  return (
    <section id="precios" className="py-16 md:py-24 px-6 bg-brand-green text-white rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 border border-white/20 rounded-3xl backdrop-blur-sm pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center" data-reveal>
        <h2 className="text-3xl md:text-5xl serif-title mb-4 md:mb-6 tracking-[0.15em] uppercase text-white/90">
          Propuestas Adaptables a tu Institución
        </h2>
        <p className="text-white/80 text-sm md:text-base mb-8 md:mb-10 max-w-2xl mx-auto">
          Diseñamos experiencias educativas transformadoras adaptadas a las necesidades de tu comunidad escolar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">

          {/* WRAPPER TARJETA 1 - BASE */}
          <div className="w-full h-full md:py-6 lg:py-10" data-reveal data-delay="1">
            <div className="flex flex-col bg-transparent border border-green-700/50 rounded-2xl p-6 lg:p-8 h-full">
              <div className="text-center mb-8 mt-6">
                <h3 className="text-xl font-bold text-white mb-2">Eco-Campamento Base</h3>
                <div className="text-3xl font-extrabold text-[#D4AF37] mb-1">Desde $85.000</div>
                <div className="text-sm text-green-100">por alumno / por día</div>
              </div>
              <ul className="space-y-4 text-sm md:text-base text-left text-white flex-grow mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Alojamiento exclusivo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Pensión completa con alimentación casera y saludable (4 comidas)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Uso libre de instalaciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Asistencia médica base</span>
                </li>
              </ul>
              <div className="mt-auto text-center">
                <a href={getWaLink("Eco-Campamento Base")} target="_blank" rel="noreferrer" className="inline-block w-full">
                  <button className="w-full bg-transparent text-[#D4AF37] border border-[#D4AF37] font-bold px-6 py-3 rounded-full text-sm uppercase hover:bg-[#D4AF37] hover:text-[#005333] transition-colors duration-200">
                    CONSULTAR PLAN BASE
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* WRAPPER TARJETA 2 - DESTACADA */}
          <div className="w-full h-full z-10 md:-translate-y-4" data-reveal data-delay="2">
            <div className="relative flex flex-col bg-white rounded-2xl shadow-2xl p-6 lg:p-8 h-full" style={{ border: '4px solid #D4AF37' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase whitespace-nowrap shadow-md z-20" style={{ backgroundColor: '#D4AF37', color: '#005333' }}>
                LA MÁS ELEGIDA
              </div>
              <div className="text-center mb-8 mt-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#005333' }}>Inmersión Educativa</h3>
                <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1" style={{ color: '#D4AF37' }}>Desde $125.000</div>
                <div className="text-sm" style={{ color: '#005333' }}>por alumno / por día</div>
              </div>
              <ul className="space-y-5 md:space-y-6 text-sm md:text-base text-left flex-grow mb-10" style={{ color: '#005333' }}>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span className="font-bold">Todo lo del plan Base anterior</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Coordinación permanente con Equipo Anfitrión</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Propuesta Pedagógica completa con Talleres guiados (Huerta, Arte y otras dinámicas)</span>
                </li>
              </ul>
              <div className="mt-auto text-center">
                <a href={getWaLink("Inmersión Educativa")} target="_blank" rel="noreferrer" className="inline-block w-full">
                  <button style={{ backgroundColor: '#005333', border: '2px solid #D4AF37' }} className="w-full text-white font-bold px-6 py-3 rounded-full text-sm uppercase shadow-lg hover:opacity-90 transition-opacity duration-200">
                    SOLICITAR PRESUPUESTO
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* WRAPPER TARJETA 3 - A MEDIDA */}
          <div className="w-full h-full md:py-6 lg:py-10" data-reveal data-delay="3">
            <div className="flex flex-col rounded-2xl p-6 lg:p-8 h-full shadow-lg backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
              <div className="text-center mb-8 mt-6">
                <h3 className="text-xl font-bold text-white mb-2">Proyecto a Medida</h3>
                <div className="text-3xl font-extrabold text-[#D4AF37] mb-1">Presupuesto</div>
                <div className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold mt-2">Personalizado</div>
              </div>
              <ul className="space-y-4 text-sm md:text-base text-left text-white flex-grow mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Diseño curricular conjunto</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Transporte opcional</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span>Menús especiales</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                  <span className="font-bold">Exclusividad total del predio</span>
                </li>
              </ul>
              <div className="mt-auto text-center">
                <a href={getWaLink("Proyecto a Medida")} target="_blank" rel="noreferrer" className="inline-block w-full">
                  <button className="w-full bg-[#D4AF37] text-[#005333] font-bold px-6 py-3 rounded-full text-sm uppercase shadow-lg hover:opacity-90 transition-opacity duration-200">
                    SOLICITAR PRESUPUESTO
                  </button>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* TEXTO LEGAL Y BOTÓN FINAL */}
        <div className="mt-12 text-center flex flex-col items-center" data-reveal data-delay="4">
          <p className="text-sm italic text-green-100 mb-6 font-medium">
            * Valores de referencia expresados en ARS. Sujetos a actualización y volumen del grupo.
          </p>
          <a href={waLinkGeneral} target="_blank" rel="noreferrer">
            <button className="bg-[#D4AF37] text-green-900 font-extrabold px-8 py-4 rounded-full text-sm md:text-base uppercase shadow-xl hover:opacity-90 transition-opacity duration-200">
              SOLICITAR PRESUPUESTO Y DISPONIBILIDAD
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AulaVerdePrecios;
