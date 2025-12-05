import MapComponent from "@/components/Map";
// import TeachersComponent from "../../components/teachers/page";
import styles from './page.module.css';
import Teachers from "@/components/Teachers";

export default function AboutUsPage() {
    return (
        <main className={styles.container}>

            {/* Teachers render here */}
            <Teachers />

            {/* Map renders here */}
            <div className={styles.campusBox}>
                <h1 className={styles.title}>위치</h1>
                <div className={styles.campusSection}>
                    <MapComponent
                        name="밴쿠버"
                        link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d386.9409216475215!2d-123.16890769068837!3d49.257384111637265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673a86f27b225%3A0xe3d6ce97d84ebedd!2s3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2!5e0!3m2!1sen!2sca!4v1763949854500!5m2!1sen!2sca"
                        showName={true} />

                    <MapComponent
                        name="포트무디"
                        link="https://maps.google.com/maps?width=600&height=400&hl=en&q=Doum%20Academy&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                        showName={true} />
                </div>
            </div>
        </main>
    )
}
