'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './HomeContent.module.css';
import { Popup } from '../ui/Popup';
import { DUMMY_POPUP, reviews, heroContent, featureBanners } from '../../data/homeData';

interface HomeContentProps {
  lang: 'en' | 'ko';
}

export default function HomeContent({ lang }: HomeContentProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const hero = heroContent[lang];
  const features = featureBanners[lang];

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const [popupStates, setPopupStates] = useState<
    Record<string, { closed: boolean; hideToday: boolean }>
  >({});

  useEffect(() => {
    const states: Record<string, { closed: boolean; hideToday: boolean }> = {};
    DUMMY_POPUP[lang].forEach(p => {
      const hideUntil = localStorage.getItem(`hidePopup_${p.id}`);
      const hideToday = hideUntil ? Date.now() < Number(hideUntil) : false;
      states[p.id] = { closed: false, hideToday };
    });
    setPopupStates(states);
  }, [lang]);

  const closePopup = (id: string) => {
    setPopupStates(prev => ({
      ...prev,
      [id]: { ...prev[id], closed: true },
    }));
  };

  const hideToday = (id: string) => {
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    localStorage.setItem(`hidePopup_${id}`, todayEnd.getTime().toString());

    setPopupStates(prev => ({
      ...prev,
      [id]: { ...prev[id], hideToday: true },
    }));
  };

  const visiblePopups = DUMMY_POPUP[lang].filter(
    p => !popupStates[p.id]?.closed && !popupStates[p.id]?.hideToday
  );

  return (
    <div className={styles.container}>
      <div className={styles.popupContainer}>
        {visiblePopups.map(popup => (
          <Popup
            key={popup.id}
            title={popup.title}
            bodies={popup.bodies}
            onClose={() => closePopup(popup.id)}
            onHideToday={() => hideToday(popup.id)}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroSubtitle}>{hero.subtitle}</p>
          <button className={styles.ctaButton}>{hero.cta}</button>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresGrid}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.description}</p>
          </div>
        ))}
      </section>


      {/* Testimonials Section */}
      <section className={styles.testimonialSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {lang === 'en' ? 'Success Stories' : '성공 스토리'}
          </h2>
        </div>

        <div className={styles.testimonialWrapper}>
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide}>‹</button>

          <div className={styles.testimonialSlider} ref={sliderRef}>
            {reviews.map((r, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.rating}>
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
                <p className={styles.text}>"{r.text}"</p>
                <div className={styles.userInfo}>
                  <span className={styles.name}>{r.name}</span>
                  <span className={styles.univ}>{r.university} • {r.grade}</span>
                </div>
              </div>
            ))}
          </div>

          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide}>›</button>
        </div>
      </section>
    </div>
  );
}
