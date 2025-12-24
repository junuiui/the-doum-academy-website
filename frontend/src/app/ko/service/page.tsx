"use client";

import styles from "./page.module.css";
import services from "@/data/services.json";

export default function ServicePage() {

    const lang = 'ko';

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                서비스 안내
            </h1>

            {services.map((service) => (
                <div key={service.id} className={styles.card}>
                    {/* Title */}
                    <h2 className={styles.cardTitle}>
                        {service.title[lang]}
                    </h2>

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
        </div>
    );
}
// 