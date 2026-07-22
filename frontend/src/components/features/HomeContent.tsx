'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Award, Phone, GraduationCap, type LucideIcon } from 'lucide-react';
import styles from './HomeContent.module.css';
import { Popup } from '../ui/Popup';
import homeData from '../../data/home.json';

const ICON_MAP: Record<string, LucideIcon> = {
    BookOpen,
    Award,
    Phone,
    GraduationCap,
};

interface PopupItem {
    id: number;
    category: 'popup';
    title_ko: string | null;
    title_en: string | null;
    subtitle_ko: string[] | null;
    subtitle_en: string[] | null;
    is_active: boolean;
}

interface HomeContentProps {
    lang: 'en' | 'ko';
}

export default function HomeContent({ lang }: HomeContentProps) {
    const [popups, setPopups] = useState<PopupItem[]>([]);
    const [popupStates, setPopupStates] = useState<Record<number, { closed: boolean; hideToday: boolean }>>({});

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        fetch(`${apiUrl}/extra-data?category=popup`)
            .then(r => r.ok ? r.json() : [])
            .then((data: PopupItem[]) => {
                setPopups(data);
                const states: Record<number, { closed: boolean; hideToday: boolean }> = {};
                data.forEach(p => {
                    const hideUntil = localStorage.getItem(`hidePopup_${p.id}`);
                    states[p.id] = { closed: false, hideToday: hideUntil ? Date.now() < Number(hideUntil) : false };
                });
                setPopupStates(states);
            })
            .catch(() => {});
    }, []);

    const closePopup = (id: number) =>
        setPopupStates(prev => ({ ...prev, [id]: { ...prev[id], closed: true } }));

    const hideToday = (id: number) => {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        localStorage.setItem(`hidePopup_${id}`, todayEnd.getTime().toString());
        setPopupStates(prev => ({ ...prev, [id]: { ...prev[id], hideToday: true } }));
    };

    const visiblePopups = popups.filter(p => !popupStates[p.id]?.closed && !popupStates[p.id]?.hideToday);

    return (
        <div className={styles.container}>
            {/* Popups */}
            <div className={styles.popupContainer}>
                {visiblePopups.map(popup => (
                    <Popup
                        key={popup.id}
                        title={(lang === 'ko' ? popup.title_ko : popup.title_en) || ''}
                        bodies={(lang === 'ko' ? popup.subtitle_ko : popup.subtitle_en) || []}
                        onClose={() => closePopup(popup.id)}
                        onHideToday={() => hideToday(popup.id)}
                    />
                ))}
            </div>

            {/* Hero Banner */}
            <section className={styles.heroBanner} />

            {/* Stats Bar */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {homeData.stats.map((s, i) => (
                        <div key={i} className={styles.statItem}>
                            <span className={styles.statValue}>{s.value}</span>
                            <span className={styles.statLabel}>{lang === 'ko' ? s.ko : s.en}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Links */}
            <section className={styles.quickSection}>
                <div className={styles.sectionHeader}>
                    <p className={styles.sectionEyebrow}>OUR PROGRAMS</p>
                    <h2 className={styles.sectionTitle}>Title</h2>
                </div>
                <div className={styles.quickGrid}>
                    {homeData.quickLinks.map((link) => {
                        const Icon = ICON_MAP[link.icon] || BookOpen;
                        const content = lang === 'ko' ? link.ko : link.en;
                        const fullHref = lang === 'ko' ? `/ko${link.href}` : link.href;
                        return (
                            <Link key={link.en.title} href={fullHref} className={styles.quickCard}>
                                <div className={styles.quickIconWrap}>
                                    <Icon size={30} strokeWidth={1.5} />
                                </div>
                                <h3 className={styles.quickTitle}>{content.title}</h3>
                                <p className={styles.quickDesc}>{content.desc}</p>
                                <span className={styles.quickLearnMore}>
                                    {lang === 'ko' ? '자세히 보기' : 'Learn More'} →
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Notice + Contact */}
            <section className={styles.infoSection}>
                <div className={styles.infoInner}>

                    {/* Notice */}
                    <div className={styles.noticeBlock}>
                        <div className={styles.noticeHeader}>
                            <h2 className={styles.noticeTitle}>
                                {lang === 'ko' ? '공지사항' : 'Notice'}
                            </h2>
                            <span className={styles.noticePlus}>+</span>
                        </div>
                        <div className={styles.noticeGrid}>
                            {homeData.notices.map((n, i) => {
                                const content = lang === 'ko' ? n.ko : n.en;
                                return (
                                    <div key={i} className={styles.noticeCard}>
                                        <h3 className={styles.noticeCardTitle}>{content.title}</h3>
                                        <p className={styles.noticeCardBody}>{content.body}</p>
                                        <span className={styles.noticeDate}>{content.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Box */}
                    <div className={styles.contactBox}>
                        <p className={styles.contactBoxLabel}>{lang === 'ko' ? '문의하기' : 'Contact us'}</p>
                        <p className={styles.contactBoxPhone}>604-000-0000</p>
                        <p className={styles.contactBoxDetail}>E-MAIL example@doum.com</p>
                        <Link
                            href={lang === 'ko' ? '/ko/contact-us' : '/contact-us'}
                            className={styles.contactBoxBtn}
                        >
                            {lang === 'ko' ? '온라인 문의' : 'Inquire online'} →
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}
