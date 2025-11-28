// src/app/page.tsx
'use client'
import { useLanguage } from './context/LanguageContext';
import styles from './page.module.css';

export default function Home() {
    const { lang } = useLanguage();

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                {lang === 'en' ? <h1>Welcome to The Doum Academy</h1> : <h1>도움아카데이메 오신것을 환영합니다!</h1> }
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
