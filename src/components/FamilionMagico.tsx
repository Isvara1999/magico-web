import React from 'react';
import { WA_MAGICO } from '../data/config';
import { useLanguage } from '../../contexts/LanguageContext';

const FamilionMagico: React.FC = () => {
  const { t } = useLanguage();
  const consultLink = "https://wa.me/" + WA_MAGICO + "?text=" +
    encodeURIComponent(t.familion.magico.wa_query);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-green text-white rounded-3xl relative overflow-hidden">
    {/* glassy overlay (no border) */}
    <div className="absolute inset-0 rounded-3xl backdrop-blur-sm pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl">
        <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 text-center">{t.familion.magico.title}</h2>
        
          <div className="max-w-3xl mx-auto mb-10">
          <p className="text-white/95 text-base md:text-lg leading-relaxed">
            {t.familion.magico.description}
          </p>
        </div>
        
        {/* Video Principal (Reemplaza Imágenes Anteriores) */}
        <div className="flex justify-center mb-10 w-full relative z-20">
          <div className="relative w-full max-w-sm">
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#001a0d]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/hxE7Ksy7IsY?autoplay=1&mute=1&loop=1&playlist=hxE7Ksy7IsY"
                title={t.familion.magico.video_title}
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold text-lg mb-4">{t.familion.magico.benefits_title}</h4>
            <ul className="text-white/90 text-sm leading-relaxed space-y-3">
              {t.familion.magico.benefits.map((benefit: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-gold font-bold mt-1">✓</span>
                  <span><strong>{benefit.title}</strong> {benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-brand-gold/10 rounded-2xl p-6 md:p-8 border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold text-lg mb-4">{t.familion.magico.investment_title}</h4>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              {t.familion.magico.investment_text}
            </p>
            <p className="text-white/90 italic text-sm leading-relaxed">
              {t.familion.magico.investment_quote}
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center">
          <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
            {t.familion.magico.footer_text}
          </p>
        </div>
      </div>
      {/* Mapa del Lugar */}
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <div className="relative group cursor-zoom-in" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt={t.familion.magico.map_alt} loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="/uploads/mapa_magico.webp" download="Mapa_Familion_Los_Gigantes.webp" className="btn-glass inline-block w-full sm:w-auto text-center">{t.familion.magico.map_download}</a>
            <a href={consultLink} className="btn-gold inline-block w-full sm:w-auto text-center">{t.familion.magico.map_consult}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default FamilionMagico;
