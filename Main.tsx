import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionNosotros } from './components/SectionNosotros';
import { SectionPilares } from './components/SectionPilares';
import { SectionVideo } from './components/SectionVideo';
import { SectionExperiencias } from './components/SectionExperiencias';
import { SectionRetiros } from './components/SectionRetiros';
import { SectionEscuelas } from './components/SectionEscuelas';
import { SectionVoluntariados } from './components/SectionVoluntariados';
import { SectionTestimonios } from './components/SectionTestimonios';
import { SectionEventos } from './components/SectionEventos';
import { SectionComoLlegar } from './components/SectionComoLlegar';
import { SectionContacto } from './components/SectionContacto';
import { SectionInclusiones } from './components/SectionInclusiones';
import { SectionParaQuien } from './components/SectionParaQuien';
import { SectionFAQ } from './components/SectionFAQ';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieBanner } from './components/CookieBanner';

const Main: React.FC = () => {
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    // Forzamos la carga de elementos pesados después de que la prioridad inicial termine
    // o después de 1 segundo como máximo (seguridad para PageSpeed y UX)
    const timer = setTimeout(() => setBelowFoldReady(true), 1000);
    
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        clearTimeout(timer);
        setBelowFoldReady(true);
      });
    }
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const TITLE = 'Mágico Ensueño — Eco‑Refugio & Glamping · Los Gigantes, Córdoba';
    const DESC  = 'Ecocentro en Sierras Grandes de Córdoba: retiros, co-living, glamping en domos y yurta, voluntariados y cocina de autor. 25 años regenerando la montaña.';
    const URL   = 'https://experienciamagico.com/';
    const IMG   = 'https://experienciamagico.com/uploads/img_6948.webp';
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
    setMeta('meta[property="og:locale"]',       'content',  'es_AR');

    const schema = {
      "@context": "https://schema.org",
      "@type": ["LodgingBusiness", "TouristAttraction"],
      "name": "Mágico Ensueño",
      "description": DESC,
      "url": URL,
      "image": IMG,
      "telephone": "+5493516765820",
      "email": "experienciamagico@gmail.com",
      "priceRange": "$$",
      "currenciesAccepted": "ARS",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Paraje Cuchilla Nevada, Ojo de Agua",
        "addressLocality": "Pedanía La Candelaria",
        "addressRegion": "Córdoba",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -31.5,
        "longitude": -64.7
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "64",
        "bestRating": "5",
        "worstRating": "1"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Glamping en domos geodésicos" },
        { "@type": "LocationFeatureSpecification", "name": "Energía solar" },
        { "@type": "LocationFeatureSpecification", "name": "Retiros y voluntariados" },
        { "@type": "LocationFeatureSpecification", "name": "Coworking con Starlink" },
        { "@type": "LocationFeatureSpecification", "name": "Cocina de autor orgánica" }
      ]
    };
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.id   = 'ld-main';
    ldScript.textContent = JSON.stringify(schema);
    if (!document.getElementById('ld-main')) document.head.appendChild(ldScript);

    return () => {
      document.title = prevTitle;
      document.getElementById('ld-main')?.remove();
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
      <div className="font-sans antialiased selection:bg-brand selection:text-white">
        <Header />
        <main>
          <Hero />
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px', isolation: 'isolate' }}><SectionEventos /></div>
          <SectionNosotros />
          <SectionPilares />
          <SectionVideo />
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px', isolation: 'isolate' }}><SectionExperiencias /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px', isolation: 'isolate' }}><SectionInclusiones /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px', isolation: 'isolate' }}><SectionParaQuien /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px', isolation: 'isolate' }}><SectionTestimonios /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px', isolation: 'isolate' }}><SectionRetiros /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px', isolation: 'isolate' }}><SectionEscuelas /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px', isolation: 'isolate' }}><SectionVoluntariados /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px', isolation: 'isolate' }}><SectionComoLlegar /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px', isolation: 'isolate' }}><SectionFAQ /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px', isolation: 'isolate' }}><SectionContacto /></div>
        </main>
        {belowFoldReady && <Footer />}
        <WhatsAppButton />
        {belowFoldReady && <CookieBanner />}
      </div>
    </LanguageProvider>
  );
};

export default Main;