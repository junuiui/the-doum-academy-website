'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import logoImage from '../../../public/color_doum_horizontal.png';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Navbar from './NavBar';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const isKo = pathname.startsWith("/ko");
    const qs = searchParams.toString() ? '?' + searchParams.toString() : '';

    const toggleLang = (lang: 'ko' | 'en') => {
        if (lang === 'ko') {
            if (!isKo) router.push('/ko' + pathname + qs);
        } else {
            if (isKo) router.push((pathname.replace(/^\/ko/, '') || '/') + qs);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                {/* Left: Logo */}
                <Link href={isKo ? '/ko' : '/'} className={styles.logoWrap}>
                    <img
                        src={logoImage.src}
                        alt="The Doum Academy Logo"
                        className={styles.logo}
                    />
                </Link>

                <div className={styles.nav}>
                    <Navbar />
                </div>

                {/* Language Toggle */}
                <div className={styles.langToggleWrapper}>
                    <div
                        className={styles.langToggleBackground}
                        style={{ transform: isKo ? 'translateX(100%)' : 'translateX(0%)' }}
                    />
                    <button
                        onClick={() => toggleLang('en')}
                        className={!isKo ? styles.activeText : ''}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => toggleLang('ko')}
                        className={isKo ? styles.activeText : ''}
                    >
                        KR
                    </button>
                </div>
            </div>
        </header>
    );
}
