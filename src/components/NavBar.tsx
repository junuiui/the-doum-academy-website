'use client'
import Link from 'next/link';
import styles from './NavBar.module.css';

import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

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
            </nav>
        </>
    );
}
