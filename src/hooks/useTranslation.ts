'use client';

import { useTranslation as useReactTranslation } from 'react-i18next';

export function useTranslation() {
    const { t, i18n } = useReactTranslation('common');

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return { t, i18n, changeLanguage };
}
