'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import styles from './Slides.module.css'

type Props = {
    title: number
    images: string[]
}

export default function Slides({ title, images }: Props) {
    const ROWS = 4
    const COLS = 5
    const PER_PAGE = ROWS * COLS

    const [page, setPage] = useState(0)
    const [modalIndex, setModalIndex] = useState<number | null>(null)

    const totalPages = Math.ceil(images.length / PER_PAGE)
    const start = page * PER_PAGE
    const currentImages = images.slice(start, start + PER_PAGE)

    const isLastPageNotFull =
        page === totalPages - 1 && currentImages.length < PER_PAGE

    const openModal = (i: number) => setModalIndex(start + i)
    const closeModal = () => setModalIndex(null)

    const prevImage = () => {
        if (modalIndex !== null && modalIndex > 0) setModalIndex(modalIndex - 1)
    }

    const nextImage = () => {
        if (modalIndex !== null && modalIndex < images.length - 1) setModalIndex(modalIndex + 1)
    }

    // keyboard arrow
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (modalIndex === null) return
            if (e.key === 'ArrowLeft') prevImage()
            if (e.key === 'ArrowRight') nextImage()
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [modalIndex])

    // touch event
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX
        const delta = touchEndX.current - touchStartX.current
        if (delta > 50) prevImage()
        else if (delta < -50) nextImage()
    }

    return (
        <main className={styles.container}>
            <h2>{title}</h2>

            <div className={styles.grid}>
                {currentImages.map((src, i) => (
                    <div key={i} className={styles.item} onClick={() => openModal(i)}>
                        <Image src={src} alt={`photo-${i}`} fill sizes="200px" />
                    </div>
                ))}
            </div>
            
            {/* Slide button (dots) */}
            {totalPages > 1 && (
                <div
                    className={`${styles.dots} ${isLastPageNotFull ? styles.tightDots : ''}`}
                >
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === page ? styles.active : ''}`}
                            onClick={() => setPage(i)}
                        />
                    ))}
                </div>
            )}

            {/* When click, Modal appears */}
            {modalIndex !== null && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContentWrapper} onClick={e => e.stopPropagation()}>
                        {/* Prev Button */}
                        <button
                            className={`${styles.navButton} ${styles.left} ${modalIndex === 0 ? styles.disabled : ''}`}
                            onClick={prevImage}
                        >
                            ◀
                        </button>

                        {/* Main Image */}
                        <img src={images[modalIndex]} alt={`photo-modal-${modalIndex}`} />

                        {/* Next Button */}
                        <button
                            className={`${styles.navButton} ${styles.right} ${modalIndex === images.length - 1 ? styles.disabled : ''}`}
                            onClick={nextImage}
                        >
                            ▶
                        </button>

                        {/* Close Button */}
                        <button className={styles.closeButton} onClick={closeModal}>
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </main>
    )
}
