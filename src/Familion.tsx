import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home, Droplet, Wifi, Coffee, Users, User, Star, Sun, Moon } from 'lucide-react';
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
  IconCheck,
  IconCalendar,
  IconLocation,
} from './icons.tsx';

import FamilionHero from './components/FamilionHero.tsx';
import FamilionMagico from './components/FamilionMagico.tsx';
import FamilionPrecios from './components/FamilionPrecios.tsx';



















const Familion: React.FC = () => {
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
      <FamilionHero />

      {/* ====== VIDEO INVITACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">Una Invitación de la Edición Anterior</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Sabemos que compartir en familia en la ciudad es un gran desafío y que las vacaciones a veces se sienten como 'más trabajo'. En Familion, Co-creamos una experiencia en comunidad para disfrutar una experiencia inolvidable.
              </p>
              <p className="text-brand-green text-xl md:text-2xl serif-title font-bold mt-6">
                Porque Co-crear en tribu es la que va!
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

      {/* ====== ALIVIO DEL CONFORT ====== */}
      <section id="comodidad" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-8 md:mb-10">
            Nuestro Eco-centro
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Alojamiento */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-4 text-brand-green">
                <IconAlojamiento className="w-12 h-12" />
              </div>
              <h3 className="serif-title text-xl brand-green mb-3">Alojamiento</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Podes elegir descansar en camping, Domos geodésicos o en el Eco-Refugio. El formato es de alojamiento compartido, diseñado para facilitar la red familiar, manteniendo siempre la limpieza y el orden impecables.
              </p>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">No somos un hotel tradicional; Somos un espacio sustentable diseñado para compartir el encuentro.</div>
            </div>

            {/* Domo Privado: tarjeta eliminada según indicación */}

            {/* Bienestar: tarjeta eliminada según indicación */}

            {/* Conexión */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green">
                <IconRed className="w-12 h-12" />
              </div>
              <h3 className="serif-title text-xl brand-green mb-3">Energía y Conexión</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Funcionamos 100% con energía solar y contamos con Wi-Fi Starlink para emergencias o trabajo puntual, aunque nuestra recomendación es el silencio digital.
              </p>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Energía solar · Wi‑Fi para emergencias</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LOS 4 PILARES ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-8 md:mb-10">
            Los 4 Pilares de la Experiencia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilar 1 */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconAdultos className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Adultos en Red</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Espacios de círculo y conexión para soltar la carga de la crianza solitaria.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconNiños className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Infancia en Libertad</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Exploración de arroyos, talleres en la naturaleza y aventura sin pantallas.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconGastronomia className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Gastronomía de Montaña</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                9 comidas caseras, abundantes y nutritivas incluidas.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconTransformacion className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Experiencias Transformadoras</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yoga al amanecer, Temazcal y rituales de fuego bajo las estrellas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CRONOGRAMA ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-8 md:mb-10">
            Ritmo Serrano
          </h2>

          <div className="space-y-6 md:space-y-8">
            {/* Estrella / Viernes */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconEstrella className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Viernes 1</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Bienvenida · Almuerzo · Círculos de juego · Atardecer Mágico & Fuego · Cena Grupal.
              </p>
            </div>

            {/* Sol / Sábado */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconSol className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Sábado 2</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Yoga & Meditación (Adultos) · Juego (Niños) · Plantación de Tabaquillos en familia · Cocina Familiar · Ceremonia de Temazcal.
              </p>
            </div>

            {/* Luna / Domingo */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconLuna className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Domingo 3</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Taller de Arte Natural y Cocina · Dinámicas y actividades de Cierre · Almuerzo · Despegue.
              </p>
            </div>
          </div>

          {/* mensaje final comunitario */}
          <div className="mt-8 p-6 md:p-8 bg-slate-50 rounded-2xl">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              La experiencia es comunitaria y colaborativa, la Co-creamos entre todas y todos. La intención es que el compartir sea muy disfrutable y organico en todo momento por lo cual todas las actividades son flexibles y sujetas al sentir de toda la tribu en cada momento.
            </p>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIOS ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-8 md:mb-10">
            Voces que Inspiran
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Testimonio 1 */}
            <div className="p-8 md:p-10 bg-white rounded-2xl card-hover border border-brand-green/10">
              <div className="testimonial-quote mb-6">
                <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                  "¡Es una vivencia que se graba en el alma! El silencio majestuoso nos envolvió como un abrazo."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src="/uploads/tefi y familia.webp" alt="Tefi y familia" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-bold text-brand-green text-sm">Tefi y familia</p>
                  <p className="text-xs text-gray-400">Edición anterior</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="p-8 md:p-10 bg-white rounded-2xl card-hover border border-brand-green/10">
              <div className="testimonial-quote mb-6">
                <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                  "Adultos disfrutando a pleno, aire puro y atención a los chicos con buena onda. La comida, abundante y deliciosa."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src="/uploads/portada familion.webp" alt="Jesica, Pablo y familia" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-bold text-brand-green text-sm">Jesica, Pablo y familia</p>
                  <p className="text-xs text-gray-400">Edición anterior</p>
                </div>
              </div>
            </div>
          </div>

          {/* VIDEOS DE TESTIMONIOS */}
          <div className="mt-16 md:mt-24">
            <h3 className="text-2xl md:text-3xl serif-title brand-green text-center mb-8 md:mb-10">Testimonios en Movimiento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
              <div className="flex justify-center">
                <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-brand-gold/50 overflow-hidden shadow-2xl">
                  <iframe
                    width="360"
                    height="640"
                    src="https://www.youtube.com/embed/IfMqF4oW_fM"
                    title="Testimonios Familion - Parte 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                    className="w-full h-full rounded-3xl"
                  ></iframe>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-brand-gold/50 overflow-hidden shadow-2xl">
                  <iframe
                    width="360"
                    height="640"
                    src="https://www.youtube.com/embed/wVNmRkIj0-o"
                    title="Testimonios Familion - Parte 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                    className="w-full h-full rounded-3xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <FamilionMagico />

      {/* ====== PRECIOS ====== */}
      <FamilionPrecios />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
            ¿Y si este finde se convierte en uno inolvidable?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
            Familion es más que una experiencia. Es la pausa que tu familia necesita, el refugio que tu alma busca, y la tribu que tu corazón anhela.
          </p>
          <a href="https://wa.me/5493516765820?text=Hola!%20Vengo%20de%20Familion%20y%20quiero%20consultar%20la%20experiencia." className="btn-gold inline-block">
            Hablar con un Facilitador
          </a>
        </div>
      </section>

      {/* ====== VIDEO DESPEDIDA ====== */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl serif-title brand-green mb-8 md:mb-10">La Magia de Compartir la Mesa</h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">Así es como celebramos cada comida en Familion — con gratitud, conexión y el amor que se respira en cada bocado.</p>
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

export default Familion;
