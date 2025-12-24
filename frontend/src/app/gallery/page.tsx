'use client'

import { useState } from 'react';
import { Slide } from '../../components/features/Slide';
import { Lightbox } from '../../components/features/Lighbox';
import styles from './page.module.css';

interface GalleryImage {
    url: string;
    alt: string;
    caption: string;
}

const galleryData = {
    portmoody: {
        name: 'Port Moody Campus',
        location: '3003 St Johns St, Port Moody, BC',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBzdHVkZW50c3xlbnwxfHx8fDE3NjYxMDIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Modern classroom',
                caption: 'State-of-the-art classrooms'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Study room',
                caption: 'Quiet study areas'
            },
            {
                url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NjE1ODk1OXww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Students learning',
                caption: 'Interactive learning sessions'
            },
            {
                url: 'https://images.unsplash.com/photo-1611074182055-4ac85bad8bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjYxNjEwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Classroom interior',
                caption: 'Bright and spacious learning environment'
            },
            {
                url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NjE0Mjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Library',
                caption: 'Resource library'
            },
            {
                url: 'https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjYxODUyODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Teacher and student',
                caption: 'One-on-one tutoring'
            },
            {
                url: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBzdHVkZW50c3xlbnwxfHx8fDE3NjYxMDIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Classroom 2',
                caption: 'Modern learning spaces'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Study area 2',
                caption: 'Comfortable study environment'
            },
            {
                url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NjE1ODk1OXww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Group learning',
                caption: 'Collaborative study sessions'
            },
            {
                url: 'https://images.unsplash.com/photo-1611074182055-4ac85bad8bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjYxNjEwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Learning space 2',
                caption: 'Well-equipped classrooms'
            },
            {
                url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NjE0Mjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Resources',
                caption: 'Extensive learning resources'
            },
            {
                url: 'https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjYxODUyODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Individual tutoring',
                caption: 'Personalized learning approach'
            },
            {
                url: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBzdHVkZW50c3xlbnwxfHx8fDE3NjYxMDIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Classroom 3',
                caption: 'Advanced learning facilities'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Study zone',
                caption: 'Dedicated study zones'
            }
        ]
    },
    vancouver: {
        name: 'Vancouver Campus',
        location: '3215 Macdonald St, Vancouver, BC',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjYxODUyODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Teacher student interaction',
                caption: 'Personalized instruction'
            },
            {
                url: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBzdHVkZW50c3xlbnwxfHx8fDE3NjYxMDIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Classroom',
                caption: 'Modern facilities'
            },
            {
                url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NjE0Mjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Study area',
                caption: 'Comfortable study spaces'
            },
            {
                url: 'https://images.unsplash.com/photo-1611074182055-4ac85bad8bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjYxNjEwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Learning space',
                caption: 'Dedicated learning rooms'
            },
            {
                url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2NjE1ODk1OXww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Group study',
                caption: 'Collaborative learning environment'
            },
            {
                url: 'https://images.unsplash.com/photo-1753546466496-d2d8a819f61a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHJvb20lMjBhY2FkZW15fGVufDF8fHx8MTc2NjE4NTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Study room',
                caption: 'Private tutoring rooms'
            },
            {
                url: 'https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjYxODUyODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Mentoring',
                caption: 'Expert guidance'
            },
            {
                url: 'https://images.unsplash.com/photo-1764720572930-eb63afd14b06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjBzdHVkZW50c3xlbnwxfHx8fDE3NjYxMDIzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Modern room',
                caption: 'Contemporary learning spaces'
            },
            {
                url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBsaWJyYXJ5fGVufDF8fHx8MTc2NjE0Mjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Resources center',
                caption: 'Rich learning materials'
            },
            {
                url: 'https://images.unsplash.com/photo-1611074182055-4ac85bad8bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjYxNjEwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                alt: 'Classroom space',
                caption: 'Spacious learning areas'
            }
        ]
    }
};

export default function GalleryPage() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentCampus, setCurrentCampus] = useState<'portmoody' | 'vancouver'>('portmoody');
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const handleImageClick = (campus: 'portmoody' | 'vancouver', image: GalleryImage) => {
        const campusImages = galleryData[campus].images;
        const imageIndex = campusImages.findIndex(
            (img) => img.url === image.url && img.caption === image.caption
        );

        setCurrentCampus(campus);
        setLightboxIndex(imageIndex >= 0 ? imageIndex : 0);
        setLightboxOpen(true);
    };

    const handleNextImage = () => {
        const currentImages = galleryData[currentCampus].images;
        if (lightboxIndex < currentImages.length - 1) {
            setLightboxIndex(lightboxIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (lightboxIndex > 0) {
            setLightboxIndex(lightboxIndex - 1);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Slide
                data={galleryData.portmoody}
                onImageClick={(image) => handleImageClick('portmoody', image)}
                row={3}
                col={4}
            />

            <Slide
                data={galleryData.vancouver}
                onImageClick={(image) => handleImageClick('vancouver', image)}
                row={3}
                col={4}
            />

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <Lightbox
                    images={galleryData[currentCampus].images}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                    onNext={handleNextImage}
                    onPrevious={handlePreviousImage}
                />
            )}
        </div>
    );
}
