'use client';

import { useState } from 'react';
import Location from './location';
import styles from './page.module.css';

const inquiryOptions = [
    'Online Courses',
    'School Courses',
    'Summer School'
];

const subjects = [
    'English 10',
    'English 11',
    'English 12',
    'Pre-Calculus 10',
    'Pre-Calculus 11',
    'Pre-Calculus 12',
    'Calculus 12',
    'Science 10',
    'Chemistry 11',
    'Chemistry 12',
    'Physics 11',
    'Physics 12',
    'Biology 11',
    'Biology 12',
    'Social Studies 10',
    'Social Studies 12',
    'Other Course'
];

export default function ContactUsPage() {
    const [inquiry, setInquiry] = useState('');
    const [subject, setSubject] = useState('');
    const [otherType, setOtherType] = useState('');
    const [phone, setPhone] = useState('');
    const [kakao, setKakao] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // TODO: send data to server / email
    };

    return (
        <main className={styles.container}>
            <h1>Contact Us</h1>

            <form className={styles.form} onSubmit={handleSubmit}>

                {/* Student Name */}
                <div>
                    <label>Student Name *</label>
                    <input required placeholder="Student Name" />
                </div>

                {/* Grade */}
                <div>
                    <label>Grade *</label>
                    <select required>
                        <option value="">Select Grade</option>
                        <option>Kindergarten</option>
                        <option>Grade 1</option>
                        <option>Grade 2</option>
                        <option>Grade 3</option>
                        <option>Grade 4</option>
                        <option>Grade 5</option>
                        <option>Grade 6</option>
                        <option>Grade 7</option>
                        <option>Grade 8</option>
                        <option>Grade 9</option>
                        <option>Grade 10</option>
                        <option>Grade 11</option>
                        <option>Grade 12</option>
                        <option>Gap Year</option>
                        <option>Post-Secondary</option>
                    </select>
                </div>

                {/* School Name */}
                <div>
                    <label>School Name *</label>
                    <input required placeholder="School Name" />
                </div>

                {/* Phone Number */}
                <div>
                    <label>Phone Number</label>
                    <input
                        placeholder="xxx xxx xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required={!kakao}
                    />
                </div>

                {/* Kakao ID */}
                <div>
                    <label>KakaoTalk ID</label>
                    <input
                        placeholder="kakao_id"
                        value={kakao}
                        onChange={(e) => setKakao(e.target.value)}
                        required={!phone}
                    />
                </div>

                {/* Inquiry Type */}
                <div>
                    <label>Inquiry Type *</label>
                    <select
                        required
                        value={inquiry}
                        onChange={(e) => {
                            setInquiry(e.target.value);
                            setSubject('');
                            setOtherType('');
                        }}
                    >
                        <option value="">Select Inquiry</option>
                        {inquiryOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Subject */}
                {inquiry && (
                    <div>
                        <label>Subject *</label>
                        <select
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Other Course Type */}
                {subject === 'Other Course' && (
                    <div>
                        <label>Other Subject *</label>
                        <select
                            required
                            value={otherType}
                            onChange={(e) => setOtherType(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="ap">AP Courses</option>
                            <option value="eng">English Tests</option>
                        </select>
                    </div>
                )}

                {/* AP Course Input */}
                {otherType === 'ap' && (
                    <div>
                        <label>AP Course Name *</label>
                        <input required placeholder="e.g. AP Calculus BC" />
                    </div>
                )}

                {/* English Test */}
                {otherType === 'eng' && (
                    <div>
                        <label>English Test *</label>
                        <select required>
                            <option value="">Select Test</option>
                            <option>IELTS</option>
                            <option>TOEFL</option>
                            <option>CELPIP</option>
                        </select>
                    </div>
                )}

                {/* Message */}
                <div>
                    <label>Message</label>
                    <textarea
                        rows={5}
                        placeholder={
                            submitted
                                ? '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
                                : `원하시는 상담 내용과 상담을 신청하신 이유를 가능한 한 구체적으로 작성해 주세요.
(예: 현재 학습 상황, 목표 학교/학년, 시험 일정 등)`
                        }
                    />
                </div>

                {/* Privacy Agreement */}
                <div>
                    <label>
                        <input type="checkbox" required /> 개인정보 수집 및 이용에 동의합니다.
                    </label>
                </div>

                {/* Submit */}
                <button type="submit">Submit</button>
            </form>

            <Location />
        </main>
    );
}
