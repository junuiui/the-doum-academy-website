import { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Car, Train, Footprints, Navigation } from 'lucide-react';
import MapComponent from '@/components/Map';
import styles from './location.module.css';

// TODO
export const locationData = {
    portmoody: {
        name: 'Port Moody',
        address: '3003 St Johns St, Port Moody, BC V3H 0L4',
        phone: '+1 (604) 555-1234',
        email: 'portmoody@academy.com',
        mapEmbedLink: 'https://maps.google.com/maps?width=600&height=400&hl=en&q=Doum%20Academy&t=&z=14&ie=UTF8&iwloc=B&output=embed',
        directionsBase: 'https://www.google.com/maps/dir/?api=1&destination=3003%20St%20Johns%20St%2C%20Port%20Moody%2C%20BC%20V3H%200L4'
    },
    vancouver: {
        name: 'Vancouver',
        address: '3215 Macdonald St, Vancouver, BC V6L 2N2',
        phone: '+1 (604) 555-5678',
        email: 'vancouver@academy.com',
        mapEmbedLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d386.9409216475215!2d-123.16890769068837!3d49.257384111637265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673a86f27b225%3A0xe3d6ce97d84ebedd!2s3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2!5e0!3m2!1sen!2sca!4v1763949854500!5m2!1sen!2sca',
        directionsBase: 'https://www.google.com/maps/dir/?api=1&destination=3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2'
    }
};

const hoursOfOperation = [
    { days: 'Monday - Friday', hours: '4:00 PM - 10:00 PM' },
    { days: 'Saturday & Sunday', hours: 'Closed' }
];

