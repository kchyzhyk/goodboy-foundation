'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '@/src/components/common/LanguageSwitcher';
import { useTranslation } from '@/src/hooks/useTranslation';

export default function Header() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/', label: t('navigation.home') },
        { href: '/donors', label: t('navigation.donors') },
        { href: '/kontakt', label: t('navigation.contact') },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm shadow-sm'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                        <motion.span
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 0 }}
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="text-2xl"
                        >
                            🐕
                        </motion.span>
                        <span className="hidden sm:inline">
                            GoodBoy
                            <span className="text-blue-600">Foundation</span>
                        </span>
                        <span className="sm:hidden">GoodBoy</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-gray-600 rounded-full transition-all"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-0.5 bg-gray-600 rounded-full transition-all"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-gray-600 rounded-full transition-all"
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    initial={false}
                    animate={isMobileMenuOpen ? 'open' : 'closed'}
                    variants={{
                        open: { height: 'auto', opacity: 1 },
                        closed: { height: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="py-2 space-y-1 border-t border-gray-100">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-2 rounded-lg transition-all ${
                                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <div className="px-4 py-2">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </motion.div>
            </nav>
        </header>
    );
}
