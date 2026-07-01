import React, { useState, useEffect } from 'react';
import {
  Flame, Snowflake, Users, Heart, Star, Compass, ChevronDown, ChevronLeft, ChevronRight, Instagram,
  Mountain, Briefcase, Network, Home, Wifi, Droplet, Sparkles,
  Footprints, PawPrint, TrendingDown, CalendarDays, Utensils,
  type LucideIcon,
} from 'lucide-react';
import { img } from './lib/img';
import { WA_MAGICO } from './data/config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const WA_INFO    = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('¡Hola! Me interesa el Winter Camp - Vacaciones de Invierno en Pueblo Mágico. ¿Me pueden dar más info?')}`;
const WA_RESERVA = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('¡Hola! Quiero reservar mi lugar para el Winter Camp en Pueblo Mágico. ¿Cómo procedo?')}`;

const C = {
  green: '#005333',
  gold:  '#D4AF37',
  fire:  '#AA3E11',
  ice:   '#2E6E8E',
  night: '#EBF4FA',
  cream: '#F5F9FF',
  dark:  '#1A2B3C',
  muted: '#4A6070',
  faint: '#6B8090',
};

// ─── Precios ────────────────────────────────────────────────────────────────────
type PriceTier = { noches: string; precio: string; porNoche: string; cuotas: string; ahorro?: string };
const PRECIOS: PriceTier[] = [
  { noches: '1 noche',  precio: '$90.000',  porNoche: '$90.000 por noche', cuotas: '3 cuotas sin interés de $30.000' },
  { noches: '2 noches', precio: '$160.000', porNoche: '$80.000 por noche', cuotas: '3 cuotas sin interés de $54.000', ahorro: 'Ahorrás $10.000 por noche' },
  { noches: '3 noches', precio: '$190.000', porNoche: '$63.000 por noche', cuotas: '3 cuotas sin interés de $64.000', ahorro: 'Ahorrás $27.000 por noche' },
];

// ─── Equipo ─────────────────────────────────────────────────────────────────────
type TeamMember = { photo: string; nombre: string; rol: string; desc: string; instagram?: string };

const TEAM: TeamMember[] = [
  {
    photo: '/uploads/Diego_perfil.png',
    nombre: 'Diego Epelman Hodara',
    rol: 'Host principal del espacio',
    desc: 'Host principal de Pueblo Mágico. Dinámicas, círculos y fogones — sostén energético del Winter Camp.',
    instagram: 'https://www.instagram.com/diegoepel/',
  },
  {
    photo: '/uploads/china.jpeg',
    nombre: 'China Dericia',
    rol: 'Yoga, canto & consciencia corporal',
    desc: 'Movimiento consciente para habitar el cuerpo. Guía yoga, canto y meditaciones durante la estadía.',
    instagram: 'https://www.instagram.com/bambu.alquimia.terapeutica/',
  },
  {
    photo: '/uploads/tomas-bergallo.jpg',
    nombre: 'Tomás Bergallo',
    rol: 'Consciencia corporal & masajes',
    desc: 'Creador de espacios de bienestar. Acompaña procesos de relajación y reconexión a través del contacto, la risa y el abrazo.',
    instagram: 'https://www.instagram.com/tomas.bergallo/',
  },
  {
    photo: '/uploads/luz-candela.jpg',
    nombre: 'Luz Candela',
    rol: 'Host de emprendedores/as',
    desc: 'Creadora de Mujeres Amatistas. Yoga, meditación y pranayama — movimiento consciente para habitar el cuerpo desde adentro.',
    instagram: 'https://www.instagram.com/mujeramatistaa/',
  },
  {
    photo: '/uploads/santiago-alzogaray.png',
    nombre: 'Santiago Alzogaray',
    rol: 'Ceremonia de Temazcal',
    desc: 'Conducción del ritual de purificación, uno de los momentos centrales del Winter Camp.',
  },
  {
    photo: '/uploads/tomas-fossatti.jpg',
    nombre: 'Tomás Fossatti',
    rol: 'Host de emprendedores/as',
    desc: 'Ingeniero, emprendedor y speaker de TEDx. Construye proyectos donde la tecnología y el propósito se encuentran.',
    instagram: 'https://www.instagram.com/tomasfossatti_/',
  },
  {
    photo: '/uploads/isvara-rojas.jpg',
    nombre: 'Isvara Rojas Romero',
    rol: 'Host de emprendedores/as',
    desc: 'Estratega de Innovación y Growth Engineer. Une el mundo del bienestar con la tecnología.',
    instagram: 'https://www.instagram.com/isvara_strategist/',
  },
  {
    photo: '/uploads/Walter_E._Cejas.jpg',
    nombre: 'Walter Eugenio Cejas',
    rol: 'Biólogo · Investigador · Vida Silvestre',
    desc: 'Puente entre el conocimiento científico y la experiencia directa de la Sierra de Achala. Guía avistaje de aves, flora y fauna en la montaña.',
  },
  {
    photo: '/uploads/nicole-rosignoli.webp',
    nombre: 'Nicole Rosignoli Miranda',
    rol: 'Psicología · Gestalt · Salud Cíclica',
    desc: 'Licenciada en Psicología (UNC). Acompaña desde el enfoque gestáltico y la salud cíclica, integrando plantas medicinales, movimiento corporal y círculos de mujeres.',
    instagram: 'https://www.instagram.com/thematriiz/',
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_ICONS: LucideIcon[] = [Snowflake, Star, Users, Heart, Flame, Compass, Home, Network];

const FAQS = [
  {
    q: '¿Puedo elegir cualquier día para llegar?',
    a: 'Sí, es estadía libre dentro del 1 al 31 de julio: llegás y te vas el día que quieras. Durante tu estadía vas a encontrar un cronograma de actividades sucediendo, al que te podés sumar cuando quieras.',
  },
  {
    q: '¿Qué incluye la estadía?',
    a: 'Pensión completa con 3 comidas abundantes por día, ropa blanca y toallón individual, kit de invierno, agua caliente las 24 hs, WIFI satelital y espacios calefaccionados con fuego prendido.',
  },
  {
    q: '¿El trekking con guías o las cabalgatas están incluidos?',
    a: 'No, son actividades extra a contratar aparte. Consultanos por WhatsApp con las fechas de tu estadía para coordinar disponibilidad.',
  },
  {
    q: '¿Es para familias o también para adultos solos?',
    a: 'Para ambos. Diseñamos el Winter Camp para que grandes y chicos puedan habitar juntos la montaña, y también es un gran espacio para emprendedores y equipos que buscan desconectar y conectar en comunidad.',
  },
  {
    q: '¿Hay actividades para chicos?',
    a: 'Sí. Hay juegos y espacios pensados especialmente para infancias, además de las dinámicas compartidas en familia.',
  },
  {
    q: '¿Tengo que participar de todas las actividades?',
    a: 'No. El cronograma es para sumarte cuando quieras — vos elegís tu ritmo y tus dinámicas, sin exigencias.',
  },
  {
    q: '¿Hay descuentos para grupos?',
    a: 'Sí, consultanos por WhatsApp por promociones y descuentos para grupos y estadías de varias noches.',
  },
  {
    q: '¿Cómo llego al lugar?',
    a: 'Pueblo Mágico queda en Los Gigantes, Córdoba — a 90 km de Córdoba Capital. Acceso para todo tipo de vehículos. Escribinos y te mandamos el mapa.',
  },
];

// ─── Carrusel de fotos de invierno ─────────────────────────────────────────────
const CAROUSEL = [
  { src: '/uploads/Invierno/DJI_20250629135712_0164_D_CHAPA2025.webp', caption: 'Vista aérea del complejo nevado' },
  { src: '/uploads/yoga_salon.webp',                                    caption: 'El salón · Yoga, movimiento y dinámicas' },
  { src: '/uploads/Invierno/20250629_132707.webp',                       caption: 'Refugio de piedra bajo la nieve' },
  { src: '/uploads/coworking.webp',                                     caption: 'Espacio de coworking · WiFi Starlink' },
  { src: '/uploads/Invierno/20250629_135046.webp',                       caption: 'Ventanal con vistas a la sierra' },
  { src: '/uploads/habitaciones.webp',                                  caption: 'Habitaciones · Ropa blanca y toallón incluidos' },
  { src: '/uploads/Invierno/20250629_152354.webp',                       caption: 'Camino rural hacia el horizonte helado' },
  { src: '/uploads/domos.webp',                                         caption: 'Domos geodésicos · Glamping de montaña' },
  { src: '/uploads/Invierno/20250629_164200.webp',                       caption: 'Pino solitario bajo la cencellada' },
  { src: '/uploads/mesadas.webp',                                       caption: 'La cocina · Pensión completa con 3 comidas' },
  { src: '/uploads/Invierno/20250628_181834.webp',                       caption: 'Ocaso tras la pirca de piedra' },
  { src: '/uploads/botica.webp',                                        caption: 'La botica · Plantas y remedios de la sierra' },
  { src: '/uploads/Invierno/DJI_20250629140041_0171_D_CHAPA2025.webp',  caption: 'Los tres domos geodésicos nevados' },
  { src: '/uploads/Invierno/20250627_222558.webp',                       caption: 'Lluvia de estrellas en la montaña' },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const WinterCamp: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(i => (i + 1) % CAROUSEL.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.title = 'Winter Camp · Vacaciones de Invierno en Pueblo Mágico · Mágico Ensueño';
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: C.cream, color: C.dark }} className="overflow-x-hidden">
      <Header />

      {/* ── HERO ── */}
      <section
        className="relative h-[100svh] min-h-[600px] md:h-[100vh] w-full flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/uploads/Invierno/DJI_20250629135712_0164_D_CHAPA2025.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Video fondo desktop (16:9) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/ktzVcAs-74c?autoplay=1&mute=1&loop=1&playlist=ktzVcAs-74c&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            title="Winter Camp"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              width: 'max(100vw, 177.78vh)',
              height: 'max(56.25vw, 100vh)',
            }}
          />
        </div>
        {/* Video fondo mobile (Shorts 9:16) */}
        <div className="block md:hidden absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/QPNxc5Nh8es?autoplay=1&mute=1&loop=1&playlist=QPNxc5Nh8es&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            title="Winter Camp Mobile"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              width: 'max(100vw, 56.25vh)',
              height: 'max(177.78vw, 100vh)',
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(8,16,28,0.95) 0%, rgba(8,16,28,0.6) 45%, rgba(8,16,28,0.12) 100%)' }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 md:pt-20 pb-10 md:pb-0 flex flex-col md:items-center md:text-center">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center md:justify-center gap-2 sm:gap-3 mb-4">
            <span className="inline-block max-w-full px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.4em] uppercase font-bold border border-white/20 text-white/70 whitespace-nowrap">
              1 al 31 de julio 2026
            </span>
            <span
              className="inline-block max-w-full px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase font-bold whitespace-nowrap"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#F4C27A', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              Estadía libre
            </span>
            <span
              className="inline-block max-w-full px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase font-bold whitespace-nowrap"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Familias · Emprendedores · Comunidad
            </span>
          </div>

          <p className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">Vacaciones de Invierno</p>
          <h1 className="text-5xl md:text-7xl serif-title leading-none mb-4 text-white">
            Winter <span style={{ color: C.gold }}>Camp</span>
          </h1>
          <p className="text-white/65 text-sm md:text-lg leading-relaxed max-w-lg md:max-w-2xl mt-4 mb-6 md:mt-5 md:mb-10">
            Durante todo el mes de julio abrimos nuestro eco-centro en el corazón de la montaña para compartir el invierno en comunidad, con fuego, presencia y conexión. Llegás y te vas cuando quieras, con pensión completa desde $63.000 por noche.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a
              href={WA_RESERVA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm py-4 px-8 inline-block"
            >
              Quiero participar
            </a>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Snowflake size={16} color={C.gold} />
              <span>El frío nos acerca, el fuego nos une</span>
            </div>
          </div>

          <p className="text-white/40 text-xs sm:text-sm mt-6 max-w-md leading-relaxed">
            Para familias en vacaciones y para quienes buscan frenar, reconectar y compartir en comunidad. Sumate al cronograma de actividades cuando quieras, a tu ritmo.
          </p>
        </div>
      </section>

      {/* ── EL LLAMADO ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.night }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex justify-center gap-5 mb-10">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(46,110,142,0.14)' }}>
                <Snowflake size={20} color={C.ice} />
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(170,62,17,0.14)' }}>
                <Flame size={20} color={C.fire} />
              </div>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-5" style={{ color: '#8B6A00' }}>
              El llamado
            </p>
            <blockquote className="text-2xl md:text-4xl serif-title leading-relaxed mb-4" style={{ color: C.dark }}>
              El invierno no es solamente una pausa.<br />
              <span style={{ color: '#8B6A00' }}>Es un portal.</span>
            </blockquote>
            <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto" style={{ color: C.muted }}>
              La naturaleza se aquieta, el frío invita a ir hacia adentro y el fuego vuelve a reunirnos. En Pueblo Mágico creemos que este es un tiempo para bajar un cambio, reconectar con la alegría de estar vivos y recordar lo esencial. Por eso abrimos las puertas de nuestra casa… y de nuestra familia.
            </p>
          </div>

          <div className="rounded-2xl p-7 border text-center max-w-2xl mx-auto" data-reveal data-delay="1" style={{ borderColor: 'rgba(46,110,142,0.18)', backgroundColor: 'rgba(255,255,255,0.6)' }}>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
              Somos <span style={{ color: '#8B6A00' }} className="font-semibold">Diego</span>, <span style={{ color: '#8B6A00' }} className="font-semibold">China</span> y una gran familia que habitamos este espacio con propósito. No solo facilitamos experiencias: co-creamos con quienes van llegando encuentros reales, humanos, auténticos y transformadores.
            </p>
          </div>
        </div>
      </section>

      {/* ── GALERÍA DE INVIERNO ── */}
      <section className="relative overflow-hidden" style={{ height: '72vh', minHeight: '400px', maxHeight: '680px' }}>
        {CAROUSEL.map((photo, i) => (
          <div
            key={photo.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `url('${photo.src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === carouselIdx ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,15,22,0.72) 0%, rgba(8,15,22,0.08) 55%)' }} />

        <button
          onClick={() => setCarouselIdx(i => (i - 1 + CAROUSEL.length) % CAROUSEL.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <button
          onClick={() => setCarouselIdx(i => (i + 1) % CAROUSEL.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
          aria-label="Foto siguiente"
        >
          <ChevronRight size={20} color="white" />
        </button>

        <div className="absolute bottom-6 left-0 right-0 z-10 text-center">
          <p className="text-white/65 text-xs mb-3 tracking-wide">{CAROUSEL[carouselIdx].caption}</p>
          <div className="flex justify-center gap-2">
            {CAROUSEL.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === carouselIdx ? '18px' : '6px',
                  height: '6px',
                  backgroundColor: i === carouselIdx ? C.gold : 'rgba(255,255,255,0.35)',
                }}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── LA EXPERIENCIA ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.fire }}>
              La experiencia
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.dark }}>
              Winter Camp es una invitación a vivir<br />la montaña desde otro lugar
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: C.muted }}>
              No venís solo a alojarte a un lugar lindo… venís a co-crear y ser parte de una experiencia transformadora de verdad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {[
              { Icon: Flame, title: 'Fogones y espacios de encuentro', desc: 'Espacios de encuentro alrededor del fuego, todos los días.' },
              { Icon: Flame, title: 'Ceremonias ancestrales y Temazcal', desc: 'Rituales en la naturaleza: Temazcal y otras ceremonias de purificación y conexión.' },
              { Icon: Mountain, title: 'Caminatas conscientes', desc: 'Recorridos por la montaña, a tu ritmo y con presencia.' },
              { Icon: Heart, title: 'Descanso, introspección y relajación', desc: 'Espacios para frenar, relajarte y mirar hacia adentro.' },
              { Icon: Users, title: 'Actividades en comunidad', desc: 'Círculos de palabra, armonizaciones sonoras y dinámicas compartidas para generar vínculos reales.' },
              { Icon: Star, title: 'Experiencias para todas las edades', desc: 'Yoga, movimiento consciente y juegos para infancias — algo para cada uno.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 border" style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'rgba(0,83,51,0.02)' }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0,83,51,0.08)' }}>
                  <Icon size={18} color={C.green} />
                </div>
                <p className="font-bold text-base mb-2" style={{ color: C.dark }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center serif-title text-xl md:text-2xl mt-14" style={{ color: C.green }} data-reveal data-delay="2">
            El frío no es un límite. <span style={{ color: C.gold }}>Es parte del viaje.</span>
          </p>
        </div>
      </section>

      {/* ── PARA QUIÉN ES ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#EEF5FA' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              ¿Para quién es?
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Para familias en vacaciones.<br />Y para quienes lideran y crean.
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: C.muted }}>
              Para quienes necesitan frenar, reconectar y sienten el llamado de la montaña.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" data-reveal data-delay="1">
            {/* Familias */}
            <div className="rounded-2xl p-8 border" style={{ borderColor: 'rgba(0,83,51,0.15)', backgroundColor: 'rgba(0,83,51,0.03)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,83,51,0.1)' }}>
                  <Home size={18} color={C.green} />
                </div>
                <p className="font-bold text-base" style={{ color: C.green }}>Para familias</p>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                Vacaciones de invierno para que grandes y chicos habiten juntos la montaña, compartan tiempo de calidad y creen recuerdos reales.
              </p>
              <ul className="space-y-2">
                {[
                  'Familias que quieren vivir vacaciones distintas',
                  'Quienes buscan reconectar con sus hijos lejos de pantallas',
                  'Espacios y momentos para la creatividad',
                  'Actividades para compartir en comunidad',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: C.green }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emprendedores / líderes */}
            <div className="rounded-2xl p-8 border" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}>
                  <Briefcase size={18} color="#8B6A00" />
                </div>
                <p className="font-bold text-base" style={{ color: '#7A5C00' }}>Para emprendedores y líderes</p>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                Un espacio para soltar el rol, recargar energía y conectar con otros que también crean y lideran. Las mejores ideas nacen desde la claridad, no desde el agotamiento.
              </p>
              <ul className="space-y-2">
                {[
                  'Emprendedores que buscan reconectar con su propósito',
                  'Networking orgánico junto al fuego, sin formalidad corporativa',
                  'Espacio para pensar, crear y desconectar del ritmo de la ciudad',
                  'Comunidad de personas con caminos y proyectos afines',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: '#8B6A00' }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solo / comunidad */}
            <div className="rounded-2xl p-8 border" style={{ borderColor: 'rgba(46,110,142,0.2)', backgroundColor: 'rgba(46,110,142,0.03)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(46,110,142,0.12)' }}>
                  <Compass size={18} color={C.ice} />
                </div>
                <p className="font-bold text-base" style={{ color: C.ice }}>Para quienes vienen solos</p>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                No necesitás venir con grupo ni con familia. El Winter Camp es una comunidad que se arma en el momento — llegás solo y te vas con vínculos reales.
              </p>
              <ul className="space-y-2">
                {[
                  'Personas que buscan un reset profundo sin compromisos',
                  'Quienes quieren conocer gente con valores afines',
                  'Viajeros internos que necesitan silencio y presencia',
                  'Nómades digitales: naturaleza + conexión + WiFi Starlink',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: C.ice }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-delay="2">
            {['Para quienes necesitan bajar un cambio', 'Para quienes buscan reconectar y disfrutar', 'Para quienes sienten el llamado de la montaña', 'Para quienes quieren compartir en comunidad'].map(tag => (
              <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full border font-medium"
                style={{ borderColor: 'rgba(0,83,51,0.2)', color: C.muted, backgroundColor: 'rgba(0,83,51,0.03)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA INTERMEDIO ── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center" data-reveal>
          <p className="text-base mb-6 font-serif italic" style={{ color: C.muted }}>
            ¿Ya sentís el llamado?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer"
              className="btn-gold text-sm py-3 px-7 inline-block">
              Reservar mi lugar
            </a>
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
              className="inline-block border font-semibold text-sm py-3 px-7 rounded-full transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
              style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
              Tengo preguntas
            </a>
          </div>
        </div>
      </section>

      {/* ── LA COCINA ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
                style={{ backgroundColor: C.fire }}>
                La cocina
              </p>
              <h2 className="text-3xl md:text-4xl serif-title mb-5" style={{ color: C.dark }}>
                La alimentación es parte esencial de la experiencia
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: C.muted }}>
                Comidas caseras, riquísimas y nutritivas, pensadas para acompañar el invierno y sostener el cuerpo calentito en la montaña. Pensión completa con 3 comidas por día.
              </p>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block text-sm font-semibold border rounded-full px-6 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                Consultar por WhatsApp
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
              <img
                src={img('/uploads/469731807_3987061274856806_2943773444767775905_n.jpg', 900)}
                alt="Cocina de Pueblo Mágico"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── RESET VITAL ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Reset Vital
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Tu programa de bienestar incluido
            </h2>
            <p className="text-base max-w-xl mx-auto mb-3" style={{ color: C.muted }}>
              Con tu participación accedés a nuestro programa de bienestar autoguiado para potenciar tu estadía. Una guía para acompañarte con prácticas simples de conexión, movimiento, respiración y presencia.
            </p>
            <p className="text-sm font-medium" style={{ color: C.faint }}>
              A tu ritmo. Sin exigencias. Vos creás tu propia experiencia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-0 max-w-2xl mx-auto" data-reveal data-delay="1">
            {[
              'Yoga y movimiento consciente',
              'Círculos de palabra',
              'Armonizaciones sonoras',
              'Ceremonias (Temazcal y rituales)',
              'Caminatas en la naturaleza',
              'Juegos y espacios para infancias',
              'Meditaciones en movimiento',
            ].map(title => (
              <div key={title} className="flex items-center gap-3 py-3 border-b"
                style={{ borderColor: 'rgba(0,83,51,0.1)' }}>
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.green }} />
                <p className="text-sm" style={{ color: C.dark }}>{title}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-8 mb-4" style={{ color: C.faint }}>
            Durante tu estadía habrá dinámicas sucediendo a las cuales te podés sumar cada vez que sientas.
          </p>
          <p className="text-center text-xs mb-14" style={{ color: C.faint }}>
            Cada propuesta está acompañada por personas reales, con vocación y camino.
          </p>

          {/* Actividades extra a contratar */}
          <div className="rounded-2xl p-8 md:p-10 border" data-reveal data-delay="2" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
            <div className="flex items-center gap-3 mb-3">
              <CalendarDays size={18} color="#8B6A00" />
              <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: '#8B6A00' }}>Actividades extra · a contratar</p>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
              Además del cronograma incluido, podés sumar actividades guiadas con costo aparte, según fechas y disponibilidad.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { Icon: Footprints, title: 'Trekking con guías' },
                { Icon: PawPrint, title: 'Cabalgatas' },
                { Icon: Heart, title: 'Masajes' },
                { Icon: Compass, title: 'Sesiones 1 a 1 y mentorías' },
              ].map(({ Icon, title }) => (
                <div key={title} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                  <Icon size={18} color="#8B6A00" />
                  <p className="text-sm font-medium" style={{ color: C.dark }}>{title}</p>
                </div>
              ))}
            </div>
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
              className="inline-block text-sm font-semibold border rounded-full px-6 py-2.5 transition-colors"
              style={{ borderColor: 'rgba(139,106,0,0.3)', color: '#7A5C00', backgroundColor: 'white' }}>
              Consultar fechas y disponibilidad
            </a>
          </div>
        </div>
      </section>

      {/* ── TEMAZCAL ── */}
      <section
        className="py-24 md:py-36 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url('/uploads/temazcal.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,8,18,0.9) 0%, rgba(4,8,18,0.85) 100%)' }} />
        <div className="max-w-4xl mx-auto relative z-10 text-center" data-reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-5" style={{ color: C.gold }}>
            Ceremonia ancestral
          </p>
          <h2 className="text-4xl md:text-6xl serif-title text-white mb-6 leading-tight">
            Temazcal
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-5 text-white/75">
            El temazcal es una ceremonia de purificación y renacimiento. Calor, vapor, oscuridad y silencio — un ritual que limpia lo que el cuerpo acumula y abre lo que el alma necesita liberar.
          </p>
          <p className="text-sm leading-relaxed max-w-xl mx-auto mb-10 text-white/55">
            Conducido por <span className="font-semibold text-white/85">Santiago Alzogaray</span>, cada Temazcal es un espacio sagrado donde la comunidad se reúne alrededor del fuego para transpirar juntos, pedir y agradecer en la montaña.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 max-w-2xl mx-auto mb-12" data-reveal data-delay="1">
            {[
              { title: 'Purificación', desc: 'El calor del vapor limpia el cuerpo y disuelve las tensiones acumuladas' },
              { title: 'Comunidad', desc: 'Un espacio compartido donde los límites individuales se disuelven' },
              { title: 'Renacimiento', desc: 'Al salir, algo se renueva. El invierno tiene otro sabor desde adentro' },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-5 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="font-bold text-sm mb-2" style={{ color: C.gold }}>{title}</p>
                <p className="text-xs leading-relaxed text-white/55">{desc}</p>
              </div>
            ))}
          </div>

          <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
            className="inline-block border font-semibold text-sm py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
            style={{ borderColor: 'rgba(212,175,55,0.4)', color: C.gold }}>
            Consultar fechas del Temazcal
          </a>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Quiénes te acompañan
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              El equipo del Winter Camp
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: C.muted }}>
              Las personas que sostienen el espacio, los fogones y las dinámicas de cada día.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {TEAM.map(({ photo, nombre, rol, desc, instagram }) => (
              <div key={nombre} className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'rgba(0,83,51,0.02)' }}>
                <img src={img(photo, 200)} alt={nombre} className="w-14 h-14 rounded-full object-cover mb-5" loading="lazy" />
                <p className="font-bold text-base mb-1" style={{ color: C.dark }}>{nombre}</p>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.green }}>{rol}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${nombre}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full mt-4 transition-colors hover:bg-brand-green/10"
                    style={{ backgroundColor: 'rgba(0,83,51,0.06)' }}>
                    <Instagram size={14} color={C.green} />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Coproducción Kintu */}
          <div className="mt-10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" data-reveal data-delay="2" style={{ backgroundColor: C.green }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: 'rgba(212,175,55,0.25)' }} />
            <div className="relative z-10">
              <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: 'rgba(212,175,55,0.8)' }}>Una coproducción de</p>
              <h3 className="text-2xl md:text-3xl serif-title text-white mb-4">Pueblo Mágico × Kintu</h3>
              <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6 text-white/70">
                KINTU es una productora pionera en experiencias transformadoras que diseña viajes y procesos con corazón y propósito. Inspirada en la cosmovisión andina —donde el kintu es una ofrenda—, cada experiencia nace desde la intención, el cuidado y la coherencia.
              </p>
              <a href="https://www.instagram.com/somoskintu_/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2.5 transition-colors hover:bg-white/10"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: C.gold, border: '1px solid rgba(212,175,55,0.3)' }}>
                <Instagram size={16} />
                @somoskintu_
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EL FUEGO Y LA TRIBU (MUNDIAL) ── */}
      <section
        className="py-20 md:py-28 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url('/uploads/Invierno/20250627_222558.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(4,8,18,0.88) 0%, rgba(4,8,18,0.82) 100%)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10" data-reveal>
          <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
            style={{ backgroundColor: C.fire }}>
            El fuego y la tribu
          </p>
          <h2 className="text-3xl md:text-4xl serif-title mb-5 text-white">
            Este invierno jugamos todos para el mismo equipo
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Si te gusta el Mundial habrá espacio para ver los partidos, alentar juntos a Argentina, celebrar cada gol alrededor del fuego y compartir la experiencia en un contexto hermosísimo.
          </p>
          <p className="font-serif italic text-lg" style={{ color: C.gold }}>
            Porque cuando el frío aprieta, si jugamos juntos ganamos todos.
          </p>
        </div>
      </section>

      {/* ── EL LUGAR ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: C.green }}>El lugar</p>
              <h2 className="text-3xl md:text-4xl serif-title mb-5 leading-tight" style={{ color: C.green }}>
                Pueblo Mágico,<br />Los Gigantes
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: C.muted }}>
                Eco-centro de montaña · Comunidad · Regeneración. Un espacio que ya respira lo que este encuentro propone — naturaleza, comunidad y presencia.
              </p>
              <ul className="space-y-3">
                {[
                  'Sierras Grandes de Córdoba · Los Gigantes',
                  'A 90 km de Córdoba Capital',
                  'Acceso para todo tipo de vehículos',
                  'Espacios calefaccionados, fogón y senderos',
                  '200 hectáreas de reserva natural',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: C.muted }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: C.green }}>—</span>{item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 mt-7">
                <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold border rounded-full px-6 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                  style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                  ¿Cómo llegar? Consultanos
                </a>
                <a href="https://www.instagram.com/pueblomagico__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Pueblo Mágico"
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-brand-green hover:border-brand-green"
                  style={{ borderColor: 'rgba(0,83,51,0.3)' }}>
                  <Instagram size={16} color={C.green} />
                </a>
              </div>
            </div>
            {/* Desktop: video horizontal */}
            <div className="hidden md:block rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/ktzVcAs-74c?rel=0&modestbranding=1"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Pueblo Mágico"
                />
              </div>
            </div>
            {/* Mobile: Shorts vertical */}
            <div className="block md:hidden rounded-2xl overflow-hidden shadow-xl mx-auto" style={{ maxWidth: '300px' }} data-reveal data-delay="1">
              <div style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://www.youtube.com/embed/QPNxc5Nh8es?rel=0&modestbranding=1"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Pueblo Mágico Shorts"
                />
              </div>
            </div>
          </div>

          {/* Grid de fotos aéreas del lugar nevado */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12" data-reveal data-delay="2">
            {[
              { src: '/uploads/Invierno/DJI_20250629135712_0164_D_CHAPA2025.webp', alt: 'Vista aérea general nevada' },
              { src: '/uploads/Invierno/DJI_20250629140041_0171_D_CHAPA2025.webp', alt: 'Los tres domos geodésicos' },
              { src: '/uploads/Invierno/DJI_20250629140027_0170_D_CHAPA2025.webp', alt: 'Refugio principal con fogón nevado' },
              { src: '/uploads/Invierno/DJI_20250629140004_0168_D_CHAPA2025.webp', alt: 'Detalle de los domos en invierno' },
            ].map(({ src, alt }) => (
              <div key={src} className="rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={img(src, 600)}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOS ESPACIOS ── */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] tracking-[0.4em] uppercase font-semibold mb-3" style={{ color: C.green }}>
            Conocé los espacios
          </p>
          <h3 className="text-center text-2xl md:text-3xl serif-title mb-10" style={{ color: C.dark }}>
            El lugar por dentro
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" data-reveal>
            {[
              { src: '/uploads/yoga_salon.webp',    label: 'El Salón',          desc: 'Yoga · círculos · dinámicas' },
              { src: '/uploads/coworking.webp',     label: 'Coworking',         desc: 'WiFi Starlink · mesas de trabajo' },
              { src: '/uploads/habitaciones.webp',  label: 'Habitaciones',      desc: 'Ropa blanca · toallón · calidez' },
              { src: '/uploads/domos.webp',         label: 'Domos Geodésicos',  desc: 'Glamping · inmersión en la naturaleza' },
              { src: '/uploads/mesadas.webp',       label: 'La Cocina',         desc: 'Pensión completa · 3 comidas por día' },
              { src: '/uploads/botica.webp',        label: 'La Botica',         desc: 'Plantas medicinales de la sierra' },
            ].map(({ src, label, desc }) => (
              <div key={src} className="group relative rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: '4/3' }}>
                <img
                  src={img(src, 600)}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,20,12,0.75) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-xs font-bold tracking-wide mb-0.5">{label}</p>
                  <p className="text-white/60 text-[10px]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center" data-reveal>
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.faint }}>
            Cómo funciona
          </p>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
            No reservás un paquete cerrado: reservás las noches que quieras dentro del 1 al 31 de julio. Vos elegís cuándo llegar y cuándo irte, y mientras estás en Pueblo Mágico tenés pensión completa y el cronograma de actividades disponible para sumarte cuando quieras. Por eso el precio se calcula <strong style={{ color: C.dark }}>por noche</strong> — y cuantas más noches te quedás, más baja el valor de cada una.
          </p>
        </div>
      </section>

      {/* ── TU ESTADÍA / PRECIOS ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#EEF5FA' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Tu estadía
            </p>
            <h2 className="text-2xl md:text-3xl serif-title mb-3 font-bold uppercase tracking-wide" style={{ color: C.green }}>
              No vendemos alojamiento.<br />Compartimos experiencias y mucho más.
            </h2>
            <p className="text-base max-w-xl mx-auto mb-3" style={{ color: C.muted }}>
              Llegás y te vas cuando quieras. Todas las modalidades incluyen pensión completa, alojamiento y el programa de actividades. Desde $63.000 por noche para una experiencia all inclusive en la montaña.
            </p>
            <p className="text-sm font-bold flex items-center justify-center gap-1.5" style={{ color: '#8B6A00' }}>
              <TrendingDown size={16} /> Cuantas más noches te quedás, más barata sale cada una
            </p>
          </div>

          {/* Incluye — antes de los precios para mostrar valor primero */}
          <div className="mb-12 rounded-2xl p-8 md:p-10 border" data-reveal style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'white' }}>
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-6 text-center" style={{ color: C.green }}>Todo esto incluye tu estadía</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {[
                { Icon: Utensils, label: 'Pensión completa · 3 comidas por día' },
                { Icon: Home, label: 'Alojamiento · ropa blanca y toallón individual' },
                { Icon: Snowflake, label: 'Kit de invierno' },
                { Icon: Droplet, label: 'Agua caliente 24 hs' },
                { Icon: Wifi, label: 'WIFI satelital' },
                { Icon: Flame, label: 'Espacios calefaccionados con fuego prendido' },
              ].map(({ Icon, label }) => (
                <div key={label} className="text-center">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(0,83,51,0.08)' }}>
                    <Icon size={18} color={C.green} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {PRECIOS.map(({ noches, precio, porNoche, cuotas, ahorro }, idx) => {
              const isBest = idx === PRECIOS.length - 1;
              return (
              <div key={noches} className="rounded-2xl p-7 border text-left relative"
                style={isBest
                  ? { borderColor: 'rgba(0,83,51,0.35)', backgroundColor: 'rgba(0,83,51,0.05)' }
                  : { borderColor: '#E5DDD5', backgroundColor: 'white' }}>
                {isBest && (
                  <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: C.green, color: C.gold }}>Mejor precio</span>
                )}
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: isBest ? C.green : '#A0866E' }}>
                  {noches}
                </p>
                <p className="text-3xl font-bold serif-title mb-1" style={{ color: isBest ? C.green : C.dark }}>
                  {precio}
                </p>
                <p className="text-xs mb-3" style={{ color: C.faint }}>{porNoche} · en efectivo</p>
                <p className="text-[11px] font-semibold mb-4 inline-block px-2.5 py-1 rounded-full"
                  style={isBest
                    ? { backgroundColor: C.gold, color: C.green }
                    : { backgroundColor: 'rgba(212,175,55,0.18)', color: '#8B6A00' }}>
                  {cuotas}
                </p>
                {ahorro && (
                  <div>
                    <p className="text-[11px] font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,83,51,0.08)', color: isBest ? C.green : '#8B6A00' }}>
                      <TrendingDown size={12} /> {ahorro}
                    </p>
                  </div>
                )}
              </div>
              );
            })}
          </div>

          <p className="text-center text-sm mt-4" style={{ color: C.faint }}>
            Consulta promociones y descuentos para familias y grupos.
          </p>
          <p className="text-center text-sm mt-2 font-semibold" style={{ color: '#8B6A00' }}>
            Cuotas sin interés disponibles — consultanos por WhatsApp.
          </p>

          <div className="text-center mt-10" data-reveal data-delay="3">
            <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm py-4 px-8 inline-block">
              Reservar mi estadía
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#EEF5FA' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Preguntas frecuentes
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Todo lo que necesitás saber
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: C.muted }}>
              ¿Quedó alguna duda? Escribinos por WhatsApp y te respondemos al momento.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4" data-reveal data-delay="1">
            {FAQS.map(({ q, a }, index) => {
              const isActive = activeFaq === index;
              const Icon = FAQ_ICONS[index % FAQ_ICONS.length];
              return (
                <div key={q} className="rounded-2xl border bg-white overflow-hidden transition-colors duration-300"
                  style={{ borderColor: isActive ? C.gold : 'rgba(0,83,51,0.1)', boxShadow: isActive ? '0 4px 16px rgba(0,0,0,0.05)' : 'none' }}>
                  <button
                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center gap-4 focus:outline-none"
                    onClick={() => setActiveFaq(isActive ? null : index)}
                    aria-expanded={isActive}
                  >
                    <span className="flex-shrink-0 transition-colors duration-300" style={{ color: isActive ? C.green : 'rgba(0,83,51,0.3)' }}>
                      <Icon size={20} />
                    </span>
                    <h3 className="flex-1 font-bold text-sm md:text-base leading-snug transition-colors duration-300" style={{ color: isActive ? C.green : C.dark }}>
                      {q}
                    </h3>
                    <span
                      className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-transform duration-300"
                      style={{ backgroundColor: isActive ? C.green : 'rgba(0,83,51,0.06)', color: isActive ? C.gold : C.green, transform: isActive ? 'rotate(180deg)' : 'none' }}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ display: 'grid', gridTemplateRows: isActive ? '1fr' : '0fr', opacity: isActive ? 1 : 0 }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pl-[3.75rem] pr-6 md:pl-[4.5rem] md:pr-8 pb-6 md:pb-7 pt-1">
                        <div className="w-full h-px mb-4" style={{ backgroundColor: 'rgba(0,83,51,0.08)' }} />
                        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10" data-reveal data-delay="2">
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold border rounded-full px-5 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
              style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
              Escribirnos
            </a>
          </div>
        </div>
      </section>

      {/* ── FAMILIA ── */}
      <section
        className="py-20 md:py-28 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url('/uploads/Invierno/20250629_132707.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,83,51,0.88)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10" data-reveal>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: 'rgba(212,175,55,0.2)' }} />
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}>
                <Heart size={22} color={C.gold} />
              </div>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-5" style={{ color: 'rgba(212,175,55,0.8)' }}>
              Familia
            </p>
            <h2 className="text-3xl md:text-4xl serif-title text-white mb-5">
              Creemos en la familia como base, refugio y medicina
            </h2>
            <p className="text-base leading-relaxed max-w-xl mx-auto mb-6 text-white/70">
              Por eso diseñamos esta experiencia para que grandes y chicos puedan habitar juntos la montaña, compartir tiempo de calidad y crear recuerdos reales.
            </p>
            <p className="font-serif italic text-lg" style={{ color: C.gold }}>
              Acá la familia no es un segmento. Es el corazón.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-28 md:py-40 px-6 text-white text-center relative overflow-hidden"
        style={{ backgroundImage: `url('/uploads/Invierno/20250628_180306.webp')`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(6,12,20,0.88)' }} />
        <div className="max-w-2xl mx-auto relative z-10" data-reveal>
          <div className="flex justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(46,110,142,0.3)', border: '1px solid rgba(127,196,232,0.2)' }}>
              <Snowflake size={26} color="#7FC4E8" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(170,62,17,0.3)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <Flame size={26} color={C.gold} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl serif-title text-white mb-6 leading-tight">
            Este invierno, el viaje es hacia vos
          </h2>
          <p className="text-base leading-relaxed mb-4 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            El frío nos acerca.<br />El fuego nos conecta y nos une de verdad.
          </p>
          <p className="font-serif italic mb-4" style={{ color: C.gold }}>
            El viaje es reconectar con vos, con gente linda y con todo lo que está bien.
          </p>
          <p className="text-base font-semibold mb-10 text-white/80">
            Te esperamos en Pueblo Mágico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer"
              className="btn-gold text-sm py-5 px-10 inline-block">
              Reservar mi lugar
            </a>
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
              className="inline-block border border-white/30 text-white/80 font-semibold text-sm py-5 px-10 rounded-full hover:bg-white/10 transition-colors">
              Tengo preguntas
            </a>
          </div>
          <p className="text-xs mt-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
            1 al 31 de julio 2026 · Pueblo Mágico, Los Gigantes, Córdoba
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WinterCamp;
