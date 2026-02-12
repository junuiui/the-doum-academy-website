'use client';

import styles from './UniversitySlider.module.css';
import { universityLogos } from '../../data/homeData';

interface UniversitySliderProps {
    lang: 'en' | 'ko';
}

export default function UniversitySlider({ lang }: UniversitySliderProps) {
    const title = lang === 'en' ? 'Our students are accepted to:' : '합격 대학 리스트:';

    // Duplicate key logos to ensure smooth infinite scroll
    const logos = [...universityLogos, ...universityLogos, ...universityLogos];

    return (
        <div className={styles.sliderContainer}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.sliderTrack}>
                {logos.map((univ, index) => (
                    <div key={`${univ.name}-${index}`} className={styles.logoItem}>
                        <img
                            src={univ.logo}
                            alt={univ.name}
                            className={styles.logoImage}
                            onError={(e) => {
                                // Fallback if logo fails to load
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = univ.name;
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
