/* src/components/features/FAQ.tsx */
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  isKo: boolean;
}

const FAQ_DATA = {
  en: [
    {
      question: "What are the hours of operation?",
      answer: "We are open Monday to Friday, from 4:00 PM to 10:00 PM. We are closed on weekends and public holidays."
    },
    {
      question: "Do you offer free level tests?",
      answer: "Yes, we provide a complimentary academic assessment and consultation for all new students to determine the best roadmap for success."
    },
    {
      question: "Are live online classes available?",
      answer: "Absolutely. We offer live sessions via Zoom/Google Meet for students who prefer or require remote learning."
    },
    {
      question: "Is parking available at the academy?",
      answer: "Yes, free parking is available for parents and students in the academy building."
    },
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment through our 'Contact Us' page or by calling our office directly during business hours."
    }
  ],
  ko: [
    {
      question: "운영 시간은 어떻게 되나요?",
      answer: "월요일부터 금요일, 오후 4시부터 10시까지 운영합니다. 주말과 공휴일은 휴무입니다."
    },
    {
      question: "무료 레벨 테스트가 가능한가요?",
      answer: "네, 모든 신규 학생들에게 무료 학업 진단과 전문가 상담을 제공하여 최적의 로드맵을 설계해 드립니다."
    },
    {
      question: "온라인 수업도 진행하시나요?",
      answer: "네, 대면 수업이 어려운 학생들을 위해 Zoom 또는 Google Meet을 통한 실시간 온라인 수업을 제공합니다."
    },
    {
      question: "주차가 가능한가요?",
      answer: "네, 학원 건물 내에 학부모님과 학생들을 위한 무료 주차 공간이 마련되어 있습니다."
    },
    {
      question: "상담 예약은 어떻게 하나요?",
      answer: "'문의하기' 페이지의 폼을 작성하시거나, 운영 시간 내에 학원으로 전화 주시면 예약을 도와드립니다."
    }
  ]
};

export default function FAQ({ isKo }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = isKo ? FAQ_DATA.ko : FAQ_DATA.en;

  return (
    <div className={styles.faqContainer}>
      {data.map((item, index) => (
        <div
          key={index}
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