export function Location() {
    const [branch, setBranch] = useState<'portmoody' | 'vancouver'>('portmoody');
    const currentLocation = locationData[branch];

    const openDirections = (mode?: string) => {
        const url = mode
            ? `${currentLocation.directionsBase}&travelmode=${mode}`
            : currentLocation.directionsBase;
        window.open(url, '_blank');
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            {/* <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Our Locations</h1>
                    <p className={styles.subtitle}>Visit us at one of our conveniently located campuses</p>
                </div>
            </div> */}

            <div className={styles.content}>
                {/* Branch Selector */}
                <div className={styles.branchSelector}>
                    <button
                        onClick={() => setBranch('portmoody')}
                        className={`${styles.branchButton} ${branch === 'portmoody' ? styles.active : ''}`}
                    >
                        Port Moody
                    </button>
                    <button
                        onClick={() => setBranch('vancouver')}
                        className={`${styles.branchButton} ${branch === 'vancouver' ? styles.active : ''}`}
                    >
                        Vancouver
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className={styles.grid}>
                    {/* Left Column - Map & Directions */}
                    <div className={styles.left}>
                        {/* Location Info Card */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>{currentLocation.name} Campus</h2>

                            {/* Address with Icon */}
                            <button
                                onClick={() => openDirections()}
                                className={styles.addressButton}
                            >
                                <MapPin className={styles.mapIcon} size={24} />
                                <div className={styles.addressContent}>
                                    <p className={styles.addressText}>{currentLocation.address}</p>
                                    <p className={styles.directionsText}>
                                        Click for directions <Navigation size={14} />
                                    </p>
                                </div>
                            </button>

                            {/* Contact Info */}
                            <div className={styles.contactGrid}>
                                <a
                                    href={`tel:${currentLocation.phone}`}
                                    className={styles.contactLink}
                                >
                                    <Phone className={styles.contactIcon} size={20} />
                                    <div>
                                        <p className={styles.contactText}>{currentLocation.phone}</p>
                                    </div>
                                </a>
                                <a
                                    href={`mailto:${currentLocation.email}`}
                                    className={styles.contactLink}
                                >
                                    <Mail className={styles.contactIcon} size={20} />
                                    <div>
                                        <p className={styles.contactText}>{currentLocation.email}</p>
                                    </div>
                                </a>
                            </div>

                            {/* Map */}
                            <div className={styles.mapContainer}>
                                <MapComponent link={currentLocation.mapEmbedLink} />
                            </div>

                            {/* Direction Buttons */}
                            <div className={styles.directionsSection}>
                                <p className={styles.directionsLabel}>Get Directions</p>
                                <div className={styles.directionsGrid}>
                                    <button
                                        onClick={() => openDirections('driving')}
                                        className={`${styles.directionButton} ${styles.drivingButton}`}
                                    >
                                        <Car size={24} />
                                        <span>Driving</span>
                                    </button>
                                    <button
                                        onClick={() => openDirections('transit')}
                                        className={`${styles.directionButton} ${styles.transitButton}`}
                                    >
                                        <Train size={24} />
                                        <span>Transit</span>
                                    </button>
                                    <button
                                        onClick={() => openDirections('walking')}
                                        className={`${styles.directionButton} ${styles.walkingButton}`}
                                    >
                                        <Footprints size={24} />
                                        <span>Walking</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Hours & Additional Info */}
                    <div className={styles.right}>
                        {/* Hours of Operation */}
                        <div className={styles.card}>
                            <div className={styles.hoursHeader}>
                                <Clock className={styles.clockIcon} size={28} />
                                <h3 className={styles.hoursTitle}>Hours of Operation</h3>
                            </div>

                            <div className={styles.hoursContent}>
                                {hoursOfOperation.map((schedule, index) => (
                                    <div key={index} className={styles.hoursItem}>
                                        <p className={styles.hoursDays}>{schedule.days}</p>
                                        <p className={`${styles.hoursTime} ${schedule.hours === 'Closed' ? styles.closed : ''}`}>
                                            {schedule.hours}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Info Card */}
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>Info title </h3>
                            <p className={styles.infoDescription}>
                                information body
                            </p>
                            <div className={styles.infoBadge}>
                                <p>
                                    <strong>Additional Info title</strong>
                                </p>
                                <p>Additional info body </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


// 'use client';

// import { useState } from 'react';
// import styles from './location.module.css';
// import MapComponent from '@/components/Map';

// export default function Location() {
//     const [branch, setBranch] = useState("portmoody");

//     return (
//         <>
//             <h1 className={styles.title}>Locations</h1>

//             {/* Branch Selector */}
//             <div className={styles.menu}>
//                 <button
//                     className={branch === "portmoody" ? styles.active : ""}
//                     onClick={() => setBranch("portmoody")}
//                 >
//                     Port Moody
//                 </button>

//                 <button
//                     className={branch === "vancouver" ? styles.active : ""}
//                     onClick={() => setBranch("vancouver")}
//                 >
//                     Vancouver
//                 </button>
//             </div>

//             {/* Content */}
//             <div className={styles.grid}>
//                 <div className={styles.left}>
//                     {branch === "portmoody" && (
//                         <div>
//                             <h2>Port Moody</h2>
//                             <button
//                                 onClick={() => {
//                                     window.open(
//                                         "https://www.google.com/maps/dir/?api=1&destination=3003%20St%20Johns%20St%2C%20Port%20Moody%2C%20BC%20V3H%200L4"
//                                     );
//                                 }}
//                                 className={styles.directMapBtn}
//                             >
//                                 3003 St Johns St, Port Moody, BC V3H 0L4
//                             </button>

//                             <MapComponent
//                                 name="Port Moody"
//                                 link="https://maps.google.com/maps?width=600&height=400&hl=en&q=Doum%20Academy&t=&z=14&ie=UTF8&iwloc=B&output=embed"
//                                 showName={false}
//                             />

//                             <div className={styles.actionBtns}>
//                                 <button
//                                     className={styles.actionBtn}
//                                     onClick={() => {
//                                         window.open(
//                                             "https://www.google.com/maps/dir/?api=1&destination=3003%20St%20Johns%20St%2C%20Port%20Moody%2C%20BC%20V3H%200L4&travelmode=driving"
//                                         );
//                                     }}
//                                 >
//                                     Driving
//                                 </button>

//                                 <button
//                                     className={styles.actionBtn}
//                                     onClick={() => {
//                                         window.open(
//                                             "https://www.google.com/maps/dir/?api=1&destination=3003%20St%20Johns%20St%2C%20Port%20Moody%2C%20BC%20V3H%200L4&travelmode=transit"
//                                         );
//                                     }}
//                                 >
//                                     Transit
//                                 </button>

//                                 <button
//                                     className={styles.actionBtn}
//                                     onClick={() => {
//                                         window.open(
//                                             "https://www.google.com/maps/dir/?api=1&destination=3003%20St%20Johns%20St%2C%20Port%20Moody%2C%20BC%20V3H%200L4&travelmode=walking"
//                                         );
//                                     }}
//                                 >
//                                     Walking
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {branch === "vancouver" && (
//                         <>
//                             <div>
//                                 <h2>Vancouver</h2>
//                                 <button
//                                     onClick={() => {
//                                         window.open(
//                                             "https://www.google.com/maps/dir/?api=1&destination=3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2&"
//                                         );
//                                     }}
//                                     className={styles.copyButton}
//                                 >
//                                     3215 Macdonald St, Vancouver, BC V6L 2N2
//                                 </button>
//                                 <MapComponent
//                                     name="Vancouver"
//                                     link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d386.9409216475215!2d-123.16890769068837!3d49.257384111637265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673a86f27b225%3A0xe3d6ce97d84ebedd!2s3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2!5e0!3m2!1sen!2sca!4v1763949854500!5m2!1sen!2sca"
//                                     showName={false}
//                                 />

//                                 <div className={styles.actionBtns}>
//                                     <button
//                                         className={styles.actionBtn}
//                                         onClick={() => {
//                                             window.open(
//                                                 "https://www.google.com/maps/dir/?api=1&destination=3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2&travelmode=driving"
//                                             );
//                                         }}
//                                     >
//                                         Driving
//                                     </button>

//                                     <button
//                                         className={styles.actionBtn}
//                                         onClick={() => {
//                                             window.open(
//                                                 "https://www.google.com/maps/dir/?api=1&destination=3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2&travelmode=transit"
//                                             );
//                                         }}
//                                     >
//                                         Transit
//                                     </button>

//                                     <button
//                                         className={styles.actionBtn}
//                                         onClick={() => {
//                                             window.open(
//                                                 "https://www.google.com/maps/dir/?api=1&destination=3215%20Macdonald%20St%2C%20Vancouver%2C%20BC%20V6L%202N2&travelmode=walking"
//                                             );
//                                         }}
//                                     >
//                                         Walking
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 {/* Right Column — Hours of Operation */}
//                 <div className={styles.right}>
//                     <h2>Hours of Operation</h2>
//                     <ul>
//                         <li>Mon – Fri: 4:00 PM – 10:00 PM</li>
//                         <li>Sat/Sun: Closed</li>
//                     </ul>
//                 </div>
//             </div>
//         </>

//     );
// }
