import React, { useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';

const AulaVerdeFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué pasa si llueve o hay mal clima?",
      answer: "En la montaña el clima es dinámico, pero estamos preparados. Contamos con un Salón Octogonal cerrado y vidriado de más de 100m² y espacios techados donde podemos adaptar y trasladar todas nuestras dinámicas grupales, talleres y comidas sin perder la magia de la experiencia."
    },
    {
      question: "¿Cómo funciona la asistencia médica y seguridad?",
      answer: "La seguridad es nuestra prioridad número uno. Trabajamos con Guías Profesionales habilitados y coordinación permanente. Además, la tarifa incluye Seguros de Accidentes Personales y de Responsabilidad Civil, y contamos con protocolos de asistencia médica para cualquier eventualidad, estando a solo una hora de los centros urbanos (Tanti/Carlos Paz)."
    },
    {
      question: "¿Se adaptan a dietas especiales, vegetarianos o celíacos?",
      answer: "¡Absolutamente! Nuestra gastronomía es 100% casera y cuidada. Si nos avisan con anticipación al momento de hacer la reserva, adaptamos el menú con opciones nutritivas y seguras para chicos con celiaquía, restricciones alimentarias, vegetarianos o veganos."
    },
    {
      question: "¿Cómo es el acceso para los micros o transportes escolares?",
      answer: "El acceso es muy sencillo. Contamos con camino apto para todo tipo de vehículos y los micros escolares o traffics pueden llegar directamente hasta la puerta del predio, facilitando la logística de bajada de bolsos y chicos con total comodidad y seguridad."
    },
    {
      question: "¿Los docentes y acompañantes pagan la misma tarifa?",
      answer: "Sabemos el esfuerzo que hacen los docentes para acompañar a los grupos. Por eso, manejamos una política de liberados (bonificados) dependiendo de la cantidad total de alumnos que viajen. Al solicitar tu presupuesto, te detallamos cuántos lugares liberados corresponden a tu grupo."
    }
  ];

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-[#F9F8F4]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12" data-reveal>
          <h2 className="text-3xl md:text-5xl serif-title brand-green mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-500 text-base md:text-lg font-light">Todo lo que necesitás saber para la tranquilidad de tu colegio.</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                data-reveal
                className={`bg-white rounded-2xl md:rounded-3xl border transition-colors duration-300 overflow-hidden ${
                  isActive ? 'border-[#D4AF37] shadow-lg' : 'border-gray-200 hover:border-[#D4AF37]/50 shadow-sm'
                }`}
              >
                <button
                  className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005333] focus-visible:ring-opacity-50"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  <h3 className={`serif-title text-lg md:text-xl md:pr-8 leading-snug transition-colors duration-300 ${isActive ? 'brand-green' : 'text-gray-800'}`}>
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isActive ? 'bg-[#005333] text-[#D4AF37] rotate-180' : 'bg-gray-100 text-[#005333]'
                    }`}
                  >
                    <CaretDownIcon weight="bold" className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </button>

                <div
                  className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
                    isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                    <div className="w-full h-px bg-gray-100 mb-6"></div>
                    <p className="text-gray-600 leading-relaxed md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AulaVerdeFAQ;
