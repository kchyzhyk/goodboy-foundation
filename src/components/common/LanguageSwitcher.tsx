'use client';

import { useTranslation } from '@/src/hooks/useTranslation';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
    const { i18n, changeLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'sk', label: '🇸🇰', name: 'Slovenčina' },
        { code: 'en', label: '🇬🇧', name: 'English' },
        { code: 'cz', label: '🇨🇿', name: 'Čeština' },
        { code: 'woof', label: '🐶', name: 'Woof!' },
        { code: 'meow', label: '🐈‍⬛', name: 'Salem The Cat' },
    ];

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 w-full md:w-auto justify-between"
                aria-expanded={isOpen}
                aria-label="Switch language"
            >
                <span>{currentLang.label}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999] min-w-[200px]">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                                i18n.language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                            }`}
                        >
                            <span className="mr-2">{lang.label}</span>
                            {lang.name}
                            {i18n.language === lang.code && (
                                <span className="float-right">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
