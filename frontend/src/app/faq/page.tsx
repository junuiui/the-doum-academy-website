/* src/app/faq/page.tsx */
import FAQ from '../../components/features/FAQ';
import styles from './page.module.css';

export const metadata = {
  title: 'FAQ - The Doum Academy',
  description: 'Frequently Asked Questions about The Doum Academy services, schedules, and assessments.',
};

export default function FAQPage() {
  return (
    <main className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>Find answers to the most common questions about our academy.</p>
      </header>
      <section className={styles.content}>
        <FAQ isKo={false} />
      </section>
    </main>
  );
}
