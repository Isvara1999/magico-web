import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-dark/80 py-16 border-t border-brand/5">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm font-light">
        <div className="col-span-1 md:col-span-2 text-center md:text-left">
          <img
            src="https://tawaapukuntur.com/wp-content/uploads/2025/10/logotipo-marron-magico.svg"
            alt="Mágico Ensueño"
            className="h-8 mb-6 mx-auto md:mx-0 opacity-90"
          />
          <p className="leading-relaxed max-w-sm mx-auto md:mx-0 text-dark/70">
            {t.footer.description}
          </p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gold font-serif text-lg mb-6">{t.footer.titles.explore}</h4>
          <ul className="space-y-3">
            {t.menu.items.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-brand transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-gold font-serif text-lg mb-6">{t.footer.titles.legal}</h4>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                {t.footer.links.terms}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                {t.footer.links.privacy}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand transition-colors">
                {t.footer.links.faq}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand/10 text-center flex flex-col gap-2">
        <span className="text-xs tracking-wider uppercase text-brand font-medium">
          &copy; {currentYear} {t.footer.copyright}
        </span>
        <span className="text-brand font-serif normal-case text-sm">
          {t.footer.madeBy}
        </span>
      </div>
    </footer>
  );
};