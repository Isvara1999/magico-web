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
    <section className="py-24 md:py-32 bg-bone">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          data-reveal
          className="text-3xl md:text-5xl text-brand mb-6 font-serif leading-tight"
          dangerouslySetInnerHTML={{ __html: marked.parse(t.video.title as string) as string }}
        />

        <div data-reveal data-delay="1" className="relative inline-block">
          <div className="relative w-full aspect-[9/16] max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl border border-brand/10 bg-black">
          {isYouTube ? (
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(t.video.videoUrl)}
              title="Video de Mágico Ensueño"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
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