import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from '../data.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: translations.es },
      en: { translation: translations.en },
    },
    lng: 'es',
    fallbackLng: 'es',
    // If a key is missing in EN → automatically uses ES value
    returnNull: false,
    interpolation: { escapeValue: false },
  });

export default i18n;
