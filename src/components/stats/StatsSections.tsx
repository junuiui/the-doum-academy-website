import HorizontalBarChart from './HorizontalBarChart'
import SummaryCards from './SummaryCards'
import {
    cleanData,
    countBySchool,
    countByMajorCategory,
    scholarshipBySchool,
    RecordItem
} from './data'

type Props = {
    rawData: RecordItem[]
}

export default function StatsSection({ rawData }: Props) {
    const data = cleanData(rawData)

    const schoolData = countBySchool(data)
    const majorData = countByMajorCategory(data)
    const scholarshipData = scholarshipBySchool(data)

    const totalScholarship = scholarshipData.reduce((a, b) => a + b.value, 0)
    const scholarshipCount = data.filter(d => typeof d['Scholarship Amount'] === 'number').length

    return (
        <section>
            <SummaryCards
                totalOffers={data.length}
                scholarshipCount={scholarshipCount}
                totalScholarship={totalScholarship}
            />

            <HorizontalBarChart
                title="Offers by University"
                data={schoolData}
            />

            <HorizontalBarChart
                title="Offers by Major Category"
                data={majorData}
            />

            <HorizontalBarChart
                title="Scholarship Amount by University"
                data={scholarshipData}
            />
        </section>
    )
}
