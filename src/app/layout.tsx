// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

export const metadata = {
    title: 'The Doum Academy',
    description: 'Welcome to The Doum Academy',
    icons: {
        icon: '/theDoumAcademy_sqaure.png',
    }

};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
