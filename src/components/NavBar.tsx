'use client'
// src/components/NavBar.tsx
import Link from 'next/link';
import styles from './NavBar.module.css';
import logoImage from '../../public/theDoumAcademy.webp';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { name: 'Courses', href: '/courses' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Teachers', href: '/teachers' },
        { name: 'Achievements', href: '/achievements' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'Book Appointment', href: '/book-appointment' },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                {/* Left: Logo Image */}
                <div className={styles.navLeft}>
                    <img src={logoImage.src} alt="The Doum Academy Logo" className={styles.logoImage} />
                </div>

                {/* Center: Logo Text */}
                <div className={styles.navCenter}>
                    <span><Link className={styles.logoText} href="/">The Doum Academy</Link></span>
                </div>

                {/* Right: Links + Mobile Menu Button */}
                <div className={styles.navRight}>
                    <div className={styles.navLinks}>
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={pathname === link.href ? styles.active : ''}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
                        ☰
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            <div className={`${styles.mobileMenu} ${open ? styles.show : ''}`}>
                {links.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={pathname === link.href ? styles.active : ''}
                        onClick={() => setOpen(false)} // 클릭하면 메뉴 닫힘
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
