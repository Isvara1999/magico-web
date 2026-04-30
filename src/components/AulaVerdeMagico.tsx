import React from 'react';
import { User, Heartbeat, ShieldCheck } from '@phosphor-icons/react';
import { WA_MAGICO } from '../data/config';
import { useLanguage } from '../../contexts/LanguageContext';

const AulaVerdeMagico: React.FC = () => {
  const { t } = useLanguage();
  const consultLink = "https://wa.me/" + WA_MAGICO + "?text=" +
    encodeURIComponent(t.aula_verde.magico.wa_query);

  const SAFETY_ICONS = [User, Heartbeat, ShieldCheck];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-green text-white rounded-3xl relative overflow-hidden mt-16 md:mt-24 mx-2 md:mx-0">
    {/* glassy overlay (no border) */}
    <div className="absolute inset-0 rounded-3xl backdrop-blur-sm pointer-events-none"></div>
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <div className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-3xl" data-reveal>
        <h2 className="text-3xl md:text-5xl serif-title mb-8 md:mb-10 text-center">{t.aula_verde.magico.title}</h2>
        
          <div className="max-w-4xl mx-auto mb-10">
          <p className="text-white/95 text-base md:text-lg leading-relaxed text-center">
            {t.aula_verde.magico.description}
          </p>
          
          <div className="bg-[#005333]/40 border border-gold/30 rounded-2xl p-6 md:p-8 mt-8 shadow-lg backdrop-blur-sm relative overflow-hidden group">
            {/* Destello decorativo */}
            <div className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:translate-x-[200%] transition-transform duration-[2000ms] ease-in-out"></div>
            
            <h4 className="text-gold font-bold text-center text-lg md:text-xl mb-4 tracking-wide uppercase">
              {t.aula_verde.magico.infra_title}
            </h4>
            <p className="text-white/95 text-sm md:text-base leading-relaxed text-center font-medium">
              {t.aula_verde.magico.infra_text}
            </p>
          </div>
        </div>
        
        {/* Video Principal (Reemplaza Imágenes Anteriores) */}
        <div className="flex justify-center mb-10 w-full relative z-20" data-reveal data-delay="1">
          <div className="relative inline-block group w-full max-w-sm">
            {/* Bordes decorativos detrás del video */}
            <div className="absolute -inset-3 border border-gold/20 rounded-2xl -z-10 rotate-3 transition-transform duration-700 group-hover:rotate-6"></div>
            <div className="absolute -inset-3 border border-white/10 rounded-2xl -z-10 -rotate-3 transition-transform duration-700 group-hover:-rotate-6"></div>

            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <img
                src="/uploads/img_6948.webp"
                alt={t.aula_verde.magico.video_title}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/hxE7Ksy7IsY?autoplay=1&mute=1&loop=1&playlist=hxE7Ksy7IsY"
                title={t.aula_verde.magico.video_title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10" data-reveal data-delay="2">
          <div className="bg-gold/10 rounded-2xl p-6 md:p-8 border border-gold/30">
            <h4 className="text-gold font-bold text-lg mb-4">{t.aula_verde.magico.benefits_title}</h4>
            <ul className="text-white/90 text-sm leading-relaxed space-y-4">
              {t.aula_verde.magico.benefits.map((benefit: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold font-bold mt-0.5">✓</span>
                  <span><strong>{benefit.title}</strong> {benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gold/10 rounded-2xl p-6 md:p-8 border border-gold/30 flex flex-col justify-between">
            <div>
              <h4 className="text-gold font-bold text-lg mb-4">{t.aula_verde.magico.strengthen_title}</h4>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                {t.aula_verde.magico.strengthen_text}
              </p>
            </div>
            <div className="bg-[#005333]/50 border border-gold/20 rounded-xl p-4 mt-2">
              <h5 className="text-gold font-bold text-sm mb-2 flex items-center gap-2">
                <span>🌱</span> {t.aula_verde.magico.reforest_title}
              </h5>
              <p className="text-white/90 text-sm leading-relaxed">
                {t.aula_verde.magico.reforest_text}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-8 md:p-10 border border-white/20 backdrop-blur-sm text-center mt-8" data-reveal data-delay="3">
          <p className="text-white/95 italic text-base md:text-lg leading-relaxed">
            {t.aula_verde.magico.footer_text}
          </p>
        </div>
      </div>
      {/* ====== SEGURIDAD INSTITUCIONAL ====== */}
      <div className="mt-8 p-6 md:p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.aula_verde.magico.safety_items.map((item: any, i: number) => {
            const Icon = SAFETY_ICONS[i];
            const isGold = i === 1;
            return (
              <div key={i} className={`text-center rounded-2xl p-4 md:p-6 border shadow-lg transform hover:scale-105 transition-all duration-300 ${
                isGold 
                ? 'bg-gradient-to-br from-gold to-yellow-600 border-white/30 hover:shadow-white/40' 
                : 'bg-gradient-to-br from-brand to-green-600 border-gold/30 hover:shadow-gold/30'
              }`}
                data-reveal
                data-delay={String(i + 1)}>
                <div className="flex justify-center mb-3">
                  <Icon weight="thin" className={`w-8 h-8 ${isGold ? 'text-brand' : 'text-white'}`} />
                </div>
                <div className="mb-2">
                  <h4 className={`font-bold text-lg mb-3 ${isGold ? 'text-brand' : 'text-white'}`}>{item.title}</h4>
                </div>
                <div>
                  <p className={`font-medium text-sm leading-relaxed ${isGold ? 'text-brand/90' : 'text-white/90'}`}>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* ====== GALERÍA DE LA EXPERIENCIA ====== */}
      <div className="mt-16 max-w-5xl mx-auto px-4" data-reveal>
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl text-gold font-serif mb-3">{t.aula_verde.magico.gallery_title}</h3>
          <p className="text-white/80 text-sm md:text-base">{t.aula_verde.magico.gallery_subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251118-WA0056.jpg" alt="Río en Aula Verde" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251118-WA0085.jpg" alt="Actividades en naturaleza" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251120-WA0061.jpg" alt="Caminata en Los Gigantes" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 group aspect-square">
            <img src="/uploads/Aula%20Verde/IMG-20251120-WA0036.jpg" alt="Grupo disfrutando" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>

      {/* Mapa del Lugar */}
      <div className="mt-16 max-w-4xl mx-auto text-center px-4">
        <div className="relative group cursor-zoom-in mb-12" onClick={() => window.open('/uploads/mapa_magico.webp', '_blank')}>
          <img src="/uploads/mapa_magico.webp" alt={t.aula_verde.magico.map_alt} loading="lazy" className="w-full rounded-2xl shadow-lg" />
          <div className="mt-12 mb-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-30">
            <a href="/uploads/mapa_magico.webp" download="Mapa_AulaVerde_Los_Gigantes.webp" className="btn-glass inline-block w-full sm:w-auto text-center">{t.aula_verde.magico.map_download}</a>
            <a href={consultLink} className="btn-gold inline-block w-full sm:w-auto text-center">{t.aula_verde.magico.map_consult}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default AulaVerdeMagico;
