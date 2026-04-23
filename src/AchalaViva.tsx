import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Target, House, ForkKnife, Star, Sun, Moon, CaretLeft, CaretRight, Camera, Binoculars, Compass, Bird, Tree } from '@phosphor-icons/react';

import AchalaVivaHero from './components/AchalaVivaHero';
import AchalaVivaMagico from './components/AchalaVivaMagico';
import AchalaVivaPrecios from './components/AchalaVivaPrecios';

const AchalaViva: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Using placeholder images requested by user
  const images = [
    { src: "https://images.pexels.com/photos/31299365/pexels-photo-31299365.jpeg", alt: "Fotografía en la Naturaleza" },
    { src: "https://images.pexels.com/photos/12506594/pexels-photo-12506594.jpeg", alt: "AstroTurismo y Cielos Oscuros" },
    { src: "/uploads/Pajaros/condor.jpg", alt: "Avistaje: Cóndor Andino" },
    { src: "https://images.pexels.com/photos/32163268/pexels-photo-32163268.jpeg", alt: "Avistaje: Pirincho (Guira guira)" },
    { src: "https://images.pexels.com/photos/28315745/pexels-photo-28315745.jpeg", alt: "Avistaje: Pájaro Carpintero" },
    { src: "https://images.pexels.com/photos/16708744/pexels-photo-16708744.jpeg", alt: "Avistaje: Benteveo" },
    { src: "/uploads/hero(3).webp", alt: "Entorno Natural: Sierras Grandes" },
    { src: "/uploads/469742031_941240881439467_8316347989568757415_n.webp", alt: "Experiencia en Comunidad" }
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

        .hero-cta .btn-gold {
          padding: 0.6rem 1.25rem;
          font-size: 0.82rem;
          border-radius: 40px;
        }

        .hero-cta .btn-glass {
          padding: 0.6rem 1rem;
          font-size: 0.78rem;
          border-radius: 40px;
          color: #005333;
          border: 1px solid #005333;
          background: rgba(255,255,255,0.5);
        }
        .hero-cta .btn-glass:hover {
          background: rgba(255,255,255,0.7);
        }

        @media (max-width: 640px) {
          .btn-gold, .btn-glass {
            padding: 0.5rem 0.9rem;
            font-size: 0.78rem;
          }
        }
      `}</style>

      {/* ====== HERO SECTION ====== */}
      <AchalaVivaHero />

      {/* ====== EL DOLOR Y LA IDENTIFICACION ====== */}
      <section id="experiencia" className="py-16 md:py-24 px-6 bg-white mt-16 md:mt-24" style={{ paddingBottom: 'max(8rem, 120px)' }}>
        <div className="max-w-5xl mx-auto pt-8">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-10 md:mb-16 uppercase tracking-wide">
            Vivimos rodeados de ruido,<br className="hidden md:block" /> pero estamos sordos a lo esencial.
          </h2>

          <div className="flex flex-col gap-6">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto px-4">
              Pasamos los días mirando pantallas, corriendo contra el reloj y viviendo en piloto automático. La naturaleza está ahí, pero ya no sabemos cómo verla, ni cómo escucharla.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto px-4 font-medium">
              Achala Viva no es una "escapada de fin de semana". Es una puerta para abrir la percepción, afinar los sentidos y reconectar con la inteligencia viva de la Sierra. No venís solo a descansar; venís a recordar que sos parte de algo inmenso.
            </p>

            <div className="mt-12 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <div className="flex flex-col items-center text-center">
                <Compass weight="thin" className="w-12 h-12 text-brand-gold mb-4" />
                <h4 className="font-bold text-brand-green mb-2">El cielo nocturno como brújula</h4>
                <p className="text-gray-600 text-sm">Aprender a leer las constelaciones.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Bird weight="thin" className="w-12 h-12 text-brand-gold mb-4" />
                <h4 className="font-bold text-brand-green mb-2">La biodiversidad como maestra</h4>
                <p className="text-gray-600 text-sm">Observación guiada de flora y fauna nativa.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Tree weight="thin" className="w-12 h-12 text-brand-gold mb-4" />
                <h4 className="font-bold text-brand-green mb-2">La presencia como camino</h4>
                <p className="text-gray-600 text-sm">Bajar el ritmo cardíaco al ritmo de la montaña.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== EL VEHICULO ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50" style={{ paddingTop: 'max(6rem, 90px)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-6 uppercase tracking-wide">
            Tu refugio y tus herramientas
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto mb-16 md:mb-24">
            Durante 2 días te sumergís en un espacio donde la ciencia y la contemplación se unen. Nosotros nos ocupamos de toda la logística material, vos solo te ocupás de estar presente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
            {/* Tarjeta 1 - Talleres */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-[#005333]">
              <div className="mb-4 text-brand-green flex justify-center">
                <Binoculars weight="thin" className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3 font-bold uppercase tracking-widest text-sm">Conocimiento Aplicado</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                No son "charlas", es interpretación en el terreno. Astroturismo, avistaje de aves y lectura del paisaje en tiempo real.
              </p>
            </div>

            {/* Tarjeta 2 - Alojamiento Inmersivo */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-[#D4AF37]">
              <div className="mb-4 text-brand-green flex justify-center">
                <House weight="thin" className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3 font-bold uppercase tracking-widest text-sm">Descanso Premium</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Eco-refugio y domos geodésicos en medio del bosque nativo. Ropa blanca, biocosmética y agua caliente 24h. Cuidado humano real.
              </p>
            </div>

            {/* Tarjeta 3 - Pensión Completa */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-[#005333]">
              <div className="mb-4 text-brand-green flex justify-center">
                <ForkKnife weight="thin" className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3 font-bold uppercase tracking-widest text-sm">Nutrición Regenerativa</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pensión completa con gastronomía local y de estación. Abundante, riquísima y pensada para sostener tu energía.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== AUTORIDAD (FACILITADOR) ====== */}
      <section className="py-16 md:py-24 px-6 bg-white mt-16 md:mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Columna gráfica - Placeholder */}
            <div className="flex justify-center order-2 md:order-1 px-4 mt-2 mb-4 md:my-12">
              <img 
                src="/uploads/Walter_E._Cejas.jpg" 
                alt="Walter Eugenio Cejas" 
                className="w-full object-cover rounded-xl shadow-lg h-auto aspect-[4/5] md:aspect-square"
              />
            </div>
            
            {/* Columna de texto */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl serif-title brand-green mb-6 md:mb-8 uppercase tracking-wide">
                Tu Guía en esta Inmersión
              </h2>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Walter Eugenio Cejas</h3>
              <p className="text-gray-600 text-sm md:text-base font-medium mb-6 uppercase tracking-wider">
                Biólogo, investigador y apasionado por la vida salvaje.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Walter no es solo un docente; es un puente entre el conocimiento científico y la experiencia espiritual directa. Te va a guiar a través de los secretos mejor guardados de la Sierra de Achala con la cercanía de quien conoce su propia casa.
              </p>
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
              Dos días de inmersión total en el entorno natural de Los Gigantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Día 1 - Sábado */}
            <div className="bg-white rounded-2xl shadow-lg border border-brand-green/10 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-gold bg-brand-green/10 p-2 rounded-full">
                  <Sun weight="thin" className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm text-brand-green">Sábado</p>
                  <p className="text-xs text-gray-500">Día 1</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-green text-sm mb-2">Tierra y Cielo</h4>
                <ul className="text-gray-700 text-sm md:text-base space-y-2">
                  <li>• Recepción y acomodación en Mágico Ensueño</li>
                  <li>• Almuerzo de bienvenida</li>
                  <li>• Taller de Fotografía en la naturaleza</li>
                  <li>• Charla–taller de Astroturismo y Ecoturismo</li>
                  <li>• Merienda de campo</li>
                  <li>• Al caer la noche… observación del cielo profundo, interpretación de estrellas, constelaciones y vida nocturna</li>
                  <li>• Cena compartida bajo el cielo abierto con fogón</li>
                </ul>
              </div>
            </div>

            {/* Día 2 - Domingo */}
            <div className="bg-white rounded-2xl shadow-lg border border-brand-green/10 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-brand-gold bg-brand-green/10 p-2 rounded-full">
                  <Camera weight="thin" className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm text-brand-green">Domingo</p>
                  <p className="text-xs text-gray-500">Día 2</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-brand-green text-sm mb-2">Vida Salvaje</h4>
                <ul className="text-gray-700 text-sm md:text-base space-y-2">
                  <li>• Despertar en la naturaleza</li>
                  <li>• Desayuno Serrano</li>
                  <li>• Salida de observación: Avistaje de aves + lectura del paisaje</li>
                  <li>• Almuerzo de campo para integrar la experiencia</li>
                  <li>• Despedida por la tarde</li>
                </ul>
              </div>
            </div>
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
            Paisajes, astroturismo y avistaje en su máxima expresión.
          </p>
          
          {/* Carrusel */}
          <div className="relative max-w-5xl mx-auto aspect-square md:aspect-[16/9]">
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg group bg-stone-900 flex items-center justify-center">
              <img 
                src={images[currentImage].src} 
                alt={images[currentImage].alt} 
                className="w-full h-full object-contain transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-10 px-4">
                <span className="text-white text-sm md:text-lg font-medium drop-shadow-md">
                  {images[currentImage].alt}
                </span>
              </div>
            </div>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-white text-white hover:text-[#005333] p-2 md:p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 z-20 cursor-pointer"
            >
              <CaretLeft weight="thin" className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-white text-white hover:text-[#005333] p-2 md:p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 z-20 cursor-pointer"
            >
              <CaretRight weight="thin" className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
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
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <AchalaVivaMagico />

      {/* ====== PRECIOS ====== */}
      <AchalaVivaPrecios />

      {/* ====== PREGUNTAS FRECUENTES ====== */}
      <section className="py-16 md:py-24 px-6 bg-white mt-16 md:mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-10 md:mb-16 uppercase tracking-wide">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-4">
            <details className="group bg-slate-50 rounded-xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-800">
                ¿Necesito conocimientos previos en biología o astronomía?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                Cero. La experiencia está diseñada para curiosos y amantes de la naturaleza de todos los niveles. Walter traduce todo a un lenguaje simple y fascinante.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-800">
                ¿Tengo que llevar equipo especial?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                Solo ropa cómoda, abrigo para la noche en la montaña y calzado de trekking. Nosotros ponemos las herramientas y el confort.
              </div>
            </details>

            <details className="group bg-slate-50 rounded-xl border border-gray-200 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-800">
                ¿Puedo ir solo/a?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                ¡Por supuesto! La gran mayoría de nuestros visitantes vienen solos. Es el espacio perfecto para estar con vos mismo y conocer gente en tu misma sintonía.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-white to-slate-50 mt-8 md:mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
            El cielo, la tierra y la vida latiendo en un mismo instante ✨
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            Achala Viva es la pausa que tu instinto busca. Unimos ciencia, contemplación y descanso para ofrecerte una inmersión inolvidable.
          </p>
          <a href="https://wa.me/5493516765820?text=%C2%A1Hola!%20Termin%C3%A9%20de%20leer%20todo%20sobre%20la%20inmersi%C3%B3n%20Achala%20Viva%20y%20no%20me%20lo%20quiero%20perder.%20Me%20comunico%20para%20coordinar%20la%20se%C3%B1a%20y%20asegurar%20mi%20lugar.%20%E2%9C%A8" className="btn-gold inline-block">
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

export default AchalaViva;
