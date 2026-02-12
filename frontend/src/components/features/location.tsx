import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MapPin, Clock, Phone, Mail, Car, Train, Footprints, Navigation } from 'lucide-react';
import MapComponent from '../ui/Map';
import styles from './location.module.css';

const hoursOfOperation = [
  { days: 'Monday - Friday', hours: '4:00 PM - 10:00 PM' },
  { days: 'Saturday & Sunday', hours: 'Closed' }
];

type Location = {
  _id: string
  location: string
  address: string
  phone: string
  email: string
  mapEmbedLink: string
  directionsBase: string
}

export function Location() {

  const pathname = usePathname()
  const isKo = pathname.startsWith('/ko')

  const [locations, setLocations] = useState<Location[]>([])
  const [current, setCurrent] = useState<Location | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true)
        setError(false)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations`
        )
        if (!res.ok) throw new Error('Failed to fetch')

        const data: Location[] = await res.json()
        setLocations(data)
        setCurrent(data[0] ?? null)
      } catch (err) {
        console.error('Failed to load locations', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const openDirections = (mode?: string) => {
    if (!current) return
    const url = mode
      ? `${current.directionsBase}&travelmode=${mode}`
      : current.directionsBase
    window.open(url, '_blank')
  }

  /* ---------- states ---------- */
  if (loading) return <p>Loading locations...</p>
  if (error || !current) return <p>Failed to load locations</p>

  return (
    <div className={styles.container}>
      <section className={styles.locationCard}>
        {/* Header */}
        <div className={styles.locationHeader}>
          <h2 className={styles.locationTitle}>Our Location</h2>
          <p className={styles.locationDescription}>
            Click below for directions and see how easy it is to reach us.
          </p>
        </div>

        {/* Branch Selector */}
        <div className={styles.locationButtons}>
          {locations.map((loc) => (
            <button
              key={loc._id}
              type="button"
              className={`${styles.locationButton} ${current._id === loc._id ? styles.locationButtonActive : ''}`}
              onClick={() => setCurrent(loc)}
            >
              {loc.location} {/* DB에서 가져온 location 이름 */}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.grid}>

          {/* Row 1 - Map & Directions */}
          <div className={styles.main}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{current.location} Campus</h2>

              {/* Address with Icon */}
              <button
                onClick={() => openDirections()}
                className={styles.addressButton}
              >
                <MapPin className={styles.mapIcon} size={24} />
                <div className={styles.addressContent}>
                  <p className={styles.addressText}>{current.address}</p>
                  <p className={styles.directionsText}>
                    {isKo ? '길찾기' : 'Click for directions'} <Navigation size={14} />
                  </p>
                </div>
              </button>

              {/* Contact Info */}
              <div className={styles.contactGrid}>
                <a href={`tel:${current.phone}`} className={styles.contactLink}>
                  <Phone className={styles.contactIcon} size={20} />
                  <div><p className={styles.contactText}>{current.phone}</p></div>
                </a>
                <a href={`mailto:${current.email}`} className={styles.contactLink}>
                  <Mail className={styles.contactIcon} size={20} />
                  <div><p className={styles.contactText}>{current.email}</p></div>
                </a>
              </div>

              {/* Map */}
              <div className={styles.mapContainer}>
                <MapComponent link={current.mapEmbedLink} />
              </div>

              {/* Direction Buttons */}
              <div className={styles.directionsSection}>
                <div className={styles.directionsGrid}>
                  <button onClick={() => openDirections('driving')} className={`${styles.directionButton} ${styles.drivingButton}`}>
                    <Car size={24} /><span>{isKo ? '운전' : 'Driving'}</span>
                  </button>
                  <button onClick={() => openDirections('transit')} className={`${styles.directionButton} ${styles.transitButton}`}>
                    <Train size={24} /><span>{isKo ? '대중교통' : 'Transit'}</span>
                  </button>
                  <button onClick={() => openDirections('walking')} className={`${styles.directionButton} ${styles.walkingButton}`}>
                    <Footprints size={24} /><span>{isKo ? '도보' : 'Walking'}</span>
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
                <h3 className={styles.hoursTitle}>
                  <span>
                    {isKo ? '운영 시간' : 'Hours of Operation'}
                  </span>
                </h3>
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
              <h3 className={styles.infoTitle}>
                {isKo ? '전문 입시 가이드' : 'Expert Admissions Guidance'}
              </h3>
              <p className={styles.infoDescription}>
                {isKo
                  ? '데이터 기반의 전략과 개인별 맞춤형 로드맵으로 복잡한 대학 입시 과정을 완벽하게 가이드해 드립니다.'
                  : 'Navigate the complex landscape of university admissions with our data-driven strategies and personalized roadmaps.'}
              </p>
              <div className={styles.infoBadge}>
                <p>
                  <strong>{isKo ? '무료 레벨 테스트 & 상담' : 'Free Assessment'}</strong>
                </p>
                <p>
                  {isKo
                    ? '지금 바로 무료 학업 진단과 전문가 상담을 예약하세요.'
                    : 'Book a complimentary consultation and academic assessment today.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}