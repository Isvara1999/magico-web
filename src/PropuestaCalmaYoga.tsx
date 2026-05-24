import React, { useEffect, useState } from 'react';
import { img } from './lib/img';
import { WA_MAGICO } from './data/config';

const WA_MSG = encodeURIComponent(
  '¡Hola! Vi la propuesta Calma Mágica y me interesa explorar fechas para el segundo semestre. ¿Podemos hablar?'
);
const WA_HREF = `https://wa.me/${WA_MAGICO}?text=${WA_MSG}`;

// Actualizar estos valores para cada prospect
const PROSPECT = {
  nombre: 'Flor',
  comunidad: 'Calma Yoga',
  handle: '@calmayogacba',
  seguidores: '11.4K',
  nicho: 'yoga & bienestar',
};

const ACCOUNTS = [
  {
    handle: PROSPECT.handle,
    nombre: PROSPECT.comunidad,
    seguidores: PROSPECT.seguidores,
    desc: 'Tu comunidad — personas que ya confían en vos y en tu práctica',
    color: '#D4AF37',
    bg: 'rgba(212,175,55,0.06)',
    border: 'rgba(212,175,55,0.25)',
  },
  {
    handle: '@pueblomagico__',
    nombre: 'Mágico Ensueño',
    seguidores: '15K',
    desc: 'El espacio — una comunidad que busca experiencias transformadoras en la naturaleza',
    color: '#005333',
    bg: 'rgba(0,83,51,0.05)',
    border: 'rgba(0,83,51,0.2)',
  },
  {
    handle: '@somoskintu_',
    nombre: 'Kintu',
    seguidores: '28K',
    desc: 'La producción — referentes de bienestar, facilitadores y buscadores de experiencias',
    color: '#005333',
    bg: 'rgba(0,83,51,0.05)',
    border: 'rgba(0,83,51,0.2)',
  },
];

const EXPERIENCES = [
  {
    title: 'Prácticas Matutinas',
    desc: 'Saludo al Sol, pranayamas y mantras al amanecer.',
    imgSrc: '/uploads/bienestar-balance.webp',
  },
  {
    title: 'Talleres de alineación',
    desc: 'Talleres específicos de ajustes + Yoga Nidra.',
    imgSrc: '/uploads/pies.webp',
  },
  {
    title: 'Caminata consciente',
    desc: 'Un recorrido guiado y en silencio por el sendero ancestrales.',
    imgSrc: '/uploads/hero(3).webp',
  },
  {
    title: 'Fogón & estrellas',
    desc: 'Cierre nocturno alrededor del fuego, bajo uno de los cielos más estrellados y puros del país.',
    imgSrc: '/uploads/fogon_nocturno.png',
  },
];

const COSTS = [
  { concepto: 'Hospedaje (2 noches)', quien: 'Mágico Ensueño', tipo: 'fijo' },
  { concepto: 'Gastronomía completa', quien: 'Mágico Ensueño', tipo: 'fijo' },
  { concepto: 'Espacio y salones', quien: 'Mágico Ensueño', tipo: 'fijo' },
  { concepto: 'Estrategia y copy', quien: 'Kintu', tipo: 'variable' },
  { concepto: 'Piezas visuales', quien: 'Kintu', tipo: 'variable' },
  { concepto: 'Inscripciones y logística', quien: 'Kintu', tipo: 'variable' },
  { concepto: 'Registro audiovisual', quien: 'Kintu', tipo: 'variable' },
  { concepto: 'Publicidad en redes', quien: '50% / 50%', tipo: 'ads' },
];

const Countdown: React.FC<{ expiresAt: Date }> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState({ h: 72, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = expiresAt.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <span className="text-white/40 text-[10px] uppercase tracking-widest hidden sm:block">
        Esta propuesta expira en
      </span>
      <div className="flex items-center gap-1 font-mono">
        <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: '#AA3E11', color: '#D4AF37' }}>{pad(timeLeft.h)}h</span>
        <span className="text-white/30 text-xs">:</span>
        <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: '#AA3E11', color: '#D4AF37' }}>{pad(timeLeft.m)}m</span>
        <span className="text-white/30 text-xs">:</span>
        <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: '#AA3E11', color: '#D4AF37' }}>{pad(timeLeft.s)}s</span>
      </div>
    </div>
  );
};

