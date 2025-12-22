'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

const LINKS = [
    { en: 'About Us', ko: '소개', href: '/about-us' },
    { en: 'Achievements', ko: '성과', href: '/achievements' },
    { en: 'Gallery', ko: '갤러리', href: '/gallery' },
    { en: 'Contact Us', ko: '문의하기', href: '/contact-us' },
];

export default function Navbar() {
    const pathname = usePathname();
    const isKo = pathname.startsWith('/ko');

    return (
        <nav aria-label="Main navigation">
            <ul className={styles.navLinks}>
                {LINKS.map(({ en, ko, href }) => {
                    const fullHref = isKo ? `/ko${href}` : href;
                    const label = isKo ? ko : en;
                    const isActive = pathname === fullHref;

                    return (
                        <li key={href}>
                            <Link
                                href={fullHref}
                                className={isActive ? styles.active : ''}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
