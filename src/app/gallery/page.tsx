'use client'

import { useState } from 'react';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { ImageFallBack } from '@/components/ui/ImageFallBack';
import styles from './page.module.css';

const galleryData = {
    portmoody: {
        name: 'Port Moody Campus',
        location: '3003 St Johns St, Port Moody, BC',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
        ]
    },
    vancouver: {
        name: 'Vancouver Campus',
        location: '3215 Macdonald St, Vancouver, BC',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'art 1',
                caption: 'caption 1'
            },
        ]
    }
};

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string; caption: string } | null>(null);

    return (
        <div className={styles.pageContainer}>
            {/* Header */}
            {/* <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.pageTitle}>Our Campus Gallery</h1>
                    <p className={styles.pageSubtitle}>
                        Header Subtitle
                    </p>
                </div>
            </div> */}

            <div className={styles.mainContent}>
                {/* Port Moody Section */}
                <section className={styles.campusSection}>
                    <div className={styles.campusHeader}>
                        <div className={styles.campusHeaderContent}>
                            <h2 className={styles.campusTitle}>{galleryData.portmoody.name}</h2>
                            <div className={styles.campusLocation}>
                                <MapPin size={18} />
                                <span>{galleryData.portmoody.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.imageGrid}>
                        {galleryData.portmoody.images.map((image, index) => (
                            <div
                                key={index}
                                className={styles.imageCard}
                                onClick={() => setSelectedImage(image)}
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
                </section>

                {/* Vancouver Section */}
                <section className={styles.campusSection}>
                    <div className={styles.campusHeader}>
                        <div className={styles.campusHeaderContent}>
                            <h2 className={styles.campusTitle}>{galleryData.vancouver.name}</h2>
                            <div className={styles.campusLocation}>
                                <MapPin size={18} />
                                <span>{galleryData.vancouver.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.imageGrid}>
                        {galleryData.vancouver.images.map((image, index) => (
                            <div
                                key={index}
                                className={styles.imageCard}
                                onClick={() => setSelectedImage(image)}
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
                </section>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>
                            ×
                        </button>
                        <ImageFallBack
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className={styles.lightboxImage}
                        />
                        <div className={styles.lightboxCaption}>{selectedImage.caption}</div>
                    </div>
                </div>
            )}

        </div>
    );
}


/**
 * TODO:
 *  Need to implement next
 *  pagination? load more?
 */