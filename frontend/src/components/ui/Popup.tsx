import { X, Bell, Info } from 'lucide-react';
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
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Bell size={18} className={styles.titleIcon} />
          <h3 className={styles.title}>{title}</h3>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className={styles.content}>
        <ul className={styles.list}>
          {bodies && bodies.map((body, idx) => (
            <li key={idx} className={styles.item}>
              <Info size={14} className={styles.itemIcon} />
              <span>{body}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.hideTodayBtn}
          onClick={onHideToday}
        >
          오늘 하루 안 보기
        </button>
      </div>
    </div>
  );
}
