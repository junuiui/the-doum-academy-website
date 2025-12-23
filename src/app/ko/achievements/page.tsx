'use client'

import { useState } from 'react'

import styles from './page.module.css'
import rawData from '@/data/achievement.json'
import StatsSection from '@/components/stats/StatsSections'
import { Slide } from '@/components/features/Slide'
import { Lightbox } from '@/components/features/Lighbox'

import { GalleryImageInterface } from '@/interface/GalleryImage.interface'

const images: Record<number, GalleryImageInterface[]> = {
    2025: [
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
    ],
    2024: [
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
    ],
    2023: [
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
        { url: '/achievements/example1.png', alt: 'Achievement 1', caption: 'Caption 1' },
        { url: '/achievements/example2.png', alt: 'Achievement 2', caption: 'Caption 2' },
        { url: '/achievements/example3.png', alt: 'Achievement 3', caption: 'Caption 3' },
        { url: '/achievements/example4.png', alt: 'Achievement 4', caption: 'Caption 4' },
        { url: '/achievements/example5.png', alt: 'Achievement 5', caption: 'Caption 5' },
        { url: '/achievements/example6.png', alt: 'Achievement 6', caption: 'Caption 6' },
    ],
};

const ALL = 'ALL' as const
type YearFilter = number | typeof ALL

const years: YearFilter[] = [
    ALL,
    ...Object.keys(images).map(Number).sort((a, b) => b - a),
]

export default function AchievementPage() {

    const [selectedYear, setSelectedYear] = useState<YearFilter>(years[0])
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const slidesImages: GalleryImageInterface[] =
        selectedYear === 'ALL'
            ? Object.values(images).flat()
            : images[selectedYear] || []

    const handleImageClick = (image: GalleryImageInterface) => {
        const imageIndex = slidesImages.findIndex(
            (img) => img.url === image.url && img.caption === image.caption
        )
        setLightboxIndex(imageIndex >= 0 ? imageIndex : 0)
        setLightboxOpen(true)
    }

    const handleNextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % slidesImages.length)
    }

    const handlePreviousImage = () => {
        setLightboxIndex((prev) =>
            prev === 0 ? slidesImages.length - 1 : prev - 1
        )
    }

    return (
        <main className={styles.pageContainer}>
            <div className={styles.achievementCard}>
                {/* Main Header */}
                <div className={styles.mainHeader}>
                    <h2> 학생들의 성과</h2>
                    <p>우리 학생들의 노력으로 이루어진 성과를 소개합니다</p>
                </div>

                {/* Year Tabs */}
                <div className={styles.yearTabs}>
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={selectedYear === year ? styles.active : ''}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className={styles.grid}>
                    {/* Slides */}
                    <div>
                        <Slide
                            data={{
                                name: selectedYear === 'ALL' ? 'All Achievements' : `${selectedYear} Achievements`,
                                images: slidesImages,
                            }}
                            onImageClick={handleImageClick}
                            row={4}
                            col={4}
                        />
                    </div>

                    {/* Stats Section */}
                    <div>
                        <StatsSection rawData={rawData} />
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {
                lightboxOpen && (
                    <Lightbox
                        images={slidesImages}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxOpen(false)}
                        onNext={handleNextImage}
                        onPrevious={handlePreviousImage}
                    />
                )
            }
        </main >
    )
}