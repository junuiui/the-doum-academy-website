'use client'
import Link from 'next/link';
import styles from './NavBar.module.css';
import logoImage from '../../public/DoumAcademyLogo_without_letter.jpg';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState("ENG");
    const pathname = usePathname();

    const toggleLang = () => {
        setLang(lang === "ENG" ? "KOR" : "ENG");
    };


    const links = [
        { name: 'Service', href: '/service' },
        { name: 'About Us', href: '/about-us' },
        // { name: 'Teachers', href: '/teachers' }, // combined to about-us
        { name: 'Achievements', href: '/achievements' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Book Appointment', href: '/book-appointment' },
        { name: 'Contact Us', href: '/contact-us' },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                {/* Left: Logo Image */}
                <div className={styles.navLeft}>
                    <Link href="/">
                        <img
                            src={logoImage.src}
                            alt="The Doum Academy Logo"
                            className={styles.logoImage}
                        />
                    </Link>
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

                    {/* Language toggle */}
                    <button className={styles.langBtn} onClick={toggleLang}>
                        {lang}
                    </button>

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
                        onClick={() => setOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </>
    );
}
