import { TbCurrencyDollarCanadian } from "react-icons/tb";
import styles from './ScholarshipList.module.css'

// type ScholarshipItem = {
//     name: string
//     university: string
//     amount: number
// }

// type Props = {
//     scholarships: ScholarshipItem[]
// }

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

export default function ScholarshipList({ scholarships }: Props) {
    console.log(scholarships)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Scholarships</h3>
            </div>

            <div className={styles.listContainer}>
                {scholarships.map((scholarship, index) => (
                    <div key={index} className={styles.listItem}>
                        <div className={styles.info}>
                            <p className={styles.name}>{scholarship.Name}</p>
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
