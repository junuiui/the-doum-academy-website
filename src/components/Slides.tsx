
'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Slides.module.css'

type Props = {
    year: number
    images: string[]
}

export default function Slides({ year, images }: Props) {
    const [index, setIndex] = useState(0)

    const prev = () =>
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))

    const next = () =>
        setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))

    return (
        <section className={styles.section}>
            <h2>{year}</h2>

            <div className={styles.slider}>
                <button onClick={prev}>&lt;</button>

                <div className={styles.imageWrapper}>
                    <Image
                        src={images[index]}
                        alt={`${images[index]} acceptance letter`}
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <button onClick={next}>&gt;</button>
            </div>
        </section>
    )
}