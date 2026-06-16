'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import styles from './HomeContent.module.css';
import { Popup } from '../ui/Popup';

interface ExtraDataItem {
    id: number;
    category: 'hero' | 'banner' | 'popup';
    title_ko: string | null;
    title_en: string | null;
    subtitle_ko: string[] | null;
    subtitle_en: string[] | null;
    is_active: boolean;
}

// 💡 백엔드 Review 모델 응답 구조 규격 매핑
interface ReviewItem {
    id: number;
    name: string;
    star: number;
    review: string; // 백엔드에서 lang 파라미터에 따라 이미 정제해서 보내주는 필드
}

interface HomeContentProps {
    lang: 'en' | 'ko';
}

export default function HomeContent({ lang }: HomeContentProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const contactPath = lang === 'ko' ? '/ko/contact-us' : '/contact-us';

    // 백엔드 컨텐츠 상태 관리
    const [hero, setHero] = useState<ExtraDataItem | null>(null);
    const [features, setFeatures] = useState<ExtraDataItem[]>([]);
    const [popups, setPopups] = useState<ExtraDataItem[]>([]);
    const [backendReviews, setBackendReviews] = useState<ReviewItem[]>([]); // 💡 리뷰 데이터 상태 추가

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [popupStates, setPopupStates] = useState<
        Record<number, { closed: boolean; hideToday: boolean }>
    >({});

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    // 💡 extra-data 와 reviews 를 모두 병렬로 가져오도록 확장된 이펙트 훅
    useEffect(() => {
        const fetchHomeAllData = async () => {
            try {
                setIsLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

                // 네 가지 엔드포인트를 병렬 네트워크 스레드로 동시 호출
                const [heroRes, bannerRes, popupRes, reviewRes] = await Promise.all([
                    fetch(`${apiUrl}/extra-data?category=hero`),
                    fetch(`${apiUrl}/extra-data?category=banner`),
                    fetch(`${apiUrl}/extra-data?category=popup`),
                    fetch(`${apiUrl}/reviews/?lang=${lang}`) // lang 변수(ko 또는 en)를 쿼리로 주입
                ]);

                if (!heroRes.ok || !bannerRes.ok || !popupRes.ok || !reviewRes.ok) {
                    throw new Error('Failed to fetch homepage core resources');
                }

                const heroData: ExtraDataItem[] = await heroRes.json();
                const bannerData: ExtraDataItem[] = await bannerRes.json();
                const popupData: ExtraDataItem[] = await popupRes.json();
                const reviewData: ReviewItem[] = await reviewRes.json();

                setHero(heroData[0] || null);
                setFeatures(bannerData);
                setPopups(popupData);
                setBackendReviews(reviewData); // 💡 받아온 리뷰 배열 바인딩

                // 팝업 로컬스토리지 제어 초기화
                const states: Record<number, { closed: boolean; hideToday: boolean }> = {};
                popupData.forEach(p => {
                    const hideUntil = localStorage.getItem(`hidePopup_${p.id}`);
                    const hideToday = hideUntil ? Date.now() < Number(hideUntil) : false;
                    states[p.id] = { closed: false, hideToday };
                });
                setPopupStates(states);

            } catch (err) {
                console.error('Database connection networking failure:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeAllData();
    }, [lang]); // 언어(lang)가 스위칭될 때마다 리뷰 데이터 텍스트를 한/영 규격에 맞게 갱신

    const closePopup = (id: number) => {
        setPopupStates(prev => ({
            ...prev,
            [id]: { ...prev[id], closed: true },
        }));
    };

    const hideToday = (id: number) => {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        localStorage.setItem(`hidePopup_${id}`, todayEnd.getTime().toString());

        setPopupStates(prev => ({
            ...prev,
            [id]: { ...prev[id], hideToday: true },
        }));
    };

    const visiblePopups = popups.filter(
        p => !popupStates[p.id]?.closed && !popupStates[p.id]?.hideToday
    );

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={40} style={{ color: '#cbd5e1' }} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Popups */}
            <div className={styles.popupContainer}>
                {visiblePopups.map(popup => {
                    const title = lang === 'ko' ? popup.title_ko : popup.title_en;
                    const bodies = lang === 'ko' ? popup.subtitle_ko : popup.subtitle_en;
                    return (
                        <Popup
                            key={popup.id}
                            title={title || ''}
                            bodies={bodies || []}
                            onClose={() => closePopup(popup.id)}
                            onHideToday={() => hideToday(popup.id)}
                        />
                    );
                })}
            </div>

            {/* Hero Section */}
            {hero && (
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            {lang === 'ko' ? hero.title_ko : hero.title_en}
                        </h1>
                        <p className={styles.heroSubtitle}>
                            {lang === 'ko' ? hero.subtitle_ko?.[0] : hero.subtitle_en?.[0]}
                        </p>
                        <Link href={contactPath}>
                            <button className={styles.ctaButton}>
                                {lang === 'ko' ? '문의하기' : 'Contact Us'}
                            </button>
                        </Link>
                    </div>
                </section>
            )}

            {/* Features Grid */}
            <section className={styles.featuresGrid}>
                {features.map((f) => {
                    const title = lang === 'ko' ? f.title_ko : f.title_en;
                    const descriptions = lang === 'ko' ? f.subtitle_ko : f.subtitle_en;
                    return (
                        <div key={f.id} className={styles.featureCard}>
                            <h3 className={styles.featureTitle}>{title}</h3>
                            {descriptions?.map((desc, idx) => (
                                <p key={idx} className={styles.featureDesc}>{desc}</p>
                            ))}
                        </div>
                    );
                })}
            </section>

            {/* Testimonials Section (실시간 DB 연동 완료) */}
            <section className={styles.testimonialSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        {lang === 'en' ? 'Success Stories' : '성공 스토리'}
                    </h2>
                </div>

                <div className={styles.testimonialWrapper}>
                    <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide}>‹</button>

                    <div className={styles.testimonialSlider} ref={sliderRef}>
                        {backendReviews.map((r) => (
                            <div key={r.id} className={styles.testimonialCard}>
                                {/* 💡 별점 노출 규칙 세팅: 10점 만점이므로 채워진 별 개수는 star 값의 절반(또는 그대로 매핑 가능). 여기서는 5점 만점 척도로 환산 가공 처리해 둡니다. (스타일 호환 유지용) */}
                                <div className={styles.rating}>
                                    {'★'.repeat(Math.round(r.star / 2))}{'☆'.repeat(5 - Math.round(r.star / 2))}
                                </div>
                                <p className={styles.text}>"{r.review}"</p>
                                <div className={styles.userInfo}>
                                    <span className={styles.name}>{r.name}</span>
                                </div>
                            </div>
                        ))}
                        {backendReviews.length === 0 && (
                            <div style={{ textAlign: 'center', width: '100%', color: '#94a3b8', padding: '2rem' }}>
                                {lang === 'ko' ? '등록된 성공 스토리가 없습니다.' : 'No testimonials available.'}
                            </div>
                        )}
                    </div>

                    <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide}>›</button>
                </div>
            </section>
        </div>
    );
}

/*
    
*/