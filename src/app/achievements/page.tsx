'use client'

import Slides from '@/components/Slides'
import styles from './page.module.css'
import { useState } from 'react'

export default function AchievementPage() {

    return (
        <main className={styles.container}>
            <h1>Achievements</h1>
            <Slides
                year={2025}
                images={[
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
                    '/achievements/example1.png',
                    '/achievements/example2.png',
                    '/achievements/example3.png',
                    '/achievements/example4.png',
                    '/achievements/example5.png',
                    '/achievements/example6.png',
                ]}
            />

            <Slides
                year={2024}
                images={[
                    '/achievements/example1.png',
                    '/achievements/example2.png',
                    '/achievements/example3.png',
                    '/achievements/example4.png',
                    '/achievements/example5.png',
                    '/achievements/example6.png',
                ]}
            />

            <Slides
                year={2023}
                images={[
                    '/achievements/example1.png',
                    '/achievements/example2.png',
                    '/achievements/example3.png',
                    '/achievements/example4.png',
                    '/achievements/example5.png',
                    '/achievements/example6.png',
                ]}
            />

        </main>
    )
}
