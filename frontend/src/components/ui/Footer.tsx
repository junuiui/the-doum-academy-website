/* src/components/ui/Footer.tsx */
"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div>
            <footer className={styles.footer}>

                {/* General Info */}
                <div className={styles.businessInfo}>
                    <p><strong>The Doum Academy</strong></p>
                    <p>Address: 3003 St Johns St, Port Moody, BC V3H 0L4 | Tel: 604-000-0000</p>
                    <p>Registration No: 000-00-00000 | Directors: Devin Kim, Kate Buiatti</p>
                </div>

                {/* Copyright */}
                <div className={styles.copyright}>
                    <p>© 2025 The Doum Academy. All rights reserved.</p>
                </div>

                <Link href="/admin/login" className={styles.adminLink}>Admin</Link>
            </footer>
        </div>
    );
}


/*
    todo:
        1. dynamic information (client set the primary information)
            1. dynamic address 
*/