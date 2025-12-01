// src/app/page.tsx
'use client'
// import { useLanguage } from './context/LanguageContext';
import styles from './page.module.css';

export default function Home() {
    // const { lang } = useLanguage();

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1>doum Academy</h1>
                <p>Brief intro</p>
            </section>

            {/* brief */}
            <section className={styles.about}>
                <h2>About Us</h2>
                <p>
                    Brief About us starts here
                </p>
            </section>
        </div>
    );
}
