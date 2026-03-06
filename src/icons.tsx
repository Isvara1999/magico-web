import React from 'react';

// shared SVG/icon components used across the Familion pages
export const IconAdultos: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Adultos en Red.svg')} className={className} alt="Adultos en Red" />
);

export const IconNiños: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Infancia en Libertad.svg')} className={className} alt="Infancia en Libertad" />
);

export const IconGastronomia: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Gastronomía de Montaña.svg')} className={className} alt="Gastronomía de Montaña" />
);

export const IconTransformacion: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <img src={encodeURI('/uploads/Experiencias Transformadoras.svg')} className={className} alt="Experiencias Transformadoras" />
);

export const IconAlojamiento: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Alojamiento.svg')} className={className} alt="Alojamiento" />
);

export const IconDomo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Alojamiento.svg')} className={className} alt="Domo" />
);

export const IconAgua: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Agua.svg')} className={className} alt="Agua" />
);

export const IconRed: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/Energía y Conexión.svg')} className={className} alt="Energía y Conexión" />
);

export const IconSol: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <img src="/uploads/Sábado (Sol).svg" className={className} alt="Sol" />
);

export const IconLuna: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <img src={encodeURI('/uploads/Domingo (Luna).svg')} className={className} alt="Luna" />
);

export const IconEstrella: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <img src={encodeURI('/uploads/farewell.svg')} className={className} alt="Farewell" />
);

export const IconCheck: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

export const IconCalendar: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconLocation: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C7.58 2 4 5.58 4 10C4 16 12 22 12 22S20 16 20 10C20 5.58 16.42 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
