// app/teachers/page.tsx
import styles from "./page.module.css";
import teachers from "@/data/teachers.json";

export default function TeachersComponent() {
    const owners = teachers.filter((t) => t.isOwner);
    const normalTeachers = teachers.filter((t) => !t.isOwner);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Our Teachers</h1>

            {/* ===== OWNER SECTION ===== */}
            <h2 className={styles.sectionTitle}>Founders</h2>

            <div className={styles.ownerGrid}>
                {owners.map((t) => (
                    <div key={t.id} className={styles.ownerCard}>
                        <div className={styles.ownerImage}>
                            {t.profileImage ? (
                                <img src={t.profileImage} alt={t.name} />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        <div className={styles.ownerInfo}>
                            <h3 className={styles.teacherName}>{t.name}</h3>
                            <p className={styles.subject}>Subject: {t.subject}</p>
                            <p className={styles.bio}>{t.bio}</p>

                            <p className={styles.education}><strong>Education:</strong> {t.education}</p>

                            <div>
                                <p className={styles.subheading}>Experience:</p>
                                <ul>
                                    {t.experience.map((exp, i) => (
                                        <li key={i}>{exp}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <p className={styles.subheading}>Achievements:</p>
                                <ul>
                                    {t.achievements.map((ach, i) => (
                                        <li key={i}>{ach}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== NORMAL TEACHERS ===== */}
            <h2 className={styles.sectionTitle}>Our Instructors</h2>

            <div className={styles.normalList}>
                {normalTeachers.map((t) => (
                    <div key={t.id} className={styles.normalCard}>
                        <div className={styles.normalImage}>
                            {t.profileImage ? (
                                <img src={t.profileImage} alt={t.name} />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        <div>
                            <h3 className={styles.teacherName}>{t.name}</h3>
                            <p className={styles.subject}>Subject: {t.subject}</p>
                            <p className={styles.bio}>{t.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
