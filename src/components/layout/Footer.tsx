'use client';

import Link from 'next/link';
import { IconHeart, IconBrandGithub, IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                            <span>🐕</span>
                            <span>
                GoodBoy<span className="text-blue-600">Foundation</span>
              </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            Pomáhame slovenským útulkom pre psov nájsť nové domovy.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                aria-label="GitHub"
                            >
                                <IconBrandGithub size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                aria-label="Twitter"
                            >
                                <IconBrandTwitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-pink-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <IconBrandInstagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Odkazy</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Domov
                                </Link>
                            </li>
                            <li>
                                <Link href="/donors" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Prispievatelia
                                </Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Kontakt
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Informácie</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-600">Hatiko 123</li>
                            <li className="text-gray-600">811 01 Bratislava</li>
                            <li className="text-gray-600">info@goodboy-foundation.sk</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Sledujte nás</h3>
                        <p className="text-sm text-gray-600">
                            Buďte v obraze o našich aktivitách a pomáhajte spolu s nami.
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-sm text-gray-600">
                            <IconHeart size={16} className="text-red-500 fill-red-500" />
                            <span>Pomáhame od roku 2020</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>
                        © {currentYear} GoodBoy Foundation. Všetky práva vyhradené.
                        <span className="hidden sm:inline"> | </span>
                        <br className="sm:hidden" />
                        Vyrobené s ❤️ pre psíkov v núdzi
                    </p>
                </div>
            </div>
        </footer>
    );
}
