import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import React from "react";
import Providers from "@/src/app/providers";

export const metadata: Metadata = {
    metadataBase: new URL('https://goodboy-foundation.vercel.app'), // 👈 Добавь это
    title: {
        default: 'GoodBoy Foundation - Podporte slovenské útulky pre psov',
        template: '%s | GoodBoy Foundation'
    },
    description: 'Pomáhame slovenským útulkom pre psov. Prispejte na dobrú vec a podporte psíkov v núdzi.',
    keywords: 'útulok, psy, pomoc, dar, nadácia, Slovensko, zvieratá',
    authors: [{ name: 'GoodBoy Foundation' }],
    creator: 'GoodBoy Foundation',
    publisher: 'GoodBoy Foundation',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        locale: 'sk_SK',
        url: 'https://goodboy-foundation.vercel.app',
        title: 'GoodBoy Foundation - Podporte slovenské útulky pre psov',
        description: 'Pomáhame slovenským útulkom pre psov. Prispejte na dobrú vec a podporte psíkov v núdzi.',
        siteName: 'GoodBoy Foundation',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'GoodBoy Foundation',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GoodBoy Foundation - Podporte slovenské útulky pre psov',
        description: 'Pomáhame slovenským útulkom pre psov. Prispejte na dobrú vec a podporte psíkov v núdzi.',
        images: ['/og-image.jpg'],
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="sk">
        <body className="flex flex-col min-h-screen">
        <MantineProvider>
            <Providers>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </Providers>
        </MantineProvider>
        </body>
        </html>
    );
}
