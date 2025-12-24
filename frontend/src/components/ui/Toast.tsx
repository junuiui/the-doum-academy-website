

'use client';

import styles from './Toast.module.css'

interface ToastProp {
    message: string;
    visible: boolean;
}

export default function Toast({ message, visible }: ToastProp) {
    return (
        <div className={`${styles.toast} ${visible ? styles.show : ""}`}>
            {message}
        </div>
    );
}