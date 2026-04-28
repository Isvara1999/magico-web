import React, { useState } from 'react';
import { Plus, Minus, WhatsappLogo } from '@phosphor-icons/react';
import { WA_MAGICO } from '../constants';

const FAQS = [
  {
    q: '¿Qué incluye el precio de la estadía?',
    a: 'El precio base ($40.000/noche) incluye alojamiento (domo, habitación o camping), ropa blanca (sábanas, toalla y toallón), biocosmética, WiFi Starlink, acceso al fogón y jardines, y la guía PDF Reset Vital. La pensión completa ($95.000/noche) agrega las 3 comidas del día con cocina de autor. Sin cargos ocultos.',
  },
  {
    q: '¿Necesito experiencia previa en retiros o meditación?',
    a: 'Para nada. Mágico Ensueño no es un centro de meditación formal — es un ecocentro vivo donde cada persona encuentra su propio ritmo. Podés venir a trabajar remoto, descansar, explorar la naturaleza o simplemente estar. La única condición es el respeto por el espacio y la comunidad.',
  },
  {
    q: '¿Hay señal o internet en la montaña?',
    a: 'Sí. Tenemos conexión Starlink de alta velocidad en todos los espacios de trabajo y áreas comunes. Si lo que buscás es desconectarte del celular, también podés hacerlo — el entorno lo facilita naturalmente.',
  },
  {
    q: '¿Cómo llego si no tengo auto?',
    a: 'Estamos en Paraje Cuchilla Nevada, Ojo de Agua, a 20 minutos de Los Gigantes (Córdoba). Se llega por ruta de tierra accesible. Podemos coordinar traslado desde Villa Carlos Paz o Alta Gracia — consultanos por WhatsApp y lo organizamos juntos.',
  },
];

export const SectionFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('Hola! Tengo una pregunta sobre Mágico Ensueño.')}`;

  return (
    <>
      <span id="faq" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-12" data-reveal>
            <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3 opacity-80">
              PREGUNTAS FRECUENTES
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              Antes de consultar
            </h2>
          </div>

          <div className="space-y-3" data-reveal>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-stone-200 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left hover:bg-stone-50 transition-colors duration-200"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base leading-snug pr-2">
                    {faq.q}
                  </span>
                  <span className="text-brand flex-shrink-0">
                    {open === i
                      ? <Minus weight="bold" className="w-5 h-5" />
                      : <Plus weight="bold" className="w-5 h-5" />
                    }
                  </span>
                </button>
                {open === i && (
                  <div className="px-7 pb-6 text-gray-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center" data-reveal>
            <p className="text-gray-500 text-sm mb-4">¿Tenés otra pregunta?</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors duration-300 text-xs tracking-widest uppercase font-bold"
            >
              <WhatsappLogo weight="duotone" className="w-5 h-5" />
              Escribinos por WhatsApp
            </a>
          </div>

        </div>
      </section>
    </>
  );
};
