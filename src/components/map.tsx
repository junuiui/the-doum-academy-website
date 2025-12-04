import styles from './Map.module.css'

type MapProps = {
    name: string;
    link: string;
    showName: boolean;
}

export default function MapComponent({ name, link, showName }: MapProps) {
    return (
        <div className={styles.campusBox}>
            <h3>{showName? name : ""}</h3>
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