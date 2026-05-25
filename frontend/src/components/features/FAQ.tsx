'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react'; // 로딩 아이콘 추가
import styles from './FAQ.module.css';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

interface FAQProps {
    isKo: boolean;
}

export default function FAQ({ isKo }: FAQProps) {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 💡 백엔드 API로부터 FAQ 데이터를 가저오는 비동기 이펙트
    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // 현재 언어 상태에 맞춰 Query Parameter 전송 (ko 또는 en)
                const langParam = isKo ? 'ko' : 'en';

                // 백엔드 주소 환경변수(NEXT_PUBLIC_API_URL) 세팅이 안 되어있다면 'http://localhost:8000' 직접 입력 가능
                const apiUrl = process.env.NEXT_PUBLIC_API_URL
                console.log(apiUrl)
                const response = await fetch(`${apiUrl}/faqs/?lang=${langParam}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch FAQ data from server');
                }

                const data: FAQItem[] = await response.json();
                setFaqs(data);
            } catch (err: any) {
                console.error('FAQ fetching error:', err);
                setError(err.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFAQs();
    }, [isKo]); // 언어 탭이 바뀔 때마다 백엔드에 쿼리를 새로 날려 데이터를 갱신함

    const toggleItem = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // ⏳ 1. 로딩 상태 렌더링 (디자인 무너짐 방지)
    if (isLoading) {
        return (
            <div className={styles.faqContainer} style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <Loader2 className="animate-spin" size={32} style={{ color: '#cbd5e1' }} />
            </div>
        );
    }

    // ⚠️ 2. 백엔드가 꺼져있거나 네트워크 에러가 났을 때 예외 처리
    if (error) {
        return (
            <div className={styles.faqContainer} style={{ textAlign: 'center', color: '#ef4444', padding: '1rem' }}>
                {isKo ? '자주 묻는 질문을 불러오는 중 오류가 발생했습니다.' : 'Error loading FAQs. Please try again later.'}
            </div>
        );
    }

    // 📭 3. 등록된 FAQ가 하나도 없을 때
    if (faqs.length === 0) {
        return (
            <div className={styles.faqContainer} style={{ textAlign: 'center', color: '#64748b', padding: '1rem' }}>
                {isKo ? '등록된 자주 묻는 질문이 없습니다.' : 'No FAQs available.'}
            </div>
        );
    }

    return (
        <div className={styles.faqContainer}>
            {faqs.map((item, index) => (
                <div
                    key={item.id} // 💡 하드코딩 배열 인덱스 대신 DB의 고유 PK인 item.id를 Key로 매핑하여 렌더링 성능 최적화
                    className={`${styles.faqItem} ${activeIndex === index ? styles.faqItemActive : ''}`}
                >
                    <button
                        className={styles.question}
                        onClick={() => toggleItem(index)}
                        aria-expanded={activeIndex === index}
                    >
                        <span className={styles.questionText}>{item.question}</span>
                        <ChevronDown className={styles.icon} size={20} />
                    </button>
                    <div className={styles.answer}>
                        <div className={styles.answerText}>
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}