import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Tree, PuzzlePiece, UsersThree, Plant, Leaf, Mountains, Palette, Check } from '@phosphor-icons/react';

import AulaVerdeHero from './components/AulaVerdeHero';
import AulaVerdeMagico from './components/AulaVerdeMagico';
import AulaVerdeTestimonio from './components/AulaVerdeTestimonio';
import AulaVerdeLeadMagnet from './components/AulaVerdeLeadMagnet';
import AulaVerdePrecios from './components/AulaVerdePrecios';
import AulaVerdeFAQ from './components/AulaVerdeFAQ';
import { WhatsAppButton } from '../components/WhatsAppButton';

const AulaVerde: React.FC = () => {
  useEffect(() => {
    const TITLE = 'Aula Verde — Campamentos Educativos · Los Gigantes, Córdoba | Mágico Ensueño';
    const DESC  = 'Campamentos educativos con propósito en Los Gigantes, Córdoba. Para escuelas y colegios. Talleres agroecológicos, aventura y naturaleza. Adaptados a nivel primario y secundario.';
    const URL   = 'https://experienciamagico.com/escuelas';
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

    const schema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Aula Verde — Mágico Ensueño",
      "description": "Campamentos educativos con propósito en la Sierra de Achala. Talleres agroecológicos, aventura y naturaleza para escuelas.",
      "url": URL,
      "location": { "@type": "Place", "name": "Mágico Ensueño", "address": { "@type": "PostalAddress", "addressLocality": "Los Gigantes", "addressRegion": "Córdoba", "addressCountry": "AR" } }
    };
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.id   = 'ld-aulaverde';
    ldScript.textContent = JSON.stringify(schema);
    if (!document.getElementById('ld-aulaverde')) document.head.appendChild(ldScript);

    return () => {
      document.title = prevTitle;
      document.getElementById('ld-aulaverde')?.remove();
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
      <style>{`
        * { font-family: 'Jost', sans-serif; }
        h1, h2, h3, h4, .serif-title { font-family: 'Gilda Display', serif; }

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
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: none;
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
        }

        .btn-gold:hover {
          transform: translateY(-2px);
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
          transition: background-color 0.2s ease;
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
        }

        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 83, 51, 0.1);
        }

        .video-aspect {
          aspect-ratio: 9 / 16;
          border-radius: 1.5rem;
          overflow: hidden;
          max-height: 80vh;
        }

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
          color: #005333;
          opacity: 0.15;
          font-family: 'Gilda Display', serif;
        }

        @media (prefers-reduced-motion: reduce) {
          .btn-gold:hover { transform: none; }
          .card-hover:hover { transform: none; }
        }

        /* ── Scroll reveal ── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-reveal].visible { opacity: 1; transform: translateY(0); }
        [data-reveal][data-delay="1"] { transition-delay: 100ms; }
        [data-reveal][data-delay="2"] { transition-delay: 200ms; }
        [data-reveal][data-delay="3"] { transition-delay: 300ms; }
        [data-reveal][data-delay="4"] { transition-delay: 400ms; }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}

      </style>

      {/* ====== HERO SECTION ====== */}
      <AulaVerdeHero />

      {/* ====== VIDEO INVITACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Text */}
            <div data-reveal className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10">
                Aprender desde la experiencia, con todos los sentidos
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                «Aula Verde» es una oportunidad para que niños y jóvenes se alejen de las pantallas y vuelvan a conectarse con lo esencial: la naturaleza, el cuerpo, el otro, el juego, la tierra.
              </p>
              <p className="brand-green text-xl md:text-2xl serif-title font-bold mt-6">
                Creemos en una educación que emociona, que se vive con el cuerpo y que deja huellas duraderas.
              </p>
            </div>

            {/* Right Video */}
            <div data-reveal data-delay="1" className="flex justify-center">
              <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl">
                <iframe
                  width="360"
                  height="640"
                  src="https://www.youtube.com/embed/lLHk-lpRofE"
                  title="Aprender desde la experiencia"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full rounded-3xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DIRIGIDA A ====== */}
      <section id="dirigida-a" className="py-16 md:py-24 px-6 bg-[#005333]/[0.04]">
        <div className="max-w-4xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            ¿A quién va dirigido?
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light">
            Diseñamos cada programa a la medida del grupo, porque sabemos que ninguna escuela es igual.
          </p>
          <div className="divide-y divide-[#E8E4D9]">
            {[
              { num: "01", title: "Escuelas y Docentes", text: "Para instituciones educativas, docentes, directivos y coordinadores que organizan salidas educativas y campamentos escolares con un enfoque formativo e integral." },
              { num: "02", title: "Primario y Secundario", text: "Trabajamos con ambos niveles, adaptando cada programa a la edad, etapa educativa y objetivos del grupo. Sin límite de edad mientras sea una propuesta grupal." },
            ].map((item) => (
              <div key={item.num} data-reveal className="py-8 flex flex-col md:flex-row gap-4 md:gap-12 items-start">
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

      {/* ====== ¿QUÉ HACE DIFERENTE? ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            ¿Qué hace diferente nuestra propuesta?
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light">
            Un enfoque único que combina la fuerza del entorno natural con metodologías que dejan huella.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {[
              { num: "01", title: "Entorno Natural Privilegiado", text: "Inmerso en montañas y bosques nativos de las Sierras Grandes para explorar con seguridad y guías expertos." },
              { num: "02", title: "Metodología Vivencial", text: "Aprender puramente desde la experiencia y la reflexión. Nada de pizarrones; todo de tierra, arroyos y cielo abierto." },
              { num: "03", title: "Trabajo en Equipo y Convivencia", text: "Fomentamos la curiosidad, el pensamiento crítico y la conexión genuina entre pares y con la naturaleza." },
              { num: "04", title: "Sustentabilidad Activa", text: "Compostaje, plantación de tabaquillos, 100% energía solar. Los chicos no solo aprenden sobre sustentabilidad: la practican." },
            ].map((item, i) => (
              <div key={item.num} data-reveal data-delay={String(i + 1)} className={`py-7 flex items-start gap-6 ${i < 2 ? 'border-b border-[#E8E4D9]' : ''} ${i > 1 ? 'border-b border-[#E8E4D9] md:border-b-0' : ''}`}>
                <span className="serif-title text-2xl font-light flex-shrink-0 w-9 leading-none mt-0.5" style={{ color: 'rgba(0,83,51,0.15)' }}>{item.num}</span>
                <div>
                  <h4 className="font-bold brand-green text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CATÁLOGO DE ACTIVIDADES ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-14">
            <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
              Catálogo de Actividades
            </h2>
            <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Diseñamos cada jornada a la medida del grupo. Combinamos aventura, tierra y expresión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-0 divide-y md:divide-y-0 divide-[#E8E4D9]">
            {/* Talleres Agroecológicos */}
            <div data-reveal className="py-8 md:py-0 md:border-r md:border-[#E8E4D9] md:pr-10">
              <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green mb-3">Módulo 01</p>
              <h3 className="text-xl md:text-2xl serif-title brand-green mb-6">Talleres Agroecológicos</h3>
              <div className="divide-y divide-[#EDEBE3]">
                {["Huerta y Cultivos Orgánicos", "Cocina Saludable y Regenerativa", "Compostaje y Reciclaje", "Botiquín Natural"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

            {/* Aventura y Naturaleza */}
            <div data-reveal data-delay="1" className="py-8 md:py-0 md:border-r md:border-[#E8E4D9] md:px-10">
              <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green mb-3">Módulo 02</p>
              <h3 className="text-xl md:text-2xl serif-title brand-green mb-6">Aventura y Naturaleza</h3>
              <div className="divide-y divide-[#EDEBE3]">
                {["Exploración de Arroyos y Ríos", "Senderismo y Aventura de Montaña", "Reconocimiento de Flora y Mundo Mineral", "Avistaje de Aves", "Conservación de Biodiversidad"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

            {/* Arte y Expresión */}
            <div data-reveal data-delay="2" className="py-8 md:py-0 md:pl-10">
              <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green mb-3">Módulo 03</p>
              <h3 className="text-xl md:text-2xl serif-title brand-green mb-6">Arte y Expresión</h3>
              <div className="divide-y divide-[#EDEBE3]">
                {["Arte Natural y Reciclaje", "Artes Escénicas y Teatro", "Música y Expresión Corporal", "Fogones Culturales"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MÁGICO ENSUEÑO - UBICACIÓN ====== */}
      <AulaVerdeMagico />

      {/* ====== TESTIMONIOS Y LOGOS ====== */}
      <AulaVerdeTestimonio />

      {/* ====== LEAD MAGNET (DESCARGA DE PDF) ====== */}
      <AulaVerdeLeadMagnet />

      {/* ====== PRECIOS ====== */}
      <AulaVerdePrecios />

      {/* ====== PREGUNTAS FRECUENTES ====== */}
      <AulaVerdeFAQ />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#005333]/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-6" style={{ lineHeight: '1.12' }}>
            ¿Listos para planificar el próximo campamento?
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto font-light">
            En Aula Verde te acompañamos en cada paso: propuesta pedagógica, logística y seguridad. Todo adaptado a la medida de tu institución.
          </p>
          <a data-reveal data-delay="2" href="https://wa.me/5493516765820?text=Hola!%20Vengo%20de%20Aula%20Verde%20y%20quiero%20solicitar%20presupuesto%20para%20mi%20escuela." className="btn-gold inline-block">
            Solicitar asesoramiento
          </a>
        </div>
      </section>

      {/* ====== VIDEO DESPEDIDA ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="text-2xl md:text-3xl serif-title brand-green mb-8 md:mb-10">Momentos que fortalecen al grupo</h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">El aprendizaje continúa fuera de los talleres. Compartir las comidas, los fogones y el tiempo libre en la naturaleza genera lazos de compañerismo, empatía y respeto que los chicos se llevan de regreso al aula.</p>
          <div className="flex justify-center">
            <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl">
              <iframe
                width="360"
                height="640"
                src="https://www.youtube.com/embed/_p6dA0v2Fcs"
                title="Momentos que fortalecen al grupo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                loading="lazy"
                className="w-full h-full rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

        {/* Footer */}
        <Footer />

        {/* Catálisis Credit */}
        <div className="bg-[#005333]/5 text-[#005333]/60 text-center text-xs py-3 border-t border-[#005333]/10">
          Growth systems & digital experience by Catálisis
        </div>

        <WhatsAppButton />

      </div>
      </>
    </LanguageProvider>
  );
};

export default AulaVerde;
