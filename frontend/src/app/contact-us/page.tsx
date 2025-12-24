'use client'

import { Location } from '../../components/features/location';
import ContactUsForm from '../../components/features/ContactUsForm';
import styles from './page.module.css';

export default function ContactUs() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.columnGrid}>
                {/* Contact Us */}
                <section>
                    <ContactUsForm />
                </section>

                {/* Location */}
                <section>
                    <Location />
                </section>
            </div>
        </div>
    );
}
