import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionNosotros } from './components/SectionNosotros';
import { SectionPilares } from './components/SectionPilares';
import { SectionVideo } from './components/SectionVideo';
import { SectionExperiencias } from './components/SectionExperiencias';
import { SectionRetiros } from './components/SectionRetiros';
import { SectionVoluntariados } from './components/SectionVoluntariados';
import { SectionTestimonios } from './components/SectionTestimonios';
import { SectionEventos } from './components/SectionEventos';
import { SectionComoLlegar } from './components/SectionComoLlegar';
import { SectionContacto } from './components/SectionContacto';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

const Main: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="font-sans antialiased selection:bg-brand selection:text-white">
        <Header />
        <main>
          <Hero />
          <SectionNosotros />
          <SectionPilares />
          <SectionVideo />
          <SectionExperiencias />
          <SectionRetiros />
          <SectionVoluntariados />
          <SectionTestimonios />
          <SectionEventos />
          <SectionComoLlegar />
          <SectionContacto />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Main;