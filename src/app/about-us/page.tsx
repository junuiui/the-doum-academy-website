// import MapComponent from "@/components/Map";

import styles from './page.module.css';
import Teachers from "@/components/Teachers";
import { Service } from '@/components/Service';

// Data

export default function AboutUsPage() {
    return (
        <main className={styles.container}>
            <Service />

            {/* Teachers render here */}
            <Teachers />

        </main>
    )
}
