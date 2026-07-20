import React from 'react';
import { img } from '../lib/img';

const FACILITADORAS = [
  {
    photo: '/uploads/nicole-rosignoli.webp',
    nombre: 'Nicole Rosignoli',
    rol: 'Licenciada en Psicología',
    desc: 'Enfoque integral del cuerpo físico, mental, emocional, energético y cíclico, en conexión con la naturaleza y sus procesos. Acompañamientos con microdosis. Círculos de mujeres y espacios grupales.',
    instagram: 'https://www.instagram.com/thematriiz/',
    accent: '#A8971C',
    tint: '#F6F5EB',
    quote: 'Facilitar círculos de mujeres es, para mí, volver a un lenguaje que el cuerpo nunca olvidó: el de sostenernos entre nosotras.',
  },
  {
    photo: '/uploads/china.jpeg',
    nombre: 'Marianella Dericia (China)',
    rol: 'Terapeuta integral holística',
    desc: 'Comadre estudiante en partería. Yoga y movimiento consciente. Acompañamiento en hitos y procesos vitales con mujeres.',
    instagram: 'https://www.instagram.com/bambu.alquimia.terapeutica/',
    accent: '#9D005E',
    tint: '#FBF0F5',
    quote: 'Acompañar procesos vitales de mujeres es mi manera de honrar los ciclos — los que se abren y los que se cierran.',
  },
];

const CicloVitalFemeninoEquipo: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#F8F6F1]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 md:mb-16" data-reveal>
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-5">Invitan</p>
          <h2 className="text-3xl md:text-5xl serif-title text-brand leading-tight">
            Quienes te acompañan
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {FACILITADORAS.map(({ photo, nombre, rol, desc, instagram, accent, tint, quote }, i) => (
            <div
              key={nombre}
              className="rounded-2xl p-7 md:p-8 text-center"
              style={{ background: tint, boxShadow: '0 12px 40px rgba(0,83,51,0.08)' }}
              data-reveal
              data-delay={String(i + 1)}
            >
              <img
                src={img(photo, 240)}
                alt={nombre}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mx-auto mb-5"
                style={{ boxShadow: `0 0 0 3px white, 0 0 0 5px ${accent}55` }}
                loading="lazy"
              />
              <h3 className="serif-title text-xl md:text-2xl text-brand mb-1">{nombre}</h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>{rol}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
              {quote && (
                <blockquote className="relative pl-5 pr-1 py-1 mb-5 text-left">
                  <span className="absolute top-0 left-0 text-3xl leading-none font-serif select-none" style={{ color: `${accent}40` }} aria-hidden="true">"</span>
                  <p className="italic text-xs md:text-sm leading-relaxed font-serif" style={{ color: `${accent}CC` }}>{quote}</p>
                </blockquote>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-brand/60 transition-colors text-xs font-semibold uppercase tracking-wider underline underline-offset-4"
                  onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                >
                  Instagram
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CicloVitalFemeninoEquipo;
