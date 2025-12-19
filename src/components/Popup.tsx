import styles from './Popup.module.css';

type PopupProps = {
    onClose: () => void;
    onHideToday: () => void;
    title: string;
    bodies?: string[];
};

export function Popup({
    onClose,
    onHideToday,
    title,
    bodies,
}: PopupProps) {
    return (
        <div className={styles.popup}>
            <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
            >
                ✕
            </button>

            <h3>{title}</h3>

            <ul>
                {bodies && bodies.map((body, idx) => (
                    <li key={idx}>{body}</li>
                ))}
            </ul>

            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={onHideToday}
                >
                    오늘 하루 안 보기
                </button>
            </div>
        </div>
    );
}
