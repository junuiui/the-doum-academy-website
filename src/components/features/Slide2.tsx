import { useState } from 'react';
import { MapPin, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageFallBack } from '../ui/ImageFallBack';
import styles from './Slide2.module.css';

interface GalleryImage {
    url: string;
    alt: string;
    caption: string;
}

interface GalleryData {
    name: string;
    location?: string;
    images: GalleryImage[];
}

interface Slide2Props {
    data: GalleryData;
    onImageClick?: (image: GalleryImage) => void;
    row?: number;
    col?: number;
}

export function Slide2({ data, onImageClick, row = 3, col = 2 }: Slide2Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = row * col;

    const totalPages = Math.ceil(data.images.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentImages = data.images.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top of the section
        const element = document.getElementById(`slide-${data.name.replace(/\s+/g, '-').toLowerCase()}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className={styles.campusSection} id={`slide-${data.name.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className={styles.slideCard}>
                <div className={styles.campusHeader}>
                    <div className={styles.campusHeaderContent}>
                        <h2 className={styles.campusTitle}>{data.name}</h2>

                        {data.location && (
                            <div className={styles.campusLocation}>
                                <MapPin size={18} />
                                <span>{data.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={styles.imageGrid}
                    style={{
                        '--grid-cols': col,
                    } as React.CSSProperties}
                >
                    {currentImages.map((image, index) => (
                        <div
                            key={index}
                            className={styles.imageCard}
                            onClick={() => onImageClick?.(image)}
                        >
                            <div className={styles.imageWrapper}>
                                <ImageFallBack
                                    src={image.url}
                                    alt={image.alt}
                                    className={styles.image}
                                />
                                <div className={styles.imageOverlay}>
                                    <ImageIcon size={32} />
                                    <p>View Full Size</p>
                                </div>
                            </div>
                            <div className={styles.imageCaption}>{image.caption}</div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.paginationButton}
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>

                        <div className={styles.pageNumbers}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                                    onClick={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            className={styles.paginationButton}
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* Image count info */}
                <div className={styles.imageInfo}>
                    Showing {startIndex + 1}-{Math.min(endIndex, data.images.length)} of {data.images.length} images
                </div>
            </div>
        </section>
    );
}