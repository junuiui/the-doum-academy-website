'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MapPin } from 'lucide-react';
import teachersData from '../../data/teachers.json';
import aboutData from '../../data/about.json';
import servicesData from '../../data/services.json';
import styles from './page.module.css';

type Tab = 'services' | 'history' | 'instructors' | 'classroom';

const TABS: { id: Tab; en: string; ko: string }[] = [
    { id: 'services',    en: 'Services',    ko: '수업 안내' },
    { id: 'history',     en: 'History',     ko: '연혁' },
    { id: 'instructors', en: 'Instructors', ko: '강사진' },
    { id: 'classroom',   en: 'Gallery',     ko: '학습 공간' },
];

export default function AboutUsPage() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const lang: 'en' | 'ko' = pathname.startsWith('/ko') ? 'ko' : 'en';

    const initialTab = (searchParams.get('tab') as Tab | null) ?? 'services';
    const [tab, setTab] = useState<Tab>(initialTab);
    const handleTabChange = (newTab: Tab) => {
        setTab(newTab);
        router.replace(`${pathname}?tab=${newTab}`, { scroll: false });
    };

    return (
        <main className={styles.page}>

            {/* Hero Cover — content changes per active tab */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>{lang === 'ko' ? '도움 아카데미' : 'The Doum Academy'}</p>
                    {tab === 'instructors' ? (
                        <h1 className={styles.heroTitle}>{teachersData['main-title'][lang]}</h1>
                    ) : tab === 'history' ? (
                        <h1 className={styles.heroTitle}>{lang === 'ko' ? '학원 연혁' : 'History'}</h1>
                    ) : tab === 'classroom' ? (
                        <h1 className={styles.heroTitle}>{lang === 'ko' ? '학습공간' : 'Gallery'}</h1>
                    ) : (
                        <h1 className={styles.heroTitle}>{lang === 'ko' ? '수업 안내' : 'Our Services'}</h1>
                    )}
                </div>
            </section>

            {/* Tab Navigation */}
            <div className={styles.tabBar}>
                {TABS.map(t => (
                    <button
                        key={t.id}
                        className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ''}`}
                        onClick={() => handleTabChange(t.id)}
                    >
                        {lang === 'ko' ? t.ko : t.en}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>

                {/* Services */}
                {tab === 'services' && (
                    <section>
                        <div className={styles.servicesGrid}>
                            {servicesData.map(svc => (
                                <div key={svc.id} className={styles.serviceCard}>
                                    <h3 className={styles.serviceTitle}>{svc.title[lang]}</h3>
                                    <ul className={styles.serviceList}>
                                        {svc.body.map((item, i) => (
                                            <li key={i}>{item[lang]}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* History */}
                {tab === 'history' && (
                    <section>
                        <p className={styles.historyFootnote}>
                            {lang === 'ko'
                                ? '도움 아카데미의 성장 여정을 소개합니다.'
                                : 'The journey of The Doum Academy from its founding to today.'}
                        </p>
                        <div className={styles.timeline}>
                            {aboutData.history.map((item, i) => (
                                <div
                                    key={i}
                                    className={`${styles.timelineItem} ${i % 2 === 1 ? styles.timelineItemFlip : ''}`}
                                >
                                    <div className={styles.timelineYear}>{item.year}</div>
                                    <div className={styles.timelineDotCol}>
                                        <div className={styles.timelineDot} />
                                    </div>
                                    <p className={styles.timelineText}>{item[lang]}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Instructors */}
                {tab === 'instructors' && (
                    <section>
                        {/* Intro body */}
                        <div className={styles.instructorsBody}>
                            {teachersData['main-body'][lang].split('. ').map((line, i, arr) => (
                                <p key={i}>{line}{i < arr.length - 1 ? '.' : ''}</p>
                            ))}
                        </div>

                        {/* Directors */}
                        <div className={styles.sectionHeader} style={{ marginTop: '3rem' }}>
                            <p className={styles.eyebrow}>{lang === 'ko' ? '원장 소개' : 'DIRECTORS'}</p>
                            <h2 className={styles.sectionTitle}>{lang === 'ko' ? '원장진' : 'Our Directors'}</h2>
                        </div>
                        <div className={styles.directorGrid}>
                            {teachersData.director.map(d => (
                                <div key={d.id} className={styles.directorCard}>
                                    <div className={styles.teacherInfo}>
                                        <h3 className={styles.teacherName}>{d.name[lang]}</h3>
                                        <p className={styles.teacherSchool}>{d.education[lang]}</p>
                                        <p className={styles.teacherBio}>{d.bio[lang]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Instructors */}
                        <div className={styles.sectionHeader} style={{ marginTop: '4rem' }}>
                            <p className={styles.eyebrow}>{lang === 'ko' ? '강사 소개' : 'INSTRUCTORS'}</p>
                            <h2 className={styles.sectionTitle}>{lang === 'ko' ? '강사진' : 'Our Instructors'}</h2>
                        </div>
                        <div className={styles.instructorGrid}>
                            {teachersData.instructors.map(ins => (
                                <div key={ins.id} className={styles.instructorCard}>
                                    <h3 className={styles.teacherName}>{ins.name[lang]}</h3>
                                    <p className={styles.teacherSchool}>{ins.education[lang]}</p>
                                    <p className={styles.teacherBio}>{ins.core[lang]}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Classroom / Gallery */}
                {tab === 'classroom' && (
                    <section>
                        {aboutData.campuses.map((campus, ci) => (
                            <div key={ci} className={styles.campusSection}>
                                <div className={styles.campusHeader}>
                                    <h2 className={styles.campusName}>{campus[lang].name}</h2>
                                    <p className={styles.campusAddress}>
                                        <MapPin size={15} />
                                        {campus[lang].address}
                                    </p>
                                </div>
                                <div className={styles.photoGrid}>
                                    {campus.images.map((img, ii) => (
                                        <div key={ii} className={styles.photoCard}>
                                            <img src={img.url} alt={img.caption} className={styles.photoImg} />
                                            <p className={styles.photoCaption}>{img.caption}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

            </div>
        </main>
    );
}