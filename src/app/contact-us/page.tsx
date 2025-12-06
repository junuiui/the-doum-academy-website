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
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" placeholder='Gildong Hong' required />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder='example@gmail.com' required />
                    </div>
                </div>

                {/* Row 2: Phone + Inquiry */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" placeholder='xxx xxx xxxx' />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="topic">Inquiries</label>
                        <select id="topic" name="topic">
                            <option value="" disabled>select</option>
                            <option value="Tutoring">Tutoring</option>
                            <option value="Registration">Registration</option>
                            <option value="Billing">Billing</option>
                            <option value="General">General</option>
                        </select>
                    </div>
                </div>

                {/* Row 3: Message */}
                <div className={styles.field}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder='Your Message' rows={5} required />
                </div>

                <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>

            <Location />
        </main>
    );
}
