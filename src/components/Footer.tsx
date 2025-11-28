"use client";

import styles from './Footer.module.css';
import { FaInstagram } from "react-icons/fa6";

export default function Footer() {

    const openInstagram = () => {
        window.open("https://www.instagram.com/thedoumacademy/", "_blank");
    };

    return (
        <div>
            <div className={styles.socials}>
                <FaInstagram 
                    className={styles.icon} 
                    onClick={openInstagram}
                />
            </div>

            <footer className={styles.footer}>
                © 2025 The Doum Academy. All rights reserved.
            </footer>
        </div>
    );
}
