import React, { useEffect, useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Bed, ForkKnife, Leaf, WifiHigh, Tree, UsersThree,
  CheckCircle, ArrowRight, Sun, Mountains, Campfire,
  Laptop, HeartStraight, Compass, ChartLineUp, CurrencyCircleDollar,
  Star, CaretDown, WhatsappLogo, Drop, Globe, Towel,
  CaretDownIcon, HouseIcon, WifiHighIcon, MountainsIcon, MapPinIcon,
  ClockIcon, UsersThreeIcon, CalendarIcon, WhatsappLogoIcon
} from '@phosphor-icons/react';
import { WA_MAGICO, SITE_URL } from './data/config';
import { ESTADIA_PRICES } from './data/retreats';
import { ROUTES } from './routes';

const WA = (msg: string) =>
  `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(msg)}`;

const WA_ESTADIA = WA('Hola! Vengo de la web y quiero consultar una estadía en Mágico Ensueño ✨');

// ── Sección Hero ─────────────────────────────────────────────────────────────
const Hero: React.FC = () => (
  <section className="relative h-[92vh] min-h-[600px] w-full flex items-end overflow-hidden">
    <img
      src="/uploads/hero-estadia.webp"
      alt="Mágico Ensueño — vista del campo"
      className="absolute inset-0 w-full h-full object-cover object-center"
      fetchPriority="high"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#002d1a]/90 via-[#002d1a]/30 to-transparent" />
    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
      <p className="text-gold/80 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
        ESTADÍAS · RESET VITAL · COWORKING · COLIVING
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight mb-5 drop-shadow-xl font-light max-w-3xl">
        Tu semana en<br />la montaña
      </h1>
      <p className="text-white/75 text-base md:text-lg font-light max-w-xl mb-8 leading-relaxed">
        Desconectate del ruido, reconectate con lo esencial. Alojamiento desde $40.000/noche
        con ropa blanca y Reset Vital. Pensión completa (3 comidas) desde $95.000/noche.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={WA_ESTADIA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand transition-[background-color,color] duration-300 shadow-lg"
        >
          <WhatsappLogo className="w-4 h-4 flex-shrink-0" weight="fill" />
          Reservar mi lugar
        </a>
        <a
          href="#alojamientos"
          className="inline-flex items-center justify-center gap-2 border border-white/40 text-white/90 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
        >
          Ver alojamientos
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </a>
      </div>
    </div>
  </section>
);

// ── Strip de inclusiones ──────────────────────────────────────────────────────
const Inclusiones: React.FC = () => {
  const items = [
    { icon: <Bed className="w-5 h-5" weight="duotone" />,      label: 'Alojamiento' },
    { icon: <Towel className="w-5 h-5" weight="duotone" />,    label: 'Ropa blanca' },
    { icon: <Drop className="w-5 h-5" weight="duotone" />,     label: 'Biokit Ecológico' },
    { icon: <Leaf className="w-5 h-5" weight="duotone" />,      label: 'Guía Reset Vital PDF' },
    { icon: <WifiHigh className="w-5 h-5" weight="duotone" />,  label: 'Starlink' },
    { icon: <Mountains className="w-5 h-5" weight="duotone" />, label: 'Espacios naturales' },
    { icon: <Sun className="w-5 h-5" weight="duotone" />,       label: 'Energía solar' },
    { icon: <ForkKnife className="w-5 h-5" weight="duotone" />, label: '+3 comidas (pensión completa)' },
  ];

  return (
    <div className="bg-brand text-white py-5 px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/85">
            <span className="text-gold">{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div className="w-full text-center mt-1">
          <span className="text-gold/60 text-[10px] uppercase tracking-widest font-bold">
            Todo incluido en el precio · Sin sorpresas ocultas
          </span>
        </div>
      </div>
    </div>
  );
};

// ── Alojamientos ─────────────────────────────────────────────────────────────
const ALOJAMIENTOS = [
  {
    name: 'Domo Geodésico',
    tag: 'MÁS SOLICITADO',
    tagColor: 'bg-gold text-white',
    desc: 'Dormir dentro de una esfera geométrica en plena montaña. Ventanas panorámicas al cielo, cama matrimonial, ropa blanca incluida. La experiencia de glamping más completa del refugio.',
    image: '/uploads/domos.webp',
    details: ['Programa Reset Vital', 'Cama matrimonial', 'Ropa blanca y toallas', 'Vista panorámica', 'Para 1 o 2 personas'],
    wa: WA('Hola! Quiero consultar disponibilidad de un Domo Geodésico en Mágico Ensueño ✨'),
  },
  {
    name: 'Habitación Compartida',
    tag: 'COLIVING',
    tagColor: 'bg-bone text-brand border border-brand/20',
    desc: 'Espacios compartidos diseñados para fomentar la comunidad. Ideal para viajeros solos que quieren conectar con otras personas en un entorno de co-living genuino.',
    image: '/uploads/habitaciones.webp',
    details: ['Programa Reset Vital', 'Camas individuales', 'Baño compartido', 'Ambiente comunitario', 'Opción más accesible'],
    wa: WA('Hola! Quiero consultar disponibilidad en las Habitaciones Compartidas de Mágico Ensueño 🏡'),
  },
  {
    name: 'Camping',
    tag: 'INMERSIÓN TOTAL',
    tagColor: 'bg-bone text-brand border border-brand/20',
    desc: 'Instalá tu carpa en pleno campo y dormí bajo las estrellas de los Gigantes. Para quienes buscan la experiencia más cruda y auténtica de la montaña. Duchas calientes y baños disponibles.',
    image: '/uploads/exterior.webp',
    details: ['Programa Reset Vital', 'Traé tu carpa', 'Duchas calientes y baños', 'Fogón comunitario', 'La más económica'],
    wa: WA('Hola! Quiero consultar sobre el camping en Mágico Ensueño ⛺'),
  },
];

const Alojamientos: React.FC = () => (
  <section id="alojamientos" className="py-24 bg-bone">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div data-reveal className="text-center mb-16">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">Elegí tu espacio</p>
        <h2 className="text-3xl md:text-5xl font-serif text-brand mb-4">Cómo querés dormir</h2>
        <p className="text-dark/60 font-light max-w-2xl mx-auto">
          Tres opciones de alojamiento, pero una misma invitación a la transformación.
          Ya sea que elijas dormir bajo las estrellas en el camping o en la comodidad de un domo, 
          <strong className="font-semibold text-brand"> tu estadía incluye siempre el retiro autoguiado Reset Vital</strong>: 
          acceso a meditaciones guiadas, ejercicios de journaling, caminatas conscientes y herramientas prácticas para bajar el ritmo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {ALOJAMIENTOS.map((aloj, i) => (
          <div key={i} data-reveal data-delay={`${(i % 2) + 1}` as any} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-brand/5 flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <img src={aloj.image} alt={aloj.name} className="w-full h-full object-cover" loading="lazy" />
              <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${aloj.tagColor}`}>
                {aloj.tag}
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif text-brand mb-3">{aloj.name}</h3>
              <p className="text-dark/70 text-sm leading-relaxed mb-5 flex-grow">{aloj.desc}</p>
              <ul className="flex flex-wrap gap-2 mb-6">
                {aloj.details.map((d, j) => (
                  <li key={j} className="flex items-center gap-1.5 text-xs text-dark/60 bg-bone rounded-full px-3 py-1">
                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" weight="duotone" />
                    {d}
                  </li>
                ))}
              </ul>
              <a
                href={aloj.wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300 w-full"
              >
                <WhatsappLogo className="w-4 h-4 flex-shrink-0" weight="fill" />
                Consultar disponibilidad
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center bg-white rounded-2xl p-6 border border-brand/5 shadow-sm">
        <CurrencyCircleDollar className="w-8 h-8 text-gold mx-auto mb-3" weight="duotone" />
        <p className="text-brand font-serif text-xl mb-1">Desde <strong className="text-gold">$32.000</strong> por persona / noche</p>
        <p className="text-dark/50 text-xs font-light">Alojamiento desde $40.000/noche · Pensión completa (3 comidas) desde $95.000/noche · 20% dto. Lun–Jue no feriados</p>
      </div>
    </div>
  </section>
);

// ── Ritmo de la semana ────────────────────────────────────────────────────────
const RITMO = [
  { icon: <Sun className="w-5 h-5" weight="duotone" />, hora: 'Mañana', texto: 'Despertar natural. Desayuno compartido. Práctica de yoga o meditación (opcional, sin obligación).' },
  { icon: <Laptop className="w-5 h-5" weight="duotone" />, hora: 'Mediodía', texto: 'Trabajo con Starlink o tiempo libre. Almuerzo casero con ingredientes de la región. Caminata o trekking.' },
  { icon: <Campfire className="w-5 h-5" weight="duotone" />, hora: 'Atardecer', texto: 'Temazcal ceremonial (según disponibilidad), lectura, contemplación o conversación al pie de la montaña.' },
  { icon: <Star className="w-5 h-5" weight="duotone" />, hora: 'Noche', texto: 'Cena en comunidad. Fogón. Cielo estrellado sin contaminación lumínica. El silencio como lujo máximo.' },
];

const RitmoDeLaSemana: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div data-reveal className="text-center mb-14 max-w-4xl mx-auto">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">Reset Vital</p>
        <h2 className="text-3xl md:text-5xl font-serif text-brand mb-4">Un día en Mágico</h2>
        <p className="text-dark/60 font-light max-w-lg mx-auto">
          No hay horarios obligatorios. Esto es una referencia de lo que encontrás disponible.
          Vos elegís cómo habitarlo.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-0 divide-y divide-brand/5">
          {RITMO.map((item, i) => (
            <div key={i} data-reveal data-delay={`${i + 1}` as any} className="flex gap-6 py-8">
              <div className="flex-shrink-0 w-12 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-bone flex items-center justify-center text-brand">
                  {item.icon}
                </div>
                {i < RITMO.length - 1 && <div className="w-px flex-grow bg-brand/10" />}
              </div>
              <div className="pt-1">
                <p className="text-gold font-bold text-xs uppercase tracking-widest mb-1">{item.hora}</p>
                <p className="text-dark/70 text-base font-light leading-relaxed">{item.texto}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div data-reveal data-delay="3" className="relative group rounded-3xl overflow-hidden shadow-lg hidden lg:block">
          <img 
            src="/uploads/coworking.webp" 
            alt="Área de coworking y trabajo remoto en Mágico Ensueño" 
            className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 p-8">
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
              Conectividad Starlink
            </span>
            <p className="text-white font-serif text-2xl">Coworking en la montaña</p>
          </div>
        </div>
      </div>

      <div data-reveal className="mt-12 bg-bone border border-gold/20 rounded-2xl p-8 md:p-10 text-center">
        <span className="inline-block bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
          20% de descuento
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-brand mb-3">Vení de Lunes a Jueves</h3>
        <p className="text-dark/65 font-light leading-relaxed max-w-xl mx-auto mb-6">
          Los días de semana (no feriados) tienen precio especial. Más silencio, más privacidad, el entorno ideal para el foco o el descanso profundo.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <div className="bg-white rounded-xl px-5 py-3 border border-brand/10 text-center">
            <p className="text-dark/40 text-xs uppercase tracking-widest mb-0.5">Alojamiento</p>
            <p className="text-dark/30 text-xs line-through">$40.000</p>
            <p className="text-brand text-xl font-serif">$32.000<span className="text-xs text-dark/50 font-sans ml-1">/ noche</span></p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 border border-gold/20 text-center">
            <p className="text-dark/40 text-xs uppercase tracking-widest mb-0.5">Pensión Completa</p>
            <p className="text-dark/30 text-xs line-through">$95.000</p>
            <p className="text-gold text-xl font-serif">$76.000<span className="text-xs text-dark/50 font-sans ml-1">/ noche</span></p>
          </div>
        </div>
        <p className="text-dark/40 text-xs">Lunes a jueves · no aplica feriados · sujeto a disponibilidad</p>
      </div>
    </div>
  </section>
);

// ── Para quién es ─────────────────────────────────────────────────────────────
const AVATARES = [
  {
    icon: <Laptop className="w-6 h-6" weight="duotone" />,
    perfil: 'El nómade digital',
    desc: 'Trabajás desde cualquier lugar pero la ciudad te agota. Buscás un entorno de concentración real, conectividad confiable y belleza que inspire. Starlink + montaña = tu oficina soñada.',
    wa: WA('Hola! Soy nómade digital y quiero consultar sobre coworking en Mágico Ensueño 💻'),
  },
  {
    icon: <ChartLineUp className="w-6 h-6" weight="duotone" />,
    perfil: 'El profesional en burnout',
    desc: 'Necesitás parar. No un spa de fin de semana: algo que te resetee de verdad. El Reset Vital te da herramientas concretas para bajar el ritmo y volver con claridad.',
    wa: WA('Hola! Necesito un reset y quiero saber más sobre las estadías en Mágico Ensueño 🌿'),
  },
  {
    icon: <HeartStraight className="w-6 h-6" weight="duotone" />,
    perfil: 'La pareja',
    desc: 'Querés reconectar sin distracciones. Comida rica, paisaje brutal, intimidad. Sin itinerario forzado, sin actividades grupales si no querés. Solo tiempo de calidad juntos.',
    wa: WA('Hola! Somos una pareja y queremos consultar una estadía en Mágico Ensueño 💚'),
  },
  {
    icon: <Compass className="w-6 h-6" weight="duotone" />,
    perfil: 'El buscador en tránsito',
    desc: 'Estás en un momento de cambio y necesitás espacio para escucharte. El silencio de la montaña, las caminatas y las herramientas del Reset Vital te acompañan en el proceso.',
    wa: WA('Hola! Estoy en un momento de búsqueda personal y me interesa una estadía en Mágico Ensueño 🧭'),
  },
  {
    icon: <UsersThree className="w-6 h-6" weight="duotone" />,
    perfil: 'La familia',
    desc: 'Buscan desconectar de las pantallas y reconectar entre ustedes. Espacios amplios, naturaleza segura y aventuras compartidas en la montaña.',
    wa: WA('Hola! Queremos ir en familia a Mágico Ensueño. ¿Qué opciones de alojamiento tienen?'),
  },
  {
    icon: <Globe className="w-6 h-6" weight="duotone" />,
    perfil: 'El ciudadano del mundo',
    desc: 'Buscás nutrirte de otras culturas sin tomarte un avión. Disfrutás de compartir un fogón con viajeros y voluntarios de todas partes del mundo.',
    wa: WA('Hola! Me encanta la vibra internacional de Mágico Ensueño. ¿Qué opciones de estadía tienen?'),
  },
];

const ParaQuienEs: React.FC = () => (
  <section className="py-24 bg-bone">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div data-reveal className="text-center mb-14">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">¿Es para mí?</p>
        <h2 className="text-3xl md:text-5xl font-serif text-brand">Quiénes vienen a Mágico</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AVATARES.map((av, i) => (
          <div key={i} data-reveal data-delay={`${i + 1}` as any} className="bg-white rounded-2xl p-6 md:p-8 border border-brand/5 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-bone rounded-full flex items-center justify-center text-brand mb-4">
              {av.icon}
            </div>
            <h3 className="font-serif text-lg text-brand mb-3">{av.perfil}</h3>
            <p className="text-dark/65 text-sm leading-relaxed flex-grow">{av.desc}</p>
            <a
              href={av.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-gold font-bold text-xs uppercase tracking-widest hover:text-brand transition-colors inline-flex items-center gap-1"
            >
              Consultar <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonios ───────────────────────────────────────────────────────────────
const TESTIMONIOS = [
  {
    text: 'Me sentí parte de la vida de la montaña, como en casa. Un refugio de paz inigualable.',
    name: 'Sofía R.',
    rol: 'Viajera',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
  {
    text: 'Una experiencia transformadora. La comida consciente y los espacios son de otro mundo.',
    name: 'Marcos D.',
    rol: 'Huésped',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    text: 'Lo más importante: el amor y la entrega de todo el equipo, y la capacidad de sentirte uno con la naturaleza.',
    name: 'Julieta C.',
    rol: 'Facilitadora',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
  },
];

const Testimonios: React.FC = () => (
  <section className="py-24 bg-brand text-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div data-reveal className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Lo que dicen quienes vivieron la experiencia</h2>
        <a
          href="https://maps.app.goo.gl/4c1nrpBbQf5hYrsE9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-gold/30 rounded-full px-4 py-1.5 hover:bg-gold/10 transition-colors"
        >
          <span className="text-yellow-300 text-sm">★★★★★</span>
          <span className="text-white/80 text-xs font-semibold">5.0 · 64 reseñas en Google Maps</span>
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIOS.map((t, i) => (
          <div key={i} data-reveal data-delay={`${i + 1}` as any} className="bg-white/10 rounded-2xl p-6 border border-white/10">
            <p className="text-white/85 italic text-sm leading-relaxed mb-5">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-bold text-sm text-white">{t.name}</p>
                <p className="text-white/50 text-xs">{t.rol}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    Icon: HouseIcon,
    q: '¿Qué incluye el precio?',
    a: 'Alojamiento, pensión completa (desayuno, almuerzo y cena), acceso a todos los espacios del refugio, guía de retiro autoguiado Reset Vital y Starlink para trabajo remoto. Sin sorpresas ocultas.',
  },
  {
    Icon: MountainsIcon,
    q: '¿Necesito experiencia previa en yoga o meditación?',
    a: 'Para nada. El Reset Vital es un retiro autoguiado: vos decidís qué practicás y cuándo. Las herramientas están disponibles, nada es obligatorio. Podés venir simplemente a descansar y caminar.',
  },
  {
    Icon: WifiHighIcon,
    q: '¿Hay conectividad real para trabajar?',
    a: 'Sí. Contamos con Starlink de alta velocidad, ideal para videollamadas, trabajo remoto o simplemente estar disponible cuando lo necesitás. Dicho esto, la montaña tiene una señal mucho más potente 😄',
  },
  {
    Icon: MapPinIcon,
    q: '¿Cómo llego?',
    a: 'El paraje está a unos 90-100 km de Córdoba Capital. Acceso por Ruta Provincial 28 desde Villa Carlos Paz. Se recomienda vehículo con buena altura. También podemos coordinar traslado desde la ciudad.',
  },
  {
    Icon: ClockIcon,
    q: '¿Cuál es el check-in y check-out?',
    a: 'Check-in: a partir de las 15:00 hs. Check-out: hasta las 11:00 hs. Podés consultar flexibilidad si llegás tarde o salís temprano.',
  },
  {
    Icon: UsersThreeIcon,
    q: '¿Es para ir solo o en grupo?',
    a: 'Ambos. Muchos llegan solos y se encuentran con una comunidad genuina de viajeros afines. Si venís en grupo, también hay opciones de uso exclusivo del espacio.',
  },
  {
    Icon: CalendarIcon,
    q: '¿Hay mínimo de noches?',
    a: 'Recomendamos mínimo 3 noches para sentir el impacto real del Reset Vital. Pero podés consultar disponibilidad para estancias más cortas.',
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (index: number) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="py-24 bg-[#F9F8F4]">
      <div className="max-w-4xl mx-auto px-6">
        <div data-reveal className="text-center mb-12">
          <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">Preguntas frecuentes</p>
          <h2 className="text-3xl md:text-5xl serif-title brand-green">Todo lo que querés saber</h2>
          <p className="text-gray-500 text-base md:text-lg font-light mt-2">Respuestas para tu tranquilidad antes de viajar.</p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {FAQS.map((faq, index) => {
            const isActive = activeIndex === index;
            const Icon = faq.Icon;

            return (
              <div key={index} data-reveal>
                <div
                  className={`bg-white rounded-2xl border transition-colors duration-300 overflow-hidden ${
                    isActive ? 'border-[#D4AF37] shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <button
                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005333]/40"
                    onClick={() => toggle(index)}
                    aria-expanded={isActive}
                  >
                    <span className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-[#005333]' : 'text-[#005333]/30'}`}>
                      <Icon weight="light" className="w-5 h-5" aria-hidden="true" />
                    </span>

                    <h3 className={`flex-1 serif-title text-base md:text-lg leading-snug transition-colors duration-300 ${isActive ? 'text-[#005333]' : 'text-gray-800'}`}>
                      {faq.q}
                    </h3>

                    <span
                      className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-[transform,background-color,color] duration-300 ${
                        isActive ? 'bg-[#005333] text-[#D4AF37] rotate-180' : 'bg-gray-100 text-[#005333]'
                      }`}
                      aria-hidden="true"
                    >
                      <CaretDownIcon weight="bold" className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </span>
                  </button>

                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      display: 'grid',
                      gridTemplateRows: isActive ? '1fr' : '0fr',
                      opacity: isActive ? 1 : 0
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pl-[3.75rem] pr-6 md:pl-[4.5rem] md:pr-8 pb-6 md:pb-7 pt-1">
                        <div className="w-full h-px bg-gray-100 mb-5"></div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── CTA Final ─────────────────────────────────────────────────────────────────
const CTAFinal: React.FC = () => (
  <section className="py-24 bg-bone">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <div data-reveal>
        <Tree className="w-10 h-10 text-gold mx-auto mb-6" weight="duotone" />
        <h2 className="text-3xl md:text-5xl font-serif text-brand mb-4">
          La montaña espera
        </h2>
        <p className="text-dark/60 font-light text-lg leading-relaxed mb-2 max-w-xl mx-auto">
          Escribinos por WhatsApp y en menos de 24 horas te damos disponibilidad, precios y cualquier consulta que tengas.
        </p>
        <p className="text-dark/40 text-xs mb-8 font-light">
          Mágico Ensueño · Habilitación Agencia Córdoba Turismo N° 000258 · CUIT 30-71875586-3
        </p>
        <a
          href={WA_ESTADIA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-brand text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300 shadow-lg"
        >
          <WhatsappLogo className="w-5 h-5 flex-shrink-0" weight="fill" />
          Consultar disponibilidad
        </a>
        <p className="mt-6 text-dark/40 text-xs">
          También podés escribirnos a{' '}
          <a href="mailto:experienciamagico@gmail.com" className="hover:text-brand transition-colors underline underline-offset-2">
            experienciamagico@gmail.com
          </a>
        </p>
      </div>
    </div>
  </section>
);

// ── Página principal ──────────────────────────────────────────────────────────
const Estadia: React.FC = () => {
  useEffect(() => {
    const TITLE = 'Estadías & Glamping — Reset Vital · Los Gigantes, Córdoba | Mágico Ensueño';
    const DESC = `Glamping y retiro autoguiado en las Sierras de Córdoba. Domos geodésicos, habitaciones y camping. Desde $${ESTADIA_PRICES.base.toLocaleString('es-AR')}/noche.`;
    const URL = SITE_URL + ROUTES.ESTADIA;
    const IMG = `${SITE_URL}/uploads/campoentero.webp`;
    const prevTitle = document.title;

    document.title = TITLE;

    const setMeta = (sel: string, attr: string, val: string) => {
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
    };

    setMeta('meta[name="description"]',        'content', DESC);
    setMeta('meta[property="og:title"]',       'property', 'og:title');
    setMeta('meta[property="og:title"]',       'content',  TITLE);
    setMeta('meta[property="og:description"]', 'property', 'og:description');
    setMeta('meta[property="og:description"]', 'content',  DESC);
    setMeta('meta[property="og:image"]',        'property', 'og:image');
    setMeta('meta[property="og:image"]',        'content',  IMG);
    setMeta('meta[property="og:url"]',         'property', 'og:url');
    setMeta('meta[property="og:url"]',         'content',  URL);
    setMeta('meta[property="og:type"]',        'property', 'og:type');
    setMeta('meta[property="og:type"]',        'content',  'website');
    setLink('canonical', URL);

    setMeta('meta[name="twitter:card"]',        'name',    'twitter:card');
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',       'name',    'twitter:title');
    setMeta('meta[name="twitter:title"]',       'content', TITLE);
    setMeta('meta[name="twitter:description"]', 'name',    'twitter:description');
    setMeta('meta[name="twitter:description"]', 'content', DESC);
    setMeta('meta[name="twitter:image"]',       'name',    'twitter:image');
    setMeta('meta[name="twitter:image"]',       'content', IMG);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      'name': 'Mágico Ensueño — Estadías & Glamping',
      'description': DESC,
      'url': URL,
      'image': IMG,
      'telephone': '+5493516765820',
      'priceRange': '$$',
      'currenciesAccepted': 'ARS',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Los Gigantes / Cuchilla Nevada',
        'addressRegion': 'Córdoba',
        'addressCountry': 'AR',
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'reviewCount': '64',
        'bestRating': '5',
      },
    };
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id   = 'ld-estadia';
    ld.textContent = JSON.stringify(schema);
    if (!document.getElementById('ld-estadia')) document.head.appendChild(ld);

    return () => { document.title = prevTitle; document.getElementById('ld-estadia')?.remove(); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <LanguageProvider>
      <div className="font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <Inclusiones />
          <Alojamientos />
          <RitmoDeLaSemana />
          <ParaQuienEs />
          <Testimonios />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Estadia;
