import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { marked } from 'marked';

export const SectionVideo: React.FC = () => {
  const { t } = useLanguage();

  const isYouTube = t.video.videoUrl.includes('youtube.com') || t.video.videoUrl.includes('youtu.be');

  // Función para convertir URLs de YouTube (Shorts, Watch, Share) a Embed
  const getEmbedUrl = (url: string) => {
    try {
      let videoId = '';
      if (url.includes('/shorts/')) {
        videoId = url.split('/shorts/')[1].split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else {
        return url;
      }
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    } catch (e) {
      return url;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-bone relative overflow-hidden">
      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
      
      {/* Elementos decorativos (Blobs de luz) */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 
          className="text-3xl md:text-5xl text-brand mb-6 font-serif leading-tight"
          dangerouslySetInnerHTML={{ __html: marked.parse(t.video.title as string) as string }}
        />

        <div className="relative inline-block group">
          {/* Bordes decorativos detrás del video */}
          <div className="absolute -inset-3 border border-gold/20 rounded-2xl -z-10 rotate-3 transition-transform duration-700 group-hover:rotate-6"></div>
          <div className="absolute -inset-3 border border-brand/10 rounded-2xl -z-10 -rotate-3 transition-transform duration-700 group-hover:-rotate-6"></div>

          <div className="relative w-full aspect-[9/16] max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl border border-brand/10 bg-black">
          {isYouTube ? (
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(t.video.videoUrl)}
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
      </div>
    </section>
  );
};