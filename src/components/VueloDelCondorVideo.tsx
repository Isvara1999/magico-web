import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorVideo: React.FC = () => {
  const { t } = useLanguage();

  const guardians = [
    {
      name: "Gustavo",
      role: "Guía ceremonial",
      desc: "Más de 15 años acompañando procesos de transformación con medicina ancestral andina.",
    },
    {
      name: "Diego",
      role: "Facilitador vivencial",
      desc: "Especialista en dinámicas de introspección y trabajo con arquetipos en entornos de naturaleza.",
    },
    {
      name: "Juan Cruz",
      role: "Guardián del espacio",
      desc: "Formado en tradiciones del fuego y la tierra, integra el legado inca con mirada contemporánea.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14" data-reveal>
          <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-4">El equipo detrás del viaje</p>
          <h2 className="text-3xl md:text-4xl serif-title brand-green mb-4">Conocé a los Guardianes</h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Gustavo, Diego y Juan Cruz del Equipo de Acan de Fuego llevan más de una década abriendo caminos de transformación en el Valle Sagrado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-reveal data-delay="1">
          {guardians.map((g, i) => (
            <div key={i} className="text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#005333]/8 border border-[#005333]/15 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl serif-title text-brand-green font-light">{g.name[0]}</span>
              </div>
              <p className="font-semibold text-gray-800 mb-1">{g.name}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-3">{g.role}</p>
              <p className="text-gray-400 text-sm font-light leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center border-t border-gray-100 pt-10" data-reveal data-delay="2">
          <p className="font-serif italic text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            "El Valle Sagrado no es un destino turístico. Es un espejo. Y necesitás a alguien que ya haya cruzado ese umbral para que pueda sostenerte del otro lado."
          </p>
          <p className="text-[10px] uppercase tracking-widest text-gray-300 mt-4">— Equipo Acan de Fuego</p>
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorVideo;
