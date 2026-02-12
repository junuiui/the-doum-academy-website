'use client';

import styles from './UniversitySlider.module.css';
import { universityLogos } from '../../data/homeData';

interface UniversitySliderProps {
  lang: 'en' | 'ko';
}

export default function UniversitySlider({ lang }: UniversitySliderProps) {
  const title = lang === 'en' ? 'Our students are accepted to:' : '합격 대학 리스트:';

  // 로고 배열을 2번만 복제하고, CSS 애니메이션으로 전체 폭의 50%(-50%)를 이동시키는 패턴으로
  // 첫 번째 세트 → 두 번째 세트 → 다시 첫 번째 세트가 자연스럽게 이어지도록 구성합니다.
  const logos = [...universityLogos, ...universityLogos];

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
