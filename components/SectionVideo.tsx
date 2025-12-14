import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionVideo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-bone">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl text-brand mb-8 font-serif">{t.video.title}</h2>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-brand/10">
          <video
            className="w-full h-full object-cover"
            src="https://cdn.pixabay.com/video/2020/03/03/33179-396529572_large.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            poster="https://images.pexels.com/photos/673020/pexels-photo-673020.jpeg"
          ></video>
        </div>
      </div>
    </section>
  );
};