import MapComponent from "@/components/Map";
// import TeachersComponent from "../../components/teachers/page";
import styles from './page.module.css';
import Teachers from "@/components/Teachers";

export default function AboutUsPage() {
    return (
        <main className={styles.container}>

            {/* Teachers render here */}
            <Teachers />

        </main>
    )
}
