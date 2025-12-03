'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function LocationPage() {
    const [branch, setBranch] = useState("portmoody");

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>찾아오시는 길</h1>

            {/* Branch Selector */}
            <menu className={styles.menu}>
                <button
                    className={branch === "portmoody" ? styles.active : ""}
                    onClick={() => setBranch("portmoody")}
                >
                    Port Moody
                </button>

                <button
                    className={branch === "vancouver" ? styles.active : ""}
                    onClick={() => setBranch("vancouver")}
                >
                    Vancouver
                </button>
            </menu>

            {/* Content */}
            <div className={styles.content}>
                {branch === "portmoody" && (
                    <div>
                        <h2>Port Moody Campus</h2>
                        <p>📍 1234 St. Port Moody, BC</p>

                        <div className={styles.mapWrap}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=YOUR_PORT_MOODY_MAP"
                                loading="lazy"
                            ></iframe>
                        </div>

                        <button
                            className={styles.actionBtn}
                            onClick={() => {
                                window.open(
                                    "https://www.google.com/maps/dir/?api=1&destination=PORT_MOODY_LAT,PORT_MOODY_LNG&travelmode=driving"
                                );
                            }}
                        >
                            길찾기 (Driving)
                        </button>
                    </div>
                )}

                {branch === "vancouver" && (
                    <div>
                        <h2>Vancouver Campus</h2>
                        <p>📍 5678 St. Vancouver, BC</p>

                        <div className={styles.mapWrap}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=YOUR_VANCOUVER_MAP"
                                loading="lazy"
                            ></iframe>
                        </div>

                        <button
                            className={styles.actionBtn}
                            onClick={() => {
                                window.open(
                                    "https://www.google.com/maps/dir/?api=1&destination=VAN_LAT,VAN_LNG&travelmode=driving"
                                );
                            }}
                        >
                            길찾기 (Driving)
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
