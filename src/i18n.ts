import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from '../data.json';

export const LANGUAGE_STORAGE_KEY = 'pueblo-magico-language';

const getInitialLanguage = (): 'es' | 'en' => {
  if (typeof window === 'undefined') return 'es';

  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: translations.es },
      en: { translation: translations.en },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'es',
    // If a key is missing in EN → automatically uses ES value
    returnNull: false,
    interpolation: { escapeValue: false },
  });

export default i18n;
