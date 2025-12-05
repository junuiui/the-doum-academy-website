'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import logoImage from '../../public/DoumAcademyLogo_without_letter.jpg';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    
    const isKo = pathname.startsWith("/ko");

    const toggleLang = () => {
        if (isKo) {
            router.push(pathname.replace(/^\/ko/, '') || '/'); // KOR --> ENG
        } else {
            router.push('/ko' + pathname);  // ENG --> KOR
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

                {/* Right: Language */}
                <button className={styles.langBtn} onClick={toggleLang}>
                    {isKo ? 'EN' : 'KO'}
                </button>
            </div>
        </header>
    );
}
