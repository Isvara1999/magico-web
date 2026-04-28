import React, { createContext, useContext, ReactNode } from 'react';
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

  const language = (i18n.language || 'es') as Language;

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
