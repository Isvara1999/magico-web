import React, { useState, useEffect } from 'react';
import {
  Flame, Snowflake, Users, Heart, Star, Compass, ChevronDown, Instagram,
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
  night: '#0F1A12',
  cream: '#FDFBF7',
  dark:  '#2A1708',
  muted: '#6B4A33',
  faint: '#8B6347',
};

// ─── Precios ────────────────────────────────────────────────────────────────────
type PriceTier = { noches: string; precio: string; porNoche: string; ahorro?: string };
const PRECIOS: PriceTier[] = [
  { noches: '1 noche',  precio: '$90.000',  porNoche: '$90.000 por noche' },
  { noches: '2 noches', precio: '$160.000', porNoche: '$80.000 por noche', ahorro: 'Ahorrás $10.000 por noche' },
  { noches: '3 noches', precio: '$195.000', porNoche: '$65.000 por noche', ahorro: 'Ahorrás $25.000 por noche' },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_ICONS: LucideIcon[] = [Snowflake, Star, Users, Heart, Flame, Compass, Home, Network];

const FAQS = [
  {
    q: '¿Puedo elegir cualquier día para llegar?',
    a: 'Sí, es estadía libre: llegás y te vas el día que quieras dentro de julio. Durante tu estadía vas a encontrar un cronograma de actividades sucediendo, al que te podés sumar cuando quieras.',
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

// ─── Page ──────────────────────────────────────────────────────────────────────
const WinterCamp: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
          backgroundImage: `url(${img('/uploads/fogon_nocturno.webp', 1800)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,20,12,0.97) 0%, rgba(10,20,12,0.65) 45%, rgba(10,20,12,0.2) 100%)' }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 md:pt-20 pb-10 md:pb-0 flex flex-col md:items-center md:text-center">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center md:justify-center gap-2 sm:gap-3 mb-4">
            <span className="inline-block max-w-full px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.4em] uppercase font-bold border border-white/20 text-white/70 whitespace-nowrap">
              Todo julio 2026
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
            Winter <span style={{ color: C.gold }}>Camp</span> ❄️🔥
          </h1>
          <p className="text-white/65 text-sm md:text-lg leading-relaxed max-w-lg md:max-w-2xl mt-4 mb-6 md:mt-5 md:mb-10">
            Un eco-refugio en la montaña para atravesar el invierno en comunidad, con fuego, presencia y conexión. Llegás y te vas cuando quieras, con pensión completa desde $65.000 por noche.
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
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(46,110,142,0.25)' }}>
                <Snowflake size={20} color="#7FC4E8" />
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(170,62,17,0.25)' }}>
                <Flame size={20} color="#F4A261" />
              </div>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-5" style={{ color: 'rgba(212,175,55,0.6)' }}>
              El llamado
            </p>
            <blockquote className="text-2xl md:text-4xl serif-title text-white leading-relaxed mb-4">
              El invierno no es una pausa.<br />
              <span style={{ color: C.gold }}>Es un portal.</span>
            </blockquote>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              La naturaleza se aquieta, el frío invita a ir hacia adentro y el fuego vuelve a reunirnos. En Pueblo Mágico creemos que este es un tiempo para frenar, reconectar y recordar lo esencial. Por eso abrimos las puertas de nuestra casa… y de nuestra familia.
            </p>
          </div>

          <div className="rounded-2xl p-7 border text-center max-w-2xl mx-auto" data-reveal data-delay="1" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Somos <span style={{ color: C.gold }} className="font-semibold">Diego</span>, <span style={{ color: C.gold }} className="font-semibold">China</span> y una gran familia que habitamos este espacio con propósito. No solo facilitamos experiencias: co-creamos encuentros reales, humanos, auténticos y transformadores.
            </p>
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
              No venís solo a alojarte a un lugar lindo… venís a co-crear y ser parte de una experiencia transformadora.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {[
              { Icon: Flame, title: 'Fogones diarios', desc: 'Espacios de encuentro alrededor del fuego, todos los días.' },
              { Icon: Snowflake, title: 'Rituales de frío y calor', desc: 'Naturaleza, fuego y Temazcal — el contraste como parte del viaje.' },
              { Icon: Mountain, title: 'Caminatas conscientes', desc: 'Recorridos por la montaña, a tu ritmo y con presencia.' },
              { Icon: Heart, title: 'Descanso e introspección', desc: 'Espacios para frenar, relajarte y mirar hacia adentro.' },
              { Icon: Users, title: 'Comunidad', desc: 'Actividades compartidas, pensadas para generar vínculos reales.' },
              { Icon: Star, title: 'Todas las edades', desc: 'Una experiencia pensada para grandes y chicos por igual.' },
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
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#F7F5F0' }}>
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

          <div className="grid md:grid-cols-2 gap-6" data-reveal data-delay="1">
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
                  'Familias que quieren vivir vacaciones distintas, juntas',
                  'Quienes buscan reconectar con sus hijos lejos de pantallas',
                  'Espacios y juegos pensados para las infancias',
                  'Actividades para compartir en comunidad, a cualquier edad',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: C.green }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emprendedores / networking */}
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
                  'Networking orgánico junto al fuego, sin la formalidad de un evento corporativo',
                  'Espacio para pensar, crear y desconectar del ritmo de la ciudad',
                  'Comunidad de personas con caminos y proyectos afines',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: '#8B6A00' }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-delay="2">
            {['Para quienes necesitan frenar', 'Para quienes buscan reconectar', 'Para quienes sienten el llamado de la montaña', 'Para quienes quieren compartir en comunidad'].map(tag => (
              <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full border font-medium"
                style={{ borderColor: 'rgba(0,83,51,0.2)', color: C.muted, backgroundColor: 'rgba(0,83,51,0.03)' }}>
                {tag}
              </span>
            ))}
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
                Pensión completa con 3 comidas abundantes por día: comidas caseras, riquísimas, calientes y nutritivas, pensadas para acompañar el invierno y sostener el cuerpo en la montaña.
              </p>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block text-sm font-semibold border rounded-full px-6 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                Consultar por WhatsApp
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
              <img
                src={img('/uploads/comida.jpg', 900)}
                alt="Cocina de Pueblo Mágico"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TU ESTADÍA / PRECIOS ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Tu estadía
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Estadía libre, con pensión completa
            </h2>
            <p className="text-base max-w-xl mx-auto mb-3" style={{ color: C.muted }}>
              No vendemos alojamiento: compartimos experiencias. Llegás y te vas cuando quieras — todas las modalidades incluyen pensión completa con 3 comidas abundantes por día.
            </p>
            <p className="text-sm font-bold flex items-center justify-center gap-1.5" style={{ color: '#8B6A00' }}>
              <TrendingDown size={16} /> Cuantas más noches te quedás, más barata sale cada una
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {PRECIOS.map(({ noches, precio, porNoche, ahorro }, idx) => (
              <div key={noches} className="rounded-2xl p-7 border text-left relative"
                style={idx === PRECIOS.length - 1
                  ? { borderColor: 'rgba(0,83,51,0.35)', backgroundColor: 'rgba(0,83,51,0.05)' }
                  : { borderColor: '#E5DDD5', backgroundColor: 'white' }}>
                {idx === PRECIOS.length - 1 && (
                  <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: C.green, color: C.gold }}>Mejor precio</span>
                )}
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: idx === PRECIOS.length - 1 ? C.green : '#A0866E' }}>
                  {noches}
                </p>
                <p className="text-3xl font-bold serif-title mb-1" style={{ color: idx === PRECIOS.length - 1 ? C.green : C.dark }}>
                  {precio}
                </p>
                <p className="text-xs mb-3" style={{ color: C.faint }}>{porNoche}</p>
                {ahorro && (
                  <p className="text-[11px] font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(212,175,55,0.18)', color: '#8B6A00' }}>
                    <TrendingDown size={12} /> {ahorro}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-6" style={{ color: C.faint }}>
            Consultá promociones y descuentos para grupos.
          </p>

          {/* Incluye */}
          <div className="mt-14 rounded-2xl p-8 md:p-10 border" data-reveal data-delay="3" style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'white' }}>
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-6 text-center" style={{ color: C.green }}>Incluye</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {[
                { Icon: Utensils, label: 'Pensión completa · 3 comidas abundantes por día' },
                { Icon: Home, label: 'Ropa blanca y toallón individual' },
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

          <div className="text-center mt-10" data-reveal data-delay="4">
            <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm py-4 px-8 inline-block">
              Reservar mi estadía
            </a>
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
              Cronograma de actividades incluidas
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: C.muted }}>
              Durante todo julio va a haber un cronograma de actividades sucediendo en Pueblo Mágico. Te sumás cuando quieras, a tu ritmo. Sin exigencias — vos creás tu propia experiencia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {[
              { Icon: Sparkles, title: 'Yoga y movimiento consciente' },
              { Icon: Users, title: 'Círculos de palabra' },
              { Icon: Star, title: 'Armonizaciones sonoras' },
              { Icon: Flame, title: 'Ceremonias (Temazcal y rituales)' },
              { Icon: Mountain, title: 'Caminatas en la naturaleza' },
              { Icon: Heart, title: 'Juegos y espacios para infancias' },
              { Icon: Compass, title: 'Meditaciones en movimiento' },
            ].map(({ Icon, title }) => (
              <div key={title} className="rounded-2xl p-6 border flex items-center gap-4" style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'rgba(0,83,51,0.02)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,83,51,0.08)' }}>
                  <Icon size={16} color={C.green} />
                </div>
                <p className="text-sm font-medium" style={{ color: C.dark }}>{title}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-10 mb-14" style={{ color: C.faint }}>
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

      {/* ── FAMILIA ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.green }}>
        <div className="max-w-4xl mx-auto text-center relative overflow-hidden" data-reveal>
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
            <div className="rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
              <img
                src={img('/uploads/dji_0074.webp', 900)}
                alt="Vista aérea de Pueblo Mágico"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#F7F5F0' }}>
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

      {/* ── CTA FINAL ── */}
      <section
        className="py-28 md:py-40 px-6 text-white text-center relative overflow-hidden"
        style={{ backgroundImage: `url(${img('/uploads/fogon_nocturno.webp', 1600)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(10,20,12,0.88)' }} />
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
            ❄️ El frío nos acerca.<br />🔥 El fuego nos une.
          </p>
          <p className="font-serif italic mb-10" style={{ color: C.gold }}>
            Reconectá con vos, con gente linda y con todo lo que está bien.
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
            Todo julio 2026 · Pueblo Mágico, Los Gigantes, Córdoba
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WinterCamp;
