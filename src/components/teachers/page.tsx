"use client";

import styles from "./page.module.css";
import teachers from "@/data/teachers.json";
import { useState } from "react";

export default function TeachersComponent() {
    // 기본 언어를 ENG 로 두고, 나중에 NavBar 의 언어 버튼과 sync 가능
    const [language, setLanguage] = useState<"en" | "ko">("en");

    const owners = teachers.filter((t) => t.isOwner);
    const normalTeachers = teachers.filter((t) => !t.isOwner);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {language === "en" ? "Our Teachers" : "선생님 소개"}
            </h1>

            {/* ===== OWNER SECTION ===== */}
            <h2 className={styles.sectionTitle}>
                {language === "en" ? "Founders" : "설립자"}
            </h2>

            <div className={styles.ownerGrid}>
                {owners.map((t) => (
                    <div key={t.id} className={styles.ownerCard}>
                        <div className={styles.ownerImage}>
                            {t.profileImage ? (
                                <img src={t.profileImage} alt={t.name[language]} />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        <div className={styles.ownerInfo}>
                            <h3 className={styles.teacherName}>{t.name[language]}</h3>

                            <p className={styles.subject}>
                                {language === "en" ? "Subject: " : "과목: "}
                                {t.subject[language]}
                            </p>

                            <p className={styles.bio}>{t.bio[language]}</p>

                            <p className={styles.education}>
                                <strong>{language === "en" ? "Education" : "학력"}:</strong>{" "}
                                {t.education[language]}
                            </p>

                            <div>
                                <p className={styles.subheading}>
                                    {language === "en" ? "Experience" : "경력"}:
                                </p>
                                <ul>
                                    {t.experience[language].map((exp: string, i: number) => (
                                        <li key={i}>{exp}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className={styles.subheading}>
                                    {language === "en" ? "Achievements" : "성과"}:
                                </p>
                                <ul>
                                    {t.achievements[language].map((ach: string, i: number) => (
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
                {language === "en" ? "Our Instructors" : "강사진"}
            </h2>

            <div className={styles.normalList}>
                {normalTeachers.map((t) => (
                    <div key={t.id} className={styles.normalCard}>
                        <div className={styles.normalImage}>
                            {t.profileImage ? (
                                <img src={t.profileImage} alt={t.name[language]} />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        <div>
                            <h3 className={styles.teacherName}>{t.name[language]}</h3>

                            <p className={styles.subject}>
                                {language === "en" ? "Subject: " : "과목: "}
                                {t.subject[language]}
                            </p>

                            <p className={styles.bio}>{t.bio[language]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
