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
                    The Doum Academy specializes in personalized tutoring for students in middle and high school.
                    We help students strengthen their academic skills, prepare for exams, and achieve their educational goals.
                </p>
            </section>
        </div>
    );
}
