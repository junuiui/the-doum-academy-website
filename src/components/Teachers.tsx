'use client'

// src/app/teachers/page.tsx

import data from '@/data/teachers.json'
import styles from './Teachers.module.css'
import { usePathname } from 'next/navigation'

export default function TeachersPage() {
    const pathname = usePathname()
    const isKo = pathname.startsWith('/ko')
    const lang = isKo ? 'ko' : 'en'

    return (
        <div className={styles.container}>
            <div className={styles.teacherCard}>
                <div className={styles.teacherHeader}>
                    <h2 className={styles.title}>
                        {lang === 'ko' ? '선생님 소개' : 'Our Teachers'}
                    </h2>

                    {/* Main Intro */}
                    <div className={styles.main}>
                        <h3 className={styles.mainTitle}>
                            {data['main-title'][lang]}
                        </h3>
                        <p className={styles.mainBody}>
                            {data['main-body'][lang]}
                        </p>
                    </div>
                </div>


                {/* Directors */}
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                        {lang === 'ko' ? '원장 소개' : 'Directors'}
                    </h3>

                    <div className={styles.grid}>
                        {data.director.map((d) => (
                            <div key={d.id} className={styles.card}>
                                {/* Image */}
                                <div className={styles.imageContainer}>
                                    <img
                                        src={d.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
                                        alt={d.name[lang]}
                                        className={styles.profileImage}
                                    />
                                </div>

                                {/* Text Content */}
                                <div className={styles.cardContent}>
                                    <h3 className={styles.name}>
                                        {d.name[lang]}
                                    </h3>

                                    {d.bio?.[lang] && (
                                        <p className={styles.bio}>
                                            {d.bio[lang]}
                                        </p>
                                    )}

                                    <div className={styles.subSection}>
                                        <strong>
                                            {lang === 'ko' ? '학력' : 'Education'}
                                        </strong>
                                        <p>{d.education[lang]}</p>
                                    </div>

                                    <div className={styles.subSection}>
                                        <strong>
                                            {lang === 'ko' ? '과목' : 'Subjects'}
                                        </strong>
                                        <ul>
                                            {d.subject[lang].map((s, index) => (
                                                <li key={index}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.subSection}>
                                        <strong>
                                            {lang === 'ko' ? '경력' : 'Experience'}
                                        </strong>
                                        <ul>
                                            {d.experience[lang].map((exp, i) => (
                                                <li key={i}>{exp}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.subSection}>
                                        <strong>
                                            {lang === 'ko' ? '자격증' : 'Certificates'}
                                        </strong>
                                        <ul>
                                            {d.certificate[lang].map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.subSection}>
                                        <strong>
                                            {lang === 'ko' ? '성과' : 'Achievements'}
                                        </strong>
                                        <p>{d.achievements[lang]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Instructors */}
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                        {lang === 'ko' ? '강사 소개' : 'Instructors'}
                    </h3>

                    <div className={styles.instructorGrid}>
                        {data.instructors.map((ins) => (
                            <div key={ins.id} className={styles.instructorCard}>
                                {/* Image */}
                                <div className={styles.instructorImageContainer}>
                                    <img
                                        src={ins.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'}
                                        alt={ins.name[lang]}
                                        className={styles.instructorImage}
                                    />
                                </div>

                                {/* Text Content */}
                                <div className={styles.instructorContent}>
                                    <h3 className={styles.instructorName}>
                                        {ins.name[lang]}
                                    </h3>

                                    <div className={styles.instructorInfo}>
                                        <strong>
                                            {lang === 'ko' ? '학력' : 'Education'}
                                        </strong>
                                        <p>{ins.education[lang]}</p>
                                    </div>

                                    <div className={styles.instructorInfo}>
                                        <strong>
                                            {lang === 'ko' ? '전문 분야' : 'Core'}
                                        </strong>
                                        <p>{ins.core[lang]}</p>
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
