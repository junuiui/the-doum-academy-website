'use client'

import { useState } from 'react'
import Location from './location'
import styles from './page.module.css'

const gradeOptions = [
    'Grade 7', 'Grade 8', 'Grade 9',
    'Grade 10', 'Grade 11', 'Grade 12',
    'Gap Year'
]

const schoolSubjects = [
    'English 10', 'English 11', 'English 12',
    'Pre-Calculus 10', 'Pre-Calculus 11', 'Pre-Calculus 12',
    'Calculus 12',
    'Science 10',
    'Chemistry 11', 'Chemistry 12',
    'Physics 11', 'Physics 12',
    'Biology 11', 'Biology 12',
    'Social Studies 10', 'Social Studies 12'
]

const englishTests = ['IELTS', 'TOEFL', 'CELPIP']

export default function ContactUsPage() {
    const [inquiry, setInquiry] = useState('')
    const [phone, setPhone] = useState('')
    const [submitted, setSubmitted] = useState(false)

    return (
        <main className={styles.container}>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                }}
            >
                <h1 className={styles.title}>Contact Us</h1>

                {/* Student Info */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Student Name</label>
                        <input required />
                    </div>

                    <div className={styles.field}>
                        <label>Grade</label>
                        <select required>
                            <option value="">Select</option>
                            {gradeOptions.map(g => (
                                <option key={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>School Name</label>
                        <input required />
                    </div>

                    <div className={styles.field}>
                        <label>Phone Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                {/* Kakao ID */}
                <div className={styles.field}>
                    <label>KakaoTalk ID</label>
                    <input required={!phone} />
                </div>

                {/* Inquiry Type */}
                <div className={styles.field}>
                    <label>Inquiry Type</label>
                    <select
                        value={inquiry}
                        onChange={(e) => setInquiry(e.target.value)}
                        required
                    >
                        <option value="">Select</option>
                        <option value="school">School Courses</option>
                        <option value="online">Online Courses</option>
                        <option value="summer">Summer School</option>
                        <option value="english-test">English Tests</option>
                        <option value="other">Other Subject</option>
                        <option value="general">General Information</option>
                    </select>
                </div>

                {/* Conditional Subjects */}
                {(inquiry === 'school' || inquiry === 'online' || inquiry === 'summer') && (
                    <div className={styles.field}>
                        <label>Subject</label>
                        <select>
                            {schoolSubjects.map(s => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                )}

                {inquiry === 'english-test' && (
                    <div className={styles.field}>
                        <label>English Test</label>
                        <select>
                            {englishTests.map(t => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                )}

                {inquiry === 'other' && (
                    <div className={styles.field}>
                        <label>AP Course Name</label>
                        <input placeholder="e.g. AP Calculus BC" />
                    </div>
                )}

                {/* Message */}
                <div className={styles.field}>
                    <label>Message</label>
                    <textarea
                        rows={5}
                        placeholder="원하시는 상담 내용과 상담을 신청하신 이유를 가능한 한 구체적으로 작성해 주세요.
(예: 현재 학습 상황, 목표 학교/학년, 시험 일정 등)"
                        required
                    />
                </div>

                {/* Privacy */}
                <div className={styles.field}>
                    <label>
                        <input type="checkbox" required /> 개인정보 수집 및 이용에 동의합니다.
                    </label>
                </div>

                <button className={styles.submitBtn}>Submit</button>

                {submitted && (
                    <p className={styles.success}>
                        문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
                    </p>
                )}
            </form>

            <Location />
        </main>
    )
}
