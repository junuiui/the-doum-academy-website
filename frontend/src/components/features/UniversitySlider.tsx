'use client';

import styles from './UniversitySlider.module.css';
import { universityLogos } from '../../data/homeData';

interface UniversitySliderProps {
    lang: 'en' | 'ko';
}

export default function UniversitySlider({ lang }: UniversitySliderProps) {
    const title = lang === 'en' ? 'Our students are accepted to:' : '합격 대학 리스트:';

    // Duplicate the list to create a seamless loop
    const logos = [...universityLogos, ...universityLogos];

    return (
        <div className={styles.sliderContainer}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.sliderTrack}>
                {logos.map((logo, index) => (
                    <div key={`${logo}-${index}`} className={styles.logoItem}>
                        {logo}
                    </div>
                ))}
            </div>
        </div>
    );
}
