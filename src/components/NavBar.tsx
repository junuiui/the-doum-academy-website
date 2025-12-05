'use client';
import Link from 'next/link';
import styles from './NavBar.module.css';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isKo = pathname.startsWith("/ko");

    const links = [
        { nameEn: 'Service', nameKo: '서비스', href: '/service' },
        { nameEn: 'About Us', nameKo: '소개', href: '/about-us' },
        { nameEn: 'Achievements', nameKo: '성과', href: '/achievements' },
        { nameEn: 'Gallery', nameKo: '갤러리', href: '/gallery' },
        { nameEn: 'Book Appointment', nameKo: '예약하기', href: '/book-appointment' },
        { nameEn: 'Location', nameKo: '찾아오시는 길', href: '/location' },
        { nameEn: 'Contact Us', nameKo: '문의하기', href: '/contact-us' },
    ];

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                {links.map(link => {
                    const href = isKo ? '/ko' + link.href : link.href;
                    const name = isKo ? link.nameKo : link.nameEn;
                    const active = pathname === href ? styles.active : '';
                    return (
                        <Link key={href} href={href} className={active}>
                            {name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
