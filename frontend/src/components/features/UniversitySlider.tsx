'use client';

import styles from './UniversitySlider.module.css';
import { universityLogos } from '../../data/homeData';

interface UniversitySliderProps {
  lang: 'en' | 'ko';
}

export default function UniversitySlider({ lang }: UniversitySliderProps) {
  const title = lang === 'en' ? 'Our students are accepted to:' : '합격 대학 리스트:';

  // Duplicate key logos enough times to ensure smooth infinite scroll
  // The animation duration and keyframes will need to match the total width
  const logos = [...universityLogos, ...universityLogos, ...universityLogos, ...universityLogos];

  return (
    <div className={styles.sliderContainer}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.sliderTrack}>
        {logos.map((univ, index) => (
          <div key={`${univ.name}-${index}`} className={styles.logoItem}>
            <a href={univ.url} target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
              <img
                src={univ.logo}
                alt={univ.name}
                className={styles.logoImage}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerText = univ.name;
                }}
              />
              <span className={styles.abbreviation}>{univ.abbreviation}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
