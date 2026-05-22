import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const VueloDelCondorVideo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 px-6 bg-[#F4F3EF] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10" data-reveal>
        <p className="text-[10px] tracking-[0.35em] uppercase text-brand-gold mb-3 font-semibold">
          {t.vuelo_condor.video.subtitle}
        </p>
        <h2 className="text-3xl md:text-5xl serif-title brand-green mb-10 leading-tight">
          {t.vuelo_condor.video.title}
        </h2>

        {/* Video Player (9:16 Vertical Reel/Short Aspect Ratio) */}
        <div className="relative aspect-[9/16] max-w-[320px] md:max-w-[340px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black mb-12 group transition-transform duration-500 hover:scale-[1.02] hover:shadow-brand-green/15">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/KMaaIhARyUg?rel=0&modestbranding=1"
            title={t.vuelo_condor.video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Quote & Location */}
        <div className="w-8 h-px bg-brand-gold/40 mx-auto mb-8" />
        <p className="font-serif italic text-gray-600 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto">
          "{t.vuelo_condor.video.quote}"
        </p>
        <div className="w-8 h-px bg-brand-gold/40 mx-auto mt-8 mb-6" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
          {t.vuelo_condor.video.location}
        </p>
      </div>
    </section>
  );
};

export default VueloDelCondorVideo;

