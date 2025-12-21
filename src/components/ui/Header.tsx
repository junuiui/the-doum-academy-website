'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import logoImage from '../../../public/DoumAcademyLogo_without_letter.jpg';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const isKo = pathname.startsWith("/ko");

    const toggleLang = (lang: 'ko' | 'en') => {
        if (lang === 'ko') {
            if (!isKo) router.push('/ko' + pathname); // EN -> KO
        } else {
            if (isKo) router.push(pathname.replace(/^\/ko/, '') || '/'); // KO -> EN
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

                <Link href={isKo ? '/ko' : '/'} className={styles.title}>
                    <span>{isKo ? '도움 아카데미' : 'The Doum Academy'}</span>
                </Link>

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
