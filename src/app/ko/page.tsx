// src/app/page.tsx
'use client'

import styles from './page.module.css';

export default function Home() {

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1>도움 아카데미</h1>
                <p>Brief intro</p>
            </section>
        </div>
    );
}
