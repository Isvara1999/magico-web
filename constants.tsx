import React from 'react';
import { MenuItem, Testimonial, Experience, Pillar } from './types';
import { Leaf, Users, Heart, Coffee } from 'lucide-react';

export const MENU_ITEMS: MenuItem[] = [
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
];

export const TESTIMONIALS: Testimonial[] = [
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
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    title: 'Bienestar & Balance',
    description: 'Ceremonias ancestrales, yoga, consciencia corporal y temazcal.',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
    ctaText: 'Consultar Terapias',
    ctaLink: '#contacto',
  },
  {
    id: 2,
    title: 'Glamping & Refugio',
    description: 'Desde Domos Geodésicos y Yurtas, hasta habitaciones históricas.',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    ctaText: 'Ver Opciones',
    ctaLink: '#contacto',
  },
  {
    id: 3,
    title: 'Cocina Consciente',
    description: 'Nutrición para el cuerpo y el alma. Productos locales y orgánicos.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    ctaText: 'Ver Propuesta',
    ctaLink: '#contacto',
  },
];

export const PILARES: Pillar[] = [
  {
    id: 1,
    title: 'Regeneración',
    subtitle: '+8mil Árboles.',
    iconPath: <Leaf className="w-6 h-6 md:w-7 md:h-7" />,
  },
  {
    id: 2,
    title: 'Comunidad',
    subtitle: 'Vínculos locales.',
    iconPath: <Users className="w-6 h-6 md:w-7 md:h-7" />,
  },
  {
    id: 3,
    title: 'Conciencia',
    subtitle: 'Con propósito.',
    iconPath: <Heart className="w-6 h-6 md:w-7 md:h-7" />,
  },
  {
    id: 4,
    title: 'Alimentación',
    subtitle: 'Cocina real.',
    iconPath: <Coffee className="w-6 h-6 md:w-7 md:h-7" />,
  },
];