const PropuestaCalmaYoga: React.FC = () => {
  const [expiresAt] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + 72);
    return d;
  });

  useEffect(() => {
    document.title = `Calma Mágica — Una propuesta para ${PROSPECT.comunidad}`;

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const totalSeguidores = '54.4K';

  return (
    <div className="bg-[#FDFBF7] text-[#2A1708] overflow-x-hidden">

      {/* ── TOP BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md" style={{ backgroundColor: '#AA3E11' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/uploads/logo blanco.svg" alt="Mágico Ensueño" className="h-6 w-auto flex-shrink-0" />
            <div className="w-px h-4 bg-white/20 hidden sm:block flex-shrink-0" />
            <span className="text-white/50 text-[10px] tracking-widest uppercase hidden sm:block truncate">
              Propuesta personalizada · {PROSPECT.comunidad}
            </span>
          </div>
          <Countdown expiresAt={expiresAt} />
        </div>
      </div>

      {/* ── HERO — foto full, texto encima ── */}
      <section className="relative min-h-screen pt-14 flex items-end overflow-hidden">
        {/* Foto de fondo */}
        <img
          src={img('/uploads/yoga_salon.jpg', 1800)}
          alt="Mágico Ensueño — Sierras Grandes"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Degradado fuerte abajo + capa base para legibilidad */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 md:pb-24" data-reveal>
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-7 font-semibold">
            Una invitación a co-crear
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl serif-title leading-tight mb-6 text-white">
            ¡Hola,{' '}
            <span style={{ color: '#D4AF37' }}>{PROSPECT.nombre}!</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            Esta es una invitación a unir potencial para co-crear una{' '}
            <strong className="text-white">experiencia Integral de Alto Impacto</strong>{' '}
            para tu comunidad "{PROSPECT.comunidad}", en el corazón de las Sierras Grandes de Córdoba.
          </p>

          {/* Stats en pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { valor: '3', label: 'días' },
              { valor: '30', label: 'personas' },
              { valor: '+15', label: 'años produciendo retiros' },
              { valor: '10%', label: 'inversión mínima', gold: true },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-full px-4 py-2.5 border backdrop-blur-sm"
                style={{
                  backgroundColor: s.gold ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.12)',
                  borderColor: s.gold ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.25)',
                }}
              >
                <span className="text-xl font-bold serif-title" style={{ color: s.gold ? '#D4AF37' : '#ffffff' }}>
                  {s.valor}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS — KINTU ── */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center" data-reveal>
          <p className="inline-block bg-[#005333] text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold shadow-sm">
            ¿Quiénes somos?
          </p>
          <h2 className="text-3xl md:text-4xl serif-title mb-6" style={{ color: '#005333' }}>
            Somos Kintu & Pueblo Mágico
          </h2>
          <p className="text-[#4A3220] text-base md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
            La productora de <strong>Eventos Conscientes & experiencias de Alto Impacto,</strong> nuestro objetivo es co-crear alianzas junto a referentes de bienestar que tienen comunidades consolidadas — listas para potenciar en conjunto.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10" data-reveal data-delay="1">
            {[
              { label: 'Qué queremos evitar', text: 'Que el proceso sea aburrido, abrumador, solitario, desbordante y poco rentable energética y económicamente.', bg: '#AA3E11', labelColor: 'rgba(255,255,255,0.8)', textColor: 'rgba(255,255,255,0.9)' },
              { label: 'Qué queremos lograr', text: 'Repartir responsabilidades, disfrutar del proceso, multiplicar el impacto y celebrar el resultado en equipo.', bg: '#005333', labelColor: 'rgba(255,255,255,0.8)', textColor: 'rgba(255,255,255,0.9)' },
            ].map((item) => (
              <div key={item.label} className="flex-1 rounded-2xl p-8 text-left shadow-md" style={{ backgroundColor: item.bg }}>
                <p className="text-base font-bold mb-4" style={{ color: item.labelColor }}>
                  {item.label}
                </p>
                <p className="text-base leading-relaxed" style={{ color: item.textColor }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL RETIRO: CALMA MÁGICA ── */}
      <section className="py-24 md:py-36 px-6 bg-[#F7F5F0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <p className="inline-block bg-[#005333] text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold shadow-sm">
              Ejemplo de experiencia para {PROSPECT.comunidad}
            </p>
            <h2 className="text-3xl md:text-5xl serif-title mb-4 leading-tight" style={{ color: '#005333' }}>
              Retiro "Calma Mágica"
            </h2>
            <p className="text-[#6B4A33] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Tres días para sostener la práctica profunda en un lugar que ya respira lo que vos enseñás.
            </p>
            <p className="text-[#8B6347] text-sm mt-3 tracking-wide">
              Viernes a domingo · Grupo íntimo · Hasta 30 personas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.title}
                className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                data-reveal
                data-delay={String((i % 2) + 1)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img(exp.imgSrc, 700)}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg serif-title mb-2" style={{ color: '#005333' }}>{exp.title}</h3>
                  <p className="text-[#6B4A33] text-base leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUÉ APORTAMOS: ROLES + MODELO ECONÓMICO ── */}
      <section className="py-24 md:py-36 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* Roles */}
          <div className="text-center mb-14" data-reveal>
            <p className="inline-block bg-[#005333] text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold shadow-sm">
              ¿Qué aportamos y qué aportás?
            </p>
            <h2 className="text-3xl md:text-5xl serif-title leading-tight mb-4" style={{ color: '#005333' }}>
              Vos llegás con tu propósito.<br />El resto corre por nuestra cuenta.
            </h2>
            <p className="text-[#6B4A33] text-base max-w-xl mx-auto">
              La idea es que llegues tranquila, relajada y con tu comunidad lista para brindar las actividades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-16" data-reveal data-delay="1">
            <div className="border border-amber-200 rounded-2xl p-8 bg-amber-50/40">
              <p className="text-base font-bold mb-6" style={{ color: '#D4AF37' }}>
                Tu aporte · {PROSPECT.comunidad}
              </p>
              <ul className="space-y-4">
                {[
                  'Tu comunidad consolidada y confianza ganada',
                  'Diseño y dictado de clases y talleres',
                  'convocatoria del retiro a tu comunidad',
                  'Tu presencia, tu práctica, tu energía',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#3D2516] text-base leading-relaxed">
                    <span className="mt-1 flex-shrink-0 text-amber-400">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border rounded-2xl p-8" style={{ borderColor: '#00533322', backgroundColor: '#00533308' }}>
              <p className="text-base font-bold mb-6" style={{ color: '#005333' }}>
                Nuestro aporte · Kintu + Pueblo Mágico
              </p>
              <ul className="space-y-4">
                {[
                  'El espacio, el hospedaje y la gastronomía completa',
                  'Estrategia de lanzamiento en redes sociales',
                  'Copy, guiones y piezas visuales para comunicación',
                  'Publicaciones en formato colaborativo',
                  'Logística integral: inscripciones, coordinación y comunicación',
                  'Tecnología, IA y project management de punta a punta',
                  'Creación y entrega de un grupo de WhatsApp con todos los participantes previo al retiro',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#3D2516] text-base leading-relaxed">
                    <span className="mt-1 flex-shrink-0" style={{ color: '#005333' }}>◆</span>
                    {item}
                  </li>
                ))}
                {/* Ítem opcional destacado */}
                <li className="flex items-start gap-3 mt-5 pt-5 border-t" style={{ borderColor: 'rgba(0,83,51,0.12)' }}>
                  <span className="mt-1 flex-shrink-0 text-amber-500">✦</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-[#2A1708]">Registro audiovisual del retiro</span>
                      <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#B8960A' }}>
                        Opcional
                      </span>
                    </div>
                    <p className="text-sm text-[#6B4A33] leading-relaxed">
                      Cobertura foto y video del retiro para que los participantes se lleven un recuerdo y vos tengas contenido de calidad para tus redes y próximas experiencias.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ── MODELO ECONÓMICO (tabla tipo excel) ── */}
          <div data-reveal data-delay="2">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.4em] uppercase mb-3 font-bold" style={{ color: '#005333' }}>
                Modelo económico
              </p>
              <h3 className="text-2xl md:text-3xl serif-title" style={{ color: '#005333' }}>
                Así se reparten los costos y las ganancias
              </h3>
              <p className="text-[#6B4A33] text-base font-serif italic mt-3">Cuentas claras, Alianzas largas.</p>
              <p className="text-[#8B6347] text-sm mt-2 max-w-lg mx-auto leading-relaxed"><strong className="text-[#4A3220]">Aclaración importante:</strong> Nada de esto es inamovible — la idea es encontrar un modelo económico que valore a ambas partes.</p>
            </div>

            <div className="border rounded-2xl overflow-hidden" style={{ borderColor: '#00533318' }}>
              {/* Header tabla */}
              <div className="grid grid-cols-3 bg-brand-green text-white px-6 py-3">
                <span className="text-[10px] tracking-widest uppercase text-white/60">Concepto</span>
                <span className="text-[10px] tracking-widest uppercase text-white/60">Cubierto por</span>
                <span className="text-[10px] tracking-widest uppercase text-white/60 text-right">Tipo</span>
              </div>

              {/* Costos fijos header */}
              <div className="px-6 py-2 border-b" style={{ backgroundColor: '#00533308', borderColor: '#00533312' }}>
                <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: '#005333', opacity: 0.6 }}>
                  Costos fijos
                </span>
              </div>

              {COSTS.filter(c => c.tipo === 'fijo').map((row, i) => (
                <div key={row.concepto} className={`grid grid-cols-3 px-6 py-3.5 border-b items-center ${i % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}`} style={{ borderColor: '#00533310' }}>
                  <span className="text-base text-[#3D2516]">{row.concepto}</span>
                  <span className="text-sm font-medium" style={{ color: '#005333' }}>{row.quien}</span>
                  <span className="text-[10px] tracking-wider uppercase text-right text-[#8B6347]">{row.tipo}</span>
                </div>
              ))}

              {/* Costos variables header */}
              <div className="px-6 py-2 border-b" style={{ backgroundColor: '#00533308', borderColor: '#00533312' }}>
                <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: '#005333', opacity: 0.6 }}>
                  Costos variables
                </span>
              </div>

              {COSTS.filter(c => c.tipo === 'variable').map((row, i) => (
                <div key={row.concepto} className={`grid grid-cols-3 px-6 py-3.5 border-b items-center ${i % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}`} style={{ borderColor: '#00533310' }}>
                  <span className="text-base text-[#3D2516]">{row.concepto}</span>
                  <span className="text-sm font-medium" style={{ color: '#005333' }}>{row.quien}</span>
                  <span className="text-[10px] tracking-wider uppercase text-right text-[#8B6347]">variable</span>
                </div>
              ))}

              {/* Fila ads — compartida */}
              {COSTS.filter(c => c.tipo === 'ads').map((row) => (
                <div key={row.concepto} className="grid grid-cols-3 px-6 py-3.5 border-b items-center bg-amber-50/20" style={{ borderColor: '#00533310' }}>
                  <div>
                    <span className="text-base text-[#3D2516]">{row.concepto}</span>
                    <p className="text-[10px] text-[#8B6347] mt-0.5">No es el foco, pero si se invierte va al 50/50</p>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#005333' }}>{row.quien}</span>
                  <span className="text-[10px] tracking-wider uppercase text-right text-[#8B6347]">compartido</span>
                </div>
              ))}

              {/* Tu inversión mínima */}
              <div className="px-6 py-5" style={{ backgroundColor: 'rgba(212,175,55,0.08)', borderTop: '2px solid rgba(212,175,55,0.3)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-base font-bold text-[#2A1708]">Tu inversión mínima para el lanzamiento</span>
                    <p className="text-sm text-[#6B4A33] mt-1.5 max-w-xs leading-relaxed">
                      Para cubrir producción, campaña y coordinar el lanzamiento necesitamos al menos el <strong>10% del objetivo mínimo de inscripciones</strong>. No es un costo fijo — es un adelanto que se descuenta de tu parte de las ganancias.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-2xl font-bold serif-title" style={{ color: '#D4AF37' }}>10%</span>
                    <p className="text-[10px] tracking-widest uppercase text-[#8B6347] mt-0.5">del objetivo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* División de ganancias */}
            <div className="mt-5 border rounded-2xl overflow-hidden" style={{ borderColor: '#00533318' }}>
              <div className="grid grid-cols-2 bg-brand-green text-white px-6 py-3">
                <span className="text-[10px] tracking-widest uppercase text-white/60">Distribución de ganancias limpias</span>
                <span className="text-[10px] tracking-widest uppercase text-white/60 text-right">%</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 items-center bg-amber-50/40 border-b" style={{ borderColor: '#00533310' }}>
                <div>
                  <span className="text-base font-semibold text-[#2A1708]">{PROSPECT.comunidad} (vos)</span>
                  <p className="text-sm text-[#8B6347] mt-0.5 leading-relaxed">Después de descontar costos de espacio, producción y tu inversión inicial del 10%</p>
                </div>
                <span className="text-3xl font-bold serif-title text-right" style={{ color: '#D4AF37' }}>50%</span>
              </div>
              <div className="grid grid-cols-2 px-6 py-4 items-center bg-white border-b" style={{ borderColor: '#00533310' }}>
                <div>
                  <span className="text-base font-semibold text-[#2A1708]">Kintu + Mágico Ensueño</span>
                  <p className="text-sm text-[#8B6347] mt-0.5">Producción + espacio + logística</p>
                </div>
                <span className="text-3xl font-bold serif-title text-right" style={{ color: '#005333' }}>50%</span>
              </div>
              <div className="px-6 py-3 bg-amber-50/40">
                <p className="text-sm text-[#8B6347] leading-relaxed">
                  <strong className="text-[#4A3220]">Publicidad</strong> Si se decide invertir en pauta paga, ese presupuesto se divide 50/50 entre las partes y se descuenta antes de repartir ganancias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EL ESPACIO ── */}
      <section className="py-24 md:py-36 px-6 bg-brand-green text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'rgba(212,175,55,0.06)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div data-reveal>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-5 font-bold">EL ENTORNO POTENCIA LA EXPERIENCIA</p>
              <h2 className="text-3xl md:text-4xl serif-title text-white mb-6 leading-tight">
                Pueblo Mágico,<br />Sierras Grandes
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-8">
                Un eco-centro de  montaña con 20 años de historia a las puertas del macizo Los Gigantes, ubicado a 50 km de Tanti. Este espacio ya respira lo que vos enseñás.
              </p>
              <ul className="space-y-3">
                {[
                  'Domos geodésicos y eco-centro en Sierras Grandes',
                  'Pensión completa — Alimentación Natural & Regenerativa',
                  'Salón panorámico, explanadas abiertas, espacios comunes y comedor',
                  'Senderos en Los Gigantes · Fogón · Cielos limpios',
                  'A 100 km de Córdoba Capital',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                    <span className="text-gold flex-shrink-0 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3" data-reveal data-delay="1">
              <img src={img('/uploads/469280911_444096748740233_2818770490495002077_n.webp', 450)} alt="Experiencia grupal" className="rounded-xl aspect-square object-cover" loading="lazy" />
              <img src={img('/uploads/469742031_941240881439467_8316347989568757415_n.webp', 450)} alt="Experiencia grupal" className="rounded-xl aspect-square object-cover mt-8" loading="lazy" />
              <img src={img('/uploads/refu.webp', 450)} alt="Eco-Refugio" className="rounded-xl aspect-square object-cover -mt-8" loading="lazy" />
              <img src={img('/uploads/dji_0074.webp', 450)} alt="Vista aérea Mágico Ensueño" className="rounded-xl aspect-square object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRES COMUNIDADES, UN IMPACTO (storytelling) ── */}
      <section className="py-24 md:py-36 px-6 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6" data-reveal>
            <p className="inline-block bg-[#005333] text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold shadow-sm">
              El potencial de la alianza
            </p>
            <h2 className="text-3xl md:text-4xl serif-title mb-4 leading-tight" style={{ color: '#005333' }}>
              No sumamos seguidores.<br />Conectamos comunidades y multiplicamos el impacto.
            </h2>
          </div>

          {/* Narrativa */}
          <div className="max-w-2xl mx-auto text-center mb-14" data-reveal data-delay="1">
            <p className="text-[#6B4A33] text-base md:text-lg leading-relaxed">
              Cada vez que nos unimos, nos potenciamos y habilitamos un mundo de posiblidades al servicio de un bien mayor.
            </p>
            <p className="text-[#8B6347] text-sm mt-4 font-serif italic">
              Así se amplifica un mensaje organicamente.
            </p>
          </div>

          {/* Cards de cuentas */}
          <div className="grid md:grid-cols-3 gap-5 mb-10" data-reveal data-delay="2">
            {ACCOUNTS.map((acc) => (
              <div
                key={acc.handle}
                className="rounded-2xl p-6 border"
                style={{ backgroundColor: acc.bg, borderColor: acc.border }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-[#2A1708] text-sm">{acc.nombre}</p>
                    <p className="text-[11px] tracking-wide mt-0.5" style={{ color: acc.color }}>{acc.handle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold serif-title" style={{ color: acc.color }}>{acc.seguidores}</p>
                    <p className="text-[10px] tracking-widest uppercase text-[#8B6347]">seguidores</p>
                  </div>
                </div>
                <p className="text-[#6B4A33] text-sm leading-relaxed">{acc.desc}</p>
              </div>
            ))}
          </div>

          {/* Total combinado */}
          <div className="text-center" data-reveal data-delay="3">
            <div className="inline-flex flex-col items-center gap-2 border rounded-2xl px-10 py-6" style={{ borderColor: 'rgba(212,175,55,0.4)', backgroundColor: 'rgba(212,175,55,0.05)' }}>
              <p className="text-[10px] tracking-widest uppercase text-[#8B6347]">Alcance combinado estimado</p>
              <p className="text-5xl md:text-6xl font-bold serif-title" style={{ color: '#005333' }}>{totalSeguidores}+</p>
              <p className="text-[#6B4A33] text-base max-w-xs text-center leading-relaxed">
                personas que ya eligieron seguir a alguien que habla de bienestar, naturaleza o experiencias transformadoras.
              </p>
            </div>
            <p className="text-[#8B6347] text-xs mt-6 max-w-md mx-auto italic">
              Y eso antes de que activemos la estrategia de lanzamiento. El potencial real empieza cuando empezamos a publicar.
            </p>
          </div>
        </div>
      </section>

      {/* ── CÓMO ARRANCAMOS ── */}
      <section className="py-24 md:py-36 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <p className="inline-block bg-[#005333] text-white px-4 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-5 font-semibold shadow-sm">
              Los próximos pasos
            </p>
            <h2 className="text-3xl md:text-4xl serif-title" style={{ color: '#005333' }}>
              ¿Cómo arrancamos?
            </h2>
            <p className="text-[#8B6347] text-sm mt-3">Tres simples pasos.</p>
          </div>

          <div data-reveal data-delay="1">
            {[
              {
                n: '01',
                title: 'Reunion virtual de alineación.',
                desc: 'Una reunion para conocernos y alinearnos en la propuesta.',
              },
              {
                n: '02',
                title: 'Fecha y cupo',
                desc: 'Definimos juntas el fin de semana, el tamaño del grupo y los números del modelo compartido.',
              },
              {
                n: '03',
                title: 'Lanzamiento conjunto',
                desc: 'Activamos producción, comunicación, convocatoria y sobretodo disfrutar del proceso.',
              },
            ].map((step, i) => (
              <div key={step.n} className="flex gap-8 py-8 border-b border-stone-200 last:border-0">
                <div className="flex-shrink-0 pt-1">
                  <span className="font-mono text-[10px] tracking-widest" style={{ color: '#00533340' }}>{step.n}</span>
                  {i < 2 && <div className="w-px mx-auto mt-2" style={{ height: '2.5rem', backgroundColor: '#D4AF3730' }} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg serif-title mb-2" style={{ color: '#005333' }}>{step.title}</h3>
                  <p className="text-[#6B4A33] text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-28 md:py-44 px-6 text-white text-center relative overflow-hidden" style={{ backgroundImage: `url(${img('/uploads/img_6948.webp', 1600)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#005333]/80 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(212,175,55,0.05)' }} />
        </div>

        <div className="max-w-2xl mx-auto relative z-10" data-reveal>
          <div className="w-8 h-px bg-brand-gold/30 mx-auto mb-10" />
          <h2 className="text-3xl md:text-5xl serif-title text-white mb-6 leading-tight">
            ¿Estás lista para<br />dar el siguiente paso?
          </h2>
          <p className="text-white/55 text-base font-serif italic mb-10" data-reveal data-delay="1">
            
          </p>
          <div data-reveal data-delay="2">
            <a
              href="https://calendly.com/somoskintuproducciones/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block text-sm py-5 px-10"
            >
              Agenda tu llamada
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER MINIMAL ── */}
      <div className="text-center py-6 border-t" style={{ backgroundColor: '#FDFBF7', borderColor: '#00533315', color: '#00533340' }}>
        <p className="text-[10px] tracking-widest uppercase">
          Growth systems &amp; digital experience by Catálisis · experienciamagico.com
        </p>
      </div>

    </div>
  );
};

export default PropuestaCalmaYoga;
