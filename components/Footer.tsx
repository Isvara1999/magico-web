import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { InstagramLogo, WhatsappLogo, FacebookLogo, MapPin, Envelope, Phone } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-800 py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <img
              src="https://tawaapukuntur.com/wp-content/uploads/2025/10/logotipo-marron-magico.svg"
              alt="Mágico Ensueño"
              className="h-10 opacity-90"
            />
            <p className="text-gray-500 leading-relaxed font-light text-base max-w-xs">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/magicoensueno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-green/5 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300">
                <InstagramLogo size={20} weight="light" />
              </a>
              <a href={t.contact.labels.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-green/5 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300">
                <WhatsappLogo size={20} weight="light" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-green/5 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300">
                <FacebookLogo size={20} weight="light" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-brand-green font-serif text-xl mb-8 relative inline-block">
              {t.footer.titles.explore}
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-brand-gold"></span>
            </h4>
            <ul className="space-y-4">
              {t.menu.items.map((item: any, index: number) => (
                <li key={index}>
                  <a href={item.href} className="text-gray-500 hover:text-brand-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-gold/40 group-hover:bg-brand-gold transition-colors"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences Column */}
          <div>
            <h4 className="text-brand-green font-serif text-xl mb-8 relative inline-block">
              {t.footer.titles.experiences}
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-brand-gold"></span>
            </h4>
            <ul className="space-y-4">
              {t.footer.experienceLinks.map((link: any, index: number) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-500 hover:text-brand-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-gold/40 group-hover:bg-brand-gold transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-brand-green font-serif text-xl mb-8 relative inline-block">
              Contacto
              <span className="absolute -bottom-2 left-0 w-8 h-px bg-brand-gold"></span>
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin size={18} weight="light" className="text-brand-gold mt-1 flex-shrink-0" />
                <span className="text-sm font-light leading-relaxed">Los Gigantes, Sierras Grandes,<br/>Córdoba, Argentina</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone size={18} weight="light" className="text-brand-gold flex-shrink-0" />
                <a href={`tel:${t.contact.labels.phone}`} className="text-sm font-light hover:text-brand-gold transition-colors">
                  {t.contact.labels.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Envelope size={18} weight="light" className="text-brand-gold flex-shrink-0" />
                <a href={`mailto:${t.contact.labels.email}`} className="text-sm font-light hover:text-brand-gold transition-colors">
                  {t.contact.labels.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-400 font-light flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>&copy; {currentYear} {t.footer.copyright}</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-gray-200"></span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-gold transition-colors">{t.footer.links.terms}</a>
              <a href="#" className="hover:text-brand-gold transition-colors">{t.footer.links.privacy}</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 italic">{t.footer.madeBy}</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-green/40 font-bold ml-2">by Catálisis</span>
          </div>
        </div>
      </div>
    </footer>
  );
};