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
            <div className={styles.locationHeader}>
                <h2 className={styles.locationTitle}>locaiton title</h2>
                <p className={styles.locationDescription}>
                    location description
                </p>
            </div>

            {/* Branch Selector */}
            <div className={styles.locationButtons}>
                <button
                    onClick={() => setBranch('portmoody')}
                    className={`${styles.locationButton} ${branch === 'portmoody' ? styles.locationButtonActive : ''}`}
                >
                    Port Moody
                </button>
                <button
                    onClick={() => setBranch('vancouver')}
                    className={`${styles.locationButton} ${branch === 'vancouver' ? styles.locationButtonActive : ''}`}
                >
                    Vancouver
                </button>
            </div>

            {/* Main Content Grid */}
            <div className={styles.grid}>

                {/* Row 1-  Map & Directions */}
                <div className={styles.main}>
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
                            <p className={styles.directionsLabel}></p>
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

                {/*  Row 2 Col 2 -  Hours of Operation */}
                <div className={styles.hours}>
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
                </div>

                {/* Row 2 Col 2 - Quick Info Card */}
                <div className={styles.info}>
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
    );
}