import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home, Droplet, Wifi, Coffee, Users, User, Star, Sun, Moon } from 'lucide-react';

// SVG Icons
const IconAdultos: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Adultos en Red.svg')} className={className} alt="Adultos en Red" />
);

const IconNiños: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Infancia en Libertad.svg')} className={className} alt="Infancia en Libertad" />
);

const IconGastronomia: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Gastronomía de Montaña.svg')} className={className} alt="Gastronomía de Montaña" />
);

const IconTransformacion: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Experiencias Transformadoras.svg')} className={className} alt="Experiencias Transformadoras" />
);

const IconAlojamiento: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Alojamiento.svg')} className={className} alt="Alojamiento" />
);

const IconDomo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Alojamiento.svg')} className={className} alt="Domo" />
);

const IconAgua: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Agua.svg')} className={className} alt="Agua" />
);

const IconRed: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Energía y Conexión.svg')} className={className} alt="Energía y Conexión" />
);

const IconSol: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <img src={encodeURI('/uploads/Sábado (Sol).svg')} className={className} alt="Sol" />
);

const IconLuna: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <img src={encodeURI('/uploads/Domingo (Luna).svg')} className={className} alt="Luna" />
);

const IconEstrella: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/farewell.svg')} className={className} alt="Farewell" />
);

