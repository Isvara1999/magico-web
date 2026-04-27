import React, { createContext, useContext, useState, ReactNode } from 'react';
import translations from '../data.json';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: any;
}

// Deep-merge: EN over ES base. If EN value is null/undefined, falls back to ES.
// Empty strings in EN are kept as-is (intentional).
function withFallback(base: any, override: any): any {
  if (Array.isArray(override)) {
    return override.map((item, i) =>
      typeof item === 'object' && item !== null
        ? withFallback(base?.[i] ?? {}, item)
        : (item ?? base?.[i])
    );
  }
  if (typeof override === 'object' && override !== null) {
    const result: any = { ...(base ?? {}) };
    for (const key of Object.keys(override)) {
      const v = override[key];
      if (v === null || v === undefined) {
        result[key] = base?.[key];
      } else if (typeof v === 'object') {
        result[key] = withFallback(base?.[key], v);
      } else {
        result[key] = v;
      }
    }
    return result;
  }
  return override ?? base;
}

const es = translations['es'];
const en = withFallback(es, translations['en']);

const safeTranslations: Record<Language, any> = { es, en };

const defaultContext: LanguageContextType = {
  language: 'es',
  toggleLanguage: () => {},
  t: es,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const toggleLanguage = () => setLanguage(l => (l === 'es' ? 'en' : 'es'));
  const t = safeTranslations[language];
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
