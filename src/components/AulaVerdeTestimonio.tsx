import React, { useState } from 'react';
import { Quotes, Headphones, CaretLeft, CaretRight } from '@phosphor-icons/react';

const testimonios = [
  {
    id: 1,
    name: 'Alejandro',
    role: 'Coordinador Gral. de Campamentos, Racing de Córdoba',
    text: 'Llegar a Mágico Ensueño fue recibir un regalo del cielo. A los chicos les costó soltar la inercia de la ciudad, pero esa resistencia se rindió ante la naturaleza. La comida fue sagrada: los chicos metieron las manos en la tierra, trabajaron en la huerta y el compost, viendo el ciclo de la vida. Tuvimos desde juegos en el barro hasta la profundidad de un fogón donde la palabra circuló de otra manera. Terminamos plantando un árbol como testigo de nuestra transformación; nos hicieron sentir familia.',
    audioSrc: '/audios/testimonio-alejandro.mp3',
    audioText: 'Escuchá el emocionante relato de Alejandro:'
  },
  {
    id: 2,
    name: 'Marcelo',
    role: 'Escuelas Waldorf (Dandelion, El Trigal y Aurora)',
    text: 'Nos tocó un cambio de clima bastante abrupto, pasamos del calor a un garrotillo. La disposición de todo el equipo de Mágico Ensueño para abrirnos el lugar fue increíble. Rápidamente pasamos de las carpas a los domos y el refugio para hacer todas las actividades y comer adentro. Esa voluntad de ustedes fue muy valiosa para salvar la experiencia, que socialmente entre los jóvenes de las tres escuelas fue mágica; de lo mejor que vivieron en el año.',
    audioSrc: '/audios/testimonio-marcelo.mp3',
    audioText: 'Escuchá la experiencia de Marcelo:'
  },
  {
    id: 3,
    name: 'Paulo',
    role: 'Director de Campamento de Artes Marciales',
    text: 'Pudimos encontrar mucha comodidad en sus instalaciones, amabilidad del personal y un tremendo servicio de comidas gourmet, saludables y nutritivas. El lugar está súper equipado para recibir delegaciones grandes en su refugio principal y los hermosos domos. Contar con un salón de usos múltiples y una inmensidad de espacio natural para realizar actividades y entrenamientos hace que sea un predio imperdible.',
    audioSrc: null,
    audioText: null
  },
  {
    id: 4,
    name: 'Fede',
    role: 'Director del Depto. de Juventud, Institución Hebraica',
    extraRole: '(Campamento de 9 días)',
    text: 'Llevamos un grupo de 200 personas. La comida que nos hicieron fue 100% casera, cuidada, con una calidad y cantidad espectacular. Lo que más destaco es la predisposición de todo el equipo para tomar el desafío, adaptar los recursos y lograr una propuesta que los chicos no se van a olvidar nunca. Fue un desafío hermoso.',
    audioSrc: '/audios/testimonio-fede.mp3',
    audioText: 'Escuchá la voz de Fede:'
  }
];

const AulaVerdeTestimonio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonios.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonios.length - 1 ? 0 : prev + 1));
  };

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

        {/* Carrusel de Testimonios */}
        <div className="relative group">
          {/* Contenedor del track deslizable */}
          <div className="overflow-hidden w-full pb-8 px-1 md:px-4">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonios.map((testimonio) => (
                <div key={testimonio.id} className="min-w-full px-1 md:px-4">
                  <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col h-full relative overflow-hidden transition-shadow duration-500 hover:shadow-[0_12px_45px_rgb(0,83,51,0.1)]">
                    {/* Acento lateral/superior dorado */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-gold opacity-80"></div>

                    {/* Marca de agua de comillas de fondo */}
                    <div className="absolute -top-10 -right-4 md:-top-4 md:-right-4 opacity-[0.03] transform pointer-events-none">
                      <Quotes weight="fill" className="w-48 h-48 md:w-64 md:h-64 text-brand" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center relative z-10 flex-1">
                      {/* Ícono Primario */}
                      <div className="flex-shrink-0 animate-pulse-slow">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-brand/10 to-transparent flex items-center justify-center border border-brand/5">
                          <Quotes weight="fill" className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                        </div>
                      </div>

                      {/* Contenido del Testimonio */}
                      <div className="flex-1 w-full flex flex-col justify-between h-full">
                        <p className="text-lg md:text-xl lg:text-2xl font-serif text-charcoal leading-relaxed md:leading-loose mb-6 italic">
                          "{testimonio.text}"
                        </p>

                        <div className="mt-auto">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-t border-gray-100 pt-6">
                            <span className="font-bold text-brand text-lg tracking-wide uppercase">
                              {testimonio.name}
                            </span>
                            <span className="hidden md:inline text-brand/30">|</span>
                            <span className="text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-widest max-w-[90%] md:max-w-none">
                              {testimonio.role} {testimonio.extraRole && <span className="font-light normal-case tracking-normal">{testimonio.extraRole}</span>}
                            </span>
                          </div>

                          {/* Reproductor de Audio */}
                          {testimonio.audioSrc && (
                            <div className="mt-8 bg-brand/5 p-4 md:p-5 rounded-2xl border border-brand/10 hover:border-brand/20 transition-colors w-full max-w-lg">
                              <p className="text-brand font-semibold mb-3 flex items-center gap-2 text-sm md:text-base">
                                <Headphones weight="fill" className="w-6 h-6 text-gold" />
                                <span>{testimonio.audioText}</span>
                              </p>
                              <audio controls className="w-full outline-none opacity-90 transition-opacity">
                                <source src={testimonio.audioSrc} type="audio/mpeg" />
                                Tu navegador no soporta el elemento de audio.
                              </audio>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles del Carrusel */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 xl:-left-8 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-brand hover:scale-110 hover:text-gold transition-all z-20 focus:outline-none md:opacity-0 md:group-hover:opacity-100"
            aria-label="Anterior testimonio"
          >
            <CaretLeft weight="bold" className="w-5 h-5 md:w-7 md:h-7" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 xl:-right-8 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-brand hover:scale-110 hover:text-gold transition-all z-20 focus:outline-none md:opacity-0 md:group-hover:opacity-100"
            aria-label="Siguiente testimonio"
          >
            <CaretRight weight="bold" className="w-5 h-5 md:w-7 md:h-7" />
          </button>

          {/* Puntos Indicadores (Dots) */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-4 md:mt-6">
            {testimonios.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx 
                    ? "w-8 md:w-10 h-2 md:h-2.5 bg-brand" 
                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-brand/20 hover:bg-brand/50"
                }`}
                aria-label={`Ir al testimonio ${idx + 1}`}
              />
            ))}
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

        {/* Logos fijos sin carrusel y a color */}
        <div className="relative w-full flex justify-center bg-white/50 backdrop-blur-sm border-y border-gray-200/50 py-10 md:py-16">
          <div className="flex flex-wrap gap-12 md:gap-24 px-8 items-center justify-center">

            {/* Logo de Hebraica */}
            <div className="flex items-center justify-center">
              <img
                src="/uploads/Aula Verde/logo_hebraica.png"
                alt="Logo de Institución Hebraica"
                className="w-32 h-32 md:w-36 md:h-36 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Logo de Racing Club de Córdoba */}
            <div className="flex items-center justify-center">
              <img
                src="/uploads/Aula Verde/Escudo_del_Club_Racing_de_Córdoba.svg"
                alt="Escudo de Racing Club de Córdoba"
                className="w-32 h-32 md:w-36 md:h-36 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AulaVerdeTestimonio;
