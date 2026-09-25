import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Hammer,
  HandHeart,
  HeartHandshake,
  Home,
  Leaf,
  MessageCircle,
  Mountain,
  Palette,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sprout,
  Sun,
  TreePine,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_URL } from './data/config';
import { ROUTES } from './routes';

const HERO_IMAGE = '/uploads/voluntarios.webp';

const areaIcons = [UtensilsCrossed, Home, Sprout, TreePine, Hammer, Palette, Recycle];
const modalityIcons = [Sparkles, HeartHandshake, CalendarDays, Sun, CircleDot];
const dayIcons = [Sun, Users, Leaf, Sparkles];

const Voluntariado: React.FC = () => {
  const { t, language } = useLanguage();
  const content = (t as any).volunteerPage;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const previousTitle = document.title;
    const url = SITE_URL + ROUTES.VOLUNTARIADO;
    const image = SITE_URL + HERO_IMAGE;
    document.title = content.seo.title;

    const setMeta = (selector: string, key: 'name' | 'property', keyValue: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(key, keyValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', 'name', 'description', content.seo.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', content.seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', content.seo.description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', language === 'es' ? 'es_AR' : 'en_US');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    return () => {
      document.title = previousTitle;
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-bone text-dark overflow-x-hidden">
      <Header />
      <main>
        <section className="relative min-h-[760px] h-[96vh] flex items-end overflow-hidden">
          <img src={HERO_IMAGE} alt={content.hero.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10251d]/95 via-[#10251d]/55 to-black/20" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-16 md:pb-24 text-white">
            <div data-reveal>
              <p className="text-gold text-xs md:text-sm font-bold uppercase tracking-[0.28em] mb-5">{content.hero.eyebrow}</p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl mb-7">{content.hero.title}</h1>
              <p className="text-lg md:text-2xl font-light leading-relaxed text-white/85 max-w-3xl mb-9">{content.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#modalidades" className="btn-gold !inline-flex items-center gap-2 justify-center">
                  {content.hero.primaryCta}<ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href={content.applyLink} target="_blank" rel="noopener noreferrer" className="btn-glass !inline-flex items-center gap-2 justify-center">
                  <MessageCircle size={18} aria-hidden="true" />{content.hero.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24 items-center">
            <div data-reveal>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.intro.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-brand leading-tight mb-7">{content.intro.title}</h2>
              <p className="text-lg text-dark/75 font-light leading-relaxed mb-6">{content.intro.p1}</p>
              <p className="text-dark/65 font-light leading-relaxed">{content.intro.p2}</p>
            </div>
            <div data-reveal>
              <div className="relative">
                <img src="/uploads/dji_0074.webp" alt={content.intro.imageAlt} className="w-full h-[520px] object-cover rounded-[2rem] shadow-xl" loading="lazy" />
                <div className="absolute -bottom-7 left-5 md:-left-9 bg-brand text-white p-7 md:p-9 rounded-2xl max-w-sm shadow-xl">
                  <Mountain className="text-gold mb-4" size={30} aria-hidden="true" />
                  <p className="font-serif text-2xl leading-snug">{content.intro.quote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modalidades" className="py-20 md:py-28 bg-bone scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-14" data-reveal>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.modalities.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-brand mb-6">{content.modalities.title}</h2>
              <p className="text-dark/65 text-lg font-light leading-relaxed">{content.modalities.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.modalities.items.map((item: any, index: number) => {
                const Icon = modalityIcons[index] || Sparkles;
                return (
                  <div data-reveal key={item.title}>
                    <article className={`h-full rounded-2xl p-7 md:p-8 border ${index < 2 ? 'bg-brand text-white border-brand' : 'bg-white border-brand/10'} shadow-sm`}>
                      <Icon className={index < 2 ? 'text-gold' : 'text-brand'} size={30} aria-hidden="true" />
                      <p className={`text-xs uppercase tracking-[0.18em] font-bold mt-6 mb-2 ${index < 2 ? 'text-gold' : 'text-gold'}`}>{item.tag}</p>
                      <h3 className="font-serif text-3xl mb-4">{item.title}</h3>
                      <p className={`font-light leading-relaxed ${index < 2 ? 'text-white/75' : 'text-dark/65'}`}>{item.description}</p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-brand text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
              <div data-reveal>
                <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.exchange.eyebrow}</p>
                <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{content.exchange.title}</h2>
                <p className="text-white/70 text-lg font-light leading-relaxed">{content.exchange.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {content.exchange.columns.map((column: any, columnIndex: number) => (
                  <div data-reveal key={column.title}>
                    <div className="h-full bg-white/8 border border-white/15 rounded-2xl p-7 backdrop-blur-sm">
                      {columnIndex === 0 ? <HandHeart className="text-gold mb-5" /> : <HeartHandshake className="text-gold mb-5" />}
                      <h3 className="font-serif text-2xl mb-5">{column.title}</h3>
                      <ul className="space-y-4">
                        {column.items.map((item: string) => (
                          <li key={item} className="flex gap-3 text-white/75 font-light leading-relaxed">
                            <Check className="text-gold flex-none mt-1" size={16} aria-hidden="true" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal>
              <div className="mt-10 border-l-2 border-gold pl-5 text-white/65 max-w-4xl text-sm leading-relaxed">{content.exchange.note}</div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14" data-reveal>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.areas.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-brand mb-6">{content.areas.title}</h2>
              <p className="text-dark/65 text-lg font-light">{content.areas.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.areas.items.map((item: any, index: number) => {
                const Icon = areaIcons[index] || Leaf;
                return (
                  <div data-reveal key={item.title}>
                    <article className="group h-full p-7 rounded-2xl bg-bone border border-brand/5 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                        <Icon size={23} aria-hidden="true" />
                      </div>
                      <h3 className="font-serif text-2xl text-brand mb-3">{item.title}</h3>
                      <p className="text-dark/65 font-light leading-relaxed mb-5">{item.description}</p>
                      <ul className="space-y-2">
                        {item.tasks.map((task: string) => <li key={task} className="text-sm text-dark/55 flex gap-2"><span className="text-gold">•</span>{task}</li>)}
                      </ul>
                    </article>
                  </div>
                );
              })}
            </div>
            <div data-reveal>
              <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/5 p-6 flex gap-4 items-start max-w-4xl mx-auto">
                <ShieldCheck className="text-gold flex-none" aria-hidden="true" />
                <p className="text-sm text-dark/65 leading-relaxed">{content.areas.safety}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-bone">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20">
              <div data-reveal>
                <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.day.eyebrow}</p>
                <h2 className="font-serif text-4xl md:text-6xl text-brand mb-6">{content.day.title}</h2>
                <p className="text-dark/65 text-lg font-light leading-relaxed">{content.day.description}</p>
              </div>
              <div className="space-y-4">
                {content.day.items.map((item: any, index: number) => {
                  const Icon = dayIcons[index] || Clock3;
                  return (
                    <div data-reveal key={item.title}>
                      <div className="bg-white rounded-2xl p-6 md:p-7 flex gap-5 border border-brand/5">
                        <div className="w-11 h-11 rounded-full bg-brand/10 text-brand flex-none flex items-center justify-center"><Icon size={21} aria-hidden="true" /></div>
                        <div><p className="text-gold text-xs uppercase tracking-widest font-bold mb-1">{item.time}</p><h3 className="font-serif text-2xl text-brand mb-2">{item.title}</h3><p className="text-dark/60 font-light leading-relaxed">{item.description}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="grid grid-cols-2 gap-4" data-reveal>
              <img src="/uploads/comida.jpg" alt={content.organization.imageAltOne} className="w-full h-72 object-cover rounded-2xl mt-10" loading="lazy" />
              <img src="/uploads/herramientas.jpg" alt={content.organization.imageAltTwo} className="w-full h-72 object-cover rounded-2xl" loading="lazy" />
            </div>
            <div data-reveal>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.organization.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-brand mb-6">{content.organization.title}</h2>
              <p className="text-dark/65 text-lg font-light leading-relaxed mb-8">{content.organization.description}</p>
              <div className="space-y-5">
                {content.organization.steps.map((step: any, index: number) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold flex-none">{index + 1}</span>
                    <div><h3 className="font-serif text-xl text-brand">{step.title}</h3><p className="text-dark/55 font-light mt-1">{step.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#EEE8DC]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14" data-reveal>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.culture.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-brand mb-6">{content.culture.title}</h2>
              <p className="text-dark/65 text-lg font-light">{content.culture.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.culture.items.map((item: any, index: number) => (
                <div data-reveal key={item.title}>
                  <div className="bg-white h-full rounded-2xl p-7 text-center">
                    {[Users, MessageCircle, HandHeart, HeartHandshake][index] && React.createElement([Users, MessageCircle, HandHeart, HeartHandshake][index], { className: 'text-gold mx-auto mb-5', size: 28, 'aria-hidden': true })}
                    <h3 className="font-serif text-2xl text-brand mb-3">{item.title}</h3>
                    <p className="text-dark/60 font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center max-w-4xl mx-auto mt-9 text-dark/55 text-sm leading-relaxed">{content.culture.note}</p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20">
              <div data-reveal>
                <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.process.eyebrow}</p>
                <h2 className="font-serif text-4xl md:text-6xl text-brand mb-6">{content.process.title}</h2>
                <p className="text-dark/65 text-lg font-light leading-relaxed">{content.process.description}</p>
              </div>
              <ol className="grid sm:grid-cols-2 gap-5">
                {content.process.steps.map((step: any, index: number) => (
                  <li key={step.title} data-reveal>
                    <div className="h-full rounded-2xl bg-bone border border-brand/5 p-6">
                      <span className="text-gold text-xs font-bold tracking-widest">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="font-serif text-2xl text-brand mt-3 mb-2">{step.title}</h3>
                      <p className="text-dark/60 text-sm font-light leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="convocatorias" className="py-20 md:py-28 bg-brand text-white scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center" data-reveal>
            <CalendarDays className="text-gold mx-auto mb-6" size={38} aria-hidden="true" />
            <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.calendar.eyebrow}</p>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">{content.calendar.title}</h2>
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-3xl mx-auto mb-9">{content.calendar.description}</p>
            <a href={content.applyLink} target="_blank" rel="noopener noreferrer" className="btn-gold !inline-flex items-center gap-2 justify-center">
              <MessageCircle size={18} aria-hidden="true" />{content.calendar.cta}
            </a>
            <p className="text-white/45 text-xs mt-5">{content.calendar.note}</p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-bone">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12" data-reveal>
              <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">{content.faq.eyebrow}</p>
              <h2 className="font-serif text-4xl md:text-6xl text-brand">{content.faq.title}</h2>
            </div>
            <div className="space-y-3">
              {content.faq.items.map((item: any, index: number) => (
                <div key={item.question} className="bg-white border border-brand/5 rounded-2xl overflow-hidden">
                  <button type="button" className="w-full flex items-center justify-between gap-5 p-6 text-left" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                    <span className="font-serif text-xl text-brand">{item.question}</span>
                    <ChevronDown className={`text-gold flex-none transition-transform ${openFaq === index ? 'rotate-180' : ''}`} size={20} aria-hidden="true" />
                  </button>
                  {openFaq === index && <p className="px-6 pb-6 text-dark/60 font-light leading-relaxed">{item.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <img src="/uploads/pachamama-fogon-grupo-cielo.webp" alt={content.finalCta.imageAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#10251d]/80" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white" data-reveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">{content.finalCta.title}</h2>
            <p className="text-white/75 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-9">{content.finalCta.description}</p>
            <a href={content.applyLink} target="_blank" rel="noopener noreferrer" className="btn-gold !inline-flex items-center gap-2 justify-center">
              {content.finalCta.cta}<ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Voluntariado;
