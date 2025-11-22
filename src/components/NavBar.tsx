'use client'
// src/components/NavBar.tsx
import Link from 'next/link';
import styles from './NavBar.module.css';
import logoImage from '../../public/theDoumAcademy.webp';
import { useState } from 'react';



export default function Navbar() {
    const [open, setOpen] = useState(false);

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
                        <Link href="/courses">Courses</Link>
                        <Link href="/about-us">About Us</Link>
                        <Link href="/teachers">Teachers</Link>
                        <Link href="/achievements">Achievements</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/book-appointment">Book Appointment</Link>
                        {/* TODO
                            1. add more ?
                            2. reduce?
                        */}
                    </div>

                    <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
                        ☰
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            <div className={`${styles.mobileMenu} ${open ? styles.show : ''}`}>
                <Link href="/courses">Courses</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/teachers">Teachers</Link>
                <Link href="/achievements">Achievements</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/book-appointment">Book Appointment</Link>
            </div>
        </>
    );
}
