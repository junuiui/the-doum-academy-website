// src/app/layout.tsx
import './globals.css';

import Navbar from '../components/ui/NavBar';
import Footer from '../components/ui/Footer';
import { ReactNode } from 'react';
// import { LanguageProvider } from './context/LanguageContext';
import { Noto_Sans_KR, Teachers } from "next/font/google";
import Header from '../components/ui/Header';

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
    const isUnderConstruction = true; // Set to true to hide Header/Footer

    return (
        <html lang="en" className={noto.className}>
            <body className='layout-body'>
                {!isUnderConstruction && <Header />}
                {/* <Navbar /> */}
                <main className='layout-main' style={isUnderConstruction ? { minHeight: '100vh', display: 'flex', flexDirection: 'column' } : {}}>
                    {children}
                </main>
                {!isUnderConstruction && <Footer />}
            </body>
        </html>
    );
}
