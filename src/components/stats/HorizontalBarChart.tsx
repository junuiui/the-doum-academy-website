import styles from './stats.module.css'

type Props = {
    title: string
    data: { label: string; value: number }[]
}

export default function HorizontalBarChart({ title, data }: Props) {
    const max = Math.max(...data.map(d => d.value), 1)

    return (
        <div className={styles.chart}>
            <h3 className={styles.chartTitle}>{title}</h3>

            {data.map(d => (
                <div key={d.label} className={styles.row}>
                    <div className={styles.label}>{d.label}</div>

                    <div className={styles.barBg}>
                        <div
                            className={styles.bar}
                            style={{ width: `${(d.value / max) * 100}%` }}
                        />
                    </div>

                    <div className={styles.value}>{d.value}</div>
                </div>
            ))}
        </div>
    )
}
