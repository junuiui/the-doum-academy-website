// src/components/Navbar.tsx
import Link from 'next/link';
import styles from './NavBar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>The Doum Academy</div>
            <div className={styles.navLinks}>
                <Link href="/courses">Courses</Link>
                <Link href="/about-us">About Us</Link>
                <Link href="/teachers">Teachers</Link>
                <Link href="/achievements">Achievements</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/book-appointment">Book Appointment</Link>
            </div>
        </nav>
    );
}