const IconCheck: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const IconCalendar: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconLocation: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22S20 16 20 10C20 5.58 16.42 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

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

        .video-aspect { aspect-ratio: 9 / 16; }
        
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
      <section className="relative w-full px-4 md:px-6 bg-white flex items-center justify-center pt-16 md:pt-20 lg:pt-24 pb-8">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-8 items-center justify-center mx-auto max-w-6xl">
            {/* Left Content - centered (text first on mobile) */}
            <div className="flex flex-col justify-center text-center order-1 lg:order-1 lg:relative lg:z-20 lg:transform lg:-translate-y-2 lg:text-center">
              {/* Subtitle */}
              <p className="text-xs uppercase tracking-widest font-bold text-brand-green mb-2">
                Mágico Ensueño Presenta
              </p>

              {/* Main Title with gold accent */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-green leading-tight mb-3 md:mb-4 tracking-wide" style={{ fontFamily: "'Marcellus', serif" }}>
                <span className="brand-gold">Familion</span><span className="text-brand-green">: Una experiencia para compartir con la Tribu en la montaña!</span>
              </h1>

              {/* Tagline with subtle gold highlights */}
              <p className="text-sm md:text-base text-gray-700 max-w-xl mx-auto mb-4 leading-relaxed">
                "Cambiamos pantallas por naturaleza, velocidad por presencia y soledad por <span className="brand-gold">tribu</span>.  Una invitación a despedir el verano con toda la Familia."
              </p>

              {/* Meta Info - Compact with icons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-5 md:mb-6">
                <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 font-semibold">
                  <IconCalendar className="w-4 h-4 text-brand-green" />
                  <span>Finde Largo del 21 al 24 de Marzo</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm md:text-base text-gray-700 font-semibold">
                  <IconLocation className="w-4 h-4 text-brand-green" />
                  <span>Los Gigantes, Córdoba</span>
                </div>
                <div className="sm:hidden flex items-center gap-2 text-sm md:text-base text-gray-700 font-semibold">
                  <IconLocation className="w-4 h-4 text-brand-green" />
                  <span>Los Gigantes</span>
                </div>
              </div>

              {/* CTA - stack in mobile */}
              <div className="hero-cta flex flex-col items-center justify-center text-center sm:flex-row gap-3 flex-nowrap max-w-4xl mx-auto">
                <a href="#precios" className="btn-gold inline-flex items-center justify-center w-full sm:w-auto">
                  Quiero sumarme a la tribu
                </a>
                <a href="#comodidad" className="btn-glass inline-flex items-center justify-center w-full sm:w-auto">
                  Ver experiencia completa
                </a>
              </div>
            </div>

            {/* Right Image - appears AFTER text on mobile */}
            <div className="flex items-center justify-center order-2 lg:order-2">
              <div className="relative w-full sm:max-w-[420px] lg:max-w-[720px]">
                <img
                  src="/uploads/portada familion.webp"
                  alt="Familion - Los Gigantes"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover lg:h-[520px]"
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-green/5 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== VIDEO INVITACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Text */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl serif-title brand-green mb-6">Una Invitación de la Edición Anterior</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Sabemos que compartir en familia en la ciudad es un gran desafío y que las vacaciones a veces se sienten como 'más trabajo'. En Familion, Co-creamos una experiencia en comunidad para disfrutar una experiencia inolvidable.
              </p>
              <p className="text-brand-green text-xl md:text-2xl serif-title font-bold mt-6">
                Porque Co-crear en tribu es la que va!
              </p>
            </div>

            {/* Right Video */}
            <div className="flex justify-center">
              <iframe width="360" height="640" src="https://www.youtube.com/embed/Sqc7zbR-sPQ" title="Familion - Una invitación" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen className="rounded-2xl shadow-lg w-full max-w-sm"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ALIVIO DEL CONFORT ====== */}
      <section id="comodidad" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-12 md:mb-16">
            Nuestro Eco-centro
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Alojamiento */}
            <div className="card-hover p-6 md:p-8 border border-brand-green/10 rounded-2xl bg-slate-50">
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
            <div className="card-hover p-6 md:p-8 border border-brand-green/10 rounded-2xl bg-slate-50">
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
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-12 md:mb-16">
            Los 4 Pilares de la Experiencia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pilar 1 */}
            <div className="card-hover p-6 md:p-8 text-center rounded-2xl bg-white shadow-sm">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconAdultos className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Adultos en Red</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Espacios de círculo y conexión para soltar la carga de la crianza solitaria.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="card-hover p-6 md:p-8 text-center rounded-2xl bg-white shadow-sm">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconNiños className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Infancia en Libertad</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Exploración de arroyos, talleres en la naturaleza y aventura sin pantallas.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="card-hover p-6 md:p-8 text-center rounded-2xl bg-white shadow-sm">
              <div className="mb-4 text-brand-green flex justify-center">
                <IconGastronomia className="w-12 h-12" />
              </div>
              <h4 className="serif-title text-lg brand-green mb-3">Gastronomía de Montaña</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                11 comidas caseras, abundantes y nutritivas incluidas.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="card-hover p-6 md:p-8 text-center rounded-2xl bg-white shadow-sm">
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
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-12 md:mb-16">
            Ritmo Serrano
          </h2>

          <div className="space-y-6 md:space-y-8">
            {/* Estrella / Sábado */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconEstrella className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Sábado</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Bienvenida · Almuerzo · Círculos de juego · Atardecer Mágico & Fuego · Cena Grupal.
              </p>
            </div>

            {/* Sol / Domingo */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconSol className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Domingo</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Yoga & Meditación (Adultos) · Juego (Niños) · Plantación de Tabaquillos en familia · Cocina Familiar · Meditación en Movimiento.
              </p>
            </div>

            {/* Luna / Lunes */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconLuna className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Lunes</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Ceremonia de Temazcal · Taller de Arte Natural y Cocina · Almuerzo · Tarde en el Río.
              </p>
            </div>

            {/* Martes adicional */}
            <div className="schedule-item p-6 md:p-8 bg-slate-50 rounded-r-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-brand-gold">
                  <IconEstrella className="w-10 h-10" />
                </div>
                <p className="font-bold uppercase tracking-widest text-xs md:text-sm">Martes</p>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Dinámicas y actividades de Cierre - Almuerzo - Despegue
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
          <h2 className="text-3xl md:text-5xl serif-title brand-green text-center mb-12 md:mb-16">
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
            <h3 className="text-2xl md:text-3xl serif-title brand-green text-center mb-8">Testimonios en Movimiento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
              <div className="flex justify-center">
                <iframe width="360" height="640" src="https://www.youtube.com/embed/IfMqF4oW_fM" title="Testimonios Familion - Parte 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen className="rounded-2xl shadow-lg max-w-sm w-full"></iframe>
              </div>
              <div className="flex justify-center">
                <iframe width="360" height="640" src="https://www.youtube.com/embed/wVNmRkIj0-o" title="Testimonios Familion - Parte 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen className="rounded-2xl shadow-lg max-w-sm w-full"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-brand-green text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10">
            <h2 className="text-3xl md:text-5xl serif-title mb-8 text-center">Mágico Ensueño</h2>
            
              <div className="max-w-3xl mx-auto mb-10">
              <p className="text-white/95 text-base md:text-lg leading-relaxed">
                En el corazón de <span className="text-brand-gold font-bold">Los Gigantes, Córdoba</span>, a solo 1h de Tanti y 1:30h de Villa Carlos Paz. Un lugar donde la naturaleza marca el ritmo, la montaña habla en silencio, y una comunidad que acompaña se encuentran en perfecta armonía. Acceso para todo tipo de vehiculos hasta la puerta del lugar .
              </p>
            </div>
            
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <img src="/uploads/469280911_444096748740233_2818770490495002077_n.webp" alt="Infraestructura de Mágico Ensueño" className="w-full rounded-2xl shadow-lg object-cover h-64" />
              <img src="/uploads/refu.webp" alt="Refugio - Domos" className="w-full rounded-2xl shadow-lg object-cover h-64" />
            </div>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
                <h4 className="text-brand-gold font-bold text-lg mb-4">Cómo Este Lugar Mejora Tu Experiencia</h4>
                <ul className="text-white/90 text-sm leading-relaxed space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span><strong>Regeneración activa:</strong> +10.000 árboles plantados transforman el aire que respiras</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span><strong>Comunidad:</strong> 20+ años de coherencia manifestando el próposito</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-gold font-bold mt-1">✓</span>
                    <span><strong>Energía solar:</strong> 100% sustentable, sin huella de carbono</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
                <h4 className="text-brand-gold font-bold text-lg mb-4">Tu Inversión Genera Regeneración</h4>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  El 10% de tu inversión se destina directamente a reforestar los tabaquillos y restaurar las sierras de Los Gigantes.
                </p>
                <p className="text-white/90 italic text-sm leading-relaxed">
                  Cada familia que nos elige es una semilla de cambio en la montaña.
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center">
              <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
                Mágico Ensueño es más que un destino; aquí <span className="text-brand-gold font-bold">la ubicación en la naturaleza regenera</span> mientras tu familia se reconecta, el cuerpo se sana y el alma vuelve a respirar en armonía con el ritmo de la montaña.
              </p>
            </div>
          </div>
          {/* Mapa del Lugar */}
          <div className="mt-8 max-w-4xl mx-auto text-center">
            <div className="relative group cursor-zoom-in" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
              <img src="/uploads/mapa_magico.webp" alt="Mapa de Familion - Los Gigantes" className="w-full rounded-2xl shadow-lg" />
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href="/uploads/mapa_magico.webp" download="Mapa_Familion_Los_Gigantes.webp" className="btn-glass inline-block w-full sm:w-auto text-center">Descargar Mapa</a>
                <a href="https://wa.me/5493516765820?text=Hola!%20Vengo%20de%20Familion%20y%20quiero%20consultar%20la%20ubicaci%C3%B3n%20exacta%20y%20c%C3%B3mo%20llegar." className="btn-gold inline-block w-full sm:w-auto text-center">Consultar ubicación</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRECIOS ====== */}
      <section id="precios" className="py-16 md:py-24 px-6 bg-brand-green text-white relative overflow-hidden">

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-12">
            COMBO FAMILIAR
          </h2>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                <h3 className="text-lg font-bold text-white mb-2">Camping</h3>
                <div className="brand-gold text-3xl md:text-4xl serif-title">$350.000</div>
                <p className="text-white/85 text-sm mt-2">Zona de camping — todo incluido para la familia.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                <h3 className="text-lg font-bold text-white mb-2">Eco-Refugio (hab. compartidas)</h3>
                <div className="brand-gold text-3xl md:text-4xl serif-title">$550.000</div>
                <p className="text-white/85 text-sm mt-2">Habitaciones compartidas con ropa blanca y toallas incluidas.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                <h3 className="text-lg font-bold text-white mb-2">Domos Compartidos</h3>
                <div className="brand-gold text-3xl md:text-4xl serif-title">$650.000</div>
                <p className="text-white/85 text-sm mt-2">Domos geodésicos compartidos — experiencia inmersiva.</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 mb-8 text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Incluye:</h4>
              <ul className="space-y-3 text-white/85 text-sm md:text-base">
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold flex-shrink-0">
                    <IconCheck className="w-5 h-5" />
                  </span> Alojamiento en habitaciones incluyen ropa blanca, toallones y toallas
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold flex-shrink-0">
                    <IconCheck className="w-5 h-5" />
                  </span> 11 comidas caseras, abundantes y nutritivas incluidas
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold flex-shrink-0">
                    <IconCheck className="w-5 h-5" />
                  </span> Agua caliente 24 hs y Bio-cósmetica en todas las duchas.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold flex-shrink-0">
                    <IconCheck className="w-5 h-5" />
                  </span> Todas las actividades y talleres guiados
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold flex-shrink-0">
                    <IconCheck className="w-5 h-5" />
                  </span> Seguros y guías de montaña
                </li>
              </ul>
            </div>

            <a href="https://wa.me/5493516765820?text=Hola!%20Vengo%20de%20Familion%20y%20quiero%20reservar%20mi%20lugar%20en%20Familion." className="btn-gold w-full md:w-auto block md:inline-block mb-6">
              Reservar Nuestro Lugar
            </a>

            <p className="text-white/70 text-xs md:text-sm leading-relaxed italic">
              El 10% de tu inversión se destina a reforestar tabaquillos y restaurar nuestras sierras.
            </p>
          </div>
        </div>
      </section>

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl serif-title brand-green mb-6">
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
          <h2 className="text-2xl md:text-3xl serif-title brand-green mb-8">La Magia de Compartir la Mesa</h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">Así es como celebramos cada comida en Familion — con gratitud, conexión y el amor que se respira en cada bocado.</p>
          <div className="flex justify-center">
            <iframe width="360" height="640" src="https://www.youtube.com/embed/QqGrzFloHsE" title="Familion - Agradecimiento por la comida" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen className="rounded-2xl shadow-lg max-w-sm w-full"></iframe>
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
