import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Target, House, ForkKnife, Star, Sun, Moon, CaretLeft, CaretRight } from '@phosphor-icons/react';

import GondorbowsHero from './components/GondorbowsHero';
import GondorbowsMagico from './components/GondorbowsMagico';
import GondorbowsPrecios from './components/GondorbowsPrecios';

const Gondorbows: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'refugio' | 'domo'>('refugio');
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    { src: "/uploads/arcos-fuego.jpg", alt: "Arcos terminados frente al fuego" },
    { src: "/uploads/tirando.jpg", alt: "Tiro con arco en el bosque" },
    { src: "/uploads/herramientas.jpg", alt: "Herramientas de desbaste tradicionales" },
    { src: "/uploads/grupo.jpg", alt: "Comunidad y tribu con sus arcos" },
    { src: "/uploads/comida.jpg", alt: "Parrilla con comida serrana" }
  ];

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <LanguageProvider>
      <>
        <Header />
        <div className="bg-white text-gray-800 overflow-x-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Nunito:wght@300;400;600;700&display=swap');
        
        
        * { font-family: 'Nunito', sans-serif; }
        h1, h2, h3, h4, .serif-title { font-family: 'Marcellus', serif; }
        
        .brand-green { color: #005333; }
        .bg-brand-green { background-color: #005333; }
        .brand-gold { color: #D4AF37; }
        .bg-brand-gold { background-color: #D4AF37; }
        
        .btn-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #E5C158 100%);
          color: #005333;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
        }
        
        .btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
        }
        
        .btn-glass {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          white-space: nowrap;
        }

        /* Hero-specific smaller CTAs */
        .hero-cta .btn-gold {
          padding: 0.6rem 1.25rem;
          font-size: 0.82rem;
          border-radius: 40px;
        }

        .hero-cta .btn-glass {
          padding: 0.6rem 1rem;
          font-size: 0.78rem;
          border-radius: 40px;
          /* make visible on white hero background */
          color: #005333;
          border: 1px solid #005333;
          background: rgba(255,255,255,0.5);
        }
        .hero-cta .btn-glass:hover {
          background: rgba(255,255,255,0.7);
        }

        /* Ensure hero CTAs are perfectly centered */
        .hero-cta a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Global smaller buttons on narrow screens */
        @media (max-width: 640px) {
          .btn-gold, .btn-glass {
            padding: 0.5rem 0.9rem;
            font-size: 0.78rem;
          }
        }
        
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
        }

        .wave-svg {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: auto;
        }

        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 83, 51, 0.12);
        }

        .video-aspect {
          aspect-ratio: 9 / 16;
          border-radius: 1.5rem;
          overflow: hidden;
          max-height: 80vh;
        }

        .testimonial-quote {
          position: relative;
          padding-left: 2rem;
        }
        
        .testimonial-quote:before {
          content: '"';
          position: absolute;
          left: 0;
          top: -0.5rem;
          font-size: 4rem;
          color: #D4AF37;
          opacity: 0.3;
          font-family: 'Marcellus', serif;
        }

        .schedule-item {
          border-left: 4px solid #D4AF37;
          padding-left: 1.5rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        /* Hide scrollbar for carousel */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}

      </style>

      {/* Header removed to avoid blank page if context is missing */}

      {/* ====== HERO SECTION (closer, centered) ====== */}
      <GondorbowsHero />

      {/* ====== SOBRE NOSOTROS / LA EXPERIENCIA ====== */}
      <section id="experiencia" className="py-16 md:py-24 px-6 bg-white mt-16 md:mt-24" style={{ paddingBottom: 'max(8rem, 120px)' }}>
        <div className="max-w-5xl mx-auto pt-8">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-10 md:mb-16">
            El verdadero lujo es el ser tiempo de presencia y disfrute.
          </h2>

          <div className="flex flex-col">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto px-4">
              Diseñamos esta experiencia con todo resuelto para que tu única tarea sea conectar con el entorno y el proceso creativo. Ubicados a 1800 metros de altura en la zona de Cuchilla Nevada, te ofrecemos una pausa real de la rutina rodeado de 200 hectáreas de montañas, ríos y vertientes.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto font-serif px-4" style={{ marginTop: 'max(4rem, 64px)' }}>
              Durante tres días intensivos, construirás tu propio arco de alto rendimiento, recuperando habilidades esenciales desarrolladas durante más de 150.000 años de historia.
            </p>
          </div>
        </div>
      </section>

      {/* ====== QUÉ INCLUYE ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50" style={{ paddingTop: 'max(6rem, 90px)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-16 md:mb-24">
            Todo preparado para tu inmersión.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
            {/* Tarjeta 1 - Taller Exclusivo de Arquería */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <Target weight="thin" className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Taller Exclusivo de Arquería</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Todos los materiales, herramientas y la guía directa de Gondorbows a tu disposición para construir tu arco desde cero.
              </p>
            </div>

            {/* Tarjeta 2 - Alojamiento Inmersivo */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <House weight="thin" className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Alojamiento Inmersivo</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Descanso en Eco-refugio premium y domos geodésicos de diseño rodeados de bosque nativo. Incluye Ropa blanca, toalla, toallon, bio-cosmetica, agua caliente 24h,  y WIFI en todo el predio.
              </p>
            </div>

            {/* Tarjeta 3 - Pensión Completa */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <ForkKnife weight="thin" className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Pensión Completa</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Gastronomía local y de estación con todas las comidas riquísimas y abundantes incluidas durante tu estadía para que no tengas que pensar en nada más.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRUEBA SOCIAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50 mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl serif-title brand-green text-center mb-8 md:mb-10">
            Mirá lo que vivieron los grupos anteriores. Una experiencia que transforma.
          </h3>
          <div className="flex justify-center">
            <iframe 
              width="100%" 
              height="400" 
              src="https://www.youtube.com/embed/Q0l3wI7_5LI" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-2xl shadow-2xl"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ====== AUTORIDAD ====== */}
      <section className="py-16 md:py-24 px-6 bg-white mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Columna gráfica - Foto Fausto trabajando */}
            <div className="flex justify-center order-2 md:order-1 px-4 mt-2 mb-4 md:my-12">
              <img 
                src="/uploads/fausto-tallando.jpg" 
                alt="Fausto trabajando" 
                className="w-full object-cover rounded-xl shadow-lg h-auto aspect-[4/5] md:aspect-square"
              />
            </div>
            
            {/* Columna de texto */}
            <div className="order-1 md:order-2">
              <div className="mb-4 text-brand-green flex justify-center">
                <img src="/uploads/logo-gondor-bows.png" alt="Gondor Bows" className="w-16" />
              </div>
              <h2 className="text-3xl md:text-4xl serif-title brand-green mb-6 md:mb-8">
                Conocé a tus guías: Gondor Bows
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Gondor Bows nace en 2015 con la misión de recuperar el arte ancestral de la arquería tradicional, integrando técnicas manuales, conexión con la naturaleza y una mirada contemporánea sobre el trabajo artesanal.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Un equipo comprometido con transmitir oficios que despiertan algo profundo: la memoria del cuerpo, la paciencia del proceso y el poder de crear con tus propias manos.
              </p>
              
              <div className="bg-brand-green/5 border-l-4 border-brand-green p-4 rounded-r-lg mt-8 shadow-sm">
                <p className="text-brand-green italic font-medium text-sm md:text-base leading-relaxed">
                  "Esta experiencia es MULTINIVEL, por lo que podés venir tanto si no tenés ninguna experiencia previa como si ya tomaste otro curso y querés profundizar en la técnica y el conocimiento."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CRONOGRAMA ====== */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-slate-50 to-white mt-16 md:mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl serif-title brand-green mb-4">
              Cronograma de la Inmersión
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Tres días de inmersión total en el arte ancestral de la arquería tradicional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Día 1 - Viernes */}
            <div className="bg-white rounded-2xl shadow-lg border border-brand-green/10 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-gold bg-brand-green/10 p-2 rounded-full">
                  <Star weight="thin" className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm text-brand-green">Viernes</p>
                  <p className="text-xs text-gray-500">Día 1</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-green text-sm mb-2">Llegada & Preparación</h4>
                <ul className="text-gray-700 text-sm md:text-base space-y-2">
                  <li>• Recepción y acomodación en Mágico Ensueño</li>
                  <li>• Introducción a la tecnología primitiva</li>
                  <li>• Selección del vástago de madera</li>
                  <li>• Primer desbaste del arco</li>
                  <li>• Cena de bienvenida y fuego</li>
                </ul>
              </div>
            </div>

            {/* Día 2 - Sábado */}
            <div className="bg-white rounded-2xl shadow-lg border border-brand-green/10 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-gold bg-brand-green/10 p-2 rounded-full">
                  <Sun weight="thin" className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm text-brand-green">Sábado</p>
                  <p className="text-xs text-gray-500">Día 2</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-green text-sm mb-2">Taller Intensivo</h4>
                <ul className="text-gray-700 text-sm md:text-base space-y-2">
                  <li>• Desayuno serrano</li>
                  <li>• Jornada intensiva: trabajo de la fibra</li>
                  <li>• Diseño de palas y alineación por calor</li>
                  <li>• Almuerzo nutritivo</li>
                  <li>• Continuación del proceso de forja</li>
                  <li>• Cena y descanso</li>
                </ul>
              </div>
            </div>

            {/* Día 3 - Domingo */}
            <div className="bg-white rounded-2xl shadow-lg border border-brand-green/10 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-gold bg-brand-green/10 p-2 rounded-full">
                  <Moon weight="thin" className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm text-brand-green">Domingo</p>
                  <p className="text-xs text-gray-500">Día 3</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-green text-sm mb-2">Finalización & Prueba</h4>
                <ul className="text-gray-700 text-sm md:text-base space-y-2">
                  <li>• Desayuno</li>
                  <li>• Tillerizado fino: balance y retoques</li>
                  <li>• Prueba de tiro en entorno natural</li>
                  <li>• Almuerzo de cierre</li>
                  <li>• Entrega de arcos y despedida (17:00 hs)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* mensaje final de la sección */}
          <div className="mt-8 p-6 md:p-8 border-t border-gray-200">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              El cronograma está diseñado para garantizar que te lleves tu arco completamente terminado y funcional, respetando los tiempos de aprendizaje y descanso de cada participante.
            </p>
          </div>
        </div>
      </section>

      {/* ====== POSTALES DE LA INMERSIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-6 md:mb-8">
            Postales de la Inmersión
          </h2>
          <p className="text-gray-600 text-sm md:text-base text-center mb-10 md:mb-12 max-w-3xl mx-auto">
            Comunidad, fuego, herramientas tradicionales y el sabor de las sierras.
          </p>
          
          {/* Carrusel Horizontal / Mobile Cuadrado */}
          <div className="relative max-w-4xl mx-auto aspect-square md:aspect-[16/9] md:h-[500px]">
            {/* Imagen actual */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg group bg-gray-900">
              <img 
                src={images[currentImage].src} 
                alt={images[currentImage].alt} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Overlay suave para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Título de la imagen opcional */}
              <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-10 px-4">
                <span className="text-white text-sm md:text-lg font-medium drop-shadow-md">
                  {images[currentImage].alt}
                </span>
              </div>
            </div>
            
            {/* Flechas de navegación (laterales) */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-white text-white hover:text-[#005333] p-2 md:p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 z-20 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <CaretLeft weight="thin" className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-white text-white hover:text-[#005333] p-2 md:p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 z-20 cursor-pointer"
              aria-label="Siguiente imagen"
            >
              <CaretRight weight="thin" className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            {/* Indicadores (inferiores) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 md:h-2.5 rounded-full transition-all duration-300 shadow-sm active:scale-90 cursor-pointer ${
                    index === currentImage 
                      ? 'bg-white w-6 md:w-8' 
                      : 'bg-white/50 hover:bg-white/80 w-2 md:w-2.5'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <GondorbowsMagico />

      {/* ====== PRECIOS ====== */}
      <GondorbowsPrecios />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-white to-slate-50 mt-16 md:mt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
            ¿Y si este finde se convierte en uno inolvidable?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            Gondorbows es más que una experiencia. Es la pausa que tu rutina necesita, el refugio que tu instinto busca y la inmersión total que estás esperando.
          </p>
          <a href="https://wa.me/5491157300099?text=%C2%A1Hola%20Fausto!%20Termin%C3%A9%20de%20leer%20todo%20sobre%20el%20retiro%20de%20Gondorbows%20y%20no%20me%20lo%20quiero%20perder.%20Me%20comunico%20para%20coordinar%20la%20se%C3%B1a%20y%20asegurar%20mi%20lugar%20del%2010%20al%2012%20de%20abril%20en%20Los%20Gigantes.%20%F0%9F%8C%B2%E2%9C%A8" className="btn-gold inline-block">
            Asegurar mi lugar
          </a>
        </div>
      </section>
        
        {/* Footer */}
        <Footer />
        
        {/* Catálisis Credit */}
        <div className="bg-brand-green/5 text-brand-green/60 text-center text-xs py-3 border-t border-brand-green/10">
          Growth systems & digital experience by Catálisis
        </div>
      </div>
      </>
    </LanguageProvider>
  );
};

export default Gondorbows;
