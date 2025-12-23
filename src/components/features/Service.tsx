'use client'

import { usePathname } from "next/navigation";

import styles from "./Service.module.css";
import services from "@/data/services.json";

export function Service() {

    const pathname = usePathname()
    const isKo = pathname.startsWith('/ko')
    const lang = isKo ? 'ko' : 'en'

    return (
        <div className={styles.container}>
            <section className={styles.serviceCard}>
                <div className={styles.serviceHeader}>
                    <h2 className={styles.title}>
                        {lang === 'ko' ? '서비스 소개' : 'Our Services'}
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