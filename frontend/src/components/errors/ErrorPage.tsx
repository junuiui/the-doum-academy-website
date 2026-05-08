import styles from './ErrorPage.module.css';
import logoImage from '../../../public/DoumAcademyLogo_without_letter.jpg';

const ErrorPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.glow} />

            <div className={styles.card}>
                <img
                    src={logoImage.src}
                    alt="The Doum Academy Logo"
                    className={styles.logo}
                />

                <h1 className={styles.title}>Under Construction</h1>
                <p className={styles.subtitle}>
                    The Doum Academy website is currently undergoing improvements.<br />
                    We'll be back shortly with a new experience.
                </p>

                <div className={styles.divider} />

                <div className={styles.contactBox}>
                    <p className={styles.contactTitle}>For Inquiries</p>
                    <ul className={styles.contactList}>
                        <li className={styles.contactItem}>
                            <span>Email:</span> contact@doumacademy.com
                        </li>
                        <li className={styles.contactItem}>
                            <span>Phone:</span> +1 (604) 123-4567
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;