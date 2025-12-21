import styles from "./Service.module.css";
import services from "@/data/services.json";

export function Service() {

    const lang = 'en';

    return (
        <div className={styles.container}>
            <section className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                    <h2 className={styles.title}>
                        Our Services
                    </h2>
                </div>

                {services.map((service) => (
                    <div key={service.id} className={styles.card}>
                        {/* Title */}
                        <h4 className={styles.cardTitle}>
                            {service.title[lang]}
                        </h4>

                        {/* Body */}
                        <ul className={styles.bodyList}>
                            {service.body.map((item, i) => (
                                <li key={i}>
                                    {item[lang]}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    );
}
// 