import React, { useEffect, lazy, Suspense } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UsersThreeIcon, PlantIcon, LeafIcon, MountainsIcon, PaletteIcon, ChalkboardTeacherIcon, StarIcon, DiamondIcon, RecycleIcon } from '@phosphor-icons/react';

import AulaVerdeHero from './components/AulaVerdeHero';
import AulaVerdeMagico from './components/AulaVerdeMagico';
import AulaVerdeTestimonio from './components/AulaVerdeTestimonio';
import AulaVerdePrecios from './components/AulaVerdePrecios';
import AulaVerdeFAQ from './components/AulaVerdeFAQ';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { WA_MAGICO, SITE_URL } from './data/config';
import { ROUTES } from './routes';

const AulaVerdeLeadMagnet = lazy(() => import('./components/AulaVerdeLeadMagnet'));

const AulaVerdeContent: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const TITLE = t.aula_verde.seo.title;
    const DESC  = t.aula_verde.seo.description;
    const URL   = SITE_URL + ROUTES.ESCUELAS;
    const IMG   = `${SITE_URL}/uploads/Aula Verde/IMG-20251120-WA0149.jpg`;
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
    setMeta('meta[property="og:image:width"]',  'property', 'og:image:width');
    setMeta('meta[property="og:image:width"]',  'content',  '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height');
    setMeta('meta[property="og:image:height"]', 'content',  '630');
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
    setMeta('meta[property="og:locale"]',       'content',  language === 'es' ? 'es_AR' : 'en_US');

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "EducationalOccupationalProgram",
          "name": TITLE,
          "provider": { "@type": "Organization", "name": "Mágico Ensueño", "url": "https://www.experienciamagico.com" },
          "description": DESC,
          "serviceType": language === 'es' ? "Campamento educativo" : "Educational camp",
          "areaServed": { "@type": "Country", "name": "Argentina" },
          "url": URL,
          "location": { "@type": "Place", "name": "Mágico Ensueño", "address": { "@type": "PostalAddress", "addressLocality": "Los Gigantes", "addressRegion": "Córdoba", "addressCountry": "AR" } }
        },
        {
          "@type": "FAQPage",
          "mainEntity": t.aula_verde.faq.items.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          }))
        }
      ]
    };
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.id   = 'ld-aulaverde';
    ldScript.textContent = JSON.stringify(schema);
    
    // Remove old script if exists
    document.getElementById('ld-aulaverde')?.remove();
    document.head.appendChild(ldScript);

    return () => {
      document.title = prevTitle;
      document.getElementById('ld-aulaverde')?.remove();
    };
  }, [t, language]);

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

  const TARGET_AUDIENCE_ICONS = [ChalkboardTeacherIcon, UsersThreeIcon];
  const DIFFERENTIATOR_ICONS = [MountainsIcon, LeafIcon, UsersThreeIcon, PlantIcon];
  const CATALOG_ICONS = [PlantIcon, MountainsIcon, PaletteIcon, StarIcon, LeafIcon, DiamondIcon];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <Header />

      {/* ====== HERO SECTION ====== */}
      <AulaVerdeHero />

      {/* ====== VIDEO INVITACIÓN ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div data-reveal className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl serif-title brand-green mb-8 md:mb-10" dangerouslySetInnerHTML={{ __html: t.aula_verde.invitation.title }} />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {t.aula_verde.invitation.text1}
              </p>
              <p className="brand-green text-xl md:text-2xl serif-title font-bold mt-6">
                {t.aula_verde.invitation.text2}
              </p>
            </div>

            <div data-reveal data-delay="1" className="flex justify-center">
              <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl">
                <iframe
                  width="360"
                  height="640"
                  src="https://www.youtube-nocookie.com/embed/lLHk-lpRofE"
                  title={t.aula_verde.invitation.video_title}
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
            {t.aula_verde.dirigida_a.title}
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light">
            {t.aula_verde.dirigida_a.subtitle}
          </p>
          <div className="divide-y divide-[#E8E4D9]">
            {t.aula_verde.dirigida_a.items.map((item: any, i: number) => {
              const Icon = TARGET_AUDIENCE_ICONS[i];
              return (
                <div key={item.num} data-reveal className="py-8 flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                  <div className="md:w-52 flex-shrink-0">
                    <span className="serif-title text-4xl font-light block leading-none" style={{ color: 'rgba(0,83,51,0.15)' }}>{item.num}</span>
                    <h4 className="font-bold brand-green text-sm uppercase tracking-widest mt-2 flex items-center gap-2">
                      <Icon weight="light" className="w-4 h-4 flex-shrink-0 opacity-60" aria-hidden="true" />
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== ¿QUÉ HACE DIFERENTE? ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
            {t.aula_verde.diferencial.title}
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mb-10 font-light">
            {t.aula_verde.diferencial.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {t.aula_verde.diferencial.items.map((item: any, i: number) => {
              const Icon = DIFFERENTIATOR_ICONS[i];
              return (
                <div key={item.num} data-reveal data-delay={String(i + 1)} className={`py-7 flex items-start gap-6 ${i < 2 ? 'border-b border-[#E8E4D9]' : ''} ${i > 1 ? 'border-b border-[#E8E4D9] md:border-b-0' : ''}`}>
                  <span className="serif-title text-2xl font-light flex-shrink-0 w-9 leading-none mt-0.5" style={{ color: 'rgba(0,83,51,0.15)' }}>{item.num}</span>
                  <div>
                    <h4 className="font-bold brand-green text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Icon weight="light" className="w-4 h-4 flex-shrink-0 opacity-60" aria-hidden="true" />
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== CATÁLOGO DE ACTIVIDADES ====== */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-14">
            <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-5" style={{ lineHeight: '1.1' }}>
              {t.aula_verde.catalogo.title}
            </h2>
            <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              {t.aula_verde.catalogo.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-0 divide-y md:divide-y-0 divide-[#E8E4D9]">
            {t.aula_verde.catalogo.modules.map((module: any, mIdx: number) => {
              const Icon = CATALOG_ICONS[mIdx % CATALOG_ICONS.length];
              const col = mIdx % 3;
              const isSecondRow = mIdx >= 3;
              return (
                <div
                  key={mIdx}
                  data-reveal
                  data-delay={String(col)}
                  className={[
                    'py-8 md:py-0',
                    col < 2 ? 'md:border-r md:border-[#E8E4D9] md:pr-10' : 'md:pl-10',
                    col === 1 ? 'md:px-10' : '',
                    isSecondRow ? 'md:pt-12 md:border-t md:border-[#E8E4D9]' : '',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon weight="light" className="w-5 h-5 text-[#005333]/40" aria-hidden="true" />
                    <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green">{module.tag}</p>
                  </div>
                  <h3 className="text-xl md:text-2xl serif-title brand-green mb-6">{module.title}</h3>
                  <div className="divide-y divide-[#EDEBE3]">
                    {module.items.map((item: string, i: number) => (
                      <p key={i} className="py-3 text-gray-600 font-light text-sm leading-relaxed">{item}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nota equipo profesional */}
          {t.aula_verde.catalogo.team_note && (
            <div className="mt-12 md:mt-16 pt-8 border-t border-[#E8E4D9] flex items-start gap-4">
              <UsersThreeIcon weight="light" className="w-5 h-5 text-[#005333]/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {t.aula_verde.catalogo.team_note}
              </p>
            </div>
          )}

          {/* ====== ECONOMÍA CIRCULAR ====== */}
          {t.aula_verde.catalogo.circular_economy && (() => {
            const ce = t.aula_verde.catalogo.circular_economy;
            return (
              <div className="mt-14 md:mt-20 rounded-2xl bg-[#005333]/[0.04] border border-[#005333]/10 p-8 md:p-12" data-reveal>
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <RecycleIcon weight="light" className="w-5 h-5 text-[#005333]/50" aria-hidden="true" />
                  <p className="font-medium uppercase tracking-[0.2em] text-[11px] brand-green">{ce.tag}</p>
                </div>
                <h3 className="text-2xl md:text-3xl serif-title brand-green mb-3">{ce.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light max-w-2xl mb-6">{ce.intro}</p>

                {/* Las 9 Rs — tags compactos */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {ce.rs.map((r: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#005333]/15 rounded-full text-xs">
                      <span className="font-extrabold text-[#005333]">{r.slice(0, 2)}</span>
                      <span className="text-gray-500 font-light">{r.slice(2)}</span>
                    </span>
                  ))}
                </div>

                {/* Nota honesta "cómo lo vivimos" */}
                <div className="mt-8 pt-8 border-t border-[#005333]/10">
                  <p className="text-xs font-bold uppercase tracking-widest brand-green mb-2 opacity-60">{ce.practice_title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed font-light italic max-w-3xl">{ce.practice_text}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <AulaVerdeMagico />
      <AulaVerdeTestimonio />

      <Suspense fallback={<div className="h-32" />}>
        <AulaVerdeLeadMagnet />
      </Suspense>

      <AulaVerdePrecios />
      <AulaVerdeFAQ />

      {/* ====== CTA FINAL ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#005333]/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="text-3xl md:text-5xl serif-title brand-green mb-6" style={{ lineHeight: '1.12' }}>
            {t.aula_verde.cta_final.title}
          </h2>
          <p data-reveal data-delay="1" className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto font-light">
            {t.aula_verde.cta_final.subtitle}
          </p>
          <a data-reveal data-delay="2" href={"https://wa.me/" + WA_MAGICO + "?text=" + encodeURIComponent(t.aula_verde.magico.wa_query)} className="btn-gold inline-block">
            {t.aula_verde.cta_final.btn}
          </a>
        </div>
      </section>

      {/* ====== VIDEO DESPEDIDA ====== */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="text-2xl md:text-3xl serif-title brand-green mb-8 md:mb-10">{t.aula_verde.video_closing.title}</h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">{t.aula_verde.video_closing.text}</p>
          <div className="flex justify-center">
            <div className="video-aspect w-full max-w-[12rem] sm:max-w-[13rem] md:max-w-[15rem] bg-white rounded-3xl border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl">
              <iframe
                width="360"
                height="640"
                src="https://www.youtube-nocookie.com/embed/_p6dA0v2Fcs"
                title={t.aula_verde.video_closing.title}
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

      <Footer />

      <div className="bg-[#005333]/5 text-[#005333]/60 text-center text-xs py-3 border-t border-[#005333]/10">
        Growth systems & digital experience by Catálisis
      </div>

      <WhatsAppButton />
    </div>
  );
};

const AulaVerde: React.FC = () => {
  return <AulaVerdeContent />;
};

export default AulaVerde;
