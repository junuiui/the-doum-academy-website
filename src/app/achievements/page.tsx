'use client'

import Slides from '@/components/Slides'
import styles from './page.module.css'
import { useState } from 'react'

type YearFilter = 'ALL' | '2025' | '2024' | '2023'

export default function AchievementPage() {
    const [selectedYear, setSelectedYear] = useState<YearFilter>('2025')

    function handleClick(year: YearFilter) {
        setSelectedYear(year)
    }

    return (
        <main className={styles.container}>
            <div className={styles.buttons}>
                <button
                    className={selectedYear === 'ALL' ? styles.active : ''}
                    onClick={() => handleClick('ALL')}
                >
                    ALL
                </button>

                <button
                    className={selectedYear === '2025' ? styles.active : ''}
                    onClick={() => handleClick('2025')}
                >
                    2025
                </button>

                <button
                    className={selectedYear === '2024' ? styles.active : ''}
                    onClick={() => handleClick('2024')}
                >
                    2024
                </button>

                <button
                    className={selectedYear === '2023' ? styles.active : ''}
                    onClick={() => handleClick('2023')}
                >
                    2023
                </button>
            </div>

            {(selectedYear === 'ALL' || selectedYear === '2025') && (
                <Slides
                    year={2025}
                    images={[
                        '/achievements/example1.png',
                        '/achievements/example2.png',
                    ]}
                />
            )}

            {(selectedYear === 'ALL' || selectedYear === '2024') && (
                <Slides
                    year={2024}
                    images={[
                        '/acceptance/2024/a1.jpg',
                        '/acceptance/2024/a2.png',
                    ]}
                />
            )}

            {(selectedYear === 'ALL' || selectedYear === '2023') && (
                <Slides
                    year={2023}
                    images={[
                        '/acceptance/2023/a1.jpg',
                        '/acceptance/2023/a2.png',
                    ]}
                />
            )}
        </main>
    )
}
