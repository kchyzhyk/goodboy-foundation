import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';
import { Providers } from './providers';
import '@mantine/core/styles.css';
import './globals.css';
import Header from "@/src/components/layout/Header";

export const metadata: Metadata = {
    title: 'GoodBoy Foundation',
    description: 'Support Slovak shelters for dogs',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="sk">
        <body>
        <MantineProvider>
            <Providers>
                <Header />
                <main>{children}</main>
            </Providers>
        </MantineProvider>
        </body>
        </html>
    );
}
