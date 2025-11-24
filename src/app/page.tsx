// src/app/page.tsx
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1>Welcome to The Doum Academy</h1>
                <p>Expert tutoring for middle & high school students to excel in school and prepare for college entrance exams.</p>
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
