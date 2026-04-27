import React, { useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CampfireIcon, SunIcon, MoonIcon, UsersThreeIcon, LeafIcon, ForkKnifeIcon, StarIcon } from '@phosphor-icons/react';

import FamilionHero from './components/FamilionHero';
import FamilionMagico from './components/FamilionMagico';
import FamilionPrecios from './components/FamilionPrecios';
import FamilionFAQ from './components/FamilionFAQ';
import { WA_MAGICO } from '../constants';



















const Familion: React.FC = () => {
  // SEO — title, meta, OG, canonical y JSON-LD
  useEffect(() => {
    const TITLE = 'Familion — Retiro Familiar en la Montaña · Los Gigantes, Córdoba | Mágico Ensueño';
    const DESC  = 'Retiro familiar en Los Gigantes, Córdoba. 1 al 3 de Mayo. Adultos en red, niños en libertad, gastronomía de montaña y experiencias transformadoras. Yoga, temazcal y tribu real.';
    const URL   = 'https://experienciamagico.com/familion';
    const IMG   = 'https://experienciamagico.com/uploads/portada familion.webp';
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
    setMeta('meta[property="og:image"]',       'property', 'og:image');
    setMeta('meta[property="og:image"]',       'content',  IMG);
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
    setMeta('meta[property="og:locale"]',       'property', 'og:locale');
    setMeta('meta[property="og:locale"]',       'content',  'es_AR');

    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Familion — Retiro Familiar en Los Gigantes",
      "description": "Retiro de inmersión familiar de 3 días en la Sierra de Achala. Adultos en red, infancia en libertad, gastronomía de montaña y experiencias transformadoras.",
      "startDate": "2026-05-01",
      "endDate": "2026-05-03",
      "location": { "@type": "Place", "name": "Mágico Ensueño", "address": { "@type": "PostalAddress", "addressLocality": "Los Gigantes", "addressRegion": "Córdoba", "addressCountry": "AR" } },
      "organizer": { "@type": "Organization", "name": "Mágico Ensueño", "url": "https://experienciamagico.com" },
      "offers": { "@type": "Offer", "price": "280000", "priceCurrency": "ARS", "availability": "https://schema.org/LimitedAvailability", "url": URL },
      "image": IMG,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    };
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.id   = 'ld-familion';
    ldScript.textContent = JSON.stringify(schema);
    if (!document.getElementById('ld-familion')) document.head.appendChild(ldScript);

    return () => {
      document.title = prevTitle;
      document.getElementById('ld-familion')?.remove();
    };
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
      <>
        <Header />
        <div className="bg-white text-gray-800 overflow-x-hidden">


      {/* Header removed to avoid blank page if context is missing */}

      {/* ====== HERO SECTION (closer, centered) ====== */}
      <FamilionHero />

      {/* ====== VIDEO INVITACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Text */}
            <div data-reveal className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">Una Invitación de la Edición Anterior</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Sabemos que compartir en familia en la ciudad es un gran desafío y que las vacaciones a veces se sienten como 'más trabajo'. En Familion, Co-creamos una experiencia en comunidad para disfrutar una experiencia inolvidable.
              </p>
              <p className="text-brand-green text-xl md:text-2xl serif-title font-bold mt-6">
                Porque Co-crear en tribu es la que va!
              </p>
            </div>

            {/* Right Video */}
            <div data-reveal data-delay="1" className="flex justify-center">
              <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-brand-gold/50 overflow-hidden shadow-2xl">
                <iframe
                  width="360"
                  height="640"
                  src="https://www.youtube-nocookie.com/embed/Sqc7zbR-sPQ"
                  title="Familion - Una invitación"
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  className="w-full h-full rounded-3xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ECO-CENTRO ====== */}
      <section id="comodidad" className="py-16 md:py-24 px-6 bg-[#005333]/[0.04]">
        <div className="max-w-4xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            Nuestro Eco-centro
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light">
            Pensado para familias en comunidad. Nos ocupamos de toda la logística; vos solo te ocupás de estar con los tuyos.
          </p>

          <div className="divide-y divide-[#E8E4D9]">
            {[
              {
                num: "01",
                title: "Alojamiento",
                text: "Camping, domos geodésicos o eco-refugio compartido. Diseñado para facilitar la red familiar, con limpieza y orden impecables. No somos un hotel tradicional; somos un espacio sustentable diseñado para el encuentro real.",
              },
              {
                num: "02",
                title: "Energía y Conexión",
                text: "100% energía solar y Wi-Fi Starlink disponible para emergencias o trabajo puntual. Nuestra recomendación es el silencio digital — la montaña tiene una señal mucho más potente.",
              },
            ].map((item) => (
              <div key={item.num} className="py-8 flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                <div className="md:w-52 flex-shrink-0">
                  <span className="serif-title text-4xl font-light block leading-none" style={{ color: 'rgba(0,83,51,0.15)' }}>{item.num}</span>
                  <h4 className="font-bold brand-green text-sm uppercase tracking-widest mt-2">{item.title}</h4>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LOS 4 PILARES ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            Los 4 Pilares de la Experiencia
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light">
            Cada dimensión de Familion está pensada para que adultos y niños puedan estar completamente presentes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {[
              { num: "01", Icon: UsersThreeIcon, title: "Adultos en Red", text: "Círculos de conexión para soltar la carga de la crianza solitaria y encontrar tribu." },
              { num: "02", Icon: LeafIcon, title: "Infancia en Libertad", text: "Arroyos, talleres en la naturaleza y aventura real sin pantallas." },
              { num: "03", Icon: ForkKnifeIcon, title: "Gastronomía de Montaña", text: "9 comidas caseras, abundantes y nutritivas, pensadas para sostener la energía de toda la familia." },
              { num: "04", Icon: StarIcon, title: "Experiencias Transformadoras", text: "Yoga al amanecer, Temazcal y rituales de fuego bajo las estrellas de los Gigantes." },
            ].map((item, i) => (
              <div key={item.num} data-reveal data-delay={String(i + 1)} className={`py-7 flex items-start gap-6 ${i < 2 ? 'border-b border-[#E8E4D9]' : ''} ${i > 1 ? 'border-b border-[#E8E4D9] md:border-b-0' : ''}`}>
                <span className="serif-title text-2xl font-light flex-shrink-0 w-9 leading-none mt-0.5" style={{ color: 'rgba(0,83,51,0.15)' }}>{item.num}</span>
                <div>
                  <h4 className="font-bold brand-green text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                    <item.Icon weight="light" className="w-4 h-4 flex-shrink-0 opacity-60" aria-hidden="true" />
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CRONOGRAMA ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="mb-10 md:mb-14">
            <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green mb-3">Tres días · Los Gigantes</p>
            <h2 className="text-4xl md:text-5xl serif-title brand-green" style={{ lineHeight: '1.1' }}>
              Ritmo Serrano
            </h2>
          </div>

          <div className="max-w-4xl">

            {/* Viernes */}
            <div data-reveal data-delay="1" className="pb-10 md:pb-14">
              <div className="flex items-end gap-5 md:gap-8 pb-5 mb-6 border-b border-[#E8E4D9]">
                <span className="serif-title text-[88px] md:text-[120px] font-light leading-none select-none" style={{ color: '#005333', opacity: 0.08 }}>1</span>
                <div className="pb-2 flex items-end gap-4">
                  <div>
                    <p className="font-medium uppercase tracking-[0.22em] text-[11px] brand-green mb-1">Viernes · 1 de Mayo</p>
                    <h3 className="text-2xl md:text-3xl serif-title brand-green">Llegada y Fuego</h3>
                  </div>
                  <CampfireIcon weight="light" className="w-7 h-7 text-brand-gold mb-1 flex-shrink-0" />
                </div>
              </div>
              <div className="divide-y divide-[#EDEBE3] md:pl-12">
                {["Bienvenida y acomodación", "Almuerzo de encuentro", "Círculos de juego · niños y adultos", "Atardecer Mágico en la sierra", "Fuego y cena grupal bajo el cielo abierto"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-base leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

            <div className="w-12 h-px bg-[#D4AF37] mb-10 md:mb-14" />

            {/* Sábado */}
            <div data-reveal data-delay="2" className="pb-10 md:pb-14">
              <div className="flex items-end gap-5 md:gap-8 pb-5 mb-6 border-b border-[#E8E4D9]">
                <span className="serif-title text-[88px] md:text-[120px] font-light leading-none select-none" style={{ color: '#005333', opacity: 0.08 }}>2</span>
                <div className="pb-2 flex items-end gap-4">
                  <div>
                    <p className="font-medium uppercase tracking-[0.22em] text-[11px] brand-green mb-1">Sábado · 2 de Mayo</p>
                    <h3 className="text-2xl md:text-3xl serif-title brand-green">Raíces y Cielo</h3>
                  </div>
                  <SunIcon weight="light" className="w-7 h-7 text-brand-gold mb-1 flex-shrink-0" />
                </div>
              </div>
              <div className="divide-y divide-[#EDEBE3] md:pl-12">
                {["Yoga y meditación para adultos · juego libre para niños", "Plantación de tabaquillos en familia", "Cocina familiar compartida", "Tarde libre en la naturaleza", "Ceremonia de Temazcal"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-base leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

            <div className="w-12 h-px bg-[#D4AF37] mb-10 md:mb-14" />

            {/* Domingo */}
            <div data-reveal data-delay="3">
              <div className="flex items-end gap-5 md:gap-8 pb-5 mb-6 border-b border-[#E8E4D9]">
                <span className="serif-title text-[88px] md:text-[120px] font-light leading-none select-none" style={{ color: '#005333', opacity: 0.08 }}>3</span>
                <div className="pb-2 flex items-end gap-4">
                  <div>
                    <p className="font-medium uppercase tracking-[0.22em] text-[11px] brand-green mb-1">Domingo · 3 de Mayo</p>
                    <h3 className="text-2xl md:text-3xl serif-title brand-green">Cierre y Partida</h3>
                  </div>
                  <MoonIcon weight="light" className="w-7 h-7 text-brand-gold mb-1 flex-shrink-0" />
                </div>
              </div>
              <div className="divide-y divide-[#EDEBE3] md:pl-12">
                {["Taller de arte natural y cocina", "Dinámicas y actividades de cierre", "Almuerzo de integración", "Despegue a la tarde"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-base leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

          </div>

          <p className="mt-12 text-gray-400 text-sm font-light italic max-w-xl">
            Todas las actividades son flexibles y se co-crean con el sentir de la tribu en cada momento.
          </p>
        </div>
      </section>

      {/* ====== TESTIMONIOS ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green text-center mb-8 md:mb-10">
            Voces que Inspiran
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Testimonio 1 */}
            <div data-reveal className="p-8 md:p-10 bg-white rounded-2xl card-hover border border-brand-green/10">
              <div className="testimonial-quote mb-6">
                <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                  "¡Es una vivencia que se graba en el alma! El silencio majestuoso nos envolvió como un abrazo."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src="/uploads/tefi y familia.webp" alt="Tefi y familia" loading="lazy" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="font-bold text-brand-green text-sm">Tefi y familia</p>
                  <p className="text-xs text-gray-400">Edición anterior</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div data-reveal data-delay="1" className="p-8 md:p-10 bg-white rounded-2xl card-hover border border-brand-green/10">
              <div className="testimonial-quote mb-6">
                <p className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                  "Adultos disfrutando a pleno, aire puro y atención a los chicos con buena onda. La comida, abundante y deliciosa."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src="/uploads/portada familion.webp" alt="Jesica, Pablo y familia" loading="lazy" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
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
                    src="https://www.youtube-nocookie.com/embed/IfMqF4oW_fM"
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
                    src="https://www.youtube-nocookie.com/embed/wVNmRkIj0-o"
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

      {/* ====== FAQ ====== */}
      <FamilionFAQ />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#005333]/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-6" style={{ lineHeight: '1.12' }}>
            La montaña espera. Tu tribu también.
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto font-light">
            Familion es la pausa que tu familia necesita: tres días sin prisa, con tribu real, en la sierra que sana.
          </p>
          <a data-reveal data-delay="2" href={"https://wa.me/" + WA_MAGICO + "?text=Hola!%20Vengo%20de%20Familion%20y%20quiero%20consultar%20la%20experiencia."} className="btn-gold inline-block">
            Asegurar nuestro lugar
          </a>
        </div>
      </section>

      {/* ====== VIDEO DESPEDIDA ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl serif-title brand-green mb-8 md:mb-10">La Magia de Compartir la Mesa</h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">Así es como celebramos cada comida en Familion — con gratitud, conexión y el amor que se respira en cada bocado.</p>
          <div className="flex justify-center">
            <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-brand-gold/50 overflow-hidden shadow-2xl">
              <iframe
                width="360"
                height="640"
                src="https://www.youtube-nocookie.com/embed/QqGrzFloHsE"
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
