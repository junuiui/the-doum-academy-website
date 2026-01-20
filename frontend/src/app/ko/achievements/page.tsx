'use client'

import { useState, useEffect } from 'react'

import styles from './page.module.css'
import StatsSection from '../../../components/stats/StatsSections'
import { Slide } from '../../../components/features/Slide'
import { Lightbox } from '../../../components/features/Lighbox'

import { GalleryImageInterface } from '../../../interface/GalleryImage.interface'

const images: Record<number, GalleryImageInterface[]> = {
  2025: [
  ],
  2024: [
    { url: '/achievements/2024_ezzie_ubc.png', alt: 'Achievement 5', caption: 'Caption 5' },
    { url: '/achievements/2024_tony_ubc.png', alt: 'Achievement 5', caption: 'Caption 5' },
    { url: '/achievements/2024_tony_ubc2.png', alt: 'Achievement 5', caption: 'Caption 5' },
    { url: '/achievements/2024_tony_McMaster.png', alt: 'Achievement 5', caption: 'Caption 5' },
    { url: '/achievements/2024_ezzie_ut.png', alt: 'Achievement 5', caption: 'Caption 5' },
    { url: '/achievements/2024_ezzie_ut2.png', alt: 'Achievement 5', caption: 'Caption 5' },

  ],
  2023: [

  ],
};

const ALL = 'ALL' as const
type YearFilter = number | typeof ALL

const years: YearFilter[] = [
  ALL,
  ...Object.keys(images).map(Number).sort((a, b) => b - a),
]

export default function AchievementPage() {

  const [selectedYear, setSelectedYear] = useState<YearFilter>(years[0])
  const [rawData, setRawData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true)

        const query =
          selectedYear === 'ALL' ? '' : `?year=${selectedYear}`

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/achievements${query}`
        )

        const data = await res.json()
        setRawData(data)
      } catch (err) {
        console.error('Failed to fetch achievements', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [selectedYear])


  const slidesImages: GalleryImageInterface[] =
    selectedYear === 'ALL'
      ? Object.values(images).flat()
      : images[selectedYear] || []

  const handleImageClick = (image: GalleryImageInterface) => {
    const imageIndex = slidesImages.findIndex(
      (img) => img.url === image.url && img.caption === image.caption
    )
    setLightboxIndex(imageIndex >= 0 ? imageIndex : 0)
    setLightboxOpen(true)
  }

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % slidesImages.length)
  }

  const handlePreviousImage = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? slidesImages.length - 1 : prev - 1
    )
  }

  console.log("Page: ", rawData);

  return (
    <main className={styles.pageContainer}>
      <div className={styles.achievementCard}>
        {/* Main Header */}
        <div className={styles.mainHeader}>
          <h2> 학생들의 성과</h2>
          <p>우리 학생들의 노력으로 이루어진 성과를 소개합니다</p>
        </div>

        {/* Year Tabs */}
        <div className={styles.yearTabs}>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={selectedYear === year ? styles.active : ''}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.grid}>
          {/* Slides */}
          <div>
            <Slide
              data={{
                name: selectedYear === 'ALL' ? 'All Achievements' : `${selectedYear} Achievements`,
                images: slidesImages,
              }}
              onImageClick={handleImageClick}
              row={4}
              col={4}
            />
          </div>

          {/* Stats Section */}
          <div>
            <StatsSection rawData={rawData} year={selectedYear.toString()} />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {
        lightboxOpen && (
          <Lightbox
            images={slidesImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
          />
        )
      }
    </main >
  )
}