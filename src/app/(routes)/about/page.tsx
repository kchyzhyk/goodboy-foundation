'use client';

import { useTranslation } from '@/src/hooks/useTranslation';
import { useStats } from '@/src/hooks/useDonation';

export default function AboutPage() {
    const { t } = useTranslation();
    const { data: stats, isLoading } = useStats();

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-8">🐕 O projekte</h1>

            <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                    {t('about.text')}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-gray-900">
                        {isLoading ? '...' : `${stats?.contribution || 0} €`}
                    </p>
                    <p className="text-sm text-gray-500">{t('stats.total')}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-gray-900">
                        {isLoading ? '...' : stats?.contributors || 0}
                    </p>
                    <p className="text-sm text-gray-500">{t('stats.contributors')}</p>
                </div>
            </div>
        </div>
    );
}
