import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Check, FileText } from 'lucide-react';
import { marked } from 'marked';

export const SectionExperiencias: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experiencias" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-brand font-bold tracking-widest uppercase text-xs mb-4">
            {t.experiences.tag}
          </p>
          <h2 
            className="text-3xl md:text-5xl text-brand mb-6 font-serif"
            dangerouslySetInnerHTML={{ __html: marked.parse(t.experiences.title as string) as string }}
          />
          <div className="text-dark/70 text-lg max-w-5xl mx-auto leading-relaxed space-y-6">
            <p dangerouslySetInnerHTML={{ __html: (t.experiences as any).intro_p1 }} />
            <p 
              className="font-light"
              dangerouslySetInnerHTML={{ __html: (t.experiences as any).intro_p2 }} 
            />
          </div>
        </div>

        {/* Reset Vital Section */}
        <div className="mb-20 bg-bone rounded-2xl p-8 md:p-12 shadow-sm border-l-4 border-gold relative overflow-hidden">
          {/* Decorative Icon Background */}
          <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-brand/5 rotate-12" />
          
          <div className="w-full">
            <span className="text-gold font-bold tracking-widest uppercase text-xs mb-2 block opacity-90">
              {t.experiences.resetVital.subtitle}
            </span>
            <h3 className="text-3xl font-serif text-brand mb-6">
              {t.experiences.resetVital.title}
            </h3>
            <div 
              className="text-dark/80 mb-10 font-light leading-relaxed text-lg max-w-4xl [&_strong]:text-gold [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: marked.parse(t.experiences.resetVital.description as string) as string }}
            />
            
            <ul className="space-y-6">
              {t.experiences.resetVital.items.map((item: any, idx: number) => (
                <li key={idx} className="flex flex-col gap-1">
                  <strong className="text-brand text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold" />
                    {item.title}
                  </strong>
                  <span className="text-sm text-dark/70 pl-4 border-l border-brand/10">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cards Section */}
        <div className="text-center mb-10">
          <span className="text-brand/60 font-bold tracking-widest uppercase text-xs">
            PERSONALIZÁ TU ESTADÍA
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.experiences.cards.map((card: any) => {
            const isEcoRefugio = card.title?.toString().toLowerCase().includes('eco-refugio') || card.title?.toString().toLowerCase().includes('glamping');
            
            return (
            <div key={card.id} className="bg-bone rounded-xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300 border-t-4 border-gold relative">
              {isEcoRefugio && (
                <div className="absolute top-4 right-4 z-20 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {(t.experiences as any).badge_accommodation}
                </div>
              )}
              <div className="h-48 overflow-hidden">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-brand mb-2">{card.title}</h3>
                <p className="text-dark/70 mb-4 text-sm leading-relaxed">
                  {card.description}
                  {isEcoRefugio && ` ${(t.experiences as any).card_extra_text}`}
                </p>
                <a href={card.ctaLink} target="_blank" rel="noopener noreferrer" className="text-gold font-bold uppercase text-xs tracking-wider hover:text-brand transition-colors">
                  {card.ctaText}
                </a>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};