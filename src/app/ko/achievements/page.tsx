import Slides from '@/components/Slides'
import styles from './page.module.css'

export default function AchievementPage() {
    return (
        <main className={styles.container}>
            <div>
                <h2>2025</h2>
                <Slides />
            </div>

            <div>
                <h2>2024</h2>
                <Slides />
            </div>

            <div>
                <h2>2023</h2>
                <Slides />
            </div>

        </main>   
    )
}