'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './HomeContent.module.css';
import { Popup } from '../ui/Popup';
import DomeGallery from '../features/DomeGallery';
import { DUMMY_POPUP, reviews } from '../../data/homeData';

interface HomeContentProps {
  lang: 'en' | 'ko';
}

export default function HomeContent({ lang }: HomeContentProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
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

      {/* Home content */}
      <div className={styles.home}>
        <DomeGallery />
        <div className={styles.banner}>
          <div className={styles.mainBanner}>
            Main Banner
          </div>
          <div className={styles.subBanner}>
            Sub Banner 1
          </div>
          <div className={styles.subBanner}>
            Sub Banner 2
          </div>
          <div className={styles.subBanner}>
            Sub Banner 3
          </div>
        </div>
      </div>

      <div className={styles.testimonialWrapper}>
        <button className={styles.prevBtn} onClick={prevSlide}>‹</button>

        <div className={styles.testimonialSlider} ref={sliderRef}>
          {reviews.map((r, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.header}>
                <span className={styles.name}>{r.name}</span>
                <span className={styles.grade}>{r.grade}</span>
              </div>
              <div className={styles.university}>{r.university}</div>
              <div className={styles.text}>{r.text}</div>
              <div className={styles.rating}>
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
            </div>
          ))}
        </div>

        <button className={styles.nextBtn} onClick={nextSlide}>›</button>
      </div>
    </div>
  );
}
