import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { marked } from 'marked';
import { Volume2, VolumeX } from 'lucide-react';

export const SectionVideo: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const isYouTube = t.video.videoUrl.includes('youtube.com') || t.video.videoUrl.includes('youtu.be');

  // Intersection Observer para Auto-play/pause
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getEmbedUrl = (url: string) => {
    try {
      let videoId = '';
      if (url.includes('/shorts/')) {
        videoId = url.split('/shorts/')[1].split('?')[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0];
      } else {
        return url;
      }
      // Si isMuted es true, agregamos mute=1. Si no, mute=0 y autoplay=1.
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${isMuted ? '1' : '0'}&rel=0&modestbranding=1&loop=1&playlist=${videoId}`;
    } catch (e) {
      return url;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-bone" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          data-reveal
          className="text-3xl md:text-5xl text-brand mb-12 font-serif leading-tight"
          dangerouslySetInnerHTML={{ __html: marked.parse(t.video.title as string) as string }}
        />

        <div data-reveal data-delay="1" className="relative max-w-sm mx-auto group">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-brand/10 bg-black">
            {/* Poster always rendered as background — visible before play and as
                fallback when the iframe is blocked (e.g. Brave aggressive shields). */}
            <img
              src={t.video.poster}
              alt="Video cover"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {isPlaying && (
              isYouTube ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getEmbedUrl(t.video.videoUrl)}
                  title="Video de Pueblo Mágico"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={t.video.videoUrl}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  controls
                />
              )
            )}

            {/* Sound toggle button */}
            {isPlaying && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 z-20 bg-black/40 backdrop-blur-md p-2.5 rounded-full border border-white/20 text-white hover:bg-black/60 transition-colors shadow-lg"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}
          </div>
          
          <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};