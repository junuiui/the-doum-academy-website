'use client';

import { useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSprings, animated } from '@react-spring/web';
import styles from './DomeGallery.module.css';

type DomeGalleryProps = {
  images?: string[];
  radius?: number;
};

const DEFAULT_IMAGES = [
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
];

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  radius = 420,
}: DomeGalleryProps) {
  const domRef = useRef<HTMLDivElement>(null);

  const [springs, api] = useSprings(images.length, i => ({
    rotateY: (360 / images.length) * i,
    config: { tension: 120, friction: 20 },
  }));

  useGesture(
    {
      onDrag: ({ movement: [mx] }) => {
        api.start(i => ({
          rotateY: (360 / images.length) * i + mx / 3,
        }));
      },
    },
    {
      target: domRef,
      eventOptions: { passive: false },
    }
  );

  return (
    <section className={styles.wrapper}>
      <div ref={domRef} className={styles.scene}>
        {springs.map((style, i) => (
          <animated.div
            key={i}
            className={styles.card}
            style={{
              transform: style.rotateY.to(
                r =>
                  `translate(-50%, -50%) rotateY(${r}deg) translateZ(${radius}px)`
              ),
            }}
          >
            <img
              src={images[i]}
              className={styles.image}
              draggable={false}
              alt=""
            />
          </animated.div>
        ))}
      </div>
    </section>
  );
}
