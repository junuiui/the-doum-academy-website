'use client'

import Slides from '@/components/features/Slides'
import styles from './page.module.css'
import rawData from '@/data/achievement.json'
import StatsSection from '@/components/stats/StatsSections'
import { useState } from 'react'

const images: Record<number, string[]> = {
    2025: [
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
    ],
    2024: [
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
    ],
    2023: [
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
        '/achievements/example1.png',
        '/achievements/example2.png',
        '/achievements/example3.png',
        '/achievements/example4.png',
        '/achievements/example5.png',
        '/achievements/example6.png',
    ],
}

const ALL = 'ALL' as const
type YearFilter = number | typeof ALL

const years: YearFilter[] = [
    ALL,
    ...Object.keys(images).map(Number).sort((a, b) => b - a),
]



export default function AchievementPage() {

    const [selectedYear, setSelectedYear] = useState<YearFilter>(years[0])

    const slidesImages =
        selectedYear === 'ALL'
            ? Object.values(images).flat()
            : images[selectedYear] || []

    return (
        <main className={styles.pageContainer}>
            <div className={styles.achievementCard}>
                {/* Main Header */}
                <div className={styles.mainHeader}>
                    <h2>Student Achievements</h2>
                    <p>Our Students' Success Stories</p>
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
                    )

                    )}
                </div>

                {/* Content */}
                <div className={styles.grid}>
                    {/* Slides */}
                    <div>
                        <Slides title={selectedYear} images={slidesImages} />
                    </div>

                    <div>
                        <StatsSection rawData={rawData} />
                    </div>
                </div>
            </div>
        </main>
    )
}


/**
 * 
 * TODO:
 *  1. Add summary
 */