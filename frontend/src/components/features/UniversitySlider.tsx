'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './UniversitySlider.module.css';
import { universityLogos } from '../../data/homeData';

interface UniversitySliderProps {
  lang: 'en' | 'ko';
}

export default function UniversitySlider({ lang }: UniversitySliderProps) {
  const title = lang === 'en' ? 'Our students are accepted to:' : '합격 대학 리스트:';

  // 무한 루프를 위해 원본 배열을 2번 이어붙임
  const logos = [...universityLogos, ...universityLogos];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    let lastTimestamp: number | null = null;
    let offsetX = 0;

    const speed = 60; // px per second (원하는 속도로 조정 가능)

    const step = (timestamp: number) => {
      if (isPaused) {
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const delta = (timestamp - lastTimestamp) / 1000; // seconds
      lastTimestamp = timestamp;

      // 왼쪽으로 이동 (음수 방향)
      offsetX -= speed * delta;

      const singleSetWidth = track.scrollWidth / 2;

      // 절반(한 세트) 이상 이동하면 0으로 리셋해서 끊김 없이 반복
      if (-offsetX >= singleSetWidth) {
        offsetX += singleSetWidth;
      }

      track.style.transform = `translateX(${offsetX}px)`;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <div
      className={styles.sliderContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.sliderViewport}>
        <div className={styles.sliderTrack} ref={trackRef}>
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
    </div>
  );
}
