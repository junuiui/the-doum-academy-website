import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageFallBack } from '../ui/ImageFallBack';
import styles from './Lightbox.module.css';

interface LightboxProps {
    images: Array<{ url: string; alt: string; caption: string }>;
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export function Lightbox({ images, currentIndex, onClose, onNext, onPrevious }: LightboxProps) {
    const currentImage = images[currentIndex];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight') {
                onNext();
            } else if (e.key === 'ArrowLeft') {
                onPrevious();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrevious]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className={styles.lightbox} onClick={onClose}>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                {/* Previous Button */}
                {currentIndex > 0 && (
                    <button
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={onPrevious}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}

                {/* Next Button */}
                {currentIndex < images.length - 1 && (
                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={onNext}
                        aria-label="Next image"
                    >
                        <ChevronRight size={32} />
                    </button>
                )}

                {/* Image */}
                <div className={styles.imageContainer}>
                    <ImageFallBack
                        src={currentImage.url}
                        alt={currentImage.alt}
                        className={styles.lightboxImage}
                    />
                </div>

                {/* Caption and Counter */}
                <div className={styles.lightboxFooter}>
                    <div className={styles.imageCounter}>
                        {currentIndex + 1} / {images.length}
                    </div>
                    <div className={styles.lightboxCaption}>{currentImage.caption}</div>
                </div>
            </div>
        </div>
    );
}