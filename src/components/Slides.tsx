'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './Slides.module.css'

type Props = {
    year: number
    images: string[]
}

export default function Slides({ year, images }: Props) {
    const [index, setIndex] = useState(0)

    const prevIndex = (index - 1 + images.length) % images.length
    const nextIndex = (index + 1) % images.length

    return (
        <section className={styles.section}>
            <h2>{year}</h2>

            <div className={styles.carousel}>
                {/* left */}
                <div className={`${styles.side} ${styles.left}`}>
                    <Image
                        src={images[prevIndex]}
                        alt="previous"
                        fill
                        className={styles.blur}
                    />
                </div>

                {/* center */}
                <div className={styles.center}>
                    <Image
                        src={images[index]}
                        alt="current"
                        fill
                        className={styles.main}
                    />
                </div>

                {/* right */}
                <div className={`${styles.side} ${styles.right}`}>
                    <Image
                        src={images[nextIndex]}
                        alt="next"
                        fill
                        className={styles.blur}
                    />
                </div>
            </div>

            <div className={styles.counter}>
                {index + 1} / {images.length}
            </div>

            <div className={styles.controls}>
                <button onClick={() => setIndex(prevIndex)}>‹</button>
                <button onClick={() => setIndex(nextIndex)}>›</button>
            </div>
        </section>
    )
}
