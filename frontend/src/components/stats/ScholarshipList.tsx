import { TbCurrencyDollarCanadian } from "react-icons/tb";
import styles from './ScholarshipList.module.css'

// ScholarshipList.tsx
type ScholarshipItem = {
    Name: string;
    Year: number;
    School: string;
    ScholarshipName: string;
    ScholarshipAmount: number;
}

type Props = {
    title: string;
    scholarships: ScholarshipItem[];
}

export default function ScholarshipList({ title, scholarships }: Props) {
    return (
        <div className={styles.container}>

            {/* Header */}
            <h2>{title}</h2>
            
            {/* Scholarship cards */}
            <div className={styles.listContainer}>
                {scholarships.map((scholarship, index) => (
                    <div key={index} className={styles.listItem}>
                        <div className={styles.info}>
                            <p className={styles.name}>{scholarship.Name.split(' ')[0][0]}. {scholarship.Name.split(' ')[1]}</p>
                            <p className={styles.university}>{scholarship.School}</p>
                        </div>
                        <div className={styles.amount}>${scholarship.ScholarshipAmount}</div>
                    </div>
                ))}

                {scholarships.length === 0 && (
                    <div className={styles.empty}>
                        <TbCurrencyDollarCanadian size={32} className={styles.emptyIcon} />
                        <p>No scholarship data available</p>
                    </div>
                )}
            </div>
        </div>
    )
}
