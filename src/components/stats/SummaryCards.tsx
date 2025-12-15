import styles from './stats.module.css'

type Props = {
    totalOffers: number
    totalScholarship: number
    scholarshipCount: number
}

export default function SummaryCards({
    totalOffers,
    totalScholarship,
    scholarshipCount
}: Props) {
    return (
        <div className={styles.summary}>
            <Card title="Total Offers" value={totalOffers} />
            <Card title="Scholarships" value={scholarshipCount} />
            <Card
                title="Total Amount"
                value={`$${totalScholarship.toLocaleString()}`}
            />
        </div>
    )
}

function Card({ title, value }: { title: string; value: string | number }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardValue}>{value}</div>
        </div>
    )
}
