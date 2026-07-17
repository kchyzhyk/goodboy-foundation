'use client';

import Link from 'next/link';
import { IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import { useTranslation } from '@/src/hooks/useTranslation';
import DogIcon from "@/src/components/icons/DogIcon";
import NavigationButtons from '@/src/components/common/NavigationButtons';

interface FooterWithNavProps {
    step: number;
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    hideBack?: boolean;
    isNextDisabled?: boolean;
    isLoading?: boolean;
}

export default function Footer({
                                          onBack,
                                          onNext,
                                          nextLabel = 'Pokračovať →',
                                          hideBack = false,
                                          isNextDisabled = false,
                                          isLoading = false,
                                      }: FooterWithNavProps) {
    const { t } = useTranslation();

    return (
        <footer className="w-full bg-white border-t border-gray-100 mt-10">
            <div className="max-w-7xl mx-auto py-4">
                {/* Navigation Buttons */}
                <div className="mb-4">
                    <NavigationButtons
                        onBack={onBack}
                        onNext={onNext}
                        nextLabel={nextLabel}
                        hideBack={hideBack}
                        isNextDisabled={isNextDisabled}
                        isLoading={isLoading}
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                        <DogIcon size={24} className="text-blue-600" />
                        <span>GoodBoy</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <IconBrandFacebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-pink-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <IconBrandInstagram size={20} />
                            </a>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link
                                href="/kontakt"
                                className="text-[#4B5563] hover:text-blue-600 transition-colors text-base leading-6 font-normal"
                            >
                                {t('navigation.contact')}
                            </Link>
                            <Link
                                href="/about"
                                className="text-[#4B5563] hover:text-blue-600 transition-colors text-base leading-6 font-normal"
                            >
                                O projekte
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
