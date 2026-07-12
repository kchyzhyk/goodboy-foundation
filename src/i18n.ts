import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import sk from '../public/locales/sk/common.json';
import en from '../public/locales/en/common.json';
import cz from '../public/locales/cz/common.json';
import woof from '../public/locales/woof/common.json';
import meow from '../public/locales/meow/common.json';

const resources = {
    sk: { common: sk },
    en: { common: en },
    cz: { common: cz },
    woof: { common: woof },
    meow: { common: meow },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'sk',
        lng: 'sk',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie', 'localStorage', 'navigator'],
            caches: ['cookie', 'localStorage'],
        },
    });

export default i18n;
