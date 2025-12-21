import styles from './Map.module.css'

type MapProps = {
    link: string;
}

export default function MapComponent({ link }: MapProps) {
    return (
        <div className={styles.campusBox}>
            <iframe
                src={link}
                width="100%"
                height="400"
                loading="lazy"
                allowFullScreen
            ></iframe>
        </div>
    )
}