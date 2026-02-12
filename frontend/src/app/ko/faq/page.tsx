/* src/app/ko/faq/page.tsx */
import FAQ from '../../../components/features/FAQ';
import styles from '../../faq/page.module.css';

export const metadata = {
  title: '자주 묻는 질문 - 더 도움 아카데미',
  description: '더 도움 아카데미의 수업, 일정, 레벨 테스트 등에 대해 자주 묻는 질문들을 확인하세요.',
};

export default function FAQPageKo() {
  return (
    <main className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>자주 묻는 질문</h1>
        <p className={styles.subtitle}>학원에 대해 궁금해하시는 점들을 모았습니다.</p>
      </header>
      <section className={styles.content}>
        <FAQ isKo={true} />
      </section>
    </main>
  );
}
