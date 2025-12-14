import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const SectionVideo: React.FC = () => {
  const { t } = useLanguage();

  const isYouTube = t.video.videoUrl.includes('youtube.com') || t.video.videoUrl.includes('youtu.be');

  return (
    <section className="py-24 bg-bone">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl text-brand mb-8 font-serif">{t.video.title}</h2>
        <div className="relative w-full aspect-[9/16] max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl border border-brand/10">
          {isYouTube ? (
            <iframe
              className="w-full h-full"
              src={t.video.videoUrl}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              className="w-full h-full object-cover"
              src={t.video.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              controls
              poster={t.video.poster}
            ></video>
          )}
        </div>
      </div>
    </section>
  );
};