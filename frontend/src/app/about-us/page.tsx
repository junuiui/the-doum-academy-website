// import MapComponent from "@/components/Map";

import styles from './page.module.css';
import Teachers from "../../components/features/Teachers";
import { Service } from '../../components/features/Service';

// Data

export default function AboutUsPage() {
    return (
        <main className={styles.container}>

            <div className={styles.columnGrid}>

                <section>
                    <Service />
                </section>


                {/* Teachers render here */}
                <section>
                    <Teachers />
                </section>

            </div>
        </main>
    )
}
