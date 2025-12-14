import React from 'react';

export type Language = 'es' | 'en';

export type SiteContent = any;

export interface MenuItem {
  label: string;
  href: string;
  submenu?: MenuItem[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  iconPath: React.ReactNode;
}