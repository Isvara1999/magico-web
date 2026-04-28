import React from 'react';
import { Laptop, Heartbeat, Heart, Compass, UsersThree, Globe } from '@phosphor-icons/react';
import { WA_MAGICO } from '../constants';

const AVATARS = [
  {
    icon: <Laptop weight="duotone" className="w-8 h-8" />,
    title: 'El nómade digital',
    desc: 'Trabajás remoto y querés un lugar con WiFi real, silencio y conexión humana auténtica. Starlink + naturaleza + comunidad.',
    wa: 'Hola! Me interesa el coworking con alojamiento para trabajo remoto en Mágico Ensueño. ¿Tienen disponibilidad?',
  },
  {
    icon: <Heartbeat weight="duotone" className="w-8 h-8" />,
    title: 'El profesional en burnout',
    desc: 'Necesitás salir del ruido urbano y resetear. Comida real, montaña, silencio y espacios para volver a vos.',
    wa: 'Hola! Busco un retiro de descanso en Mágico Ensueño. ¿Cuándo tienen disponibilidad?',
  },
  {
    icon: <Heart weight="duotone" className="w-8 h-8" />,
    title: 'La pareja',
    desc: 'Buscan una escapada romántica diferente. Domo geodésico, cielo estrellado, fogón y cocina de autor en la montaña.',
    wa: 'Hola! Queremos ir en pareja a Mágico Ensueño. ¿Tienen domos disponibles y cuál es el precio?',
  },
  {
    icon: <Compass weight="duotone" className="w-8 h-8" />,
    title: 'El buscador en tránsito',
    desc: 'Estás en un momento de transformación y buscás comunidad, propósito y un espacio que acompañe el proceso.',
    wa: 'Hola! Me interesa conocer más sobre los retiros y el co-living en Mágico Ensueño. ¿Podemos hablar?',
  },
  {
    icon: <UsersThree weight="duotone" className="w-8 h-8" />,
    title: 'La familia',
    desc: 'Buscan desconectar de las pantallas y reconectar entre ustedes. Espacios amplios, naturaleza segura y aventuras compartidas en la montaña.',
    wa: 'Hola! Queremos ir en familia a Mágico Ensueño. ¿Qué opciones de alojamiento tienen?',
  },
  {
    icon: <Globe weight="duotone" className="w-8 h-8" />,
    title: 'El ciudadano del mundo',
    desc: 'Buscás nutrirte de otras culturas sin tomarte un avión. Disfrutás de compartir un fogón con viajeros y voluntarios de todas partes del mundo.',
    wa: 'Hola! Me encanta la vibra internacional de Mágico Ensueño. ¿Qué opciones de estadía tienen?',
  },
];

export const SectionParaQuien: React.FC = () => {
  return (
    <>
      <span id="para-quien" className="block -mt-20 pt-20" aria-hidden="true"></span>
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-12" data-reveal>
            <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3 opacity-80">
              PARA QUIÉN ES
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              ¿Esto es para mí?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal>
            {AVATARS.map((avatar, i) => {
              const waUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(avatar.wa)}`;
              return (
                <a
                  key={i}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-2xl border border-stone-200 p-7 hover:border-brand hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-brand mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {avatar.icon}
                  </span>
                  <h3 className="font-serif text-lg text-gray-900 mb-3 leading-snug">{avatar.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{avatar.desc}</p>
                  <span className="mt-5 text-xs font-bold tracking-widest uppercase text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Consultar →
                  </span>
                </a>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};
