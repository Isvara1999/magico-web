import React, { createContext, useContext, useState, ReactNode } from 'react';
import translations from '../data.json';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: any;
}

const defaultContext: LanguageContextType = {
  language: 'es',
  toggleLanguage: () => {},
  t: translations['es'],
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');
  const t = translations[language];
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);