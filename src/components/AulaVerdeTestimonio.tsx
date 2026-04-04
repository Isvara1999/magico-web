import React from 'react';
import { Quotes } from '@phosphor-icons/react';

const AulaVerdeTestimonio: React.FC = () => {
  // Ejemplos de instituciones (se pueden cambiar por imágenes de logos)
  const logos = [
    { id: 1, name: 'Hebraica' },
    { id: 2, name: 'San José' },
    { id: 3, name: 'Del Carmen' },
    { id: 4, name: 'Scouts' },
    { id: 5, name: 'St. Patrick' },
    { id: 6, name: 'Belgrano' },
  ];

  return (
    <section className="py-16 md:py-24 px-6 w-full bg-slate-50 relative overflow-hidden">
      {/* Elemento de fondo decorativo */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-brand/5 skew-x-12 -z-10 -translate-x-16 lg:-translate-x-32 hidden lg:block"></div>

      <div className="max-w-5xl mx-auto mb-20 relative z-10">
        
        {/* Título de la Sección */}
        <div className="text-center mb-10 md:mb-14" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl serif-title text-brand mb-4">
            Lo que dicen de nosotros
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto md:text-lg">
            Un reflejo del amor y la dedicación que todo el equipo de Mágico Ensueño pone en cada visita.
          </p>
        </div>
        
        {/* Tarjeta de Testimonio (Estilo Premium UI) */}
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_12px_45px_rgb(0,83,51,0.1)] transition-shadow duration-500 relative overflow-hidden group">
          
          {/* Acento lateral/superior dorado */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-gold opacity-80"></div>
          
          {/* Marca de agua de comillas de fondo */}
          <div className="absolute -top-10 -right-4 md:-top-4 md:-right-4 opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
            <Quotes weight="fill" className="w-48 h-48 md:w-64 md:h-64 text-brand" />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center relative z-10">
            {/* Ícono Primario */}
            <div className="flex-shrink-0 animate-pulse-slow">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-brand/10 to-transparent flex items-center justify-center border border-brand/5">
                <Quotes weight="fill" className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              </div>
            </div>

            {/* Contenido del Testimonio */}
            <div className="flex-1">
              <p className="text-lg md:text-xl lg:text-2xl font-serif text-charcoal leading-relaxed md:leading-loose mb-6 italic">
                "Llevamos un grupo de 200 personas. La comida que nos hicieron fue 100% casera, cuidada, con una calidad y cantidad espectacular. Lo que más destaco es la predisposición de todo el equipo de Mágico Ensueño para tomar el desafío, adaptar los recursos y lograr una propuesta que los chicos no se van a olvidar nunca. Fue un desafío hermoso."
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-t border-gray-100 pt-6">
                <span className="font-bold text-brand text-lg tracking-wide uppercase">
                  Fede
                </span>
                <span className="hidden md:inline text-brand/30">|</span>
                <span className="text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-widest max-w-[90%] md:max-w-none">
                  Director del Depto. de Juventud, Institución Hebraica <span className="font-light normal-case tracking-normal">(Campamento de 9 días)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION TIRA DE LOGOS */}
      <div className="w-full relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center mb-10" data-aos="fade-up">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-brand mb-3">
            Instituciones educativas que ya vivieron la experiencia Aula Verde
          </h3>
          <div className="w-16 md:w-24 h-1 bg-gold mx-auto rounded-full opacity-60"></div>
        </div>

        {/* Carrusel automático CSS con fondo cristalino */}
        <div className="relative w-full overflow-hidden flex bg-white/50 backdrop-blur-sm border-y border-gray-200/50 py-10 md:py-12">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-[logoScroll_40s_linear_infinite] w-max items-center">
            {/* Primer Set de Logos */}
            <div className="flex gap-16 md:gap-32 px-8 md:px-16 items-center">
              {logos.map((logo) => (
                <div key={`logo-1-${logo.id}`} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale filter">
                  <span className="text-2xl md:text-3xl font-black whitespace-nowrap text-gray-800 font-sans tracking-tight uppercase opacity-80">{logo.name}</span>
                </div>
              ))}
            </div>
            {/* Duplicado para efecto loop */}
            <div className="flex gap-16 md:gap-32 px-8 md:px-16 items-center">
              {logos.map((logo) => (
                <div key={`logo-2-${logo.id}`} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale filter">
                  <span className="text-2xl md:text-3xl font-black whitespace-nowrap text-gray-800 font-sans tracking-tight uppercase opacity-80">{logo.name}</span>
                </div>
              ))}
            </div>
            {/* Tercer duplicado */}
            <div className="flex gap-16 md:gap-32 px-8 md:px-16 items-center">
              {logos.map((logo) => (
                <div key={`logo-3-${logo.id}`} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale filter">
                  <span className="text-2xl md:text-3xl font-black whitespace-nowrap text-gray-800 font-sans tracking-tight uppercase opacity-80">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33333%); }
        }
      `}</style>
    </section>
  );
};

export default AulaVerdeTestimonio;
