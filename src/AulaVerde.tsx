import React, { useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UsersThreeIcon, PlantIcon, LeafIcon, MountainsIcon, PaletteIcon, ChalkboardTeacherIcon } from '@phosphor-icons/react';

import AulaVerdeHero from './components/AulaVerdeHero';
import AulaVerdeMagico from './components/AulaVerdeMagico';
import AulaVerdeTestimonio from './components/AulaVerdeTestimonio';
import AulaVerdePrecios from './components/AulaVerdePrecios';
import AulaVerdeFAQ from './components/AulaVerdeFAQ';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { WA_MAGICO } from '../constants';

const AulaVerdeLeadMagnet = lazy(() => import('./components/AulaVerdeLeadMagnet'));

const AulaVerde: React.FC = () => {
  useEffect(() => {
    const TITLE = 'Aula Verde — Campamentos Educativos · Los Gigantes, Córdoba | Mágico Ensueño';
    const DESC  = 'Campamentos educativos en Los Gigantes, Córdoba. Talleres agroecológicos, aventura y naturaleza. Para escuelas, primaria y secundaria. Capacidad hasta 180 alumnos.';
    const URL   = 'https://experienciamagico.com/escuelas';
    const IMG   = 'https://experienciamagico.com/uploads/Aula Verde/IMG-20251120-WA0149.jpg';
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
      "@graph": [
        {
          "@type": "Service",
          "name": "Aula Verde — Campamentos Educativos",
          "provider": { "@type": "Organization", "name": "Mágico Ensueño", "url": "https://www.experienciamagico.com" },
          "description": "Campamentos educativos en Los Gigantes, Córdoba. Talleres agroecológicos, aventura y naturaleza para escuelas. Adaptado a primaria y secundaria. Capacidad hasta 180 alumnos.",
          "serviceType": "Campamento educativo",
          "areaServed": { "@type": "Country", "name": "Argentina" },
          "url": URL,
          "location": { "@type": "Place", "name": "Mágico Ensueño", "address": { "@type": "PostalAddress", "addressLocality": "Los Gigantes", "addressRegion": "Córdoba", "addressCountry": "AR" } }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Qué pasa si llueve o hay mal clima durante el campamento?",
              "acceptedAnswer": { "@type": "Answer", "text": "Contamos con un Salón Octogonal cerrado y vidriado de más de 100m² y espacios techados donde adaptamos todas las dinámicas grupales, talleres y comidas sin perder la magia de la experiencia." }
            },
            {
              "@type": "Question",
              "name": "¿Cómo funciona la asistencia médica y seguridad?",
              "acceptedAnswer": { "@type": "Answer", "text": "Trabajamos con Guías Profesionales habilitados y coordinación permanente. La tarifa incluye Seguros de Accidentes Personales y de Responsabilidad Civil, y contamos con protocolos de asistencia médica, estando a solo una hora de los centros urbanos (Tanti/Carlos Paz)." }
            },
            {
              "@type": "Question",
              "name": "¿Se adaptan a dietas especiales, vegetarianos o celíacos?",
              "acceptedAnswer": { "@type": "Answer", "text": "Sí. La gastronomía es 100% casera. Si nos avisan con anticipación al hacer la reserva, adaptamos el menú para celiaquía, restricciones alimentarias, vegetarianos o veganos." }
            },
            {
              "@type": "Question",
              "name": "¿Cómo es el acceso para micros o transportes escolares?",
              "acceptedAnswer": { "@type": "Answer", "text": "El acceso es muy sencillo. Contamos con camino apto para todo tipo de vehículos y los micros escolares pueden llegar directamente hasta la puerta del predio." }
            },
            {
              "@type": "Question",
              "name": "¿Los docentes y acompañantes pagan la misma tarifa?",
              "acceptedAnswer": { "@type": "Answer", "text": "No. Manejamos una política de liberados (bonificados) dependiendo de la cantidad de alumnos. Al solicitar el presupuesto, detallamos cuántos lugares bonificados corresponden al grupo." }
            },
            {
              "@type": "Question",
              "name": "¿Cuántos alumnos puede recibir Mágico Ensueño?",
              "acceptedAnswer": { "@type": "Answer", "text": "Hemos anfitrionado experiencias de hasta 180 jóvenes. Disponemos de un salón de más de 100m², eco-refugio con habitaciones compartidas, domos geodésicos, baños con agua caliente 24hs y WiFi satelital." }
            }
          ]
        }
      ]
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
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
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
              { num: "01", Icon: ChalkboardTeacherIcon, title: "Escuelas y Docentes", text: "Para instituciones educativas, docentes, directivos y coordinadores que organizan salidas educativas y campamentos escolares con un enfoque formativo e integral." },
              { num: "02", Icon: UsersThreeIcon, title: "Primario y Secundario", text: "Trabajamos con ambos niveles, adaptando cada programa a la edad, etapa educativa y objetivos del grupo. Sin límite de edad mientras sea una propuesta grupal." },
            ].map((item) => (
              <div key={item.num} data-reveal className="py-8 flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                <div className="md:w-52 flex-shrink-0">
                  <span className="serif-title text-4xl font-light block leading-none" style={{ color: 'rgba(0,83,51,0.15)' }}>{item.num}</span>
                  <h4 className="font-bold brand-green text-sm uppercase tracking-widest mt-2 flex items-center gap-2">
                    <item.Icon weight="light" className="w-4 h-4 flex-shrink-0 opacity-60" aria-hidden="true" />
                    {item.title}
                  </h4>
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
              { num: "01", Icon: MountainsIcon, title: "Entorno Natural Privilegiado", text: "Inmerso en montañas y bosques nativos de las Sierras Grandes para explorar con seguridad y guías expertos." },
              { num: "02", Icon: LeafIcon,      title: "Metodología Vivencial",        text: "Aprender puramente desde la experiencia y la reflexión. Nada de pizarrones; todo de tierra, arroyos y cielo abierto." },
              { num: "03", Icon: UsersThreeIcon, title: "Trabajo en Equipo y Convivencia", text: "Fomentamos la curiosidad, el pensamiento crítico y la conexión genuina entre pares y con la naturaleza." },
              { num: "04", Icon: PlantIcon,     title: "Sustentabilidad Activa",       text: "Compostaje, plantación de tabaquillos, 100% energía solar. Los chicos no solo aprenden sobre sustentabilidad: la practican." },
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
              <div className="flex items-center gap-2 mb-3">
                <PlantIcon weight="light" className="w-5 h-5 text-[#005333]/40" aria-hidden="true" />
                <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green">Módulo 01</p>
              </div>
              <h3 className="text-xl md:text-2xl serif-title brand-green mb-6">Talleres Agroecológicos</h3>
              <div className="divide-y divide-[#EDEBE3]">
                {["Huerta y Cultivos Orgánicos", "Cocina Saludable y Regenerativa", "Compostaje y Reciclaje", "Botiquín Natural"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

            {/* Aventura y Naturaleza */}
            <div data-reveal data-delay="1" className="py-8 md:py-0 md:border-r md:border-[#E8E4D9] md:px-10">
              <div className="flex items-center gap-2 mb-3">
                <MountainsIcon weight="light" className="w-5 h-5 text-[#005333]/40" aria-hidden="true" />
                <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green">Módulo 02</p>
              </div>
              <h3 className="text-xl md:text-2xl serif-title brand-green mb-6">Aventura y Naturaleza</h3>
              <div className="divide-y divide-[#EDEBE3]">
                {["Exploración de Arroyos y Ríos", "Senderismo y Aventura de Montaña", "Reconocimiento de Flora y Mundo Mineral", "Avistaje de Aves", "Conservación de Biodiversidad"].map((item, i) => (
                  <p key={i} className="py-3 text-gray-600 font-light text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            </div>

            {/* Arte y Expresión */}
            <div data-reveal data-delay="2" className="py-8 md:py-0 md:pl-10">
              <div className="flex items-center gap-2 mb-3">
                <PaletteIcon weight="light" className="w-5 h-5 text-[#005333]/40" aria-hidden="true" />
                <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green">Módulo 03</p>
              </div>
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
      <Suspense fallback={<div className="h-32" />}>
        <AulaVerdeLeadMagnet />
      </Suspense>

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
          <a data-reveal data-delay="2" href={"https://wa.me/" + WA_MAGICO + "?text=Hola!%20Vengo%20de%20Aula%20Verde%20y%20quiero%20solicitar%20presupuesto%20para%20mi%20escuela."} className="btn-gold inline-block">
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
