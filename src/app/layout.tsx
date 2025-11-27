// src/app/layout.tsx
import './globals.css';

import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

export const metadata = {
    title: 'The Doum Academy',
    description: 'Welcome to The Doum Academy',
    icons: {
        icon: '/DoumAcademyLogo_without_letter.jpg',
    }

};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={noto.className}>
            <body>
                <LanguageProvider>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </LanguageProvider>

            </body>
        </html>
    );
}
