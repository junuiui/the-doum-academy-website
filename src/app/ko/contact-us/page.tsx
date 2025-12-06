import Location from './location';
import styles from './page.module.css';

export default function ContactUsPage() {
    return (
        <main className={styles.container}>
            
            <form className={styles.form}>

                <h1 className={styles.title}>Contact Us</h1>
                {/* Row 1: Name + Email */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="name">이름</label>
                        <input id="name" name="name" placeholder='홍길동' required />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">이메일</label>
                        <input id="email" name="email" placeholder='example@gmail.com' type="email" required />
                    </div>
                </div>

                {/* Row 2: Phone + Inquiry */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="phone">전화번호</label>
                        <input id="phone" name="phone" placeholder='xxx xxx xxxx'  />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="topic">문의사항</label>
                        <select id="topic" name="topic">
                            <option value="" disabled>선택</option>
                            <option value="Tutoring">Tutoring</option>
                            <option value="Registration">Registration</option>
                            <option value="Billing">Billing</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                </div>

                {/* Row 3: Message */}
                <div className={styles.field}>
                    <label htmlFor="message">내용</label>
                    <textarea id="message" name="message" placeholder='메시지' rows={5} required />
                </div>

                <button type="submit" className={styles.submitBtn}>보내기</button>
            </form>

            <Location />
        </main>
    );
}
