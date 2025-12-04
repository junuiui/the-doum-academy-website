'use client';

import { useState } from 'react';
import styles from './page.module.css';
import MapComponent from '@/components/Map';

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
                        <h2>Port Moody</h2>
                        <button
                            onClick={() => {
                                window.open(
                                    "https://www.google.com/maps/dir/?api=1&destination=3003%20St%20Johns%20St%2C%20Port%20Moody%2C%20BC%20V3H%200L4"
                                );
                            }}
                            className={styles.copyButton}
                        >
                            3003 St Johns St, Port Moody, BC V3H 0L4
                        </button>

                        <MapComponent
                            name="Port Moody"
                            link="https://maps.google.com/maps?width=600&height=400&hl=en&q=Doum%20Academy&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                            showName={false}
                        />

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

                        <button
                            className={styles.actionBtn}
                            onClick={() => {
                                window.open(
                                    "https://www.google.com/maps/dir/?api=1&destination=PORT_MOODY_LAT,PORT_MOODY_LNG&travelmode=transit"
                                );
                            }}
                        >
                            길찾기 (Transit)
                        </button>

                        <button
                            className={styles.actionBtn}
                            onClick={() => {
                                window.open(
                                    "https://www.google.com/maps/dir/?api=1&destination=PORT_MOODY_LAT,PORT_MOODY_LNG&travelmode=walking"
                                );
                            }}
                        >
                            길찾기 (Walking)
                        </button>
                    </div>
                )}

                {branch === "vancouver" && (
                    <>
                        <div>
                            <h2>Vancouver</h2>
                            <button
                                onClick={() => {
                                    window.open(
                                        "https://www.google.com/maps/dir/?api=1&destination=3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2&"
                                    );
                                }}
                                className={styles.copyButton}
                            >
                                3215 Macdonald St, Vancouver, BC V6L 2N2
                            </button>
                            <MapComponent
                                name="Vancouver"
                                link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d386.9409216475215!2d-123.16890769068837!3d49.257384111637265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673a86f27b225%3A0xe3d6ce97d84ebedd!2s3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2!5e0!3m2!1sen!2sca!4v1763949854500!5m2!1sen!2sca"
                                showName={false}
                            />

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

                        <div></div>
                    </>

                )}
            </div>
        </main>
    );
}
