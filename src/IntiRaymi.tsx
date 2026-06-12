import React, { useState, useEffect } from 'react';
import { Flame, Music, Leaf, Heart, Star, Wind, Users, Sun, Moon, Calendar, Compass } from 'lucide-react';
import { img } from './lib/img';
import { WA_MAGICO } from './data/config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const WA_INFO    = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('¡Hola! Me interesa el Festival de Solsticio del 20 y 21 de junio. ¿Me pueden dar más info?')}`;
const WA_RESERVA = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('¡Hola! Quiero reservar mi lugar para el Festival de Solsticio del 20 y 21 de junio. ¿Cómo procedo?')}`;

const C = {
  green: '#005333',
  gold:  '#D4AF37',
  fire:  '#AA3E11',
  night: '#0F1A12',
  cream: '#FDFBF7',
  dark:  '#2A1708',
  muted: '#6B4A33',
  faint: '#8B6347',
};

// ─── Countdown ─────────────────────────────────────────────────────────────────
const Countdown: React.FC = () => {
  const target = new Date('2026-06-20T09:00:00').getTime();
  const calc = () => {
    const d = target - Date.now();
    if (d <= 0) return { days: 0, h: 0, m: 0 };
    return {
      days: Math.floor(d / 86400000),
      h:    Math.floor((d % 86400000) / 3600000),
      m:    Math.floor((d % 3600000) / 60000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 30000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-3">
      {[{ v: t.days, l: 'días' }, { v: t.h, l: 'hs' }, { v: t.m, l: 'min' }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="text-2xl md:text-3xl font-bold serif-title" style={{ color: C.gold }}>{pad(v)}</div>
          <div className="text-[10px] tracking-widest uppercase text-white/50">{l}</div>
        </div>
      ))}
    </div>
  );
};


// ─── Page ──────────────────────────────────────────────────────────────────────
const IntiRaymi: React.FC = () => {

  useEffect(() => {
    document.title = 'Festival de Solsticio de Invierno · 20 y 21 de Junio · Mágico Ensueño';
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

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 md:pt-20 pb-10 md:pb-0">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 mb-4">
            <span className="inline-block max-w-full px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.4em] uppercase font-bold border border-white/20 text-white/70 whitespace-nowrap">
              <span className="sm:hidden">20-21 Jun · Los Gigantes</span>
              <span className="hidden sm:inline">20 y 21 de junio · Los Gigantes, Córdoba</span>
            </span>
            <span
              className="inline-block max-w-full px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase font-bold whitespace-nowrap"
              style={{ backgroundColor: 'rgba(170,62,17,0.5)', color: '#F4C27A', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              Solsticio de Invierno
            </span>
            <span
              className="inline-block max-w-full px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase font-bold whitespace-nowrap"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#F4C27A', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              Día del Padre · 21 de Junio
            </span>
          </div>

          <p className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">Festival Consciente</p>
          <h1 className="text-5xl md:text-7xl serif-title leading-none mb-4 text-white">
            Solsticio<br /> <span style={{ color: C.gold }}>De Invierno</span>
          </h1>
          <p className="text-white/65 text-sm md:text-lg leading-relaxed max-w-lg md:max-w-2xl mt-4 mb-6 md:mt-5 md:mb-10">
            Dos días para celebrar el renacimiento de la luz atravesando la noche más larga del año, honrando la antigua tradición del Inti Raymi. El 21 de junio es el Día del Padre — una excusa perfecta para celebrarlo en la montaña, juntos.
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
            <div>
              <p className="text-white/35 text-[10px] tracking-widest uppercase mb-2">Faltan</p>
              <Countdown />
            </div>
          </div>
        </div>
      </section>

      {/* ── ESENCIA ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.night }}>
        <div className="max-w-3xl mx-auto text-center" data-reveal>
          <div className="flex justify-center gap-5 mb-10">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(170,62,17,0.25)' }}>
              <Flame size={20} color="#F4A261" />
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <Moon size={20} color="rgba(255,255,255,0.6)" />
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,55,0.2)' }}>
              <Sun size={20} color={C.gold} />
            </div>
          </div>
          <blockquote className="text-2xl md:text-4xl serif-title text-white leading-relaxed mb-8">
            "Volvemos al fuego.<br />
            Volvemos al origen.<br />
            <span style={{ color: C.gold }}>Volvemos al Sol."</span>
          </blockquote>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Un festival consciente pensado para todo público, donde habrá uno o más fuegos prendidos ininterrumpidamente durante todo el evento.<br />
            <strong className="text-white/85">Un espacio vivo</strong> para encontrarnos a celebrar, hacer networking orgánico y disfrutar el comienzo de un nuevo ciclo en la naturaleza.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Abierto a todo público', 'Fuego ininterrumpido', 'Networking orgánico', 'Toda la familia bienvenida'].map(tag => (
              <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full border font-medium"
                style={{ borderColor: 'rgba(212,175,55,0.3)', color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(212,175,55,0.06)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUIÉN ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              ¿Para quién es?
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Para quienes buscan reconectar.<br />Y para quienes lideran.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6" data-reveal data-delay="1">
            {/* General */}
            <div className="rounded-2xl p-8 border" style={{ borderColor: 'rgba(0,83,51,0.15)', backgroundColor: 'rgba(0,83,51,0.03)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,83,51,0.1)' }}>
                  <Leaf size={18} color={C.green} />
                </div>
                <p className="font-bold text-base" style={{ color: C.green }}>Para todo el mundo</p>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                Si sentís que necesitás hacer una pausa, reconectar con la naturaleza, el cuerpo o algo más profundo — este espacio es para vos.
              </p>
              <ul className="space-y-2">
                {[
                  'Personas en búsqueda espiritual o de bienestar',
                  'Familias que quieren vivir algo distinto juntas',
                  'Quienes nunca fueron a un retiro y quieren empezar',
                  'Los que simplemente quieren un buen fin de semana en la montaña',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: C.green }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Coaches / Emprendedores */}
            <div className="rounded-2xl p-8 border" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}>
                  <Sun size={18} color="#8B6A00" />
                </div>
                <p className="font-bold text-base" style={{ color: '#7A5C00' }}>Para emprendedores, creadores y líderes</p>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
                Quienes acompañan a otros, crean y lideran también necesitan recargar. Las mejores ideas, decisiones y proyectos nacen desde un lugar de claridad y presencia — no desde el agotamiento.
              </p>
              <ul className="space-y-2">
                {[
                  'Emprendedores y empresarios que quieren reconectar con el propósito',
                  'Networking orgánico con invitados especiales y referentes',
                  'Artistas, creativos y creadores de contenido buscando inspiración',
                  'Líderes, coaches y facilitadores que necesitan soltar el rol',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: '#8B6A00' }}>—</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVIDADES ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.fire }}>
              Qué vas a encontrar
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.dark }}>
              Cada propuesta es una puerta.<br />
              <span style={{ color: C.green }}>Vos elegís cómo transitarla.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5" data-reveal data-delay="1">
            {[
              {
                Icon: Flame,
                color: C.fire,
                bg: 'rgba(170,62,17,0.07)',
                border: 'rgba(170,62,17,0.2)',
                cat: 'Ritual & Conexión',
                items: ['Ceremonia de Temazcal', 'Ceremonia de fuego', 'Círculos de palabra', 'Espacios de silencio y presencia'],
              },
              {
                Icon: Music,
                color: '#005333',
                bg: 'rgba(0,83,51,0.05)',
                border: 'rgba(0,83,51,0.15)',
                cat: 'Expresión & Comunidad',
                items: ['Ecstatic Dance y danza libre', 'Meditaciones en movimiento', 'Círculos de canto', 'Jam sessions'],
              },
              {
                Icon: Star,
                color: '#2A1708',
                bg: 'rgba(42,23,8,0.05)',
                border: 'rgba(42,23,8,0.12)',
                cat: 'Naturaleza & Conocimiento',
                items: ['Astroturismo — observación del cielo', 'Avistaje de aves', 'Caminatas conscientes', 'Interpretación del territorio'],
              },
              {
                Icon: Heart,
                color: '#8B6A00',
                bg: 'rgba(212,175,55,0.06)',
                border: 'rgba(212,175,55,0.25)',
                cat: 'Bienestar & Integración',
                items: ['Alimentación consciente', 'Espacios de descanso', 'Integración cuerpo–mente–emociones', 'Programación especial al amanecer y atardecer'],
              },
            ].map(({ Icon, color, bg, border, cat, items }) => (
              <div key={cat} className="rounded-2xl p-7 border" style={{ backgroundColor: bg, borderColor: border }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={18} color={color} />
                  </div>
                  <p className="font-bold text-sm uppercase tracking-wider" style={{ color }}>{cat}</p>
                </div>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: C.muted }}>
                      <span className="flex-shrink-0 mt-1" style={{ color }}>◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATO ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.night }}>
        <div className="max-w-4xl mx-auto text-center" data-reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-5" style={{ color: 'rgba(212,175,55,0.6)' }}>
            Formato
          </p>
          <h2 className="text-3xl md:text-4xl serif-title text-white mb-12">
            20 y 21 de junio
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: Sun,      iconColor: C.gold,                      label: 'Ingreso abierto',        desc: 'Ambos días, todo el día' },
              { Icon: Leaf,     iconColor: 'rgba(100,200,120,0.9)',      label: 'Actividades',            desc: 'Durante toda la jornada' },
              { Icon: Star,     iconColor: 'rgba(255,255,255,0.6)',      label: 'Programación especial',  desc: 'Al amanecer y al atardecer' },
              { Icon: Flame,    iconColor: '#F4A261',                    label: 'Ceremonia central',      desc: 'Noche del 20 de junio' },
            ].map(({ Icon, iconColor, label, desc }) => (
              <div key={label} className="rounded-2xl p-6 text-center border" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    <Icon size={18} color={iconColor} />
                  </div>
                </div>
                <p className="font-semibold text-sm text-white mb-1">{label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Modalidades de participación
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Elegís cómo sumarte
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: C.muted }}>
              Podés venir a pasar el día, quedarte todo el fin de semana o sumarte a actividades puntuales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {/* Pase diario */}
            <div className="rounded-2xl p-7 border text-left" style={{ borderColor: '#E5DDD5', backgroundColor: C.cream }}>
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: '#A0866E' }}>Pase por el día</p>
              <p className="text-3xl font-bold serif-title mb-1" style={{ color: C.dark }}>$60.000</p>
              <p className="text-xs mb-5" style={{ color: C.faint }}>por persona · un día a elección</p>
              <ul className="space-y-2 mb-7">
                {[
                  'Acceso a todas las actividades del día',
                  'Llegás y te vas cuando quieras',
                  'Sin alojamiento ni comidas',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: C.green }}>✓</span>{i}
                  </li>
                ))}
              </ul>
              <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer"
                className="block text-center py-3 px-4 rounded-xl border font-bold text-sm transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                Quiero el pase diario
              </a>
            </div>

            {/* Experiencia completa — habitación destacada */}
            <div className="rounded-2xl p-7 border text-left relative" style={{ borderColor: 'rgba(0,83,51,0.35)', backgroundColor: 'rgba(0,83,51,0.05)' }}>
              <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: C.green, color: C.gold }}>Más cómodo</span>
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: C.green }}>Experiencia completa</p>
              <p className="text-3xl font-bold serif-title mb-1" style={{ color: C.green }}>$180.000</p>
              <p className="text-xs mb-5" style={{ color: '#6B4A33' }}>por persona · con habitación compartida</p>
              <ul className="space-y-2 mb-7">
                {[
                  'Todas las actividades ambos días',
                  'Habitación compartida',
                  'Ropa blanca, toalla y toallón individual',
                  'Todas las comidas incluidas',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#3D2516' }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: C.green }}>✓</span>{i}
                  </li>
                ))}
              </ul>
              <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer"
                className="block text-center py-3 px-4 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: C.green }}>
                Reservar habitación
              </a>
            </div>

            {/* Acantonamiento */}
            <div className="rounded-2xl p-7 border text-left" style={{ borderColor: 'rgba(212,175,55,0.4)', backgroundColor: 'rgba(212,175,55,0.04)' }}>
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: '#8B6A00' }}>Pase fin de semana</p>
              <p className="text-3xl font-bold serif-title mb-1" style={{ color: '#4A3210' }}>$140.000</p>
              <p className="text-xs mb-5" style={{ color: '#8B6A00' }}>por persona · con acantonamiento</p>
              <ul className="space-y-2 mb-7">
                {[
                  'Todas las actividades ambos días',
                  'Alojamiento en salón calefaccionado',
                  'Traer colchoneta y bolsa de dormir',
                  'Todas las comidas incluidas',
                ].map(i => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#8B6A00' }}>✓</span>{i}
                  </li>
                ))}
              </ul>
              <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer"
                className="block text-center py-3 px-4 rounded-xl border font-bold text-sm transition-colors"
                style={{ borderColor: 'rgba(212,175,55,0.4)', color: '#7A5C00', backgroundColor: 'rgba(212,175,55,0.08)' }}>
                Reservar acantonamiento
              </a>
            </div>
          </div>

          <p className="text-center text-sm mt-8" style={{ color: C.faint }}>
            ¿Dudas sobre qué opción elegir?{' '}
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: C.green }}>
              Escribinos por WhatsApp
            </a>{' '}
            y te ayudamos.
          </p>
        </div>
      </section>

      {/* ── EL LUGAR ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: C.green }}>El lugar</p>
              <h2 className="text-3xl md:text-4xl serif-title mb-5 leading-tight" style={{ color: C.green }}>
                Pueblo Mágico,<br />Los Gigantes
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: C.muted }}>
                Un eco-centro de montaña en las Sierras Grandes de Córdoba. Un espacio que ya respira lo que este encuentro propone — naturaleza, comunidad y presencia.
              </p>
              <ul className="space-y-3">
                {[
                  'Sierras Grandes de Córdoba · Los Gigantes',
                  'A 90 km de Córdoba Capital',
                  'Acceso para todo tipo de vehículos',
                  'Salones, espacios abiertos, fogón y senderos',
                  '200 hectáreas de reserva natural',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: C.muted }}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: C.green }}>—</span>{item}
                  </li>
                ))}
              </ul>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-7 text-sm font-semibold border rounded-full px-6 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                ¿Cómo llegar? Consultanos
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl" data-reveal data-delay="1">
              <img
                src={img('/uploads/dji_0074.webp', 900)}
                alt="Vista aérea de Mágico Ensueño"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ ES EL INTI RAYMI ── */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.night }}>
        <div className="max-w-3xl mx-auto text-center" data-reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase font-semibold mb-5" style={{ color: 'rgba(212,175,55,0.6)' }}>
            ¿Qué es el Inti Raymi?
          </p>
          <h2 className="text-3xl md:text-4xl serif-title text-white mb-6">
            Una celebración ancestral<br />que honra el regreso del Sol
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
            En el corazón del invierno, cuando la noche alcanza su punto máximo, nos reunimos para honrar un nuevo comienzo.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Es un momento de cierre y apertura. De soltar lo viejo y sembrar lo nuevo. Un recordatorio de que, incluso en la oscuridad, <strong className="text-white">la luz siempre vuelve.</strong>
          </p>
          <p className="font-serif italic" style={{ color: C.gold }}>
            Un encuentro abierto a todo público, donde cada persona puede vivir la experiencia a su manera.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-start">

            {/* Left — título */}
            <div className="md:col-span-2" data-reveal>
              <p className="inline-block text-white px-3 py-1.5 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
                style={{ backgroundColor: C.green }}>
                Preguntas
              </p>
              <h2 className="text-3xl md:text-4xl serif-title leading-tight mb-5" style={{ color: C.green }}>
                Todo lo que necesitás saber
              </h2>
              <p className="text-sm leading-relaxed mb-7" style={{ color: C.muted }}>
                ¿Quedó alguna duda? Escribinos por WhatsApp y te respondemos al momento.
              </p>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold border rounded-full px-5 py-2.5 transition-colors hover:bg-brand-green hover:text-white hover:border-brand-green"
                style={{ borderColor: 'rgba(0,83,51,0.3)', color: C.green }}>
                Escribirnos
              </a>
            </div>

            {/* Right — preguntas como cards */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal data-delay="1">
              {[
                {
                  n: '01',
                  q: '¿Necesito experiencia previa?',
                  a: 'No. Es un encuentro abierto a todo público. Cada persona participa desde su propio lugar, sin importar si es su primera vez.',
                },
                {
                  n: '02',
                  q: '¿Puedo venir solo un día?',
                  a: 'Sí. El pase diario ($60.000) te da acceso a todas las actividades de la jornada que elijas — el 20, el 21 o ambos.',
                },
                {
                  n: '03',
                  q: '¿Es para familias con chicos?',
                  a: 'Sí, toda la familia es bienvenida. Es una celebración colectiva con espíritu comunitario — hay espacio para todas las edades.',
                },
                {
                  n: '04',
                  q: '¿Qué llevo para el acantonamiento?',
                  a: 'Colchoneta y bolsa de dormir. El salón es calefaccionado. Todas las comidas y actividades están incluidas.',
                },
                {
                  n: '05',
                  q: '¿Los cupos son limitados?',
                  a: 'Sí. Recomendamos reservar con anticipación para asegurar tu lugar y el de tu familia o grupo.',
                },
                {
                  n: '06',
                  q: '¿Cómo llego al lugar?',
                  a: 'Pueblo Mágico queda en Los Gigantes, Córdoba — a 90 km de Córdoba Capital. Acceso para todo tipo de vehículos. Consultanos y te mandamos el mapa.',
                },
              ].map(({ n, q, a }) => (
                <div key={n} className="rounded-2xl p-6 border bg-white" style={{ borderColor: 'rgba(0,83,51,0.1)' }}>
                  <span className="block text-4xl font-bold serif-title leading-none mb-3"
                    style={{ color: 'rgba(0,83,51,0.08)' }}>{n}</span>
                  <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: C.dark }}>{q}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{a}</p>
                </div>
              ))}
            </div>

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
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(170,62,17,0.3)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <Flame size={26} color={C.gold} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl serif-title text-white mb-6 leading-tight">
            Sumate a la celebración
          </h2>
          <p className="text-base leading-relaxed mb-4 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            A compartir el fuego. A cantar en comunidad.<br />A mirar el cielo. A escuchar la tierra.
          </p>
          <p className="font-serif italic mb-10" style={{ color: C.gold }}>
            Y a recordar, juntos, lo esencial.
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
            20 y 21 de junio · Pueblo Mágico, Los Gigantes, Córdoba
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IntiRaymi;
