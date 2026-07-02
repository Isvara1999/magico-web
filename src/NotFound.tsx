import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Compass, House, WhatsappLogo } from '@phosphor-icons/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const NotFound: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = '404 — Página no encontrada | Pueblo Mágico';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bone flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-24 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-green rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" />
        </div>

        <div className="max-w-2xl w-full text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold mb-8 animate-pulse">
            <Compass size={40} weight="light" />
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-serif text-brand-green mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: t.notFound.title }}
          />
          
          <p className="text-gray-600 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-lg mx-auto">
            {t.notFound.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-brand-green text-white rounded-full text-sm font-bold tracking-widest hover:bg-brand-green/90 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <House size={18} weight="bold" />
              {t.notFound.btnHome}
            </a>
            
            <a 
              href={t.contact.labels.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white text-brand-green border border-brand-green/20 rounded-full text-sm font-bold tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <WhatsappLogo size={20} weight="bold" className="text-green-600" />
              {t.notFound.btnContact}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
