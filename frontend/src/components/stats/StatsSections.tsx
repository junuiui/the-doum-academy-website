'use client'

import { usePathname } from 'next/navigation'

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
  RecordItem,
  sortBy
} from '../../utils/data'
import ScholarshipList from './ScholarshipList'

type Props = {
  rawData: RecordItem[]
  year: string
}

export default function StatsSection({ rawData, year }: Props) {
  const pathname = usePathname()
  const isKo = pathname.startsWith('/ko')
  const lang = isKo ? 'ko' : 'en'

  const data = cleanData(rawData, year)

  const schoolData = countBySchool(data)
  const schoolDataAsc = sortBy(schoolData, 'value', 'desc')

  const scholarshipData = scholarshipBySchool(data)
  const scholarshipDataName = scholarshipByName(data);

  const totalScholarship = scholarshipData.reduce((a, b) => a + b.value, 0)
  console.log(scholarshipData)
  const scholarshipCount = data.filter(d => d['Scholarship Amount'] > 0).length

  return (
    <section className={styles.container}>
      <SummaryCards
        totalOffers={data.length}
        scholarshipCount={scholarshipCount}
        totalScholarship={totalScholarship}
      />

      <HorizontalBarChart
        title={lang === 'ko' ? "대학별 진학 현황" : "University Breakdown"}
        data={schoolDataAsc}
        colors={schoolColors}
      />

      <ScholarshipList
        title={lang === 'ko' ? '대학별 장학금 규모' : "Scholarship Amount by University"}
        scholarships={scholarshipDataName}

      />
    </section>
  )
}
