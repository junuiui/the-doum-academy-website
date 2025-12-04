// src/app/layout.tsx
import './globals.css';

import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
// import { LanguageProvider } from './context/LanguageContext';
import { Noto_Sans_KR, Teachers } from "next/font/google";
import Header from '@/components/Header';

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
        <html lang="ko" className={noto.className}>
            <body className='layout-body'>
                <Header />
                <Navbar />
                <main className='layout-main'>
                    {children}
                </main>
                <Footer />

            </body>
        </html>
    );
}
