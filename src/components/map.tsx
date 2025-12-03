import styles from './Map.module.css'

type MapProps = {
    name: string;
    link: string;
}

export default function MapComponent({ name, link }: MapProps) {
    return (
        <div className={styles.campusBox}>
            <h3>{name}</h3>
            <iframe
                src={link}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
            ></iframe>
        </div>
    )
}