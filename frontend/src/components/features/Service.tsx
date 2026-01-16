'use client'

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";

import styles from "./Service.module.css";


// Service type
type Service = {
  id: number;
  title: {
    en: string;
    ko: string;
  };
  body: {
    en: string;
    ko: string;
  }[];
};

export function Service() {

  // Determining the current language 
  const pathname = usePathname()
  const isKo = pathname.startsWith('/ko')
  const lang = isKo ? 'ko' : 'en'

  // loading the services from the DB
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        console.log('Loading Services...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
        const data = await res.json();
        setServices(data);
        console.log('Loading Services Completed');
      }
      catch (err) {
        console.error('Failed to load services', err);
      }
      finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [])

  return (
    <div className={styles.container}>
      <section className={styles.serviceCard}>
        <div className={styles.serviceHeader}>
          <h2 className={styles.title}>
            {lang === 'ko' ? '서비스 소개' : 'Our Services'}
          </h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className={styles.card}>
              <h4 className={styles.cardTitle}>
                {service.title[lang]}
              </h4>

              <ul className={styles.bodyList}>
                {service.body.map((item, i) => (
                  <li key={i}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
// 