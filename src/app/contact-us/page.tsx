'use client';

import { useState } from 'react';
import { Location } from './location';
import styles from './page.module.css';

const inquiryOptions = [
    'Online Courses',
    'School Courses',
    'Summer School',
    'AP Courses',
    'English Test',
    'University Admission',
    'General Inquiry'
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
    'Other Course' // user inputs
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

                {/* 
                    Grade 
                    - Requirement:
                        - Grade 1 - 12 & Post-Secondary
                */}
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

                {/* 
                    School Name 
                    - Requirement
                        - 
                */}
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

                {/* Choosing the Location */}
                <div>
                    <label>Choose preferred Location</label>
                    <div>
                        <input type="radio" id="port-moody" name="location" value="port-moody" />
                        <label htmlFor="port-moody">Port Moody</label>
                    </div>

                    <div>
                        <input type="radio" id="vancouver" name="location" value="vancouver" />
                        <label htmlFor="vancouver">Vancouver</label>
                    </div>

                </div>

                {/* Message */}
                <div>
                    <label>Message</label>
                    <textarea
                        rows={5}
                        placeholder={
                            submitted
                                ? 'Your inquiry has been successfully submitted. We will contact you as soon as possible.'
                                : `Please describe in as much detail as possible the consultation you are requesting and the reason for your application.
(For example: your current learning situation, target school/grade, exam schedule, etc.)`
                        }
                    />
                </div>

                {/* Privacy Agreement */}
                <div>
                    <label>
                        <input type="checkbox" required /> I agree to the collection and use of personal information.
                    </label>
                </div>

                {/* Submit */}
                <button type="submit">Submit</button>
            </form>

            <Location />
        </main>
    );
}
