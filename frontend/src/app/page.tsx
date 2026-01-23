'use client'

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';
import { Popup } from '../components/ui/Popup';
import { Award, Users, GraduationCap, TrendingUp, X, ArrowRight, Star, Quote } from 'lucide-react';
import DomeGallery from '../components/features/DomeGallery';

const DUMMY_POPUP = {
    'en': [
        { id: 'id1', title: 'title 1', bodies: ['body 1', 'body 2', 'body 3'] },
        { id: 'id2', title: 'title 2', bodies: ['body 1', 'body 2', 'body 3'] },
        { id: 'id3', title: 'title 3', bodies: ['body 1', 'body 2', 'body 3'] },
    ],
    'ko': [
        { id: 'id1k', title: '제목1', bodies: ['ㅂㄷ 1', 'ㅂㄷ 2', 'ㅂㄷ 3'] },
        { id: 'id2k', title: '제목2', bodies: ['ㅂㄷ 1', 'ㅂㄷ 2', 'ㅂㄷ 3'] },
        { id: 'id3k', title: '제목3', bodies: ['ㅂㄷ 1', 'ㅂㄷ 2', 'ㅂㄷ 3'] },
    ]

};

// TODO: from google review? 
const reviews = [
    {
        name: 'Jun Hong',
        grade: 'GRADE 12',
        university: 'SCHOOL',
        text: 'REIVEW 1',
        rating: 4
    },
    {
        name: 'Koko Kang',
        grade: 'Grade 11',
        university: 'SFU',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Ch333en',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa C312hen3',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Chen1323',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Chen33',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Chen333',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Che441n',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Ch123en',
        grade: 'Grade 10',
        university: 'Future: Medicine',
        text: 'REIVEW 1',
        rating: 5
    }
];

export default function Home() {

    const pathname = usePathname()
    const isKo = pathname.startsWith('/ko')
    const lang = isKo ? 'ko' : 'en'
    const sliderRef = useRef<HTMLDivElement>(null);

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const [popupStates, setPopupStates] = useState<
        Record<string, { closed: boolean; hideToday: boolean }>
    >({});

    useEffect(() => {
        const states: Record<string, { closed: boolean; hideToday: boolean }> = {};
        DUMMY_POPUP[lang].forEach(p => {
            const hideUntil = localStorage.getItem(`hidePopup_${p.id}`);
            const hideToday = hideUntil ? Date.now() < Number(hideUntil) : false;
            states[p.id] = { closed: false, hideToday };
        });
        setPopupStates(states);
    }, [lang]);

    const closePopup = (id: string) => {
        setPopupStates(prev => ({
            ...prev,
            [id]: { ...prev[id], closed: true },
        }));
    };

    const hideToday = (id: string) => {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        localStorage.setItem(`hidePopup_${id}`, todayEnd.getTime().toString());

        setPopupStates(prev => ({
            ...prev,
            [id]: { ...prev[id], hideToday: true },
        }));
    };

    const visiblePopups = DUMMY_POPUP[lang].filter(
        p => !popupStates[p.id]?.closed && !popupStates[p.id]?.hideToday
    );

    return (
        <div className={styles.container}>
            <div className={styles.popupContainer}>
                {visiblePopups.map(popup => (
                    <Popup
                        key={popup.id}
                        title={popup.title}
                        bodies={popup.bodies}
                        onClose={() => closePopup(popup.id)}
                        onHideToday={() => hideToday(popup.id)}
                    />
                ))}
            </div>

            {/* Home content */}
            <div className={styles.home}>
                <DomeGallery />
                <div className={styles.banner}>
                    <div className={styles.mainBanner}>
                        Main Banner
                    </div>
                    <div className={styles.subBanner}>
                        Sub Banner 1
                    </div>
                    <div className={styles.subBanner}>
                        Sub Banner 2
                    </div>
                    <div className={styles.subBanner}>
                        Sub Banner 3
                    </div>
                </div>
            </div>

            <div className={styles.testimonialWrapper}>
                <button className={styles.prevBtn} onClick={prevSlide}>‹</button>

                <div className={styles.testimonialSlider} ref={sliderRef}>
                    {reviews.map((r, i) => (
                        <div key={i} className={styles.testimonialCard}>
                            <div className={styles.header}>
                                <span className={styles.name}>{r.name}</span>
                                <span className={styles.grade}>{r.grade}</span>
                            </div>
                            <div className={styles.university}>{r.university}</div>
                            <div className={styles.text}>{r.text}</div>
                            <div className={styles.rating}>
                                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                            </div>
                        </div>
                    ))}
                </div>

                <button className={styles.nextBtn} onClick={nextSlide}>›</button>
            </div>
        </div>
    );
}
