import React, { useState, useEffect } from 'react';
import { Flame, Leaf, Heart, Star, Users, Sun, Moon, Mountain, Sprout, Calendar, Compass, ChevronDown, Instagram, Linkedin, Home, Handshake, Sparkles, Utensils, ShieldCheck, type LucideIcon } from 'lucide-react';
import { img } from './lib/img';
import { WA_MAGICO } from './data/config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const WA_INFO    = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('¡Hola! Me interesa el Pachamama Fest del 14 al 17 de agosto. ¿Me pueden dar más info?')}`;
const WA_RESERVA = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent('¡Hola! Quiero reservar mi lugar para el Pachamama Fest del 14 al 17 de agosto. ¿Cómo procedo?')}`;

const C = {
  green:     '#005333', // Pantone P138-16U · verano
  gold:      '#D4AF37',
  fire:      '#AA3E11', // Pantone P38-16U · invierno
  primavera: '#9D005E', // Pantone P81-16U · primavera
  night:     '#0F1A12',
  cream:     '#FDFBF7',
  dark:      '#2A1708',
  muted:     '#6B4A33',
  faint:     '#8B6347',
};

// ─── Equipo & anfitriones ────────────────────────────────────────────────────────
type TeamMember = { photo: string; nombre: string; rol: string; desc: string; instagram?: string; linkedin?: string; tags?: string[] };

const HOSTS: TeamMember[] = [
  {
    photo: '/uploads/Diego_perfil.png',
    nombre: 'Diego Epelman Hodara',
    rol: 'Fundador de Pueblo Mágico',
    desc: 'Emprendedor, Facilitador & Guía de Dinámicas de Alto Impacto. Sostén energético del festival desde los fogones, los círculos y la presencia.',
    instagram: 'https://www.instagram.com/diegoepel/',
  },
  {
    photo: '/uploads/china.jpeg',
    nombre: 'China Dericia',
    rol: 'Anfitriona del Pueblo',
    desc: 'Profe de Yoga & Facilitadora de Movimiento Consciente. Consciencia corporal, meditaciones y canto — guía el cuerpo y la energía del grupo.',
    instagram: 'https://www.instagram.com/bambu.alquimia.terapeutica/',
  },
];

const TEAM: TeamMember[] = [
  {
    photo: '/uploads/isvara-rojas.jpg',
    nombre: 'Isvara Rojas Romero',
    rol: 'Host de emprendedores y creativos',
    desc: 'Estratega polímata y Growth Engineer. Conecta la innovación tecnológica y el diseño de vanguardia con filosofías ancestrales de la Tierra.',
    instagram: 'https://www.instagram.com/isvara_strategist/',
    linkedin: 'https://www.linkedin.com/in/isvara-rojas-romero-53a20a298/',
    tags: ['KINTU'],
  },
  {
    photo: '/uploads/luz-candela.jpg',
    nombre: 'Luz Candela',
    rol: 'Mentora de emprendedores/as & profesionales',
    desc: 'Coach Integral & Mentora de Marcas Personales. Creadora de la Comunidad Mujeres Amatistas. Instructora de Yoga, meditación y pranayamas.',
    instagram: 'https://www.instagram.com/mujeramatistaa/',
    tags: ['KINTU'],
  },
  {
    photo: '/uploads/tomas-fossatti.jpg',
    nombre: 'Tomás Fossatti',
    rol: 'Host de emprendedores/as',
    desc: 'Ingeniero en innovación y desarrollo, emprendedor y speaker de TEDx. Construye sistemas agénticos recursivos en la intersección de la tecnología y el propósito.',
    instagram: 'https://www.instagram.com/tomasfossatti_/',
    linkedin: 'https://www.linkedin.com/in/tomas-fossatti-ing',
    tags: ['KINTU'],
  },
  {
    photo: '/uploads/nicole-rosignoli.webp',
    nombre: 'Nicole Rosignoli Miranda',
    rol: 'Psicología · Gestalt · Salud Cíclica',
    desc: 'Licenciada en Psicología (UNC). Acompaña desde el enfoque gestáltico y la salud cíclica, integrando plantas medicinales, movimiento corporal y círculos de mujeres.',
    instagram: 'https://www.instagram.com/thematriiz/',
  },
  {
    photo: '/uploads/santiago-alzogaray.png',
    nombre: 'Santiago Alzogaray',
    rol: 'Ceremonia de Temazcal',
    desc: 'Conducción del ritual de purificación, uno de los momentos centrales del Pachamama Fest.',
  },
  {
    photo: '/uploads/Walter_E._Cejas.jpg',
    nombre: 'Walter Eugenio Cejas',
    rol: 'Biólogo · Investigador · Vida Silvestre',
    desc: 'Puente entre el conocimiento científico y la experiencia directa de la Sierra de Achala. Guía avistaje de aves, flora y fauna en la montaña.',
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ_ICONS: LucideIcon[] = [Star, Calendar, Users, Moon, Flame, Compass, Heart, Leaf, Sprout];

const FAQS = [
  {
    q: '¿Necesito experiencia previa?',
    a: 'No. Es un encuentro abierto a todo público. Cada persona participa desde su propio lugar, sin importar si es su primera vez en un ritual o retiro.',
  },
  {
    q: '¿Cuál es la diferencia entre Experiencia completa y Pijamada?',
    a: 'Experiencia completa incluye cama en domo o refugio compartido. Pijamada es sin cama: dormís en nuestro salón principal sobre tu propio colchón o colchoneta. El resto —comidas y actividades— es igual en ambas.',
  },
  {
    q: '¿Cómo funcionan los precios?',
    a: 'En Experiencia completa: 1 noche según el día (viernes o lunes $65.000, sábado $75.000, domingo —día de la Ofrenda— $90.000), 2 noches $140.000, 3 noches (festival completo, ya incluye la Ofrenda + Temazcal) $190.000. En Pijamada: 1 noche $60.000, 2 noches $115.000 (incluye cualquier día, incluida la Ofrenda), 3 noches (festival completo) $150.000. Si tu estadía no incluye el domingo, podés sumar la noche de la Ofrenda + Temazcal con un aporte mínimo sugerido de $30.000.',
  },
  {
    q: '¿Qué pasa si no me gusta la experiencia?',
    a: 'Te devolvemos tu dinero. Estamos tan seguros de que esta experiencia es transformadora que la pusimos a menos de la mitad de lo que realmente vale — si sentís que no la disfrutaste o que te dejó indiferente, te lo reembolsamos.',
  },
  {
    q: '¿Puedo venir solo el domingo, sin quedarme a dormir?',
    a: 'Sí. Podés sumarte solo a la ceremonia de Ofrenda + Temazcal con un aporte mínimo sugerido de $30.000 — como toda ofrenda, este encuentro también se sostiene por el intercambio, y ese aporte está muy por debajo de lo que representa. No incluye comida, pero podés consultarnos por opciones caseras y nutritivas aparte.',
  },
  {
    q: '¿En qué consiste la ceremonia de ofrenda a la Pachamama?',
    a: 'El domingo realizamos un ritual ancestral para agradecer a la Tierra por lo recibido, soltar lo que ya no nos sirve y sembrar intención para el nuevo ciclo. Es un momento simbólico y profundamente comunitario, acompañado de la ceremonia de Temazcal.',
  },
  {
    q: '¿Es para familias con chicos?',
    a: 'Sí, toda la familia es bienvenida. Es una celebración colectiva con espíritu comunitario — hay espacio para todas las edades.',
  },
  {
    q: '¿Qué llevo para la pijamada?',
    a: 'Colchoneta y bolsa de dormir. Dormís en nuestro salón principal, un espacio cálido y compartido. Todas las comidas y actividades están incluidas.',
  },
  {
    q: '¿Los cupos son limitados?',
    a: 'Sí. Recomendamos reservar con anticipación para asegurar tu lugar y el de tu familia o grupo.',
  },
  {
    q: '¿Cómo llego al lugar?',
    a: 'Pueblo Mágico queda en Los Gigantes, Córdoba — a 90 km de Córdoba Capital. Acceso para todo tipo de vehículos. Consultanos y te mandamos el mapa.',
  },
  {
    q: '¿Tienen opciones para dietas o alergias?',
    a: 'Sí, tenemos opciones de comida para todo tipo de dietas y restricciones alimentarias. Contanos tu caso al reservar.',
  },
];

// ─── Countdown ─────────────────────────────────────────────────────────────────
const Countdown: React.FC = () => {
  const target = new Date('2026-08-14T09:00:00').getTime();
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

// ─── Precios ────────────────────────────────────────────────────────────────────
const fmt = (n: number) => `$${Math.round(n).toLocaleString('es-AR')}`;

// El aporte de la Ofrenda + Temazcal es un mínimo sugerido, no un precio fijo —
// se ofrenda desde la voluntad; este número solo sostiene la logística del ritual.
const APORTE_OFRENDA = 30000;

type Modalidad = 'completa' | 'pijamada' | 'dia';

// La única noche (en Experiencia completa, con cama) tiene precio distinto según el día.
type DiaKey = 'viernes' | 'sabado' | 'domingo' | 'lunes';
type DiaOpcion = { dia: DiaKey; label: string; precio: number; ofrendaIncluida: boolean };
const DIAS_UNA_NOCHE: DiaOpcion[] = [
  { dia: 'viernes', label: 'Viernes',          precio: 65000, ofrendaIncluida: false },
  { dia: 'sabado',  label: 'Sábado',           precio: 75000, ofrendaIncluida: false },
  { dia: 'domingo', label: 'Domingo · Ofrenda', precio: 90000, ofrendaIncluida: true },
  { dia: 'lunes',   label: 'Lunes',            precio: 65000, ofrendaIncluida: false },
];

type NocheOpcion = {
  noches: number;
  label: string;
  precio: number;
  ofrendaIncluida: boolean;
  // Cuánto ahorrás vs. pagar esas noches por separado (solo 2 y 3 noches).
  ahorro?: number;
};

type HospedajeTier = {
  key: 'completa' | 'pijamada';
  label: string;
  subtitle: string;
  headColor: string;
  bgColor: string;
  borderColor: string;
  items: string[];
  opciones: NocheOpcion[];
  nota: string;
  cta: string;
};

const HOSPEDAJE_TIERS: HospedajeTier[] = [
  {
    key: 'completa',
    label: 'Experiencia completa',
    subtitle: 'Con cama, en domo o refugio compartido',
    headColor: C.green,
    bgColor: 'rgba(0,83,51,0.05)',
    borderColor: 'rgba(0,83,51,0.35)',
    items: [
      'Acceso a todas las actividades durante tu estadía',
      'Cama en domo o refugio compartido',
      'Ropa blanca, toalla y toallón individual',
    ],
    opciones: [
      { noches: 1, label: '1 noche', precio: 65000, ofrendaIncluida: false },
      { noches: 2, label: '2 noches', precio: 140000, ofrendaIncluida: false, ahorro: 25000 },
      { noches: 3, label: '3 noches · Festival completo', precio: 190000, ofrendaIncluida: true, ahorro: 40000 },
    ],
    nota: 'Recomendada para vivir el proceso completo',
    cta: 'Reservar habitación',
  },
  {
    key: 'pijamada',
    label: 'Pijamada',
    subtitle: 'Sin cama — traés tu colchón o colchoneta, dormís en el salón',
    headColor: '#8B6A00',
    bgColor: 'rgba(212,175,55,0.04)',
    borderColor: 'rgba(212,175,55,0.4)',
    items: [
      'Acceso a todas las actividades durante tu estadía',
      'Sin cama — dormís en el salón (traés tu colchón o colchoneta)',
      'Espacio cálido y compartido',
    ],
    opciones: [
      { noches: 1, label: '1 noche', precio: 60000, ofrendaIncluida: false },
      { noches: 2, label: '2 noches', precio: 115000, ofrendaIncluida: true, ahorro: 5000 },
      { noches: 3, label: '3 noches · Festival completo', precio: 150000, ofrendaIncluida: true, ahorro: 30000 },
    ],
    nota: 'Ideal si querés venir con presupuesto más accesible',
    cta: 'Reservar pijamada',
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const PachamamaFest: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [alimentacionOpen, setAlimentacionOpen] = useState(false);
  const [hostsOpen, setHostsOpen] = useState(false);
  const [equipoOpen, setEquipoOpen] = useState(false);
  const [temazcalOfrendaOpen, setTemazcalOfrendaOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const [modalidad, setModalidad] = useState<Modalidad>('completa');
  const [nochesSeleccion, setNochesSeleccion] = useState(3);
  const [incluyeOfrendaExtra, setIncluyeOfrendaExtra] = useState(false);
  const [diaUnaNoche, setDiaUnaNoche] = useState<DiaKey>('viernes');

  useEffect(() => {
    document.title = 'Pachamama Fest · 14 al 17 de Agosto · Pueblo Mágico';
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 600;
      setShowStickyBar(y > 500 && !nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tier = modalidad !== 'dia' ? HOSPEDAJE_TIERS.find(t => t.key === modalidad)! : null;
  const esUnaNocheEnCama = modalidad === 'completa' && nochesSeleccion === 1;
  const diaInfo = esUnaNocheEnCama ? DIAS_UNA_NOCHE.find(d => d.dia === diaUnaNoche)! : null;
  const opcionBase = tier ? tier.opciones.find(o => o.noches === nochesSeleccion)! : null;
  const opcion = diaInfo
    ? { ...opcionBase!, label: `1 noche · ${diaInfo.label}`, precio: diaInfo.precio, ofrendaIncluida: diaInfo.ofrendaIncluida }
    : opcionBase;

  const totalEfectivo = modalidad === 'dia'
    ? APORTE_OFRENDA
    : opcion!.precio + (!opcion!.ofrendaIncluida && incluyeOfrendaExtra ? APORTE_OFRENDA : 0);
  const totalCuotas = totalEfectivo * 1.2;
  const cuotaMensual = totalCuotas / 3;

  const detalleSeleccion = modalidad === 'dia'
    ? 'Domingo · Ofrenda + Temazcal'
    : `${opcion!.label}${opcion!.ofrendaIncluida ? ' · incluye la Ofrenda + Temazcal' : incluyeOfrendaExtra ? ' + la Ofrenda + Temazcal' : ''}`;
  const etiquetaModalidad = modalidad === 'dia' ? 'Pase del día · Ofrenda + Temazcal' : tier!.label;
  const waMsgCalc = modalidad === 'dia'
    ? `¡Hola! Quiero sumarme al Pachamama Fest el domingo (Ofrenda + Temazcal).\n\nAporte: ${fmt(APORTE_OFRENDA)}\n\n¿Cómo sigo?`
    : `¡Hola! Quiero reservar en el Pachamama Fest.\n\n${etiquetaModalidad}\n${detalleSeleccion}\nTotal: ${fmt(totalEfectivo)} (o 3x ${fmt(cuotaMensual)})\n\n¿Cómo sigo?`;
  const waCalcUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(waMsgCalc)}`;

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

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-10 md:pb-0 flex flex-col md:items-center md:text-center">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center md:justify-center gap-2 sm:gap-3 mb-4">
            <span className="inline-block max-w-full px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.4em] uppercase font-bold border border-white/20 text-white/70 whitespace-nowrap">
              <span className="sm:hidden">14-17 Ago · Los Gigantes</span>
              <span className="hidden sm:inline">14 al 17 de agosto · Los Gigantes, Córdoba</span>
            </span>
            <span
              className="inline-block max-w-full px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase font-bold whitespace-nowrap"
              style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#F4C27A', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              Finde largo en la montaña
            </span>
            <span
              className="inline-block max-w-full px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-wide sm:tracking-widest uppercase font-bold whitespace-nowrap"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Para todo público
            </span>
          </div>

          <p className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">Festival Consciente</p>
          <h1 className="text-5xl md:text-7xl serif-title leading-none mb-4 text-white">
            Pachamama<br /> <span style={{ color: C.gold }}>Fest</span>
          </h1>
          <p className="text-white/65 text-sm md:text-lg leading-relaxed max-w-lg md:max-w-2xl mt-4 mb-6 md:mt-5 md:mb-10">
            Una experiencia en la montaña para honrar a la Tierra, agradecer, soltar y abrir un nuevo ciclo celebrando la vida a lo grande. Vení a vivir el finde largo en comunidad, ritual, música y conexión profunda en las Sierras Grandes de Córdoba.
          </p>

          <p className="text-sm sm:text-base font-semibold mb-3" style={{ color: C.gold }}>
            Desde $30.000
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

          <a href="#precios" className="inline-flex items-center gap-1.5 text-white/50 hover:text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider mt-6 transition-colors">
            Ver precios
            <ChevronDown size={14} className="animate-bounce" style={{ animationDuration: '1.8s' }} />
          </a>

          <p className="text-white/40 text-xs sm:text-sm mt-6 max-w-md leading-relaxed">
            Abierto a todo público, sin experiencia previa. Todas las actividades son una invitación — sumate a las que quieras, nada es obligatorio.
          </p>
        </div>
      </section>

      {/* ── ESENCIA ── */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden"
        style={{ backgroundImage: `url(${img('/uploads/pachamama-cielo-estrellado.webp', 1800)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15,26,18,0.86)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12" data-reveal>
            <div className="flex justify-center gap-5 mb-10">
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,83,51,0.25)' }}>
                <Sprout size={20} color="#7DD3A0" />
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(170,62,17,0.25)' }}>
                <Flame size={20} color="#F4A261" />
              </div>
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,55,0.2)' }}>
                <Mountain size={20} color={C.gold} />
              </div>
            </div>
            <blockquote className="text-2xl md:text-4xl serif-title text-white leading-relaxed mb-4">
              "Volvemos a la Tierra.<br />
              Volvemos a la raíz.<br />
              <span style={{ color: C.gold }}>Volvemos a la Pachamama."</span>
            </blockquote>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Agosto es el mes de la Pachamama. Que este encuentro suceda ahora no es casualidad: es el momento en que la Tierra escucha, nos invita a pausar, agradecer lo recibido y abrir un nuevo ciclo.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-5" data-reveal data-delay="1">
            {[
              { Icon: Sprout, title: 'Volver a la raíz', desc: 'Un momento para conectar con lo ancestral, ofrendar y recordar que somos parte de la naturaleza.' },
              { Icon: Flame, title: 'Ritual & fuego', desc: 'Fogones, música y ceremonia como corazón del encuentro, noche tras noche.' },
              { Icon: Users, title: 'Comunidad', desc: 'Un finde largo en un lugar hermosísimo, en comunidad y conexión profunda.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-3 md:p-6 border text-center" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div className="w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4" style={{ backgroundColor: 'rgba(212,175,55,0.12)' }}>
                  <Icon size={15} color={C.gold} />
                </div>
                <p className="font-bold text-white text-xs md:text-base mb-0 md:mb-2 leading-tight">{title}</p>
                <p className="text-white/50 text-sm leading-relaxed hidden md:block">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-delay="2">
            {['Abierto a todo público', 'Ofrenda a la Pachamama', 'Ceremonia de Temazcal', 'Toda la familia bienvenida'].map(tag => (
              <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full border font-medium"
                style={{ borderColor: 'rgba(212,175,55,0.3)', color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(212,175,55,0.06)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRONOGRAMA ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.fire }}>
              Cronograma
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.dark }}>
              14 al 17 de agosto
            </h2>
            <p className="text-base max-w-lg mx-auto mb-3" style={{ color: C.muted }}>
              Cuatro días para llegar, celebrar, ofrendar e integrar — a tu ritmo.
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.faint }}>
              <span style={{ color: C.fire }}>Cerramos el invierno</span> · <span style={{ color: C.primavera }}>abrimos la primavera</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-5" data-reveal data-delay="1">
            {[
              {
                Icon: Moon,
                day: 'Viernes · apertura',
                dayShort: 'Viernes',
                title: 'Llegada & bienvenida',
                desc: 'Recepción, llegada a la montaña y apertura del encuentro. Nos encontramos, bajamos el ritmo y comenzamos a entrar en sintonía con la naturaleza y el grupo. Por la noche, primer fuego: intención, apertura y conexión.',
                accent: C.fire,
              },
              {
                Icon: Sun,
                day: 'Sábado · todo el día',
                dayShort: 'Sábado',
                title: 'Día de celebración',
                desc: 'Caminatas, música, baile, mates y naturaleza — nos amoldamos al clima, pero seguro lo disfrutamos profundamente. De noche, fogón: el momento para agradecer y entregar al fuego todo lo que ya no queremos seguir cargando.',
                accent: C.fire,
              },
              {
                Icon: Flame,
                day: 'Domingo · noche de la Ofrenda',
                dayShort: 'Domingo',
                title: 'Ritual & celebración',
                desc: null,
                accent: C.primavera,
              },
              {
                Icon: Compass,
                day: 'Lunes · cierre',
                dayShort: 'Lunes',
                title: 'Integración & regreso',
                desc: 'Un espacio más calmo para integrar lo vivido. Journaling, meditación, caminata consciente y cierre del círculo. Nos llevamos la experiencia a la vida cotidiana, con más claridad, conexión y propósito.',
                accent: C.primavera,
              },
            ].map(({ Icon, day, dayShort, title, desc, accent }) => (
              <div key={title} className="rounded-2xl p-3.5 md:p-7 border text-left" style={{ borderColor: `${accent}25`, backgroundColor: `${accent}08` }}>
                <div className="w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-2.5 md:mb-4" style={{ backgroundColor: `${accent}18` }}>
                  <Icon size={15} color={accent} />
                </div>
                <p className="inline-block text-[8px] md:text-[9px] tracking-widest uppercase font-bold mb-2 md:mb-3 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
                  <span className="sm:hidden">{dayShort}</span>
                  <span className="hidden sm:inline">{day}</span>
                </p>
                <p className="font-bold text-xs md:text-base mb-1.5 md:mb-2" style={{ color: C.dark }}>{title}</p>
                {desc ? (
                  <p className="text-[11px] md:text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
                ) : (
                  <p className="text-[11px] md:text-sm leading-relaxed" style={{ color: C.muted }}>
                    Día de <a href="#ofrenda-temazcal" className="underline underline-offset-2 font-semibold hover:no-underline" style={{ color: accent }}>Ofrenda + Temazcal</a>. Agradecer, soltar y sembrar intención — el momento central del encuentro.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden" data-reveal data-delay="2"
            style={{ backgroundColor: 'rgba(157,0,94,0.04)', border: '1px solid rgba(157,0,94,0.18)' }}>
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, ${C.fire}, ${C.primavera})` }} />
            <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(157,0,94,0.12)' }}>
              <Heart size={18} color={C.primavera} />
            </div>
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-3" style={{ color: C.primavera }}>Para todos</p>
            <p className="text-lg md:text-xl serif-title mb-2" style={{ color: C.dark }}>Honrar y agradecer</p>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: C.muted }}>
              Agradecemos a la Pachamama por todo lo que nos da: alimento, refugio y vida. Reconocemos su abundancia y nos abrimos a recibir desde un lugar más consciente.
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
            <div className="grid grid-cols-2 gap-3" data-reveal data-delay="1">
              <div className="rounded-2xl overflow-hidden shadow-xl col-span-2">
                <img
                  src={img('/uploads/dji_0074.webp', 900)}
                  alt="Vista aérea de Pueblo Mágico"
                  className="w-full aspect-[16/9] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={img('/uploads/yoga_salon.webp', 600)}
                  alt="El salón · círculos y ceremonias"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={img('/uploads/hero-estadia.webp', 600)}
                  alt="El refugio de piedra al atardecer"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
                <img
                  src={img('/uploads/domos_2.jpg', 900)}
                  alt="Domos geodésicos de Pueblo Mágico"
                  className="w-full aspect-[16/9] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANFITRIONES ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: C.night }}>
        <button onClick={() => setHostsOpen(o => !o)} className="group relative z-10 w-full py-5 md:py-7 transition-colors duration-300 hover:bg-white/5" aria-expanded={hostsOpen}>
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Home size={22} color={C.gold} className="transition-transform duration-300 group-hover:scale-110" />
              <div className="text-left">
                <p className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: C.gold }}>Los guardianes del Pueblo</p>
                <h2 className="text-xl md:text-2xl serif-title text-white leading-tight">Anfitriones del espacio</h2>
              </div>
            </div>
            <span className={`text-white/60 text-2xl transition-all duration-300 flex-shrink-0 group-hover:text-white ${hostsOpen ? '' : 'animate-bounce'}`}
              style={{ transform: hostsOpen ? 'rotate(180deg)' : 'rotate(0deg)', animationDuration: '1.8s' }}>↓</span>
          </div>
        </button>
        <div className="relative z-10 overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: hostsOpen ? '700px' : '0px', opacity: hostsOpen ? 1 : 0 }}>
          <div className="px-6 pb-12 pt-2 max-w-4xl mx-auto">
            <p className="text-sm leading-relaxed max-w-lg mb-6 text-white/60">
              Diego y China no son anfitriones de temporada. Viven acá, todo el año. Son los primeros habitantes permanentes de Pueblo Mágico.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {HOSTS.map(({ photo, nombre, rol, desc, instagram }) => (
                <div key={nombre} className="flex items-start gap-4 rounded-2xl p-5 border" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <img src={img(photo, 120)} alt={nombre} className="w-14 h-14 rounded-full object-cover flex-shrink-0" loading="lazy" />
                  <div>
                    <p className="font-bold text-sm mb-0.5 text-white">{nombre}</p>
                    <p className="text-xs font-semibold mb-2" style={{ color: C.gold }}>{rol}</p>
                    <p className="text-xs leading-relaxed mb-2 text-white/60">{desc}</p>
                    {instagram && (
                      <a href={instagram} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-white/70">
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

      {/* ── EQUIPO + PRODUCCIÓN · KINTU ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#132419' }}>
        <button onClick={() => setEquipoOpen(o => !o)} className="group relative z-10 w-full py-5 md:py-7 transition-colors duration-300 hover:bg-white/5" aria-expanded={equipoOpen}>
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Handshake size={22} color={C.gold} className="transition-transform duration-300 group-hover:scale-110" />
              <div className="text-left">
                <p className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: C.gold }}>Facilitadores & producción</p>
                <h2 className="text-xl md:text-2xl serif-title text-white leading-tight">Equipo</h2>
              </div>
            </div>
            <span className={`text-white/60 text-2xl transition-all duration-300 flex-shrink-0 group-hover:text-white ${equipoOpen ? '' : 'animate-bounce'}`}
              style={{ transform: equipoOpen ? 'rotate(180deg)' : 'rotate(0deg)', animationDuration: '1.8s' }}>↓</span>
          </div>
        </button>
        <div className="relative z-10 overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: equipoOpen ? '3600px' : '0px', opacity: equipoOpen ? 1 : 0 }}>
          <div className="px-6 pb-12 pt-2 max-w-5xl mx-auto">
            <p className="text-sm leading-relaxed max-w-lg mb-6 text-white/60">
              Un equipo y una comunidad de referentes que suman su energía a esta celebración. Nos cruzaremos con ellos alrededor del fuego en distintos momentos del festival.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {TEAM.map(({ photo, nombre, rol, desc, instagram, linkedin, tags }) => (
                <div key={nombre} className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <img src={img(photo, 200)} alt={nombre} className="w-12 h-12 rounded-full object-cover mb-3" loading="lazy" />
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tags.map(tag => (
                        <span key={tag} className="text-[8px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border"
                          style={{ backgroundColor: 'rgba(212,175,55,0.1)', color: C.gold, borderColor: 'rgba(212,175,55,0.3)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-bold text-sm mb-0.5 text-white">{nombre}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.gold }}>{rol}</p>
                  <p className="text-xs leading-relaxed text-white/60">{desc}</p>
                  {(instagram || linkedin) && (
                    <div className="flex gap-2 mt-3">
                      {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${nombre}`}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          <Instagram size={12} color="white" />
                        </a>
                      )}
                      {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${nombre}`}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                          <Linkedin size={12} color="white" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Producción · Kintu */}
            <div className="rounded-2xl p-6 md:p-8 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-2" style={{ color: 'rgba(212,175,55,0.8)' }}>Una producción de</p>
              <h3 className="text-xl md:text-2xl serif-title text-white mb-4">Kintu</h3>
              <p className="text-sm leading-relaxed mb-3 text-white/70 max-w-xl mx-auto">
                KINTU es un equipo y una productora pionera en experiencias transformadoras que diseña viajes y procesos con corazón y propósito, inspirada en la cosmovisión andina —donde el kintu es una ofrenda.
              </p>
              <p className="text-sm leading-relaxed mb-6 text-white/70 max-w-xl mx-auto">
                Integrada por <span className="font-semibold text-white">Isvara, Diego, Tomi y Luz</span>.
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

      {/* ── ALIMENTACIÓN ── */}
      <section className="relative overflow-hidden"
        style={{ backgroundImage: `url(${img('/uploads/comida.jpg', 1400)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,26,18,0.92) 0%, rgba(15,26,18,0.88) 100%)' }} />
        <button onClick={() => setAlimentacionOpen(o => !o)} className="group relative z-10 w-full py-5 md:py-7 transition-colors duration-300 hover:bg-white/5" aria-expanded={alimentacionOpen}>
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Utensils size={22} color={C.gold} className="transition-transform duration-300 group-hover:scale-110" />
              <div className="text-left">
                <p className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: C.gold }}>Todas las comidas · incluidas</p>
                <h2 className="text-xl md:text-2xl serif-title text-white leading-tight">Alimentación</h2>
              </div>
            </div>
            <span className={`text-white/60 text-2xl transition-all duration-300 flex-shrink-0 group-hover:text-white ${alimentacionOpen ? '' : 'animate-bounce'}`}
              style={{ transform: alimentacionOpen ? 'rotate(180deg)' : 'rotate(0deg)', animationDuration: '1.8s' }}>↓</span>
          </div>
        </button>
        <div className="relative z-10 overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: alimentacionOpen ? '600px' : '0px', opacity: alimentacionOpen ? 1 : 0 }}>
          <div className="px-6 pb-12 pt-8 max-w-4xl mx-auto">
            <p className="text-base leading-relaxed mb-6 text-white/75">
              La alimentación es parte del ritual. Cada plato se prepara con ingredientes frescos, locales y de estación — comida real que agradece a la Tierra lo que nos da y sostiene la energía del encuentro.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Desayuno, almuerzo y cena incluidos', 'Ingredientes frescos y de estación', 'Preparado con cariño por nuestro equipo', 'Opciones para dietas y alergias'].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />
                  <p className="text-xs text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFRENDA + TEMAZCAL ── */}
      <section id="ofrenda-temazcal" className="relative overflow-hidden"
        style={{ backgroundImage: `url(${img('/uploads/temazcal.webp', 1400)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,26,18,0.92) 0%, rgba(15,26,18,0.88) 100%)' }} />
        <button onClick={() => setTemazcalOfrendaOpen(o => !o)} className="group relative z-10 w-full py-5 md:py-7 transition-colors duration-300 hover:bg-white/5" aria-expanded={temazcalOfrendaOpen}>
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Flame size={22} color={C.primavera} className="transition-transform duration-300 group-hover:scale-110" />
              <div className="text-left">
                <p className="text-[9px] tracking-[0.35em] uppercase font-semibold mb-1.5" style={{ color: C.primavera }}>Ceremonia central · domingo</p>
                <h2 className="text-xl md:text-2xl serif-title text-white leading-tight">Ofrenda a la Pachamama + Temazcal</h2>
              </div>
            </div>
            <span className={`text-white/60 text-2xl transition-all duration-300 flex-shrink-0 group-hover:text-white ${temazcalOfrendaOpen ? '' : 'animate-bounce'}`}
              style={{ transform: temazcalOfrendaOpen ? 'rotate(180deg)' : 'rotate(0deg)', animationDuration: '1.8s' }}>↓</span>
          </div>
        </button>
        <div className="relative z-10 overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: temazcalOfrendaOpen ? '1500px' : '0px', opacity: temazcalOfrendaOpen ? 1 : 0 }}>
          <div className="px-6 pb-12 pt-8 max-w-4xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.primavera }}>La Ofrenda</p>
            <div className="inline-block text-left rounded-2xl p-5 mb-6 max-w-xl mx-auto" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: C.primavera }}>Una aclaración necesaria</p>
              <p className="text-sm leading-relaxed text-white/70">
                "Pachamama" no significa literalmente "Madre Tierra" — eso es <span className="font-semibold text-white/90">Allpamama</span> (allpa = tierra/suelo). "Pacha" es un concepto más amplio: mundo, cosmos, espacio-tiempo. Pachamama es la Madre Cósmica que sostiene y da vida a todo lo que existe; en su manifestación terrenal se la reconoce como Allpamama.
              </p>
            </div>
            <p className="text-base leading-relaxed max-w-2xl mx-auto mb-5 text-white/75">
              La ofrenda —también llamada pago o despacho— es un acto de reciprocidad: se agradece por todo lo recibido y se devuelve algo a cambio, honrando el principio de la ayni. Se preparan elementos simbólicos —hojas de coca, granos, flores, dulces, sahumerios— que se entregan a la tierra con intención y gratitud.
            </p>
            <div className="inline-flex items-center gap-4 rounded-2xl px-6 py-4 mb-8" style={{ backgroundColor: 'rgba(157,0,94,0.12)', border: '1px solid rgba(157,0,94,0.3)' }}>
              <p className="text-3xl font-bold serif-title flex-shrink-0" style={{ color: C.primavera }}>$30.000</p>
              <p className="text-xs leading-relaxed text-left max-w-xs text-white/70">
                Aporte mínimo sugerido. Sumarte a esta ceremonia no tiene un precio fijo — se sostiene por intercambio y voluntad, la misma lógica de la propia ofrenda. Si podés dar más, es bienvenido.
              </p>
            </div>

            <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

            <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.gold }}>El Temazcal</p>
            <p className="text-base leading-relaxed max-w-2xl mx-auto mb-5 text-white/75">
              Una ceremonia ancestral de purificación y sanación del cuerpo físico, mental, emocional y espiritual — opcional, para quienes la sientan. Se realiza junto a la ofrenda, como cierre simbólico de todo lo que soltamos ese día.
            </p>
            <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8 text-white/55">
              Conducido por <span className="font-semibold text-white/85">Santiago Alzogaray</span>. Si tenés alguna condición de salud (presión, embarazo, problemas cardíacos o respiratorios), escribinos antes de sumarte — te asesoramos para que lo disfrutes con tranquilidad.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="#precios"
                className="inline-block text-sm font-semibold px-8 py-3 rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: C.primavera, color: 'white' }}>
                Quiero sumarme ese día
              </a>
              <a href={WA_INFO} target="_blank" rel="noopener noreferrer"
                className="inline-block border border-white/30 text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEÑAS · VALIDACIÓN SOCIAL ── */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10" data-reveal>
            <a href="https://maps.app.goo.gl/4c1nrpBbQf5hYrsE9" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 transition-colors hover:bg-black/5"
              style={{ borderColor: 'rgba(0,83,51,0.25)' }}>
              <span className="text-sm" style={{ color: C.gold }}>★★★★★</span>
              <span className="text-xs font-semibold" style={{ color: C.muted }}>5.0 · 64 reseñas en Google Maps</span>
            </a>
            <h2 className="text-2xl md:text-3xl serif-title mt-5" style={{ color: C.green }}>
              Lo que dicen quienes ya vivieron Mágico
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5" data-reveal data-delay="1">
            {[
              { text: 'Me sentí parte de la vida de la montaña, como en casa. Un refugio de paz inigualable.', name: 'Sofía R.', rol: 'Viajera' },
              { text: 'Una experiencia transformadora. La comida consciente y los espacios son de otro mundo.', name: 'Marcos D.', rol: 'Huésped' },
              { text: 'Lo más importante: el amor y la entrega de todo el equipo, y la capacidad de sentirte uno con la naturaleza.', name: 'Julieta C.', rol: 'Facilitadora' },
            ].map(t => (
              <div key={t.name} className="rounded-2xl p-6 border" style={{ borderColor: 'rgba(0,83,51,0.1)', backgroundColor: 'rgba(0,83,51,0.03)' }}>
                <p className="text-sm italic leading-relaxed mb-4" style={{ color: C.muted }}>"{t.text}"</p>
                <p className="font-bold text-sm" style={{ color: C.dark }}>{t.name}</p>
                <p className="text-xs" style={{ color: C.faint }}>{t.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" className="py-20 md:py-28 px-6" style={{ backgroundColor: '#F7F5F0' }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10" data-reveal>
            <p className="inline-block text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold"
              style={{ backgroundColor: C.green }}>
              Modalidades de participación
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4" style={{ color: C.green }}>
              Armá tu precio
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: C.muted }}>
              Elegí tu modalidad y tus noches — el total se calcula al instante, en efectivo o en 3 cuotas con tarjeta de crédito.
            </p>
          </div>

          <div data-reveal data-delay="1">
            {/* Paso 1: modalidad */}
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: C.faint }}>1. Elegí tu modalidad</p>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { key: 'completa' as const, label: 'Experiencia completa', desde: 65000, headColor: C.green, bgColor: 'rgba(0,83,51,0.05)' },
                { key: 'pijamada' as const, label: 'Pijamada', desde: 60000, headColor: '#8B6A00', bgColor: 'rgba(212,175,55,0.04)' },
                { key: 'dia' as const, label: 'Pase del día · Ofrenda', desde: APORTE_OFRENDA, headColor: C.primavera, bgColor: 'rgba(157,0,94,0.05)' },
              ].map(m => {
                const active = modalidad === m.key;
                return (
                  <button key={m.key} onClick={() => setModalidad(m.key)}
                    className="rounded-xl px-2 py-3 border text-center transition-colors"
                    style={{ borderColor: active ? m.headColor : 'rgba(0,83,51,0.12)', backgroundColor: active ? m.bgColor : 'white' }}>
                    <p className="text-xs font-bold mb-0.5 leading-tight" style={{ color: active ? m.headColor : C.dark }}>{m.label}</p>
                    <p className="text-[10px]" style={{ color: C.faint }}>desde {fmt(m.desde)}</p>
                  </button>
                );
              })}
            </div>
            <p className="text-xs mb-5" style={{ color: C.faint }}>
              {modalidad === 'completa' && 'Con cama, en domo o refugio compartido.'}
              {modalidad === 'pijamada' && 'Sin cama — traés tu colchón o colchoneta, dormís en el salón.'}
              {modalidad === 'dia' && 'Sin alojamiento — vení solo el domingo, a vivir la ceremonia.'}
            </p>

            {modalidad !== 'dia' ? (
              <>
                {/* Paso 2: noches */}
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: C.faint }}>2. Elegí tus noches</p>
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  {tier!.opciones.map(o => {
                    const active = nochesSeleccion === o.noches;
                    return (
                      <button key={o.noches} onClick={() => setNochesSeleccion(o.noches)}
                        className="rounded-xl px-2 py-3 border text-center transition-colors"
                        style={{ borderColor: active ? tier!.headColor : 'rgba(0,83,51,0.12)', backgroundColor: active ? tier!.bgColor : 'white' }}>
                        <p className="text-[11px] font-bold leading-tight" style={{ color: active ? tier!.headColor : C.dark }}>
                          {o.noches} noche{o.noches !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs font-bold serif-title" style={{ color: active ? tier!.headColor : C.dark }}>
                          {tier!.key === 'completa' && o.noches === 1 ? `Desde ${fmt(o.precio)}` : fmt(o.precio)}
                        </p>
                        {!!o.ahorro && (
                          <p className="text-[9px] font-bold mt-0.5" style={{ color: active ? tier!.headColor : '#2E8B57' }}>
                            Ahorrás {fmt(o.ahorro)}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>

                {esUnaNocheEnCama && (
                  <div className="mb-5">
                    <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: C.faint }}>2.1 ¿Qué día te quedás?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {DIAS_UNA_NOCHE.map(d => {
                        const active = diaUnaNoche === d.dia;
                        return (
                          <button key={d.dia} onClick={() => setDiaUnaNoche(d.dia)}
                            className="rounded-xl px-2 py-2.5 border text-center transition-colors"
                            style={{ borderColor: active ? tier!.headColor : 'rgba(0,83,51,0.12)', backgroundColor: active ? tier!.bgColor : 'white' }}>
                            <p className="text-[11px] font-bold leading-tight" style={{ color: active ? tier!.headColor : C.dark }}>{d.label}</p>
                            <p className="text-xs font-bold serif-title" style={{ color: active ? tier!.headColor : C.dark }}>{fmt(d.precio)}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {opcion!.ofrendaIncluida && (
                  <p className="text-[11px] font-semibold mb-6" style={{ color: C.primavera }}>{opcion!.label} — incluye la Ofrenda + Temazcal, sin cargo extra.</p>
                )}

                {!opcion!.ofrendaIncluida && (
                  <button
                    onClick={() => setIncluyeOfrendaExtra(o => !o)}
                    className="w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 border transition-colors mb-6"
                    style={{
                      borderColor: incluyeOfrendaExtra ? 'rgba(157,0,94,0.4)' : 'rgba(0,83,51,0.15)',
                      backgroundColor: incluyeOfrendaExtra ? 'rgba(157,0,94,0.08)' : 'white',
                    }}
                  >
                    <span className="text-left">
                      <span className="block text-sm font-semibold" style={{ color: incluyeOfrendaExtra ? C.primavera : C.dark }}>
                        Sumar la noche de la Ofrenda + Temazcal
                      </span>
                      <span className="block text-xs" style={{ color: C.faint }}>
                        domingo · + aporte mínimo sugerido {fmt(APORTE_OFRENDA)}
                      </span>
                    </span>
                    <span className="flex-shrink-0 w-11 h-6 rounded-full relative transition-colors"
                      style={{ backgroundColor: incluyeOfrendaExtra ? C.primavera : '#E5DDD5' }}>
                      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                        style={{ left: incluyeOfrendaExtra ? '22px' : '2px' }} />
                    </span>
                  </button>
                )}
              </>
            ) : (
              <div className="rounded-xl px-4 py-3 border mb-6" style={{ borderColor: 'rgba(157,0,94,0.25)', backgroundColor: 'rgba(157,0,94,0.05)' }}>
                <p className="text-sm font-semibold" style={{ color: C.primavera }}>Domingo · Ofrenda a la Pachamama + Temazcal</p>
                <p className="text-xs mt-1" style={{ color: C.faint }}>
                  Como toda ofrenda, este encuentro se sostiene también por el intercambio. {fmt(APORTE_OFRENDA)} es el aporte mínimo para que la ceremonia pueda seguir sucediendo — muy por debajo de lo que representa. Si sentís que podés dar más, sumá lo que tu corazón disponga.
                </p>
              </div>
            )}

            {/* Paso 3: resultado */}
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: C.faint }}>3. {modalidad === 'dia' ? 'Tu aporte' : 'Tu precio'}</p>
            <div className="rounded-2xl p-6 md:p-7" style={{ backgroundColor: modalidad === 'dia' ? 'rgba(157,0,94,0.05)' : tier!.bgColor, border: `1px solid ${modalidad === 'dia' ? 'rgba(157,0,94,0.3)' : tier!.borderColor}` }}>
              <div className="flex items-end justify-between gap-3 mb-1">
                <div>
                  <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: modalidad === 'dia' ? C.primavera : tier!.headColor }}>{etiquetaModalidad}</p>
                  <p className="text-xs" style={{ color: C.faint }}>{detalleSeleccion}</p>
                </div>
                <p className="text-3xl md:text-4xl font-bold serif-title flex-shrink-0" style={{ color: modalidad === 'dia' ? C.primavera : tier!.headColor }}>{fmt(totalEfectivo)}</p>
              </div>
              {modalidad !== 'dia' && !!opcion!.ahorro && (
                <p className="text-sm font-bold mb-1" style={{ color: '#1F7A4D' }}>
                  Ahorrás {fmt(opcion!.ahorro)} vs. pagar esas noches por separado
                </p>
              )}
              {modalidad !== 'dia' && (
                <p className="text-xs mb-4" style={{ color: C.faint }}>o 3 cuotas con tarjeta de crédito de {fmt(cuotaMensual)}</p>
              )}
              {modalidad !== 'dia' && (
                <div className="flex items-center gap-2 mb-5 px-3.5 py-2.5 rounded-xl border" style={{ backgroundColor: 'white', borderColor: tier!.headColor }}>
                  <Utensils size={16} color={tier!.headColor} className="flex-shrink-0" />
                  <span className="text-sm font-bold" style={{ color: tier!.headColor }}>Todas las comidas incluidas</span>
                </div>
              )}

              {modalidad === 'dia' ? (
                <ul className="space-y-2 mb-5 mt-4">
                  {['Acceso a la ceremonia de Ofrenda + Temazcal', 'Sin alojamiento ni comida incluida', 'Podés consultar por comidas caseras y nutritivas aparte'].map(i => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                      <span className="flex-shrink-0 mt-0.5" style={{ color: C.primavera }}>✓</span>{i}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 mb-5">
                  {tier!.items.map(i => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                      <span className="flex-shrink-0 mt-0.5" style={{ color: tier!.headColor }}>✓</span>{i}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs mb-4" style={{ color: C.faint }}>{modalidad === 'dia' ? 'Perfecto si querés vivir la ceremonia sin quedarte a dormir' : tier!.nota}</p>

              <a href={waCalcUrl} target="_blank" rel="noopener noreferrer"
                className="block text-center py-3.5 px-4 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: modalidad === 'dia' ? C.primavera : tier!.headColor }}>
                {modalidad === 'dia' ? 'Quiero sumarme ese día' : tier!.cta}
              </a>
            </div>
          </div>

          <div className="mt-8 rounded-2xl p-5 md:p-6 flex items-start gap-4" data-reveal
            style={{ backgroundColor: 'rgba(0,83,51,0.05)', border: '1px solid rgba(0,83,51,0.15)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(0,83,51,0.1)' }}>
              <ShieldCheck size={18} color={C.green} />
            </div>
            <div>
              <p className="font-bold text-sm mb-1" style={{ color: C.green }}>Garantía de satisfacción</p>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                Estamos tan seguros de que esta experiencia es transformadora que la pusimos a menos de la mitad de lo que realmente vale. Si sentís que no la disfrutaste — que te dejó indiferente — te devolvemos tu dinero.
              </p>
            </div>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: C.faint }}>
            {' '}
            <a href={WA_INFO} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: C.green }}>
              Escribinos por WhatsApp
            </a>{' '}
            para confirmar disponibilidad.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
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
                    className="w-full text-left px-4 py-3.5 md:px-8 md:py-6 flex items-center gap-3 md:gap-4 focus:outline-none"
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
                      <div className="pl-12 pr-4 md:pl-[4.5rem] md:pr-8 pb-4 md:pb-7 pt-1">
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
        style={{ backgroundImage: `url(${img('/uploads/pachamama-fogon-grupo-cielo.webp', 1600)})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(10,20,12,0.88)' }} />
        <div className="max-w-2xl mx-auto relative z-10" data-reveal>
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,83,51,0.3)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <Sprout size={26} color={C.gold} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl serif-title text-white mb-6 leading-tight">
            Sumate a la celebración
          </h2>
          <p className="text-base leading-relaxed mb-4 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            A compartir el fuego. A ofrendar a la Tierra.<br />A cantar en comunidad. A soltar y abrir ciclo.
          </p>
          <p className="font-serif italic mb-10" style={{ color: C.gold }}>
            Y a recordar, juntos, que somos parte de la Pachamama.
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
            14 al 17 de agosto · Pueblo Mágico, Los Gigantes, Córdoba
          </p>
        </div>
      </section>

      {/* ── BARRA FIJA MOBILE ── */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-[998] px-4 pt-3 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
        style={{
          paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
          backgroundColor: 'rgba(15,26,18,0.97)',
          borderTop: '1px solid rgba(212,175,55,0.25)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <a href={WA_RESERVA} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm py-3 w-full text-center block">
          Reservar mi lugar
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default PachamamaFest;
