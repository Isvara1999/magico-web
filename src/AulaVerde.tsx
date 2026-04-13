import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home, Droplet, Wifi, Coffee, Users, User, Star, Sun, Moon, Heart } from 'lucide-react';
import { Tree, PuzzlePiece, UsersThree, Plant, Leaf, Mountains, Palette, Check } from '@phosphor-icons/react';
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

import AulaVerdeHero from './components/AulaVerdeHero';
import AulaVerdeMagico from './components/AulaVerdeMagico';
import AulaVerdeTestimonio from './components/AulaVerdeTestimonio';
import AulaVerdeLeadMagnet from './components/AulaVerdeLeadMagnet';
import AulaVerdePrecios from './components/AulaVerdePrecios';
import AulaVerdeFAQ from './components/AulaVerdeFAQ';
import { WhatsAppButton } from '../components/WhatsAppButton';

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
              <p className="text-brand text-xl md:text-2xl serif-title font-bold mt-6">
                Creemos en una educación que emociona, que se vive con el cuerpo y que deja huellas duraderas.
              </p>
            </div>

            {/* Right Video */}
            <div className="flex justify-center">
              <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-gold/50 overflow-hidden shadow-2xl">
                <iframe
                  width="360"
                  height="640"
                  src="https://www.youtube.com/embed/lLHk-lpRofE"
                  title="Aprender desde la experiencia"
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl serif-title brand-green mb-4">
              ¿Qué hace diferente a nuestra propuesta?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto md:text-lg">
              Un enfoque único que combina la fuerza del entorno natural con metodologías que dejan huella.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Pilar 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(0,83,51,0.12)] hover:-translate-y-2 transition-all duration-500 border border-gray-100/80 p-8 md:p-10 flex flex-col items-center text-center relative z-10" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/40 to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand/5 to-transparent rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="mb-6 flex justify-center items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:from-brand group-hover:to-[#003B24] group-hover:text-white transition-all duration-500 shadow-sm border border-brand/10 group-hover:border-transparent">
                <Tree weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="font-semibold text-gray-800 text-base md:text-lg leading-relaxed">
                Entorno natural privilegiado, inmerso en montañas y bosques nativos para explorar con seguridad.
              </h4>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-500 border border-gray-100/80 p-8 md:p-10 flex flex-col items-center text-center relative z-10" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-brand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-br-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="mb-6 flex justify-center items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:from-brand group-hover:to-[#003B24] group-hover:text-white transition-all duration-500 shadow-sm border border-brand/10 group-hover:border-transparent">
                <PuzzlePiece weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="font-semibold text-gray-800 text-base md:text-lg leading-relaxed">
                Metodología lúdica y vivencial, que invita a aprender puramente desde la experiencia y reﬂexión.
              </h4>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(0,83,51,0.12)] hover:-translate-y-2 transition-all duration-500 border border-gray-100/80 p-8 md:p-10 flex flex-col items-center text-center relative z-10" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/40 to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand/5 to-transparent rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="mb-6 flex justify-center items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:from-brand group-hover:to-[#003B24] group-hover:text-white transition-all duration-500 shadow-sm border border-brand/10 group-hover:border-transparent">
                <UsersThree weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="font-semibold text-gray-800 text-base md:text-lg leading-relaxed">
                Fomentamos el trabajo en equipo, la curiosidad, el pensamiento crítico y la conexión.
              </h4>
            </div>

            {/* Pilar 4 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-500 border border-gray-100/80 p-8 md:p-10 flex flex-col items-center text-center relative z-10" data-aos="fade-up" data-aos-delay="400">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 to-brand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-br-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="mb-6 flex justify-center items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:from-brand group-hover:to-[#003B24] group-hover:text-white transition-all duration-500 shadow-sm border border-brand/10 group-hover:border-transparent">
                <Plant weight="thin" className="w-10 h-10" />
              </div>
              <h4 className="font-semibold text-gray-800 text-base md:text-lg leading-relaxed">
                Firme compromiso con la sustentabilidad activa, el compostaje y el cuidado del ambiente.
              </h4>
            </div>
          </div>
        </div>
      </section>
  

      {/* CATÁLOGO DE ACTIVIDADES PREMIUM */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
        {/* Fondo decorativo sutil */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/3 skew-x-12 -z-10 translate-x-32 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl serif-title brand-green mb-6">
              Catálogo de Actividades
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Diseñamos cada jornada a la medida de tu grupo, porque sabemos que ninguna escuela es igual. Combinamos aventura, tierra y expresión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
            
            {/* Tarjeta 1: Agroecología */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(0,83,51,0.12)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-gold opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute top-20 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              <div className="p-10 relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 shadow-sm border border-brand/10">
                  <Leaf weight="thin" className="w-10 h-10" />
                </div>
                
                <h3 className="serif-title text-2xl brand-green mb-6 border-b border-gray-100 pb-4">
                  Talleres Agroecológicos
                </h3>
                
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Huerta y Cultivos Orgánicos</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Cocina Saludable y Regenerativa</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Compostaje y Reciclaje</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Botiquín Natural</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 2: Aventura */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(212,175,55,0.15)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-brand opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute top-20 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              <div className="p-10 relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 shadow-sm border border-brand/10">
                  <Mountains weight="thin" className="w-10 h-10" />
                </div>
                
                <h3 className="serif-title text-2xl text-gold mb-6 border-b border-gray-100 pb-4">
                  Aventura y Naturaleza
                </h3>
                
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Exploración de Arroyos y Ríos</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Senderismo y Aventura de Montaña</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Reconocimiento de Plantas y mundo mineral</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Avistaje de Aves</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Conservación de Biodiversidad</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 3: Arte */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(0,83,51,0.12)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-gold opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute top-20 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              <div className="p-10 relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-brand/10 to-brand/5 text-brand group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 shadow-sm border border-brand/10">
                  <Palette weight="thin" className="w-10 h-10" />
                </div>
                
                <h3 className="serif-title text-2xl brand-green mb-6 border-b border-gray-100 pb-4">
                  Arte y Expresión
                </h3>
                
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Arte Natural y Reciclaje</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Artes Escénicas y Teatro</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Música y Expresión Corporal</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check weight="thin" className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">Fogones Culturales</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <AulaVerdeMagico />

      {/* ====== TESTIMONIOS Y LOGOS ====== */}
      <AulaVerdeTestimonio />

      {/* ====== LEAD MAGNET (DESCARGA DE PDF) ====== */}
      <AulaVerdeLeadMagnet />

      {/* ====== PRECIOS ====== */}
      <AulaVerdePrecios />

      {/* ====== PREGUNTAS FRECUENTES ====== */}
      <AulaVerdeFAQ />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
            ¿Listos para planificar el próximo viaje de tu escuela?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            Sabemos que organizar una salida grupal requiere mucho esfuerzo. En Aula Verde te acompañamos en cada paso: desde la adaptación de la propuesta pedagógica hasta la logística y seguridad. Escribinos para despejar dudas y armar un presupuesto a la medida de tu grupo.
          </p>
          <a href="https://wa.me/5493516765820?text=Hola!%20Vengo%20de%20Aula%20Verde%20y%20quiero%20solicitar%20presupuesto%20para%20mi%20escuela." className="btn-gold bg-brand-green text-white hover:bg-white hover:text-brand inline-block py-3 px-8 rounded-full">
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
            <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-gold/50 overflow-hidden shadow-2xl">
              <iframe
                width="360"
                height="640"
                src="https://www.youtube.com/embed/_p6dA0v2Fcs"
                title="Momentos que fortalecen al grupo"
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
        <div className="bg-brand/5 text-brand/60 text-center text-xs py-3 border-t border-brand/10">
          Growth systems & digital experience by Catálisis
        </div>
        
        <WhatsAppButton />

      </div>
      </>
    </LanguageProvider>
  );
};

export default AulaVerde;
