import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { WA_MAGICO } from '../data/config';

const EmpresasHero: React.FC = () => {
  const { t } = useLanguage();
  const h = t.empresas.hero;

  const waPrograma = `https://wa.me/${WA_MAGICO}?text=${encodeURIComponent(h.wa_query_programa)}`;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/uploads/dji_0074.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,20,14,0.94) 0%, rgba(0,30,20,0.55) 45%, rgba(0,20,14,0.25) 100%)' }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-[150px] md:pt-[170px] pb-16 md:pb-20 flex flex-col items-start md:items-center md:text-center">
        <span className="inline-block px-4 py-1.5 mb-5 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold border border-white/25 text-white/80">
          {h.tag}
        </span>

        <h1 className="serif-title text-white text-4xl md:text-5xl leading-[1.15] mb-5">
          {h.title}
        </h1>

        <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-3 max-w-2xl">
          {h.subtitle}
        </p>

        <p className="text-white/65 text-base md:text-base font-light leading-relaxed mb-8 max-w-2xl">
          {h.description}
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
          <a
            href={waPrograma}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2 text-center"
            style={{ whiteSpace: 'normal' }}
          >
            {h.cta_primary}
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>
          <a href="#preview" className="btn-glass inline-flex items-center justify-center text-center" style={{ whiteSpace: 'normal' }}>
            {h.cta_secondary}
          </a>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center">
          {h.stats.map((s: any, i: number) => (
            <div key={i} className="text-left md:text-center">
              <div className="serif-title text-2xl md:text-2xl text-gold leading-none">{s.value}</div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpresasHero;
