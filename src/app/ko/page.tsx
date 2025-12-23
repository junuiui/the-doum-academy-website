'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './page.module.css';
import { Popup } from '@/components/ui/Popup';
import { Award, Users, GraduationCap, TrendingUp, X, ArrowRight, Star, Quote } from 'lucide-react';

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

// TODO: should I make the function for calculating all the acheivement stats?
const DUMMY_ACHIEVEMENT = [
    {
        icon: Users,
        number: '500+',
        label: 'Students Enrolled',
        subtitle: 'in 3 years'
    },
    {
        icon: GraduationCap,
        number: '450+',
        label: 'University Acceptances',
        subtitle: 'Top tier schools'
    },
    {
        icon: Award,
        number: '95%',
        label: 'Success Rate',
        subtitle: 'Target achievement'
    },
    {
        icon: TrendingUp,
        number: '15%',
        label: 'Average Grade Improvement',
        subtitle: 'Within 6 months'
    }
];

// TODO: from google review? 
const DUMMY_TESTIMONIALS = [
    {
        name: 'Jun Hong',
        grade: 'GRADE 12',
        university: 'SCHOOL',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'Koko Kang',
        grade: 'Grade 11',
        university: 'SFU',
        text: 'REIVEW 1',
        rating: 5
    },
    {
        name: 'YaYa Chen',
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
        </div>
    );
}
