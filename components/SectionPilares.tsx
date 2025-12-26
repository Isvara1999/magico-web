import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Leaf, Users, Heart, Sparkles } from 'lucide-react';

export const SectionPilares: React.FC = () => {
  const { t } = useLanguage();

  const getIcon = (id: number) => {
    switch(id) {
      case 1: return <Leaf className="w-6 h-6 md:w-7 md:h-7" />;
      case 2: return <Users className="w-6 h-6 md:w-7 md:h-7" />;
      case 3: return <Heart className="w-6 h-6 md:w-7 md:h-7" />;
      case 4: return <Sparkles className="w-6 h-6 md:w-7 md:h-7" />;
      default: return <Leaf className="w-6 h-6 md:w-7 md:h-7" />;
    }
  };

  return (
    <section id="pilares" className="py-20 bg-white border-y border-brand/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {t.pillars.map((pillar) => (
            <div key={pillar.id} className="text-center group">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto bg-bone rounded-full flex items-center justify-center mb-4 group-hover:bg-brand transition-colors duration-300 text-brand group-hover:text-gold">
                {getIcon(pillar.id)}
              </div>
              <h3 className="text-base md:text-lg mb-2 text-brand font-serif">{pillar.title}</h3>
              <p className="text-xs md:text-sm text-dark/60 leading-relaxed">{pillar.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};