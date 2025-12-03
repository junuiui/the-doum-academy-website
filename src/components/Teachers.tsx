// src/app/teachers/page.tsx

import data from '@/data/teachers.json'
import styles from './Teachers.module.css'

export default function TeachersPage() {
    return (
        <div>
            <h1 className={styles.title}>Teachers</h1>

            {/* Main Intro */}
            <section className={styles.section}>
                <h2 className={styles.mainTitle}>{data["main-title"].en}</h2>
                <p className={styles.mainBody}>{data["main-body"].en}</p>
            </section>

            {/* Directors */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Directors</h2>

                <div className={styles.grid}>
                    {data.director.map((d) => (
                        <div key={d.id} className={styles.card}>

                            {/* Image */}
                            <img
                                src={d.profileImage || '/placeholder.png'}
                                alt={d.name.en}
                                className={styles.profileImage}
                            />

                            {/* Text Content */}
                            <div className={styles.cardContent}>
                                <h3 className={styles.name}>{d.name.en}</h3>
                                <p className={styles.bio}>{d.bio.en}</p>

                                <div className={styles.subSection}>
                                    <strong>Education:</strong>
                                    <p>{d.education.en}</p>
                                </div>

                                <div className={styles.subSection}>
                                    <strong>Subjects:</strong>
                                    <ul>
                                        {d.subject.en.map((s, index) => (
                                            <li key={index}>{s}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.subSection}>
                                    <strong>Experience:</strong>
                                    <ul>
                                        {d.experience.en.map((exp, i) => (
                                            <li key={i}>{exp}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.subSection}>
                                    <strong>Certificates:</strong>
                                    <ul>
                                        {d.certificate.en.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={styles.subSection}>
                                    <strong>Achievements:</strong>
                                    <p>{d.achievements.en}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Instructors */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Instructors</h2>

                <div className={styles.grid}>
                    {data.instructors.map((ins) => (
                        <div key={ins.id} className={styles.card}>

                            {/* Image */}
                            <img
                                src={ins.profileImage || '/placeholder.png'}
                                alt={ins.name.en}
                                className={styles.profileImage}
                            />

                            {/* Text Content */}
                            <div className={styles.cardContent}>
                                <h3 className={styles.name}>{ins.name.en}</h3>

                                <div className={styles.subSection}>
                                    <strong>Education:</strong>
                                    <p>{ins.education.en}</p>
                                </div>

                                <div className={styles.subSection}>
                                    <strong>Core:</strong>
                                    <p>{ins.core.en}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
