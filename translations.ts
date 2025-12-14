import React from 'react';
import siteContent from './data.json';

// Tipo helper para el contenido importado
type ContentData = typeof siteContent.es;

export const translations = {
  es: {
    ...siteContent.es,
    // Mantenemos estructuras complejas (Arrays/Objetos anidados) hardcodeadas por ahora
    // o las mapeamos si queremos moverlas al CMS en el futuro.
    // Aquí fusionamos la data del JSON con la estructura estática necesaria para los arrays.
    menu: {
      items: [
        {
          label: 'Nosotros',
          href: '#nosotros',
          submenu: [
            { label: 'Filosofía', href: '#nosotros' },
            { label: 'Nuestros Pilares', href: '#pilares' },
            { label: 'Voluntariados', href: '#voluntariados' },
          ],
        },
        {
          label: 'Experiencias',
          href: '#experiencias',
          submenu: [
            { label: 'Estadías & Glamping', href: '#experiencias' },
            { label: 'Retiros Grupales', href: '#retiros' },
          ],
        },
        { label: 'Testimonios', href: '#testimonios' },
        { label: 'Agenda', href: '#eventos' },
        { label: 'Ubicación', href: '#como-llegar' },
      ],
      book: 'RESERVAR',
      lang: 'ENGLISH'
    },
    hero: {
      ...siteContent.es.hero,
      stats: {
        years: siteContent.es.hero.stats_years,
        trees: siteContent.es.hero.stats_trees,
        sustainable: siteContent.es.hero.stats_sus
      }
    },
    pillars: [
      { id: 1, title: 'Regeneración', subtitle: '+8mil Árboles.' },
      { id: 2, title: 'Comunidad', subtitle: 'Vínculos locales.' },
      { id: 3, title: 'Conciencia', subtitle: 'Con propósito.' },
      { id: 4, title: 'Alimentación', subtitle: 'Cocina real.' },
    ],
    video: {
      title: 'La atmósfera de la montaña'
    },
    experiences: {
      tag: 'Experiencia Mágico',
      title: 'Diseñá tu estadía',
      subtitle: 'En el corazón de la montaña, donde la calma y la belleza simple te invitan a reencontrarte.',
      btn: 'Reservar mi lugar',
      cards: [
        {
          id: 1,
          title: 'Bienestar & Balance',
          description: 'Ceremonias ancestrales, yoga, consciencia corporal y temazcal.',
          ctaText: 'Consultar Terapias',
          ctaLink: '#contacto',
          image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
        },
        {
          id: 2,
          title: 'Glamping & Refugio',
          description: 'Desde Domos Geodésicos y Yurtas, hasta habitaciones históricas.',
          ctaText: 'Ver Opciones',
          ctaLink: '#contacto',
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
        },
        {
          id: 3,
          title: 'Cocina Consciente',
          description: 'Nutrición para el cuerpo y el alma. Productos locales y orgánicos.',
          ctaText: 'Ver Propuesta',
          ctaLink: '#contacto',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        },
      ]
    },
    retreats: {
       ...siteContent.es.retreats,
       list: [
        'Salón panorámico.',
        'Alimentación regenerativa.',
        'Producción integral.'
      ],
    },
    testimonials: {
      title: 'Historias de la Montaña',
      items: [
        {
          id: 1,
          name: 'Julieta Castoldi',
          role: 'Facilitadora',
          text: '"Lo más importante: El amor, la entrega de todo el equipo y la capacidad de sentirte uno con la naturaleza."',
          image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        },
        {
          id: 2,
          name: 'Sofía R.',
          role: 'Viajera',
          text: '"Me sentí parte de la vida de la montaña, como en casa. Un refugio de paz inigualable."',
          image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        },
        {
          id: 3,
          name: 'Marcos D.',
          role: 'Huésped',
          text: '"Una experiencia transformadora. La comida consciente y los espacios son de otro mundo."',
          image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      ]
    },
    events: {
      tag: 'Calendario',
      title: 'Próximos Encuentros',
      link: 'Ver agenda completa',
      cards: [
        {
          date: '3 – 5 OCT',
          title: 'Alquimia — Retiro',
          desc: 'Transformación interior a través de la naturaleza y la presencia.',
          btn: 'Reservar Cupo',
          image: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
        },
        {
          date: '24 – 26 OCT',
          title: 'Honra — Celebración',
          desc: 'Un espacio para honrar los procesos de cambio y gratitud.',
          btn: 'Reservar Cupo',
          image: 'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg',
        },
        {
          date: '14 – 16 NOV',
          title: 'Calma en la Montaña',
          desc: 'Yoga, meditación, trekking y alimentación consciente.',
          btn: 'Reservar Cupo',
          image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg',
        }
      ]
    },
    contact: {
      title: 'Empezar el viaje',
      subtitle: 'Escribinos para diseñar tu estadía o retiro.',
      placeholders: {
        name: 'Nombre Completo',
        email: 'Email',
        whatsapp: 'WhatsApp',
        message: '¿Cómo te gustaría vivir la experiencia?',
      },
      btn: 'Enviar Mensaje',
      labels: {
        email: 'Email',
        whatsapp: 'WhatsApp',
        social: 'Social'
      }
    },
    footer: {
      description: 'Un refugio de montaña diseñado para inspirar vidas más simples, conscientes y conectadas con la naturaleza.',
      titles: {
        explore: 'Explorar',
        legal: 'Legal'
      },
      links: {
        terms: 'Términos y Condiciones',
        privacy: 'Políticas de Privacidad',
        faq: 'Preguntas Frecuentes'
      },
      copyright: 'Mágico Ensueño. Todos los derechos reservados.',
      madeBy: 'Hecho con respeto a la montaña'
    }
  },
  en: {
    ...siteContent.en,
    menu: {
      items: [
        {
          label: 'About Us',
          href: '#nosotros',
          submenu: [
            { label: 'Philosophy', href: '#nosotros' },
            { label: 'Our Pillars', href: '#pilares' },
            { label: 'Volunteering', href: '#voluntariados' },
          ],
        },
        {
          label: 'Experiences',
          href: '#experiencias',
          submenu: [
            { label: 'Stays & Glamping', href: '#experiencias' },
            { label: 'Group Retreats', href: '#retiros' },
          ],
        },
        { label: 'Testimonials', href: '#testimonios' },
        { label: 'Agenda', href: '#eventos' },
        { label: 'Location', href: '#como-llegar' },
      ],
      book: 'BOOK NOW',
      lang: 'ESPAÑOL'
    },
    hero: {
      ...siteContent.en.hero,
      stats: {
        years: siteContent.en.hero.stats_years,
        trees: siteContent.en.hero.stats_trees,
        sustainable: siteContent.en.hero.stats_sus
      }
    },
    pillars: [
      { id: 1, title: 'Regeneration', subtitle: '+8k Trees.' },
      { id: 2, title: 'Community', subtitle: 'Local bonds.' },
      { id: 3, title: 'Consciousness', subtitle: 'With purpose.' },
      { id: 4, title: 'Food', subtitle: 'Real food.' },
    ],
    video: {
      title: 'The mountain atmosphere'
    },
    experiences: {
      tag: 'Mágico Experience',
      title: 'Design your stay',
      subtitle: 'In the heart of the mountain, where calm and simple beauty invite you to reconnect.',
      btn: 'Book my spot',
      cards: [
        {
          id: 1,
          title: 'Wellness & Balance',
          description: 'Ancestral ceremonies, yoga, body awareness and temazcal.',
          ctaText: 'Consult Therapies',
          ctaLink: '#contacto',
          image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
        },
        {
          id: 2,
          title: 'Glamping & Shelter',
          description: 'From Geodesic Domes and Yurts to rooms in our historic house.',
          ctaText: 'View Options',
          ctaLink: '#contacto',
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
        },
        {
          id: 3,
          title: 'Conscious Kitchen',
          description: 'Nutrition for body and soul. Local and organic products.',
          ctaText: 'View Proposal',
          ctaLink: '#contacto',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        },
      ]
    },
    retreats: {
       ...siteContent.en.retreats,
       list: [
        'Panoramic hall.',
        'Regenerative food.',
        'Integral production.'
      ],
    },
    testimonials: {
      title: 'Mountain Stories',
      items: [
        {
          id: 1,
          name: 'Julieta Castoldi',
          role: 'Facilitator',
          text: '"The most important thing: Love, the dedication of the entire team and the ability to feel one with nature."',
          image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
        },
        {
          id: 2,
          name: 'Sofía R.',
          role: 'Traveler',
          text: '"I felt part of the mountain life, like at home. A unique refuge of peace."',
          image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        },
        {
          id: 3,
          name: 'Marcos D.',
          role: 'Guest',
          text: '"A transformative experience. The conscious food and spaces are out of this world."',
          image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      ]
    },
    events: {
      tag: 'Calendar',
      title: 'Upcoming Gatherings',
      link: 'View full agenda',
      cards: [
        {
          date: 'OCT 3 – 5',
          title: 'Alchemy — Retreat',
          desc: 'Inner transformation through nature and presence.',
          btn: 'Book Spot',
          image: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
        },
        {
          date: 'OCT 24 – 26',
          title: 'Honor — Celebration',
          desc: 'A space to honor processes of change and gratitude.',
          btn: 'Book Spot',
          image: 'https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg',
        },
        {
          date: 'NOV 14 – 16',
          title: 'Calm in the Mountain',
          desc: 'Yoga, meditation, trekking and conscious eating.',
          btn: 'Book Spot',
          image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg',
        }
      ]
    },
    contact: {
      title: 'Start the journey',
      subtitle: 'Write to us to design your stay or retreat.',
      placeholders: {
        name: 'Full Name',
        email: 'Email',
        whatsapp: 'WhatsApp',
        message: 'How would you like to live the experience?',
      },
      btn: 'Send Message',
      labels: {
        email: 'Email',
        whatsapp: 'WhatsApp',
        social: 'Social'
      }
    },
    footer: {
      description: 'A mountain refuge designed to inspire simpler, conscious lives connected with nature.',
      titles: {
        explore: 'Explore',
        legal: 'Legal'
      },
      links: {
        terms: 'Terms and Conditions',
        privacy: 'Privacy Policy',
        faq: 'FAQ'
      },
      copyright: 'Mágico Ensueño. All rights reserved.',
      madeBy: 'Made with respect for the mountain'
    }
  }
};