import HorizontalBarChart from './HorizontalBarChart'
import SummaryCards from './SummaryCards'
import styles from './StatsSection.module.css'

import schoolColors from '../../data/schoolColor.json'

import {
    cleanData,
    countBySchool,
    countByMajorCategory,
    scholarshipBySchool,
    scholarshipByName,
    RecordItem
} from './data'
import ScholarshipList from './ScholarshipList'

type Props = {
    rawData: RecordItem[]
}

export default function StatsSection({ rawData }: Props) {
    const data = cleanData(rawData)

    const schoolData = countBySchool(data)
    // const majorData = countByMajorCategory(data)
    const scholarshipData = scholarshipBySchool(data)
    const scholarshipDataName = scholarshipByName(data);

    const totalScholarship = scholarshipData.reduce((a, b) => a + b.value, 0)
    const scholarshipCount = data.filter(d => d['Scholarship Amount'] > 0).length
    console.log(scholarshipDataName)

    return (
        <section className={styles.container}>
            <SummaryCards
                totalOffers={data.length}
                scholarshipCount={scholarshipCount}
                totalScholarship={totalScholarship}
            />

            <HorizontalBarChart
                title="University Breakdown"
                data={schoolData}
                colors={schoolColors}
            />

            {/* 
            <HorizontalBarChart
                title="Offers by Major Category"
                data={majorData}
                colors={departmentColors}
            /> */}

            <ScholarshipList
                title="Scholarship Amount by University"
                scholarships={scholarshipDataName}
                
            />
        </section>
    )
}
