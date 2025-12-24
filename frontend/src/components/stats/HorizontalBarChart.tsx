import styles from './HorizontalBarChart.module.css'


type Props = {
    title: string;
    data: { label: string; value: number }[];
    colors: Record<string, string>
}

export default function HorizontalBarChart({ title, data, colors }: Props) {
    // value가 0인 항목 제거
    const filteredData = data.filter(d => d.value > 0)
    const max = Math.max(...filteredData.map(d => d.value), 1)

    return (
        <div className={styles.chart}>
            <h2>{title}</h2>

            {filteredData.map(d => {
                const color = colors[d.label] ?? '#374151'

                return (
                    <div key={d.label} className={styles.row}>
                        <div className={styles.rowHeader}>
                            <span className={styles.label}>{d.label}</span>
                            <span className={styles.value}>{d.value}</span>
                        </div>

                        <div className={styles.barBg}>
                            <div
                                className={styles.bar}
                                style={{
                                    width: `${(d.value / max) * 100}%`,
                                    backgroundColor: color,
                                }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
