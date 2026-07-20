import React, { useEffect, useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  House, ForkKnife, Laptop, HeartStraight, Campfire, Drop, Sun,
  WifiHigh, CheckCircle, ArrowRight, Star, WhatsappLogo, Tree, UsersThree,
  CaretDownIcon, HouseIcon, ClockIcon, CalendarIcon, Brain, Sparkle, Moon,
  Mountains, Bank, DownloadSimple, FilePdf, CircleNotch,
} from '@phosphor-icons/react';
import { WA_MAGICO, SITE_URL } from './data/config';
import { COLIVING_PRICES } from './data/retreats';
import { ROUTES } from './routes';

const WA = (msg: string) =>
  `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(msg)}`;

const WA_COLIVING = WA(COLIVING_PRICES.message);

const fmt = (n: number) => n.toLocaleString('es-AR');

// Precio "efectivo/transferencia" = precio de lista (en cuotas) con 20% de descuento
const pago = (efectivo: number) => {
  const lista = Math.round(efectivo / 0.8);
  const cuota = Math.round(lista / 3);
  const ahorro = lista - efectivo;
  return { efectivo, lista, cuota, ahorro };
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero: React.FC = () => (
  <section className="relative h-[92vh] min-h-[600px] w-full flex items-end overflow-hidden">
    <img
      src="/uploads/coworking.webp"
      alt="Coliving Mágico — espacio de trabajo y descanso en la naturaleza"
      className="absolute inset-0 w-full h-full object-cover object-center"
      fetchPriority="high"
      decoding="async"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#002d1a]/90 via-[#002d1a]/30 to-transparent" />
    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
      <p className="text-gold/80 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
        Coliving Mágico · Bienestar &amp; Estilo de Vida
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight mb-5 drop-shadow-xl font-light max-w-3xl">
        Un espacio para vivir,<br />trabajar y reconectar
      </h1>
      <p className="text-white/75 text-base font-light max-w-xl mb-7 leading-relaxed">
        Un entorno en la naturaleza pensado para quienes buscan bajar el ritmo, enfocarse y compartir en comunidad.
        Acá el bienestar no es una actividad más — es la base de la vida cotidiana.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={WA_COLIVING}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand transition-[background-color,color] duration-300 shadow-lg"
        >
          <WhatsappLogo className="w-4 h-4 flex-shrink-0" weight="fill" />
          Consultar disponibilidad
        </a>
        <a
          href="#formatos"
          className="inline-flex items-center justify-center gap-2 border border-white/40 text-white/90 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
        >
          Ver formatos y precios
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </a>
      </div>
    </div>
  </section>
);

// ── Strip de inclusiones ──────────────────────────────────────────────────────
const Inclusiones: React.FC = () => {
  const items = [
    { icon: <House className="w-5 h-5" weight="duotone" />,     label: 'Alojamiento · Ropa blanca y toallón' },
    { icon: <Drop className="w-5 h-5" weight="duotone" />,      label: 'Biocosmética en las duchas' },
    { icon: <ForkKnife className="w-5 h-5" weight="duotone" />, label: 'Desayuno, almuerzo y cena caseros' },
    { icon: <HeartStraight className="w-5 h-5" weight="duotone" />, label: 'Programa Reset Vital' },
    { icon: <WifiHigh className="w-5 h-5" weight="duotone" />,  label: 'WiFi satelital' },
    { icon: <Tree className="w-5 h-5" weight="duotone" />,      label: 'Acceso a todo el predio' },
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
      </div>
    </div>
  );
};

// ── Tu entorno ─────────────────────────────────────────────────────────────────
const TuEntorno: React.FC = () => (
  <section className="py-14 bg-white border-b border-brand/5">
    <div className="max-w-5xl mx-auto px-6">
      <div data-reveal className="grid sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: <Mountains className="w-6 h-6" weight="duotone" />, big: '200 HAS', small: 'de reserva natural privada' },
          { icon: <Drop className="w-6 h-6" weight="duotone" />, big: 'Ríos & arroyos', small: 'para caminar, descansar y desconectar' },
          { icon: <Sun className="w-6 h-6" weight="duotone" />, big: 'Atardeceres', small: 'de Los Gigantes, Córdoba' },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-bone flex items-center justify-center text-brand mb-2">{s.icon}</div>
            <p className="font-serif text-brand text-lg">{s.big}</p>
            <p className="text-dark/50 text-xs">{s.small}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-dark/50 text-sm max-w-xl mx-auto mt-8 leading-relaxed">
        Cambiar de espacio también cambia tu descanso. Y no vas a estar solo: compartís el proceso con personas que están
        en la misma sintonía — buscando foco, calma y una versión más plena de sí mismas.
      </p>
    </div>
  </section>
);

// ── Por qué funciona (respaldo científico) ────────────────────────────────────
const CIENCIA = [
  {
    icon: <Brain className="w-6 h-6" weight="duotone" />,
    dato: 'Más foco',
    texto: 'Pasar tiempo en la naturaleza restaura la atención y la memoria de trabajo (Teoría de la Restauración Atencional, Kaplan).',
  },
  {
    icon: <Sparkle className="w-6 h-6" weight="duotone" />,
    dato: '+47% creatividad',
    texto: 'Un estudio de UC Berkeley encontró que, tras días de inmersión en naturaleza, las personas resuelven un 47% más problemas creativos.',
  },
  {
    icon: <Moon className="w-6 h-6" weight="duotone" />,
    dato: 'Mejor descanso',
    texto: 'La cercanía a espacios verdes y ríos se asocia a mejor calidad de sueño en estudios internacionales.',
  },
  {
    icon: <ForkKnife className="w-6 h-6" weight="duotone" />,
    dato: 'Energía sostenida',
    texto: 'Comidas caseras y balanceadas — sin ultraprocesados — sostienen la atención y la energía durante el día.',
  },
];

const PorQueFunciona: React.FC = () => (
  <section className="py-20 bg-bone">
    <div className="max-w-6xl mx-auto px-6 lg:px-12">
      <div data-reveal className="text-center mb-12">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3">Por qué funciona</p>
        <h2 className="text-3xl md:text-4xl font-serif text-brand">No es solo una sensación</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CIENCIA.map((c, i) => (
          <div key={i} data-reveal data-delay={`${i + 1}` as any} className="bg-white rounded-2xl p-6 border border-brand/5 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-bone flex items-center justify-center text-brand mb-3">{c.icon}</div>
            <p className="text-gold font-serif text-xl mb-2">{c.dato}</p>
            <p className="text-dark/60 text-xs leading-relaxed">{c.texto}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-dark/30 text-[11px] mt-8">
        Basado en investigación de psicología ambiental — Kaplan (Teoría de la Restauración Atencional) y Piff et al. (UC Berkeley).
      </p>
    </div>
  </section>
);

// ── La experiencia ────────────────────────────────────────────────────────────
const EXPERIENCIA = [
  { icon: <House className="w-5 h-5" weight="duotone" />,        texto: 'Vivir en un entorno natural y tranquilo' },
  { icon: <ForkKnife className="w-5 h-5" weight="duotone" />,     texto: 'Disfrutar de pensión completa' },
  { icon: <Laptop className="w-5 h-5" weight="duotone" />,        texto: 'Trabajar con espacios cómodos y conexión' },
  { icon: <HeartStraight className="w-5 h-5" weight="duotone" />, texto: 'Incorporar hábitos de bienestar — meditación, movimiento, pausas' },
  { icon: <Campfire className="w-5 h-5" weight="duotone" />,      texto: 'Compartir momentos en comunidad — fogón, charlas, encuentros' },
  { icon: <Drop className="w-5 h-5" weight="duotone" />,          texto: 'Conectar con la naturaleza — río, caminatas, descanso' },
];

const LaExperiencia: React.FC = () => (
  <section className="py-20 bg-bone">
    <div className="max-w-5xl mx-auto px-6">
      <div data-reveal className="text-center mb-12">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3">La experiencia</p>
        <h2 className="text-3xl md:text-4xl font-serif text-brand mb-3">Durante tu estadía vas a poder</h2>
        <p className="text-dark/60 text-sm max-w-lg mx-auto leading-relaxed">
          Una invitación a ordenar tu rutina, recuperar energía y abrirte a nuevas formas de habitar tu día a día.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPERIENCIA.map((item, i) => (
          <div key={i} data-reveal data-delay={`${(i % 4) + 1}` as any} className="flex gap-3 items-start bg-white rounded-xl p-5 border border-brand/5">
            <div className="w-9 h-9 rounded-full bg-bone flex items-center justify-center text-brand flex-shrink-0">
              {item.icon}
            </div>
            <p className="text-dark/70 text-sm leading-relaxed pt-1.5">{item.texto}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Formatos de estadía ───────────────────────────────────────────────────────
const Formatos: React.FC = () => (
  <section id="formatos" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6 lg:px-12">
      <div data-reveal className="text-center mb-12">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3">Formatos de estadía</p>
        <h2 className="text-3xl md:text-4xl font-serif text-brand">Elegí tu ritmo</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {COLIVING_PRICES.formatos.map((f, i) => {
          const p = pago(f.precio);
          return (
            <div key={f.noches} data-reveal data-delay={`${i + 1}` as any}
              className="bg-bone rounded-2xl p-6 border border-brand/5 shadow-sm flex flex-col">
              <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-2">{f.label}</p>
              <p className="text-brand text-3xl font-serif mb-0.5">
                ${fmt(p.efectivo)}
              </p>
              <p className="text-dark/40 text-[11px] mb-3">Efectivo o transferencia</p>
              <div className="bg-white rounded-lg px-3 py-2 mb-4 border border-brand/5">
                <p className="text-dark/50 text-[11px] leading-snug">
                  O 3 cuotas de <strong className="text-dark/70">${fmt(p.cuota)}</strong>
                </p>
                <p className="text-gold text-[10px] font-semibold mt-0.5">Ahorrás ${fmt(p.ahorro)} en efectivo/transferencia</p>
              </div>
              <p className="text-dark/60 text-sm leading-relaxed flex-grow mb-5">{f.desc}</p>
              <a href={WA(`Hola! Vengo de la web y quiero consultar el formato de ${f.label} en Coliving Mágico ✨`)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-brand text-brand px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-white transition-colors w-full">
                Consultar
              </a>
            </div>
          );
        })}

        {/* Pase libre mensual — destacado */}
        {(() => {
          const p = pago(COLIVING_PRICES.paseMensual.precio);
          return (
            <div data-reveal data-delay="4" className="bg-brand text-white rounded-2xl p-6 border border-gold/30 shadow-lg flex flex-col relative lg:col-span-1 md:col-span-2 lg:row-start-1">
              <span className="absolute -top-3 left-6 bg-gold text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Más completo
              </span>
              <p className="text-gold font-bold text-[10px] uppercase tracking-widest mb-2 mt-2">{COLIVING_PRICES.paseMensual.label}</p>
              <p className="text-white text-3xl font-serif mb-0.5">
                ${fmt(p.efectivo)}
              </p>
              <p className="text-white/50 text-[11px] mb-3">Efectivo o transferencia</p>
              <div className="bg-white/10 rounded-lg px-3 py-2 mb-4 border border-white/10">
                <p className="text-white/70 text-[11px] leading-snug">
                  O 3 cuotas de <strong className="text-white">${fmt(p.cuota)}</strong>
                </p>
                <p className="text-gold text-[10px] font-semibold mt-0.5">Ahorrás ${fmt(p.ahorro)} en efectivo/transferencia</p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-3">{COLIVING_PRICES.paseMensual.desc}</p>
              <ul className="space-y-1.5 mb-5 flex-grow">
                {['Acceso durante todo el mes', 'Estadía con flexibilidad de organización', 'Tiempo real para integrar hábitos y rutinas'].map((d, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-xs text-white/70">
                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" weight="duotone" />
                    {d}
                  </li>
                ))}
              </ul>
              <a href={WA_COLIVING} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand transition-colors w-full">
                <WhatsappLogo className="w-4 h-4" weight="fill" />
                Consultar por WhatsApp
              </a>
            </div>
          );
        })()}
      </div>

      <p className="text-center text-dark/40 text-xs mt-8 max-w-xl mx-auto leading-relaxed flex items-center justify-center gap-1.5">
        <Bank className="w-3.5 h-3.5 flex-shrink-0" weight="duotone" />
        Todos los formatos incluyen alojamiento, pensión completa y el Programa Reset Vital. Precio de lista en 3 cuotas — 20% menos pagando en efectivo o transferencia.
      </p>
    </div>
  </section>
);

// ── Prueba social ──────────────────────────────────────────────────────────────
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
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Lo que dicen quienes ya vivieron Mágico</h2>
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

// ── Lead magnet: Guía de Foco en la Montaña ────────────────────────────────────
const PDF_URL = '/uploads/Recetarios/guia-foco-coliving.pdf';
const PDF_FILENAME = 'Guia-Foco-en-la-Montana-Pueblo-Magico.pdf';

const GuiaFoco: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = PDF_URL;
    link.download = PDF_FILENAME;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new URLSearchParams(new FormData(e.target as HTMLFormElement) as any).toString();
    setSending(true);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    }).finally(() => {
      triggerDownload();
      setSending(false);
      setSubmitted(true);
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-brand rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden="true" />
          <div data-reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5">
              <FilePdf weight="fill" className="w-3.5 h-3.5" />
              Guía gratuita
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 leading-tight">
              Guía de Foco en la Montaña
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              5 hábitos respaldados por ciencia para enfocarte mejor, dormir mejor y crear más — vivas o no una estadía larga en Mágico.
            </p>
            <ul className="space-y-2">
              {['Basada en investigación de psicología ambiental', 'Prácticos y aplicables desde hoy', 'PDF de una página, sin relleno'].map((d, j) => (
                <li key={j} className="flex items-center gap-2 text-white/85 text-xs">
                  <CheckCircle weight="fill" className="w-4 h-4 text-gold flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal data-delay="1" className="relative z-10">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              {!submitted ? (
                <form name="coliving-guia" data-netlify="true" onSubmit={handleSubmit} className="space-y-3">
                  <input type="hidden" name="form-name" value="coliving-guia" />
                  <div>
                    <label className="block text-[11px] font-bold text-dark/50 mb-1 uppercase tracking-wider" htmlFor="cg-nombre">Nombre</label>
                    <input required type="text" id="cg-nombre" name="nombre" placeholder="Tu nombre"
                      className="w-full px-4 py-2.5 bg-bone border border-brand/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-brand focus:border-brand transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-dark/50 mb-1 uppercase tracking-wider" htmlFor="cg-email">Email</label>
                    <input required type="email" id="cg-email" name="email" placeholder="tu@email.com"
                      className="w-full px-4 py-2.5 bg-bone border border-brand/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-brand focus:border-brand transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-dark/50 mb-1 uppercase tracking-wider" htmlFor="cg-wa">
                      WhatsApp <span className="font-normal text-dark/30 normal-case">(opcional)</span>
                    </label>
                    <input type="tel" id="cg-wa" name="whatsapp" placeholder="+54 9 ..."
                      className="w-full px-4 py-2.5 bg-bone border border-brand/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-brand focus:border-brand transition-colors" />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-gold hover:bg-brand text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl shadow-lg transition-colors mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait">
                    {sending ? (
                      <>Enviando <CircleNotch weight="bold" className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Descargar guía gratis <DownloadSimple weight="bold" className="w-4 h-4" /></>
                    )}
                  </button>
                  <p className="text-[10px] text-dark/30 text-center">Sin spam. Solo la guía y, si querés, novedades de Coliving Mágico.</p>
                </form>
              ) : (
                <div className="py-4 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-bone rounded-full flex items-center justify-center mb-4">
                    <CheckCircle weight="fill" className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-lg font-serif text-brand mb-1">¡Ya la tenés!</h3>
                  <p className="text-dark/50 text-sm mb-6 leading-relaxed max-w-xs">
                    Si la descarga no empezó sola, tocá el botón de abajo.
                  </p>
                  <a href={PDF_URL} download={PDF_FILENAME}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gold text-white rounded-xl font-bold text-sm hover:bg-brand transition-colors">
                    <DownloadSimple weight="bold" className="w-4 h-4" />
                    Descargar de nuevo
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Para quién es ─────────────────────────────────────────────────────────────
const AVATARES = [
  { icon: <Laptop className="w-6 h-6" weight="duotone" />,        texto: 'Trabajan de forma remota o flexible' },
  { icon: <ArrowRight className="w-6 h-6" weight="duotone" />,     texto: 'Buscan un cambio en su rutina' },
  { icon: <HeartStraight className="w-6 h-6" weight="duotone" />, texto: 'Valoran el bienestar y la naturaleza' },
  { icon: <UsersThree className="w-6 h-6" weight="duotone" />,     texto: 'Disfrutan de compartir con otros en comunidad' },
];

const ParaQuienEs: React.FC = () => (
  <section className="py-20 bg-bone">
    <div className="max-w-5xl mx-auto px-6">
      <div data-reveal className="text-center mb-12">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3">¿Para quién es?</p>
        <h2 className="text-3xl md:text-4xl font-serif text-brand">No se trata solo de alojarse</h2>
        <p className="text-dark/60 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
          Sino de vivir unos días —o un mes— de forma más consciente, conectada y equilibrada.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {AVATARES.map((av, i) => (
          <div key={i} data-reveal data-delay={`${i + 1}` as any} className="bg-white rounded-2xl p-6 border border-brand/5 shadow-sm text-center">
            <div className="w-12 h-12 bg-bone rounded-full flex items-center justify-center text-brand mx-auto mb-4">
              {av.icon}
            </div>
            <p className="text-dark/70 text-sm leading-relaxed">{av.texto}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  { Icon: HouseIcon, q: '¿Qué incluye el precio?', a: 'Alojamiento con ropa blanca y toallón, biocosmética en las duchas, todas las comidas caseras (desayuno, almuerzo y cena), el Programa Reset Vital, acceso a todo el predio y WiFi satelital.' },
  { Icon: ClockIcon, q: '¿Las actividades del Reset Vital están todas incluidas?', a: 'El programa base está incluido en todos los formatos. Algunas experiencias puntuales (talleres especiales, terapias o salidas guiadas) pueden coordinarse como actividades adicionales según disponibilidad.' },
  { Icon: CalendarIcon, q: '¿Puedo combinar días de trabajo remoto con la rutina de bienestar?', a: 'Sí, es justamente la idea. No hay horarios obligatorios: tenés espacios cómodos y conexión para trabajar, y podés sumarte a las prácticas de bienestar cuando quieras.' },
  { Icon: CaretDownIcon, q: '¿Cómo reservo mi lugar?', a: 'Los cupos son limitados para cuidar la experiencia. Escribinos por WhatsApp contándonos qué formato te interesa y te confirmamos disponibilidad.' },
];

const FAQ: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-3xl mx-auto px-6">
      <div data-reveal className="text-center mb-10">
        <p className="text-brand font-bold tracking-widest uppercase text-xs mb-3">Preguntas frecuentes</p>
        <h2 className="text-3xl md:text-4xl font-serif text-brand">Antes de escribirnos</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, i) => {
          const Icon = faq.Icon;
          return (
            <div key={i} data-reveal className="bg-bone rounded-2xl border border-brand/5 px-6 py-5">
              <div className="flex items-start gap-3 mb-2">
                <Icon weight="light" className="w-5 h-5 text-brand/50 flex-shrink-0 mt-0.5" />
                <h3 className="font-serif text-brand text-base leading-snug">{faq.q}</h3>
              </div>
              <p className="text-dark/60 text-sm leading-relaxed pl-8">{faq.a}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ── CTA Final ─────────────────────────────────────────────────────────────────
const CTAFinal: React.FC = () => (
  <section className="py-24 bg-bone">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <div data-reveal>
        <Star className="w-10 h-10 text-gold mx-auto mb-6" weight="duotone" />
        <h2 className="text-3xl md:text-5xl font-serif text-brand mb-4">
          Los cupos son limitados
        </h2>
        <p className="text-dark/60 font-light text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Cuidamos la experiencia manteniendo pocos lugares disponibles. Si sentís que este espacio es para vos,
          escribinos para conocer disponibilidad y coordinar tu llegada.
        </p>
        <a
          href={WA_COLIVING}
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
const Coliving: React.FC = () => {
  useEffect(() => {
    const TITLE = 'Coliving Mágico — Vivir, Trabajar y Reconectar · Los Gigantes, Córdoba | Pueblo Mágico';
    const DESC = `Coliving en las Sierras de Córdoba para bienestar y estilo de vida. Formatos de 3, 5 y 10 noches, y Pase Libre Mensual desde $${fmt(COLIVING_PRICES.formatos[0].precio)}. Pensión completa, WiFi satelital y Programa Reset Vital incluidos.`;
    const URL = SITE_URL + ROUTES.COLIVING;
    const IMG = `${SITE_URL}/uploads/coworking.webp`;
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
      'name': 'Pueblo Mágico — Coliving Mágico',
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
      'makesOffer': [
        ...COLIVING_PRICES.formatos.map(f => ({
          '@type': 'Offer',
          'name': f.label,
          'price': String(f.precio),
          'priceCurrency': 'ARS',
          'availability': 'https://schema.org/InStock',
        })),
        {
          '@type': 'Offer',
          'name': COLIVING_PRICES.paseMensual.label,
          'price': String(COLIVING_PRICES.paseMensual.precio),
          'priceCurrency': 'ARS',
          'availability': 'https://schema.org/InStock',
        },
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '5.0',
        'reviewCount': '64',
        'bestRating': '5',
      },
    };
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id   = 'ld-coliving';
    ld.textContent = JSON.stringify(schema);
    if (!document.getElementById('ld-coliving')) document.head.appendChild(ld);

    return () => { document.title = prevTitle; document.getElementById('ld-coliving')?.remove(); };
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
          <TuEntorno />
          <Inclusiones />
          <LaExperiencia />
          <PorQueFunciona />
          <Formatos />
          <Testimonios />
          <GuiaFoco />
          <ParaQuienEs />
          <FAQ />
          <CTAFinal />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Coliving;
