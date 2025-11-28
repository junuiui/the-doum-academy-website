"use client";

import styles from "./page.module.css";
import data from "@/data/teachers.json";
import { useLanguage } from "@/app/context/LanguageContext";

export default function TeachersComponent() {
    const { lang } = useLanguage();

    const owners = data.director; // 설립자
    const normalTeachers = data.instructors; // 일반 강사

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
                            {t.profileImage ? <img src={t.profileImage} alt={t.name[lang]} /> : "No Image"}
                        </div>

                        <div className={styles.ownerInfo}>
                            <h3 className={styles.teacherName}>{t.name[lang]}</h3>

                            {t.subject && (
                                <p className={styles.subject}>
                                    {lang === "en" ? "Subject: " : "과목: "}
                                    {Array.isArray(t.subject[lang]) ? t.subject[lang].join(", ") : t.subject[lang]}
                                </p>
                            )}

                            {t.bio && <p className={styles.bio}>{t.bio[lang]}</p>}

                            {t.education && (
                                <p className={styles.education}>
                                    <strong>{lang === "en" ? "Education" : "학력"}:</strong> {t.education[lang]}
                                </p>
                            )}

                            {t.experience && (
                                <div>
                                    <p className={styles.subheading}>{lang === "en" ? "Experience" : "경력"}:</p>
                                    <ul>
                                        {Array.isArray(t.experience[lang])
                                            ? t.experience[lang].map((exp: string, i: number) => <li key={i}>{exp}</li>)
                                            : <li>{t.experience[lang]}</li>}
                                    </ul>
                                </div>
                            )}

                            {t.achievements && (
                                <div>
                                    <p className={styles.subheading}>{lang === "en" ? "Achievements" : "성과"}:</p>
                                    <ul>
                                        {Array.isArray(t.achievements[lang])
                                            ? t.achievements[lang].map((ach: string, i: number) => <li key={i}>{ach}</li>)
                                            : <li>{t.achievements[lang]}</li>}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.normalList}>
                {normalTeachers.map((t) => (
                    <div key={t.id} className={styles.normalCard}>
                        <div className={styles.normalImage}>
                            {t.profileImage ? <img src={t.profileImage} alt={t.name[lang]} /> : "No Image"}
                        </div>

                        <div>
                            <h3 className={styles.teacherName}>{t.name[lang]}</h3>

                            {/* 일반 강사는 subject 대신 core만 렌더링 */}
                            <p className={styles.bio}>{t.core[lang]}</p>

                            {t.education && (
                                <p className={styles.education}>
                                    <strong>{lang === "en" ? "Education" : "학력"}:</strong> {t.education[lang]}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
