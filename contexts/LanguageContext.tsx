import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../src/i18n';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  toggleLanguage: () => {},
  t: {},
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  const language: Language = i18n.language?.startsWith('en') ? 'en' : 'es';

  useEffect(() => {
    document.documentElement.lang = language;

    // Translated lists often use their copy as React keys. Changing language
    // remounts those nodes after a page-level reveal observer was initialized,
    // leaving the new elements permanently transparent. Observe only the new
    // hidden elements whenever the active language changes.
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' },
    );

    document.querySelectorAll('[data-reveal]:not(.visible)').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  const toggleLanguage = () => {
    i18n.changeLanguage(language === 'es' ? 'en' : 'es');
  };

  // Keep the same object-access syntax (t.contact.title) that all components use.
  // i18next stores the full resource bundle, so we expose it directly.
  const t = i18n.getResourceBundle(language, 'translation') ?? i18n.getResourceBundle('es', 'translation');

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
