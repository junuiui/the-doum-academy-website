'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import logoImage from '../../public/DoumAcademyLogo_without_letter.jpg';
// import { useLanguage } from '@/app/context/LanguageContext';

export default function Header() {
    // const { lang, toggleLang } = useLanguage();

    return (
        <header className={styles.header}>
            {/* Left: Logo */}
            <div className={styles.headerInner}>
                <Link href="/" className={styles.logoWrap}>
                    <img
                        src={logoImage.src}
                        alt="The Doum Academy Logo"
                        className={styles.logo}
                    />
                </Link>

                <Link href="/" >
                    <span className={styles.title}>The Doum Academy</span>
                </Link>

                {/* Right: Language */}
                <button className={styles.langBtn}>
                    button
                </button>
            </div>

        </header>
    );
}
