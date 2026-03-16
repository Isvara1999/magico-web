import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home, Droplet, Wifi, Coffee, Users, User, Star, Sun, Moon, Check, Leaf, Mountain, Palette, Heart } from 'lucide-react';
import {
  IconAdultos,
  IconNiños,
  IconGastronomia,
  IconTransformacion,
  IconAlojamiento,
  IconDomo,
  IconAgua,
  IconRed,
  IconSol,
  IconLuna,
  IconEstrella,
  IconCalendar,
  IconLocation,
} from './icons.tsx';

import AulaVerdeHero from './components/AulaVerdeHero.tsx';
import AulaVerdeMagico from './components/AulaVerdeMagico.tsx';
import AulaVerdePrecios from './components/AulaVerdePrecios.tsx';

const AulaVerde: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);
  const [activeTab, setActiveTab] = useState<'refugio' | 'domo'>('refugio');

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
      `}

      </style>

      {/* Header removed to avoid blank page if context is missing */}

      {/* ====== HERO SECTION (closer, centered) ====== */}
      <AulaVerdeHero />

      {/* ====== VIDEO INVITACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
                Aprender desde la experiencia, con todos los sentidos
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                «Aula Verde» es una oportunidad para que niños y jóvenes se alejen de las pantallas y vuelvan a conectarse con lo esencial: la naturaleza, el cuerpo, el otro, el juego, la tierra.
              </p>
              <p className="text-brand-green text-xl md:text-2xl serif-title font-bold mt-6">
                Creemos en una educación que emociona, que se vive con el cuerpo y que deja huellas duraderas.
              </p>
            </div>

            {/* Right Video */}
            <div className="flex justify-center">
              <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-brand-gold/50 overflow-hidden shadow-2xl">
                <iframe
                  width="360"
                  height="640"
                  src="https://www.youtube.com/embed/Sqc7zbR-sPQ"
                  title="Familion - Una invitación"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  allowFullScreen
                  className="w-full h-full rounded-3xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DIRIGIDA A ====== */}
      <section id="dirigida-a" className="py-16 md:py-24 px-6 bg-green-50/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Tarjeta 1 */}
          <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-right">
            <div className="p-6 md:p-8">
              <h3 className="serif-title text-lg font-bold mb-3 text-brand text-center">¿A quién está dirigida?</h3>
              <p className="text-dark/80 text-sm leading-relaxed text-center">
                A escuelas, docentes, directivos y coordinadores que organizan salidas educativas y campamentos escolares y grupales con un enfoque formativo e integral.
              </p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-left">
            <div className="p-6 md:p-8">
              <h3 className="serif-title text-lg font-bold mb-3 text-brand text-center">Propuesta Pedagógica</h3>
              <p className="text-dark/80 text-sm leading-relaxed text-center">
                Trabajamos tanto con nivel primario como secundario, adaptando cada programa a la edad, etapa educativa y objetivos del grupo.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ====== ¿QUÉ HACE DIFERENTE? ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-8 md:mb-10" data-aos="fade-up">
            ¿Qué hace diferente a nuestra propuesta?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilar 1 */}
            <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex justify-center">
                  <IconAdultos className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="serif-title text-lg text-brand mb-3 text-center">Entorno natural privilegiado, inmerso en la montaña, con ríos y bosques nativos para explorar con seguridad.</h4>
                <hr className="border-t border-gold/50" />
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex justify-center">
                  <IconNiños className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="serif-title text-lg text-brand mb-3 text-center">Metodología lúdica y vivencial, que invita a aprender desde la experiencia y la reflexión.</h4>
                <hr className="border-t border-gold/50" />
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="300">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex justify-center">
                  <IconGastronomia className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="serif-title text-lg text-brand mb-3 text-center">Fomentamos el trabajo en equipo, la curiosidad, el pensamiento crítico y la conexión profunda.</h4>
                <hr className="border-t border-gold/50" />
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="400">
              <div className="p-6 md:p-8">
                <div className="mb-4 flex justify-center">
                  <IconTransformacion className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="serif-title text-lg text-brand mb-3 text-center">Compromiso con la sustentabilidad activa, promoviendo prácticas como el compostaje y el cuidado del ambiente.</h4>
                <hr className="border-t border-gold/50" />
              </div>
            </div>
          </div>
        </div>
      </section>
  

      {/* CATÁLOGO DE ACTIVIDADES PREMIUM */}
<section className="py-20 bg-gray-50/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="text-center mb-16" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#005333' }}>
        Catálogo de Actividades
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Diseñamos cada jornada a la medida de tu grupo, combinando aprendizaje práctico, aventura en la naturaleza y expresión creativa.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Tarjeta 1: Agroecología */}
      <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="100">
        <div className="p-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
            <Leaf className="w-8 h-8 text-brand-green" />
          </div>
          <h3 className="text-brand font-bold text-xl mb-6 text-center font-serif">Talleres Agroecológicos</h3>
          <ul className="space-y-4 text-dark/80 text-sm md:text-base">
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Preparación de Terrenos</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Cultivo Agroecológico</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Producción de Alimentos</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Producción de Biodiésel</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tarjeta 2: Aventura */}
      <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="200">
        <div className="p-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
            <Mountain className="w-8 h-8 text-brand-green" />
          </div>
          <h3 className="text-brand font-bold text-xl mb-6 text-center font-serif">Aventura y Naturaleza</h3>
          <ul className="space-y-4 text-dark/80 text-sm md:text-base">
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Exploración de Arroyos</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Aventura en Montaña</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Conservación de Biodiversidad</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Tirolesa y Senderismo</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tarjeta 3: Arte */}
      <div className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold" data-aos="fade-up" data-aos-delay="300">
        <div className="p-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
            <Palette className="w-8 h-8 text-brand-green" />
          </div>
          <h3 className="text-brand font-bold text-xl mb-6 text-center font-serif">Arte y Expresión</h3>
          <ul className="space-y-4 text-dark/80 text-sm md:text-base">
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Arte Natural y Reciclaje</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Artes Escénicas y Teatro</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Música y Expresión Corporal</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Fogones Culturales</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <AulaVerdeMagico />

      {/* ====== PRECIOS ====== */}
      <AulaVerdePrecios />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
            ¿Listos para planificar el próximo viaje de tu escuela?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            Sabemos que organizar una salida grupal requiere mucho esfuerzo. En Aula Verde te acompañamos en cada paso: desde la adaptación de la propuesta pedagógica hasta la logística y seguridad. Escribinos para despejar dudas y armar un presupuesto a la medida de tu grupo.
          </p>
          <a href="https://wa.me/5493516765820?text=Hola!%20Vengo%20de%20Aula%20Verde%20y%20quiero%20solicitar%20presupuesto%20para%20mi%20escuela." className="btn-gold bg-brand-green text-white hover:bg-white hover:text-brand-green inline-block py-3 px-8 rounded-full">
            SOLICITAR ASESORAMIENTO DIRECTO
          </a>
        </div>
      </section>

      {/* ====== VIDEO DESPEDIDA ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl serif-title brand-green mb-8 md:mb-10">Momentos que fortalecen al grupo</h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">El aprendizaje continúa fuera de los talleres. Compartir las comidas, los fogones y el tiempo libre en la naturaleza genera lazos de compañerismo, empatía y respeto que los chicos se llevan de regreso al aula.</p>
          <div className="flex justify-center">
            <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-brand-gold/50 overflow-hidden shadow-2xl">
              <iframe
                width="360"
                height="640"
                src="https://www.youtube.com/embed/QqGrzFloHsE"
                title="Familion - Agradecimiento por la comida"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                className="w-full h-full rounded-3xl"
              ></iframe>
            </div>
          </div>
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

export default AulaVerde;
