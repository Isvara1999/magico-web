import React from 'react';

const VIDEOS = [
  { src: 'https://www.youtube-nocookie.com/embed/7O6rpWkKfSg', title: 'Ofrenda' },
  { src: 'https://www.youtube-nocookie.com/embed/mVXKbT72fFk', title: 'Ofrenda con Nicole' },
  { src: 'https://www.youtube-nocookie.com/embed/an-P1Da7hd0', title: 'Mujeres intencionando' },
  { src: 'https://www.youtube-nocookie.com/embed/4irYTtpNGqk', title: 'Retiro de mujeres intencionando' },
];

const CicloVitalFemeninoMomentos: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#9D005E] text-[10px] tracking-[0.4em] uppercase font-bold text-center mb-5">Así se vive</p>
        <h2 className="text-3xl md:text-5xl serif-title text-brand text-center mb-10 md:mb-14">
          Momentos de un círculo de mujeres
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {VIDEOS.map(({ src, title }) => (
            <div
              key={src}
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 8px 40px rgba(0,83,51,0.14)' }}
            >
              <div className="relative aspect-[9/16] w-full">
                <iframe
                  src={src}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  title={title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CicloVitalFemeninoMomentos;
