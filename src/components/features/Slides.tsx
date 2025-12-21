'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import styles from './Slides.module.css'

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

type Props = {
    title: number | 'ALL'
    images: string[]
}

const ROWS = 3
const COLS = 4
const PER_PAGE = ROWS * COLS

export default function Slides({ title, images }: Props) {
    const [page, setPage] = useState(0)
    const [modalIndex, setModalIndex] = useState<number | null>(null)

    useEffect(() => {
        setPage(0)
        setModalIndex(null)
    }, [images])

    const totalPages = Math.ceil(images.length / PER_PAGE)
    const start = page * PER_PAGE
    const currentImages = images.slice(start, start + PER_PAGE)

    const isLastPageNotFull = page === totalPages - 1 && currentImages.length < PER_PAGE

    const openModal = (i: number) => setModalIndex(start + i)
    const closeModal = () => setModalIndex(null)
    const prevImage = () => modalIndex !== null && modalIndex > 0 && setModalIndex(modalIndex - 1)
    const nextImage = () => modalIndex !== null && modalIndex < images.length - 1 && setModalIndex(modalIndex + 1)

    // keyboard navigation
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

    // touch navigation
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
        <section className={styles.container}>
            <h2>Acceptance Letters - {title}</h2>

            {/* Grid */}
            <div className={styles.grid}>
                {currentImages.map((src, i) => (
                    <div key={i} className={styles.item} onClick={() => openModal(i)}>
                        <Image src={src} alt={`photo-${i}`} fill sizes="200px" />
                    </div>
                ))}
            </div>

            {/* Pagination with arrows */}
            {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                    {/* Left Arrow */}
                    <button
                        className={styles.paginationArrow}
                        onClick={() => setPage(Math.max(page - 1, 0))}
                        disabled={page === 0}
                    >
                        <IoIosArrowBack size={40} />
                    </button>

                    {/* Dots */}
                    <div className={styles.paginationDots}>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                className={`${styles.paginationDot} ${i === page ? styles.paginationDotActive : ''}`}
                                onClick={() => setPage(i)}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        className={styles.paginationArrow}
                        onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
                        disabled={page === totalPages - 1}
                    >
                        <IoIosArrowForward size={40} />
                    </button>
                </div>

            )
            }

            {/* Modal */}
            {
                modalIndex !== null && (
                    <div
                        className={styles.modalOverlay}
                        onClick={closeModal}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className={styles.modalContentWrapper} onClick={e => e.stopPropagation()}>
                            
                            {/* Left Arrow */}
                            <button
                                className={`${styles.navButton} ${styles.left} ${modalIndex === 0 ? styles.disabled : ''}`}
                                onClick={prevImage}
                            >
                                <IoIosArrowBack size={40} />
                            </button>

                            <img src={images[modalIndex]} alt={`photo-modal-${modalIndex}`} />

                            {/* Right Arrow */}
                            <button
                                className={`${styles.navButton} ${styles.right} ${modalIndex === images.length - 1 ? styles.disabled : ''}`}
                                onClick={nextImage}
                            >
                                <IoIosArrowForward size={40} />
                            </button>

                            {/* Close Button */}
                            <button className={styles.closeButton} onClick={closeModal}>
                                <IoIosClose size={40} />
                            </button>
                        </div>
                    </div>
                )
            }
        </section >
    )
}
