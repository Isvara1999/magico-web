import React, { useState, useEffect } from 'react';
import {
  Flame, Snowflake, Users, Heart, Star, Compass, ChevronDown, ChevronLeft, ChevronRight, Instagram, Linkedin,
  Mountain, Briefcase, Network, Home, Wifi, Droplet, Sparkles,
  Footprints, PawPrint, TrendingDown, CalendarDays, Utensils, Smartphone,
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
// Efectivo = precio real. Cuotas = efectivo × 1.2 (precio lista).
// Comunicación: "pagás menos en efectivo" no "cuotas cuestan más".
type PriceTier = { noches: string; efectivo: string; porNoche: string; listaTotal: string; cuotas: string; ahorroEfectivo: string; ahorroNoches?: string };
const PRECIOS: PriceTier[] = [
  {
    noches: '1 noche',
    efectivo: '$90.000',
    porNoche: '$90.000 por noche',
    listaTotal: '$108.000',
    cuotas: '3 cuotas de $36.000',
    ahorroEfectivo: 'Ahorrás $18.000 pagando al contado',
  },
  {
    noches: '2 noches',
    efectivo: '$160.000',
    porNoche: '$80.000 por noche',
    listaTotal: '$192.000',
    cuotas: '3 cuotas de $64.000',
    ahorroEfectivo: 'Ahorrás $32.000 pagando al contado',
    ahorroNoches: 'Ahorrás $10.000 por noche vs 1 noche',
  },
  {
    noches: '3+ noches',
    efectivo: '$190.000',
    porNoche: '$63.000 por noche',
    listaTotal: '$228.000',
    cuotas: '3 cuotas de $76.000',
    ahorroEfectivo: 'Ahorrás $38.000 pagando al contado',
    ahorroNoches: 'Ahorrás $27.000 por noche vs 1 noche',
  },
];

// ─── Equipo ─────────────────────────────────────────────────────────────────────
type TeamMember = { photo: string; nombre: string; rol: string; desc: string; instagram?: string; linkedin?: string };

const TEAM: TeamMember[] = [
  {
    photo: '/uploads/Diego_perfil.png',
    nombre: 'Diego Epelman Hodara',
    rol: 'Host principal de Pueblo Mágico',
    desc: 'Emprendedor, Facilitador & Guía de Dinámicas de Alto Impacto. Sostén energético del Winter Camp desde los fogones, los círculos y la presencia.',
    instagram: 'https://www.instagram.com/diegoepel/',
  },
  {
    photo: '/uploads/china.jpeg',
    nombre: 'China Dericia',
    rol: 'Anfitriona del Pueblo',
    desc: 'Profe de Yoga & Facilitadora de Movimiento Consciente. Consciencia corporal, meditaciones y canto — guía el cuerpo y la energía del grupo.',
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
    rol: 'Mentora de emprendedores/as & profesionales',
    desc: 'Coach Integral & Mentora de Marcas Personales. Creadora de la Comunidad Mujeres Amatistas. Instructora de Yoga, meditación y pranayamas.',
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
    linkedin: 'https://www.linkedin.com/in/tomas-fossatti-ing',
  },
  {
    photo: '/uploads/isvara-rojas.jpg',
    nombre: 'Isvara Rojas Romero',
    rol: 'Host de emprendedores/as',
    desc: 'Estratega de Innovación y Growth Engineer. Une el mundo del bienestar con la tecnología.',
    instagram: 'https://www.instagram.com/isvara_strategist/',
    linkedin: 'https://www.linkedin.com/in/isvara-rojas-romero-53a20a298/',
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
    document.title = 'Winter Camp · Vacaciones de Invierno en Pueblo Mágico · Pueblo Mágico';
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
          <p className="text-white/65 text-sm md:text-lg leading-relaxed max-w-lg md:max-w-2xl mt-4 mb-4 md:mt-5 md:mb-6">
            Durante todo el mes de julio abrimos nuestro eco-centro en el corazón de la montaña para compartir el invierno en comunidad, alrededor del fuego, en plena presencia y conexión. Venís y te vas cuando quieras. Pensión completa desde $63.000 por noche en efectivo.
          </p>

          <p className="text-white/45 text-xs sm:text-sm mb-6 md:mb-10 max-w-lg md:max-w-2xl leading-relaxed">
            Exclusivo para disfrutar las vacaciones en familia y para emprendedores, artistas y creativos que buscan frenar, inspirarse, enfocarse y compartir momentos de calidad en comunidad. Tenemos un cronograma de actividades para que te sumes a la que quieras, a tu ritmo.
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
        </div>
      </section>

      {/* ── URGENCIA ── */}
      <div className="px-6 py-3 text-center" style={{ backgroundColor: '#AA3E11' }}>
        <p className="text-white text-xs sm:text-sm font-semibold leading-relaxed">
          JULIO ES AHORA · El campamento ya comenzó · Solo 20 personas al mismo tiempo en el espacio ·{' '}
          <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
            Consultá disponibilidad →
          </a>
        </p>
      </div>

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
              <span style={{ color: '#8B6A00' }}>Es un portal hacia tu creatividad.</span>
            </blockquote>
            <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto" style={{ color: C.muted }}>
              La naturaleza se aquieta, el frío invita a ir hacia adentro y el fuego vuelve a reunirnos. En Pueblo Mágico creemos que este es un tiempo para bajar un cambio, reconectar con la alegría de estar vivos y recordar lo esencial: <strong style={{ color: C.dark }}>SER</strong>. Por eso abrimos las puertas de nuestro hogar… y de nuestra familia.
            </p>
          </div>

          <div className="mt-12" data-reveal data-delay="1">
            <p className="text-center text-[10px] tracking-[0.4em] uppercase font-semibold mb-6" style={{ color: '#8B6A00' }}>
              Anfitriones y guardianes del espacio
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {TEAM.slice(0, 2).map(({ photo, nombre, rol, desc, instagram }) => (
                <div key={nombre} className="flex items-start gap-4 rounded-2xl p-5 border" style={{ borderColor: 'rgba(46,110,142,0.2)', backgroundColor: 'rgba(255,255,255,0.72)' }}>
                  <img src={img(photo, 120)} alt={nombre} className="w-14 h-14 rounded-full object-cover flex-shrink-0" loading="lazy" />
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ color: C.dark }}>{nombre}</p>
                    <p className="text-xs font-semibold mb-2" style={{ color: C.green }}>{rol}</p>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: C.muted }}>{desc}</p>
                    {instagram && (
                      <a href={instagram} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium"
                        style={{ color: C.green }}>
                        <Instagram size={11} /> Instagram
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ES ── */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              ¿Esto es para mí?
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.dark }}>
              La montaña te espera<br />si te identificás con alguna de estas opciones
            </h2>
          </div>

          {/* 4 cards positivas — grid 2×2 */}
          <div className="grid sm:grid-cols-2 gap-5 mb-6" data-reveal data-delay="1">

            {/* Familias */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(0,83,51,0.15)', backgroundColor: 'rgba(0,83,51,0.03)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0,83,51,0.1)' }}>
                <Home size={18} color={C.green} />
              </div>
              <p className="font-bold text-base mb-2" style={{ color: C.green }}>Tenés familia</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                Buscás vivir unas vacaciones de invierno distintas: que los niños jueguen en libertad, que los adolescentes conecten con la naturaleza y los adultos puedan estar tranquilos. Un tiempo sin tantas pantallas, con más conexión humana.
              </p>
              <ul className="space-y-1.5">
                {['Niños que juegan en la montaña y aprenden', 'Tiempo real en familia, sin distracciones', 'Cocina casera incluida — sin organizar nada', 'Comunidad de familias que piensa igual que vos'].map(i => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: C.green }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Estás solo/a */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(46,110,142,0.2)', backgroundColor: 'rgba(46,110,142,0.03)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(46,110,142,0.12)' }}>
                <Compass size={18} color={C.ice} />
              </div>
              <p className="font-bold text-base mb-2" style={{ color: C.ice }}>Estás solo/a</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                No necesitás venir con alguien para pasarla bien. Tu propia presencia es tu compañía. Y además, ¡te vas a llevar amigos nuevos!
              </p>
              <ul className="space-y-1.5">
                {['Tiempo a solas con vos para re-encontrarte', 'Nuevas amistades que te vas a cruzar en el Pueblo', 'Momentos de silencio, escritura y consciencia plena', 'Comida casera, rica y saludable que nutra tu viaje interno'].map(i => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: C.ice }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Estás en pareja */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(170,62,17,0.15)', backgroundColor: 'rgba(170,62,17,0.03)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(170,62,17,0.1)' }}>
                <Heart size={18} color={C.fire} />
              </div>
              <p className="font-bold text-base mb-2" style={{ color: C.fire }}>Estás en pareja</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                Si quieren re-conectar entre ustedes y pasar tiempo de calidad juntos, venir al Pueblo es definitivamente un planazo. El lugar los invita a volver a lo esencial — de la vida y también del vínculo.
              </p>
              <ul className="space-y-1.5">
                {['Tiempo a solas para disfrutar y celebrar su vínculo', 'Momentos de interacción para conocer personas alineadas', 'Actividades divertidas para reír y relajar', 'Comida casera, rica y saludable para honrar la vida'].map(i => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: C.fire }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emprendedor/a · Artista · Creativo */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(212,175,55,0.25)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}>
                <Briefcase size={18} color="#8B6A00" />
              </div>
              <p className="font-bold text-base mb-2" style={{ color: '#7A5C00' }}>Sos emprendedor/a, artista o creativo/a</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                Si sentís que necesitás inspiración, re-conexión con tu propósito o hacer hiperfoco, las condiciones del Pueblo son ideales: contamos con internet y espacios amplios para crear tu burbuja creativa, avanzar en tus metas y también hacer networking. Aplica también para socios y equipos.
              </p>
              <ul className="space-y-1.5">
                {['Silencio de montaña que trae claridad y revela oportunidades', 'Caminatas conscientes para oxigenar las ideas y alinearte con tu propósito', 'Starlink: el mejor internet disponible', 'Comida casera, rica y saludable para recargar energía'].map(i => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#8B6A00' }}>✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* No es para vos — abajo, centrada */}
          <div className="max-w-2xl mx-auto mb-10 rounded-2xl p-7 border" data-reveal data-delay="2"
            style={{ borderColor: 'rgba(107,128,144,0.2)', backgroundColor: 'rgba(107,128,144,0.04)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(107,128,144,0.1)' }}>
                <Snowflake size={16} color={C.faint} />
              </div>
              <p className="font-bold text-base" style={{ color: C.muted }}>No es para vos si...</p>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: C.faint }}>
              Preferimos ser honestos. Winter Camp no es un hotel, ni un spa, ni un all-inclusive convencional.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {['Buscás lujo y servicios de resort', 'No querés compartir espacios con otros', 'Necesitás wi-fi ilimitado para videollamadas todo el día', 'Las montañas y el silencio te generan ansiedad', 'Buscás la comodidad constantemente'].map(i => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.faint }}>
                  <span className="mt-0.5 flex-shrink-0">✗</span>{i}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center" data-reveal data-delay="3">
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
              className="inline-block border font-semibold text-sm py-3 px-8 rounded-full transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
              style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
              ¿Tengo dudas? Consultá sin compromiso →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOGATA ── */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 order-2 md:order-1" data-reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-6" style={{ color: C.fire }}>
              La tribu se reúne al caer la noche
            </p>
            <h2 className="text-3xl md:text-4xl serif-title leading-snug mb-6" style={{ color: C.dark }}>
              El frío nos acerca.<br />El fuego nos une.
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: C.muted }}>
              En Pueblo Mágico tenemos un ritual: cada noche nos reunimos para concluir y agradecer nuestro día alrededor de una fogata, bajo la luna y las estrellas. Nos fundimos entre guitarras, tambores, historias, silencio, algo calentito, y el chisporroteo de la leña de monte nativo. No hay nada más cálido y placentero que compartir un fogón en la simpleza de una noche en la montaña.
            </p>
            <a
              href={WA_INFO}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: C.gold, color: '#fff' }}
            >
              Quiero ir →
            </a>
          </div>
          <div className="flex-shrink-0 w-64 md:w-72 lg:w-80 order-1 md:order-2 rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
            <img
              src="/uploads/Invierno/fogata-vertical.jpeg"
              alt="Fogata nocturna en la montaña"
              className="w-full block"
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── TRANSFORMACIÓN ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.dark }}>
        <div className="max-w-4xl mx-auto text-center" data-reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-6" style={{ color: C.gold }}>
            Una experiencia transformadora de verdad
          </p>
          <h2 className="text-2xl md:text-4xl serif-title text-white leading-snug mb-4">
            Winter Camp es una invitación a experimentar<br />la montaña desde un nuevo lugar.
          </h2>
          <p className="text-base md:text-lg mb-14 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            No venís solo a alojarte en un lugar lindo… venís a ser parte de una experiencia transformadora de verdad.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left" data-reveal data-delay="1">
            {[
              { antes: 'Llegás siendo una persona', despues: 'te vas siendo otra.' },
              { antes: 'Venís estresado/a', despues: 'te vas recargado/a.' },
              { antes: 'Venís con bloqueos creativos', despues: 'te vas lleno/a de inspiración.' },
              { antes: 'Venís muy mental', despues: 'te vas más conectado/a con tu cuerpo.' },
            ].map(({ antes, despues }) => (
              <div key={antes} className="rounded-2xl p-5 border flex items-start gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <div className="flex-shrink-0 w-1 self-stretch rounded-full" style={{ backgroundColor: C.gold }} />
                <div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{antes}…</p>
                  <p className="text-base font-semibold text-white">{despues}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA DE INVIERNO ── */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg relative" style={{ height: '68vh', minHeight: '380px', maxHeight: '640px' }}>
          {CAROUSEL.map((photo, i) => (
            <div
              key={photo.src}
              className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center"
              style={{
                backgroundColor: '#F5F5F0',
                opacity: i === carouselIdx ? 1 : 0,
              }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full"
                style={{ objectFit: 'contain' }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          <button
            onClick={() => setCarouselIdx(i => (i - 1 + CAROUSEL.length) % CAROUSEL.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.12)', backdropFilter: 'blur(4px)' }}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={20} color={C.dark} />
          </button>
          <button
            onClick={() => setCarouselIdx(i => (i + 1) % CAROUSEL.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'rgba(0,0,0,0.12)', backdropFilter: 'blur(4px)' }}
            aria-label="Foto siguiente"
          >
            <ChevronRight size={20} color={C.dark} />
          </button>

          <div className="absolute bottom-5 left-0 right-0 z-10 text-center">
            <p className="text-xs mb-3 tracking-wide" style={{ color: 'rgba(26,43,60,0.55)' }}>{CAROUSEL[carouselIdx].caption}</p>
            <div className="flex justify-center gap-2">
              {CAROUSEL.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === carouselIdx ? '18px' : '6px',
                    height: '6px',
                    backgroundColor: i === carouselIdx ? C.gold : 'rgba(0,0,0,0.2)',
                  }}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
            </div>
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

          {/* Programa incluido */}
          <div className="mt-14 space-y-6 max-w-4xl mx-auto" data-reveal data-delay="3">

            {/* Reset Vital — app autoguiada */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(0,83,51,0.2)', backgroundColor: 'rgba(0,83,51,0.03)' }}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: C.green }}>
                    <Smartphone size={24} color="white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="font-bold text-base" style={{ color: C.green }}>Retiro Autoguiado · Reset Vital</p>
                    <span className="text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0,83,51,0.1)', color: C.green }}>App incluida</span>
                    <span className="text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0,83,51,0.08)', color: C.green }}>Offline + Online</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
                    Este formato es autogestivo y está disponible en tu teléfono desde que llegás — sin horarios impuestos, a tu ritmo. Funciona sin conexión para que nada te saque de la experiencia.
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {['Meditaciones guiadas', 'Journaling y escritura', 'Caminatas conscientes', 'Rituales de conexión con la naturaleza', 'Respiraciones y técnicas de relajación', 'Guía de plantas y bienestar de la sierra'].map(a => (
                      <div key={a} className="flex items-start gap-2">
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.green }} />
                        <p className="text-xs" style={{ color: C.dark }}>{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actividades con facilitadores */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(46,110,142,0.2)', backgroundColor: 'rgba(46,110,142,0.03)' }}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={16} color={C.ice} />
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: C.ice }}>Actividades con facilitadores · según agenda y grupo</p>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: C.muted }}>
                Dependiendo de las fechas y el grupo que se forme, el equipo de facilitadores organiza actividades compartidas. Consultanos qué hay disponible cuando planeás tu llegada.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
                {['Yoga y movimiento consciente', 'Círculos de palabra', 'Armonizaciones sonoras', 'Fogones y encuentros nocturnos', 'Caminatas guiadas en la montaña', 'Espacios para infancias y juego', 'Workshops y Talleres Creativos', 'Capacitaciones para Emprendedores & Creativos'].map(a => (
                  <div key={a} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.ice }} />
                    <p className="text-xs" style={{ color: C.dark }}>{a}</p>
                  </div>
                ))}
              </div>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block text-xs font-semibold border rounded-full px-4 py-2 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(46,110,142,0.3)', color: C.ice }}>
                Consultar agenda disponible →
              </a>
            </div>

            {/* Actividades extra */}
            <div className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={16} color="#8B6A00" />
                <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: '#8B6A00' }}>Actividades extra · a contratar · consultar agenda</p>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: C.muted }}>
                Experiencias con costo aparte que podés sumar a tu estadía. Se coordinan con anticipación según disponibilidad.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
                {[
                  { Icon: Footprints, title: 'Trekking con guías' },
                  { Icon: Footprints, title: 'Circuitos de running · 5k / 10k+' },
                  { Icon: PawPrint, title: 'Cabalgatas' },
                  { Icon: Heart, title: 'Masajes y terapias' },
                  { Icon: Compass, title: 'Sesiones 1 a 1' },
                ].map(({ Icon, title }) => (
                  <div key={title} className="flex items-center gap-2">
                    <Icon size={13} color="#8B6A00" />
                    <p className="text-xs font-medium" style={{ color: C.dark }}>{title}</p>
                  </div>
                ))}
                {/* Temazcal — con link a sección */}
                <div className="flex items-center gap-2 col-span-2 pt-2 border-t mt-1" style={{ borderColor: 'rgba(139,106,0,0.15)' }}>
                  <Flame size={13} color="#8B6A00" />
                  <p className="text-xs font-semibold" style={{ color: C.dark }}>Temazcal · ceremonia ancestral</p>
                  <a href="#temazcal"
                    className="ml-auto text-[10px] font-bold underline"
                    style={{ color: '#8B6A00' }}>
                    Ver más ↓
                  </a>
                </div>
              </div>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block text-xs font-semibold border rounded-full px-4 py-2"
                style={{ borderColor: 'rgba(139,106,0,0.3)', color: '#7A5C00' }}>
                Consultar disponibilidad →
              </a>
            </div>
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
                Alimentación
              </p>
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: C.fire }}>Nuestro pilar principal</p>
              <h2 className="text-3xl md:text-4xl serif-title mb-5" style={{ color: C.dark }}>
                Comida casera, consciente,<br />nutritiva y hecha con amor
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.muted }}>
                En Pueblo Mágico, la alimentación es parte esencial de la experiencia. Cada plato es preparado con ingredientes frescos, locales y de estación — comida real que nutre el cuerpo, el alma y el espíritu mientras calienta el corazón.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {['Desayuno, almuerzo y cena incluidos', 'Ingredientes frescos y de estación', 'Preparado con cariño por nuestro equipo', 'Adaptable a necesidades especiales'].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.green }} />
                    <p className="text-xs" style={{ color: C.dark }}>{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 mb-5" style={{ backgroundColor: 'rgba(0,83,51,0.04)', border: '1px solid rgba(0,83,51,0.1)' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: C.green }}>Comedor de uso libre · Cocina común</p>
                <p className="text-xs leading-relaxed" style={{ color: C.faint }}>
                  El comedor está disponible para todos los huéspedes con hornallas, bacha, vajilla y utensilios para calentar agua, preparar tés o cocinar algo simple. La cocina del equipo es privada — allí preparamos tus 3 comidas diarias para que vos no pierdas tiempo ni energía en pensar qué cocinar.
                </p>
              </div>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block text-sm font-semibold border rounded-full px-6 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                Consultar menú y necesidades especiales
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
              <img
                src={img('/uploads/469731807_3987061274856806_2943773444767775905_n.jpg', 900)}
                alt="Comida casera en Pueblo Mágico"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEMAZCAL ── */}
      <section
        id="temazcal"
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
            Es una ceremonia ancestral de purificación y renacimiento. Un ritual que limpia lo que el cuerpo acumula y abre lo que el alma necesita liberar. Consiste en elevar la temperatura corporal a través del vapor que surge de agua caliente preparada con plantas medicinales — como la melisa y la salvia — volcada sobre rocas volcánicas calentadas entre brasas sagradas.
          </p>
          <p className="text-sm leading-relaxed max-w-xl mx-auto mb-5 text-white/55">
            Dentro de la ceremonia hay momentos de intenciones propias y colectivas, de silencio y de cantos alegres.
          </p>
          <p className="text-sm leading-relaxed max-w-xl mx-auto mb-10 text-white/55">
            Guiado por <span className="font-semibold text-white/85">Santiago Alzogaray</span>, cada Temazcal es un espacio sagrado donde la comunidad se reúne para liberar, pedir, agradecer y honrar la vida en el medio de la montaña.
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
            {TEAM.map(({ photo, nombre, rol, desc, instagram, linkedin }) => (
              <div key={nombre} className="rounded-2xl p-7 border" style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'rgba(0,83,51,0.02)' }}>
                <img src={img(photo, 200)} alt={nombre} className="w-14 h-14 rounded-full object-cover mb-5" loading="lazy" />
                <p className="font-bold text-base mb-1" style={{ color: C.dark }}>{nombre}</p>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.green }}>{rol}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
                {(instagram || linkedin) && (
                  <div className="flex gap-2 mt-4">
                    {instagram && (
                      <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${nombre}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-brand-green/10"
                        style={{ backgroundColor: 'rgba(0,83,51,0.06)' }}>
                        <Instagram size={14} color={C.green} />
                      </a>
                    )}
                    {linkedin && (
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${nombre}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-brand-green/10"
                        style={{ backgroundColor: 'rgba(0,83,51,0.06)' }}>
                        <Linkedin size={14} color={C.green} />
                      </a>
                    )}
                  </div>
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

          {/* Fotos del lugar — aéreas e interiores */}
          <div className="mt-12" data-reveal data-delay="2">
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-6 text-center" style={{ color: C.green }}>El lugar por dentro</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: '/uploads/yoga_salon.webp',                                    label: 'El Salón',         desc: 'Yoga · círculos · dinámicas' },
                { src: '/uploads/coworking.webp',                                     label: 'Coworking · Coliving', desc: 'WiFi Starlink · mesas de trabajo · convivencia' },
                { src: '/uploads/habitaciones.webp',                                  label: 'Habitaciones',     desc: 'Ropa blanca · toallón · calidez' },
                { src: '/uploads/Invierno/DJI_20250629140041_0171_D_CHAPA2025.webp', label: 'Domos Geodésicos', desc: 'Glamping en la montaña nevada' },
                { src: '/uploads/mesadas.webp',                                       label: 'Cocina común',     desc: 'Hornallas, bacha y comedor compartidos' },
                { src: '/uploads/botica.webp',                                        label: 'La Botica',        desc: 'Plantas medicinales de la sierra' },
              ].map(({ src, label, desc }) => (
                <div key={src} className="group relative rounded-xl overflow-hidden shadow-sm" style={{ aspectRatio: '4/3' }}>
                  <img src={img(src, 600)} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,20,12,0.72) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-bold mb-0.5">{label}</p>
                    <p className="text-white/55 text-[10px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

      {/* ── TESTIMONIOS ── */}
      <section className="py-16 md:py-24 px-6" style={{ backgroundColor: C.dark }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: C.gold }}>
              Quienes ya vivieron la experiencia
            </p>
            <h2 className="text-3xl md:text-4xl serif-title text-white mb-3">Lo que dicen quienes estuvieron</h2>
            <a href="https://maps.app.goo.gl/4c1nrpBbQf5hYrsE9" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-colors hover:bg-white/10"
              style={{ borderColor: 'rgba(212,175,55,0.3)' }}>
              <span className="text-sm" style={{ color: '#F4C27A' }}>★★★★★</span>
              <span className="text-white/65 text-xs font-semibold">5.0 · 64 reseñas en Google Maps</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {[
              {
                text: 'Fue el mejor fin de semana que pasamos juntos como familia en mucho tiempo. Mis hijos no querían volver a casa. Yo tampoco.',
                name: 'Tefi',
                rol: 'Mamá · Familia completa',
              },
              {
                text: 'La conexión que logramos entre nosotros fue increíble. Volvimos diferentes. La montaña nos regaló presencia de verdad.',
                name: 'Lucas y Sofi',
                rol: 'Pareja',
              },
              {
                text: 'Lo más importante: el amor y la entrega de todo el equipo, y la capacidad de sentirte uno con la naturaleza. Una experiencia que no se olvida.',
                name: 'Julieta C.',
                rol: 'Huéspeda',
              },
            ].map(({ text, name, rol }) => (
              <div key={name} className="rounded-2xl p-6 border" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-2xl mb-4 leading-none" style={{ color: C.gold }}>"</p>
                <p className="text-sm md:text-base leading-relaxed mb-6 text-white/80 italic">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: C.green }}>
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{rol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              Llegás y te vas cuando quieras. Todas las modalidades incluyen pensión completa, alojamiento y el programa de actividades. Desde $63.000 por noche en efectivo — experiencia all inclusive en la montaña.
            </p>
            <p className="text-sm font-bold flex items-center justify-center gap-1.5 mb-4" style={{ color: '#8B6A00' }}>
              <TrendingDown size={16} /> Cuantas más noches te quedás, más barata sale cada una
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(170,62,17,0.1)', color: C.fire }}>
              <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ backgroundColor: C.fire }} />
              Julio ya empezó · Quedan pocos lugares disponibles · Reservá esta semana y llegás en días
            </div>
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
            {PRECIOS.map(({ noches, efectivo, porNoche, listaTotal, cuotas, ahorroEfectivo, ahorroNoches }, idx) => {
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
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: isBest ? C.green : '#A0866E' }}>
                  {noches}
                </p>

                {/* Cuotas — precio lista (ancla) */}
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: C.faint }}>
                  En cuotas
                </p>
                <p className="text-[11px] font-semibold mb-1 inline-block px-2.5 py-1 rounded-full"
                  style={isBest
                    ? { backgroundColor: C.gold, color: C.green }
                    : { backgroundColor: 'rgba(212,175,55,0.18)', color: '#8B6A00' }}>
                  {cuotas}
                </p>
                <p className="text-[10px] mb-4 line-through" style={{ color: C.faint }}>Total {listaTotal}</p>

                {/* Efectivo — precio real con descuento */}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(0,83,51,0.1)' }}>
                  <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: C.green }}>
                    Efectivo · 1 solo pago
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="text-3xl font-bold serif-title" style={{ color: isBest ? C.green : C.dark }}>
                      {efectivo}
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0,83,51,0.12)', color: C.green }}>
                      −20%
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: C.faint }}>{porNoche}</p>
                  <p className="text-[11px] font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,83,51,0.08)', color: isBest ? C.green : '#8B6A00' }}>
                    <TrendingDown size={12} /> {ahorroEfectivo}
                  </p>
                  {ahorroNoches && (
                    <p className="text-[10px] mt-2" style={{ color: C.faint }}>{ahorroNoches}</p>
                  )}
                </div>
              </div>
              );
            })}
          </div>

          <p className="text-center text-xs mt-4" style={{ color: C.faint }}>
            Efectivo / transferencia en 1 pago: precio con 20% de descuento. En cuotas: precio lista sin recargo financiero.
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
