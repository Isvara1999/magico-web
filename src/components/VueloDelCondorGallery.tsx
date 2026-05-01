import React from 'react';

const IMAGES = [
  { src: "/uploads/vuelo-condor/acan-peru-1.webp", alt: "Apu Ausangate", size: "large" },
  { src: "/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 12.10.31 PM.webp", alt: "Ceremonia de Rapé", size: "small" },
  { src: "/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 12.10.32 PM (2).webp", alt: "Caminata Sagrada", size: "small" },
  { src: "/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 4.47.08 PM (2).webp", alt: "Guardianes de la Montaña", size: "large" },
  { src: "/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 12.10.32 PM.webp", alt: "Ofrenda a la Pachamama", size: "small" },
  { src: "/uploads/vuelo-condor/WhatsApp Image 2026-04-25 at 12.10.33 PM.webp", alt: "Integración en el camino", size: "small" },
];

const VueloDelCondorGallery: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="text-[10px] tracking-[0.4em] uppercase text-brand-gold mb-4">Galería de Almas</p>
          <h2 className="text-3xl md:text-5xl serif-title brand-green leading-tight">
            Momentos del Camino
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light mt-4 max-w-xl mx-auto italic">
            "No vemos las cosas como son, sino como somos nosotros."
          </p>
        </div>

        {/* Masonry-like grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.map((img, i) => (
            <div 
              key={i} 
              className="relative group overflow-hidden rounded-3xl break-inside-avoid"
              data-reveal
              data-delay={String(i + 1)}
            >
              <img 
                src={img.src} 
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
                <span className="text-white font-serif italic text-lg">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VueloDelCondorGallery;
