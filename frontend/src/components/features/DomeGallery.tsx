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
  'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  
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
