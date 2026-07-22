'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import teachersData from '../../data/teachers.json';
import aboutData from '../../data/about.json';
import servicesData from '../../data/services.json';
import styles from './page.module.css';

type Tab = 'services' | 'history' | 'instructors' | 'classroom';

const TABS: { id: Tab; en: string; ko: string }[] = [
    { id: 'services',    en: 'Services',    ko: '수업 안내' },
    { id: 'history',     en: 'History',     ko: '연혁' },
    { id: 'instructors', en: 'Instructors', ko: '강사진' },
    { id: 'classroom',   en: 'Classroom',   ko: '교실' },
];

export default function AboutUsPage() {
    const [tab, setTab] = useState<Tab>('services');
    const [slide, setSlide] = useState(0);

    const isKo = typeof window !== 'undefined' && window.location.pathname.startsWith('/ko');
    const lang: 'en' | 'ko' = isKo ? 'ko' : 'en';

    const images = aboutData.classroomImages;
    const prevSlide = () => setSlide(i => (i === 0 ? images.length - 1 : i - 1));
    const nextSlide = () => setSlide(i => (i === images.length - 1 ? 0 : i + 1));

    return (
        <main className={styles.page}>

            {/* Hero Cover — content changes per active tab */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.heroEyebrow}>{lang === 'ko' ? '도움 아카데미' : 'The Doum Academy'}</p>
                    {tab === 'instructors' ? (
                        <>
                            <h1 className={styles.heroTitle}>{teachersData['main-title'][lang]}</h1>
                            <p className={styles.heroDesc}>{teachersData['main-body'][lang]}</p>
                        </>
                    ) : tab === 'history' ? (
                        <>
                            <h1 className={styles.heroTitle}>{lang === 'ko' ? '학원 연혁' : 'History'}</h1>
                            <p className={styles.heroDesc}>
                                {lang === 'ko'
                                    ? '도움 아카데미의 성장 여정을 소개합니다.'
                                    : 'The journey of The Doum Academy from its founding to today.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className={styles.heroTitle}>{lang === 'ko' ? '학원 소개' : 'About Us'}</h1>
                            <p className={styles.heroDesc}>
                                {lang === 'ko'
                                    ? '도움 아카데미는 캐나다 BC주에 위치한 한국식 입시 전문 학원입니다.'
                                    : 'A Korean-style university prep academy based in BC, Canada — Port Moody & Vancouver.'}
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* Tab Navigation */}
            <div className={styles.tabBar}>
                {TABS.map(t => (
                    <button
                        key={t.id}
                        className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ''}`}
                        onClick={() => setTab(t.id)}
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
                        <div className={styles.sectionHeader}>
                            <p className={styles.eyebrow}>{lang === 'ko' ? '수업 프로그램' : 'OUR PROGRAMS'}</p>
                            <h2 className={styles.sectionTitle}>{lang === 'ko' ? '수업 안내' : 'Our Services'}</h2>
                        </div>
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
                        {/* Directors */}
                        <div className={styles.sectionHeader}>
                            <p className={styles.eyebrow}>{lang === 'ko' ? '원장 소개' : 'DIRECTORS'}</p>
                            <h2 className={styles.sectionTitle}>{lang === 'ko' ? '원장님들' : 'Our Directors'}</h2>
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

                {/* Classroom */}
                {tab === 'classroom' && (
                    <section>
                        <div className={styles.sectionHeader}>
                            <p className={styles.eyebrow}>{lang === 'ko' ? '학습 공간' : 'OUR SPACE'}</p>
                            <h2 className={styles.sectionTitle}>{lang === 'ko' ? '교실 소개' : 'Our Classrooms'}</h2>
                        </div>
                        <div className={styles.slideshow}>
                            <button className={styles.slideBtn} onClick={prevSlide} aria-label="Previous">
                                <ChevronLeft size={24} />
                            </button>
                            <div className={styles.slideImageWrap}>
                                <img
                                    src={images[slide].url}
                                    alt={images[slide].caption}
                                    className={styles.slideImage}
                                />
                                <p className={styles.slideCaption}>{images[slide].caption}</p>
                            </div>
                            <button className={styles.slideBtn} onClick={nextSlide} aria-label="Next">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        <div className={styles.slideDots}>
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.slideDot} ${i === slide ? styles.slideDotActive : ''}`}
                                    onClick={() => setSlide(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}