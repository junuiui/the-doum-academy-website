"use client";

import styles from "./page.module.css";
import teachers from "@/data/teachers.json";
import { useLanguage } from "@/app/context/LanguageContext";

export default function TeachersComponent() {
    const { lang } = useLanguage();

    const owners = teachers.filter((t) => t.isOwner);
    const normalTeachers = teachers.filter((t) => !t.isOwner);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {lang === "en" ? "Our Teachers" : "선생님 소개"}
            </h1>

            {/* ===== OWNER SECTION ===== */}
            <h2 className={styles.sectionTitle}>
                {lang === "en" ? "Founders" : "설립자"}
            </h2>

            <div className={styles.ownerGrid}>
                {owners.map((t) => (
                    <div key={t.id} className={styles.ownerCard}>
                        <div className={styles.ownerImage}>
                            {t.profileImage ? (
                                <img src={t.profileImage} alt={t.name[lang]} />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        <div className={styles.ownerInfo}>
                            <h3 className={styles.teacherName}>{t.name[lang]}</h3>

                            <p className={styles.subject}>
                                {lang === "en" ? "Subject: " : "과목: "}
                                {t.subject[lang]}
                            </p>

                            <p className={styles.bio}>{t.bio[lang]}</p>

                            <p className={styles.education}>
                                <strong>{lang === "en" ? "Education" : "학력"}:</strong>{" "}
                                {t.education[lang]}
                            </p>

                            <div>
                                <p className={styles.subheading}>
                                    {lang === "en" ? "Experience" : "경력"}:
                                </p>
                                <ul>
                                    {t.experience[lang].map((exp: string, i: number) => (
                                        <li key={i}>{exp}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className={styles.subheading}>
                                    {lang === "en" ? "Achievements" : "성과"}:
                                </p>
                                <ul>
                                    {t.achievements[lang].map((ach: string, i: number) => (
                                        <li key={i}>{ach}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== NORMAL TEACHERS ===== */}
            <h2 className={styles.sectionTitle}>
                {lang === "en" ? "Our Instructors" : "강사진"}
            </h2>

            <div className={styles.normalList}>
                {normalTeachers.map((t) => (
                    <div key={t.id} className={styles.normalCard}>
                        <div className={styles.normalImage}>
                            {t.profileImage ? (
                                <img src={t.profileImage} alt={t.name[lang]} />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        <div>
                            <h3 className={styles.teacherName}>{t.name[lang]}</h3>

                            <p className={styles.subject}>
                                {lang === "en" ? "Subject: " : "과목: "}
                                {t.subject[lang]}
                            </p>

                            <p className={styles.bio}>{t.bio[lang]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
