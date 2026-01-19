'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import styles from './Teachers.module.css'

// types
type LangText = { en: string; ko: string }
type LangArray = { en: string[]; ko: string[] }

type Director = {
  id: number
  role: 'director'
  name: LangText
  education: LangText
  experience: LangArray
  bio: LangText
  profileImage: string | null
  certificate: LangArray
  achievements: LangText
  subject: LangArray
  core?: LangText
}

type Instructor = {
  id: number
  role: 'instructor'
  name: LangText
  education: LangText
  core: LangText
  profileImage: string | null
  bio?: LangText
  certificate?: LangArray
  achievements?: LangText
  subject?: LangArray
  experience?: LangArray
}

type TeachersResponse = {
  director: Director[]
  instructors: Instructor[]
}

// Static main text
const teachersText = {
  "main-title": {
    en: "Top-Tier Expert Faculty (10 Experts)",
    ko: "최고 수준의 강사진 (10 Experts)"
  },
  "main-body": {
    en: "Our academy is guided by a team of 10 highly experienced instructors, all graduates or current students of top Canadian universities. Each member of our faculty is a proven educational expert, dedicated to maximizing every student's potential and guiding them to successful university admissions.",
    ko: "저희 학원은 캐나다 명문대 출신 및 재학생으로 구성된 총 10명의 전문 강사진이 지도합니다. 모든 강사진은 학생 개개인의 잠재력을 극대화하고 성공적인 대학 진학을 이끌어 온 검증된 교육 전문가들입니다"
  }
}

export default function TeachersPage() {
  const [data, setData] = useState<TeachersResponse>({
    director: [],
    instructors: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);

  const pathname = usePathname()
  const isKo = pathname.startsWith('/ko')
  const lang = isKo ? 'ko' : 'en'

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true)
        setError(false);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teachers`)

        if (!res.ok) {
          throw new Error('Server error');
        }
        const data = await res.json()

        // sanitize data: optional fields & arrays
        const directors: Director[] = data
          .filter((t: any) => t.role === 'director')
          .map((t: any) => ({
            id: t.id,
            role: t.role,
            name: t.name,
            education: t.education,
            experience: t.experience || { en: [], ko: [] },
            bio: t.bio || { en: '', ko: '' },
            profileImage: t.profileImage || null,
            certificate: t.certificate || { en: [], ko: [] },
            achievements: t.achievements || { en: '', ko: '' },
            subject: t.subject || { en: [], ko: [] },
            core: t.core || { en: '', ko: '' },
          }))

        const instructors: Instructor[] = data
          .filter((t: any) => t.role === 'instructor')
          .map((t: any) => ({
            id: t.id,
            role: t.role,
            name: t.name,
            education: t.education,
            core: t.core || { en: '', ko: '' },
            profileImage: t.profileImage || null,
            bio: t.bio || { en: '', ko: '' },
            certificate: t.certificate || { en: '', ko: '' },
            achievements: t.achievements || { en: '', ko: '' },
            subject: t.subject || { en: [], ko: [] },
            experience: t.experience || { en: [], ko: [] },
          }))

        setData({ director: directors, instructors: instructors })
      } catch (err) {
        console.error('Failed to fetch teachers', err);
        setError(true);
        setData({ director: [], instructors: [] });
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Failed to load teachers.</div>
  }

  if (!data) return <div>No teachers found</div>

  return (
    <div className={styles.container}>
      <div className={styles.teacherCard}>
        <div className={styles.teacherHeader}>
          <h2 className={styles.title}>
            {lang === 'ko' ? '선생님 소개' : 'Our Teachers'}
          </h2>

          {/* Main Intro */}
          <div className={styles.main}>
            <h3 className={styles.mainTitle}>{teachersText['main-title'][lang]}</h3>
            <p className={styles.mainBody}>{teachersText['main-body'][lang]}</p>
          </div>
        </div>

        {/* Directors */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{lang === 'ko' ? '원장 소개' : 'Directors'}</h3>
          <div className={styles.grid}>
            {data.director.map((d) => (
              <div key={d.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={d.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
                    alt={d.name[lang]}
                    className={styles.profileImage}
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.name}>{d.name[lang]}</h3>
                  {d.bio?.[lang] && <p className={styles.bio}>{d.bio[lang]}</p>}

                  <div className={styles.subSection}>
                    <strong>{lang === 'ko' ? '학력' : 'Education'}</strong>
                    <p>{d.education[lang]}</p>
                  </div>

                  <div className={styles.subSection}>
                    <strong>{lang === 'ko' ? '과목' : 'Subjects'}</strong>
                    <ul>{Array.isArray(d.subject[lang]) && d.subject[lang].map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </div>

                  <div className={styles.subSection}>
                    <strong>{lang === 'ko' ? '경력' : 'Experience'}</strong>
                    <ul>{Array.isArray(d.experience[lang]) && d.experience[lang].map((exp, i) => <li key={i}>{exp}</li>)}</ul>
                  </div>

                  <div className={styles.subSection}>
                    <strong>{lang === 'ko' ? '자격증' : 'Certificates'}</strong>
                    <ul>{Array.isArray(d.certificate[lang]) && d.certificate[lang].map((c, i) => <li key={i}>{c}</li>)}</ul>
                  </div>

                  <div className={styles.subSection}>
                    <strong>{lang === 'ko' ? '성과' : 'Achievements'}</strong>
                    <p>{d.achievements[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instructors */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>{lang === 'ko' ? '강사 소개' : 'Instructors'}</h3>
          <div className={styles.instructorGrid}>
            {data.instructors.map((ins) => (
              <div key={ins.id} className={styles.instructorCard}>
                <div className={styles.instructorImageContainer}>
                  <img
                    src={ins.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'}
                    alt={ins.name[lang]}
                    className={styles.instructorImage}
                  />
                </div>

                <div className={styles.instructorContent}>
                  <h3 className={styles.instructorName}>{ins.name[lang]}</h3>
                  <div className={styles.instructorInfo}>
                    <strong>{lang === 'ko' ? '학력' : 'Education'}</strong>
                    <p>{ins.education[lang]}</p>
                  </div>
                  <div className={styles.instructorInfo}>
                    <strong>{lang === 'ko' ? '전문 분야' : 'Core'}</strong>
                    <p>{ins.core?.[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
