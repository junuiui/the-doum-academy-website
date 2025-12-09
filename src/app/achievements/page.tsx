import Slides from '@/components/Slides'
import styles from './page.module.css'

export default function AchievementPage() {
    return (
        <main className={styles.container}>
            <div>
                <Slides
                    year={2025}
                    images={[
                        '/achievements/example1.png',
                        '/acceptance/2025/a2.png',
                    ]} />
            </div>

            <div>
                <Slides
                    year={2024}
                    images={[
                        '/acceptance/2025/a1.jpg',
                        '/acceptance/2025/a2.png',
                    ]} />
            </div>

            <div>
                <Slides
                    year={2023}
                    images={[
                        '/acceptance/2025/a1.jpg',
                        '/acceptance/2025/a2.png',
                    ]} />
            </div>

        </main>
    )
}