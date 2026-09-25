import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  Check,
  Copy,
  Heart,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sprout,
  TreePine,
  Users,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { REFORESTATION_CONTRIBUTION, SITE_URL, WA_MAGICO } from './data/config';
import { ROUTES } from './routes';

const HERO_IMAGE = '/uploads/reforestacion/montana-hero.webp';

const Reforestacion: React.FC = () => {
  const { t, language } = useLanguage();
  const content = t.reforestation;
  const [copiedField, setCopiedField] = useState<'alias' | 'cbu' | null>(null);
  const hasAlias = Boolean(REFORESTATION_CONTRIBUTION.alias);
  const whatsappUrl = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(content.contribution.whatsappMessage)}`;

  useEffect(() => {
    const title = content.seo.title;
    const description = content.seo.description;
    const url = SITE_URL + ROUTES.REFORESTACION;
    const image = SITE_URL + HERO_IMAGE;
    const previousTitle = document.title;

    document.title = title;

    const setMeta = (selector: string, key: 'name' | 'property', keyValue: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(key, keyValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', language === 'es' ? 'es_AR' : 'en_US');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'ld-reforestacion';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'DonateAction',
      name: content.hero.title,
      description,
      recipient: {
        '@type': 'Organization',
        name: 'Pueblo Mágico',
        url: SITE_URL,
      },
      target: url,
    });
    document.getElementById(schema.id)?.remove();
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      document.getElementById(schema.id)?.remove();
    };
  }, [content, language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const copyValue = async (field: 'alias' | 'cbu', value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(current => current === field ? null : current), 2200);
  };

  const impactIcons = [TreePine, Sprout, Users];
  const useIcons = [Sprout, ShieldCheck, Heart, Leaf];

  return (
    <div className="bg-bone text-dark overflow-x-hidden">
      <Header />

      <main>
        <section className="relative min-h-[720px] h-[94vh] flex items-end overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt={content.hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071d14]/95 via-[#071d14]/45 to-[#071d14]/10" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 md:pb-24">
            <p className="text-gold text-[11px] uppercase tracking-[0.28em] font-bold mb-5">
              {content.hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-white font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] font-light mb-6">
              {content.hero.title}
            </h1>
            <p className="max-w-2xl text-white/80 text-lg md:text-xl font-light leading-relaxed mb-9">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#aportar" className="btn-gold inline-flex items-center justify-center gap-2">
                {content.hero.primaryCta}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a href="#impacto" className="btn-glass inline-flex items-center justify-center">
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <section id="impacto" className="bg-white py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div data-reveal>
              <div className="max-w-3xl mx-auto text-center mb-14">
                <p className="text-brand text-[11px] uppercase tracking-[0.25em] font-bold mb-4">{content.impact.eyebrow}</p>
                <h2 className="font-serif text-4xl md:text-5xl text-brand leading-tight mb-6">{content.impact.title}</h2>
                <p className="text-gray-600 text-lg font-light leading-relaxed">{content.impact.description}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {content.impact.stats.map((stat: { value: string; label: string; description: string }, index: number) => {
                const Icon = impactIcons[index];
                return (
                  <div data-reveal data-delay={String(index + 1)} key={stat.label}>
                    <article className="h-full rounded-2xl border border-brand/10 bg-bone p-7 text-center">
                      <Icon size={30} strokeWidth={1.5} className="mx-auto text-gold mb-5" aria-hidden="true" />
                      <p className="font-serif text-4xl text-brand mb-2">{stat.value}</p>
                      <h3 className="font-semibold text-dark mb-3">{stat.label}</h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{stat.description}</p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 bg-bone">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div data-reveal>
              <img
                src="/uploads/reforestacion/comunidad-atardecer.webp"
                alt={content.story.imageAlt}
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div data-reveal data-delay="1">
              <p className="text-brand text-[11px] uppercase tracking-[0.25em] font-bold mb-4">{content.story.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand leading-tight mb-6">{content.story.title}</h2>
              {content.story.paragraphs.map((paragraph: string) => (
                <p key={paragraph} className="text-gray-600 text-lg font-light leading-relaxed mb-5">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand py-20 md:py-28 px-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div data-reveal>
              <div className="max-w-3xl mb-14">
                <p className="text-gold text-[11px] uppercase tracking-[0.25em] font-bold mb-4">{content.use.eyebrow}</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{content.use.title}</h2>
                <p className="text-white/70 text-lg font-light leading-relaxed">{content.use.description}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.use.items.map((item: { title: string; description: string }, index: number) => {
                const Icon = useIcons[index];
                return (
                  <div data-reveal data-delay={String(index + 1)} key={item.title}>
                    <article className="h-full rounded-2xl border border-white/15 bg-white/5 p-6">
                      <Icon size={28} strokeWidth={1.5} className="text-gold mb-5" aria-hidden="true" />
                      <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
                      <p className="text-white/65 text-sm font-light leading-relaxed">{item.description}</p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
            <div data-reveal className="lg:order-2">
              <img
                src="/uploads/reforestacion/comunidad-interior.webp"
                alt={content.community.imageAlt}
                className="w-full max-h-[680px] object-cover rounded-2xl shadow-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div data-reveal className="lg:order-1">
              <p className="text-brand text-[11px] uppercase tracking-[0.25em] font-bold mb-4">{content.community.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand leading-tight mb-6">{content.community.title}</h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">{content.community.description}</p>
              <ul className="space-y-4">
                {content.community.items.map((item: string) => (
                  <li key={item} className="flex gap-3 text-gray-600 font-light">
                    <Check size={20} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="aportar" className="py-20 md:py-28 px-6 bg-bone">
          <div className="max-w-5xl mx-auto">
            <div data-reveal>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="text-brand text-[11px] uppercase tracking-[0.25em] font-bold mb-4">{content.contribution.eyebrow}</p>
                <h2 className="font-serif text-4xl md:text-5xl text-brand leading-tight mb-6">{content.contribution.title}</h2>
                <p className="text-gray-600 text-lg font-light leading-relaxed">{content.contribution.description}</p>
              </div>
            </div>

            <div data-reveal data-delay="1">
              <div className="rounded-3xl bg-white border border-brand/10 shadow-[0_24px_80px_rgba(0,83,51,0.10)] overflow-hidden">
                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="bg-brand p-8 md:p-10 text-white">
                    <Sprout size={36} strokeWidth={1.5} className="text-gold mb-6" aria-hidden="true" />
                    <h3 className="font-serif text-3xl mb-4">{content.contribution.cardTitle}</h3>
                    <p className="text-white/70 font-light leading-relaxed mb-8">{content.contribution.cardDescription}</p>
                    <div className="space-y-3 text-sm text-white/75">
                      {content.contribution.notes.map((note: string) => (
                        <p key={note} className="flex gap-3">
                          <Check size={17} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{note}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    {hasAlias ? (
                      <>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">{content.contribution.aliasLabel}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-brand/15 bg-bone p-5 mb-5">
                          <code className="text-brand text-xl md:text-2xl font-semibold break-all flex-1">{REFORESTATION_CONTRIBUTION.alias}</code>
                          <button
                            type="button"
                            onClick={() => copyValue('alias', REFORESTATION_CONTRIBUTION.alias)}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-brand transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                          >
                            {copiedField === 'alias' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                            {copiedField === 'alias' ? content.contribution.copied : content.contribution.copy}
                          </button>
                        </div>
                        {REFORESTATION_CONTRIBUTION.accountHolder && (
                          <p className="text-sm text-gray-500 mb-4">
                            <span className="font-semibold text-gray-700">{content.contribution.holderLabel}:</span>{' '}
                            {REFORESTATION_CONTRIBUTION.accountHolder}
                          </p>
                        )}
                        {REFORESTATION_CONTRIBUTION.cbu && (
                          <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4 mb-6">
                            <p className="text-sm text-gray-500 break-all"><span className="font-semibold text-gray-700">{content.contribution.cbuLabel}:</span> {REFORESTATION_CONTRIBUTION.cbu}</p>
                            <button
                              type="button"
                              onClick={() => copyValue('cbu', REFORESTATION_CONTRIBUTION.cbu)}
                              aria-label={content.contribution.copyCbu}
                              className="p-2 text-brand hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
                            >
                              {copiedField === 'cbu' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                            </button>
                          </div>
                        )}
                        <p className="sr-only" aria-live="polite">{copiedField ? content.contribution.copyConfirmation : ''}</p>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold w-full inline-flex items-center justify-center gap-2">
                          <MessageCircle size={18} aria-hidden="true" />
                          {content.contribution.confirmCta}
                        </a>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <MessageCircle size={36} strokeWidth={1.5} className="text-gold mx-auto mb-5" aria-hidden="true" />
                        <h3 className="font-serif text-3xl text-brand mb-4">{content.contribution.fallbackTitle}</h3>
                        <p className="text-gray-500 font-light leading-relaxed mb-7">{content.contribution.fallbackDescription}</p>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center justify-center gap-2">
                          <MessageCircle size={18} aria-hidden="true" />
                          {content.contribution.fallbackCta}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className="max-w-3xl mx-auto text-center text-xs text-gray-400 font-light leading-relaxed mt-6">{content.contribution.legalNote}</p>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 overflow-hidden">
          <img
            src="/uploads/reforestacion/salon-experiencias.webp"
            alt={content.closing.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[#071d14]/78" />
          <div data-reveal>
            <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
              <Leaf size={34} strokeWidth={1.5} className="text-gold mx-auto mb-6" aria-hidden="true" />
              <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{content.closing.title}</h2>
              <p className="text-white/75 text-lg font-light leading-relaxed mb-8">{content.closing.description}</p>
              <a href="#aportar" className="btn-gold inline-flex items-center justify-center">{content.closing.cta}</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reforestacion;
