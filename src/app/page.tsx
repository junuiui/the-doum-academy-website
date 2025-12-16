'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const STORAGE_KEY = 'hideAchievementPopupUntil';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const hideUntil = localStorage.getItem(STORAGE_KEY);

        if (hideUntil) {
            const now = new Date().getTime();
            if (now < Number(hideUntil)) return;
        }

        setShowPopup(true);
    }, []);

    const closePopup = () => {
        setShowPopup(false);
    };

    const hideToday = () => {
        const tomorrow = new Date();
        tomorrow.setHours(23, 59, 59, 999);
        localStorage.setItem(STORAGE_KEY, tomorrow.getTime().toString());
        setShowPopup(false);
    };

    return (
        <div className={styles.container}>

            {/* Achievement Popup */}
            {showPopup && (
                <div className={styles.popup}>
                    <button className={styles.closeBtn} onClick={closePopup}>
                        ✕
                    </button>

                    <h3>🎉 Our Achievements</h3>

                    <ul>
                        <li>100+ University Acceptances</li>
                        <li>Top AP & IB Results</li>
                        <li>High IELTS / TOEFL Scores</li>
                    </ul>

                    <div className={styles.actions}>
                        <button onClick={hideToday}>오늘 하루 안 보기</button>
                    </div>
                </div>
            )}

            {/* Home content */}
        </div>
    );
}
