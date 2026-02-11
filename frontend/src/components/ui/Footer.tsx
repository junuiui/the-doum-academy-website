"use client";

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.businessInfo}>
          <p><strong>The Doum Academy</strong></p>
          <p>Address: 3003 St Johns St, Port Moody, BC V3H 0L4 | Tel: 604-000-0000</p>
          <p>Registration No: 000-00-00000 | Directors: Devin Kim, Kate Buiatti</p>
        </div>
        <div className={styles.copyright}>
          © 2025 The Doum Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
