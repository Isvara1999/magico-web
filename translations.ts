import React from 'react';

import siteContent from './data.json';

// Definimos la estructura del menú hardcoded ya que no está en el JSON de momento
const menuData = {
  es: {
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
  en: {
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
        label: 'Experiencias',
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
  }
};

// Mapeo manual de Pilares (para mantener los iconos que son componentes React, no serializables en JSON)
// El texto sí podría venir del JSON si se quisiera, pero aquí unificamos.
const pillarsData = {
  es: [
    { id: 1, title: 'Regeneración', subtitle: '+8mil Árboles.' },
    { id: 2, title: 'Comunidad', subtitle: 'Vínculos locales.' },
    { id: 3, title: 'Conciencia', subtitle: 'Con propósito.' },
    { id: 4, title: 'Alimentación', subtitle: 'Cocina real.' },
  ],
  en: [
    { id: 1, title: 'Regeneration', subtitle: '+8k Trees.' },
    { id: 2, title: 'Community', subtitle: 'Local bonds.' },
    { id: 3, title: 'Consciousness', subtitle: 'With purpose.' },
    { id: 4, title: 'Food', subtitle: 'Real food.' },
  ]
};

export const translations = {
  es: {
    ...siteContent.es,
    menu: menuData.es,
    pillars: pillarsData.es,
    hero: {
      ...siteContent.es.hero,
      stats: {
        years: siteContent.es.hero.stats_years,
        trees: siteContent.es.hero.stats_trees,
        sustainable: siteContent.es.hero.stats_sus
      }
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
    menu: menuData.en,
    pillars: pillarsData.en,
    hero: {
      ...siteContent.en.hero,
      stats: {
        years: siteContent.en.hero.stats_years,
        trees: siteContent.en.hero.stats_trees,
        sustainable: siteContent.en.hero.stats_sus
      }
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