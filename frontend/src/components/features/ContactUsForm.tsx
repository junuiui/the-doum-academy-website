import { useState } from 'react';
import {
    User, GraduationCap, School, Phone, MessageSquare, BookOpen, Send, MapPin, SquarePen
} from 'lucide-react';
import { locationData } from './location';
import styles from './ContactUsForm.module.css';
import Toast from '../ui/Toast';
import { usePathname } from 'next/navigation';

const inquiries = [
    'Online Courses',
    'School Courses',
    'Summer School',
    'AP Courses',
    'English Tests',
    'Other'
] as const;

const subjects = [
    'English 10', 'English 11', 'English 12',
    'Pre-Calculus 10', 'Pre-Calculus 11', 'Pre-Calculus 12',
    'Calculus 12',
    'Science 10',
    'Chemistry 11', 'Chemistry 12',
    'Physics 11', 'Physics 12',
    'Biology 11', 'Biology 12',
    'Social Studies 10', 'Social Studies 12',
    'Other Course'
] as const;

const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9',
    'Grade 10', 'Grade 11', 'Grade 12',
    'Gap Year', 'Post-Secondary'
] as const;

const englishTests = [
    'IELTS', 'CELPIP', 'TOEFL'
] as const;

type Inquiry = typeof inquiries[number];
type Subject = typeof subjects[number];
type Grade = typeof grades[number];
type EnglishTest = typeof englishTests[number];

type Form = {
    studentName: string;
    grade: Grade | '';
    schoolName: string;
    phone: string;
    kakao: string;
    inquiry: Inquiry | '';
    subject: Subject | '';
    englishTest: EnglishTest | '';
    apCourse: string;
    otherCourse: string;
    location: keyof typeof locationData | '';
    message: string;
};

const initialForm: Form = {
    studentName: '',
    grade: '',
    schoolName: '',
    phone: '',
    kakao: '',
    inquiry: '',
    subject: '',
    englishTest: '',
    apCourse: '',
    otherCourse: '',
    location: 'portmoody',
    message: '',
};

export default function ContactUsForm() {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const pathname = usePathname();
    const isKo = pathname.startsWith('/ko');
    const lang = isKo ? 'ko' : 'en';

    const [form, setForm] = useState<Form>(initialForm);

    const updateForm = <K extends keyof Form>(key: K, value: Form[K]) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);

        setToastMessage(lang === 'ko'
            ? "문의가 성공적으로 접수.."
            : `Your inquiry has been successfully submitted. We will contact you as soon as possible.`);
        setToastVisible(true);

        setTimeout(() => {
            setToastVisible(false);
            setSubmitting(false);
        }, 5000);

        setForm(initialForm);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Form */}
            <section className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>{lang === 'ko' ? "문의하기" : "Send us a message"}</h2>
                    <p className={styles.formDescription}>
                        {lang === 'ko' ? "한글 description" : 'Fill out the form below and we will get back to you as soon as possible'}
                    </p>
                </div>

                <form
                    key={Date.now()}
                    className={styles.form}
                    onSubmit={handleSubmit}>

                    {/* Student Name */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <User size={18} className={styles.labelIcon} />
                            {lang === 'ko' ? "학생 이름 *" : "Student Name *"}
                        </label>
                        <input
                            className={styles.input}
                            required
                            value={form.studentName}
                            onChange={(e) => updateForm('studentName', e.target.value)}
                            placeholder={lang === 'ko' ? "학생 이름을 입력해주세요." : "Enter student's full name"}
                        />
                    </div>

                    {/* Grade + School */}
                    <div className={styles.formRow}>
                        {/* Grade */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <GraduationCap size={18} className={styles.labelIcon} />
                                {lang === 'ko' ? "학년 *" : "Grade *"}
                            </label>
                            <select
                                className={styles.select}
                                required
                                value={form.grade}
                                onChange={(e) => updateForm('grade', e.target.value as Grade)}
                            >
                                <option value="">{lang === 'ko' ? "학년을 선택해주세요." : "Select Grade"}</option>
                                {grades.map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        {/* School */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <School size={18} className={styles.labelIcon} />
                                {lang === 'ko' ? "학교" : "Enter school Name *"}
                            </label>
                            <input
                                className={styles.input}
                                required
                                value={form.schoolName}
                                onChange={(e) => updateForm('schoolName', e.target.value)}
                                placeholder={lang === 'ko' ? "학교 이름을 입력해주세요." : "Enter current school name"}
                            />
                        </div>
                    </div>

                    {/* Contact Information group */}
                    <div className={styles.formRow}>
                        {/* Phone */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <Phone size={18} className={styles.labelIcon} />
                                {lang === 'ko' ? "전화번호" : "Phone Number"} {!form.kakao && '*'}
                            </label>
                            <input
                                className={styles.input}
                                value={form.phone}
                                onChange={(e) => updateForm('phone', e.target.value)}
                                placeholder={lang === 'ko' ? "전화번호를 입력해주세요." : "Enter phone number"}
                                required={!form.kakao}
                            />
                        </div>

                        {/* Kakao */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                <MessageSquare size={18} className={styles.labelIcon} />
                                {lang === 'ko' ? "카카오톡 ID" : "KakaoTalk ID"} {!form.phone && '*'}
                            </label>
                            <input
                                className={styles.input}
                                value={form.kakao}
                                onChange={(e) => updateForm('kakao', e.target.value)}
                                placeholder={lang === 'ko' ? "카카오톡 ID를 입력해주세요." : "Enter your KakaoTalk ID"}
                                required={!form.phone}
                            />
                            <p className={styles.helperText}>
                                {lang === 'ko' ? "전화번호나 카카오톡 ID 하나 이상을 입력주세요." : "Please provide either phone number or KakaoTalk ID"}
                            </p>
                        </div>
                    </div>

                    {/* Inquiry Type */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <BookOpen size={18} className={styles.labelIcon} />
                            {lang === 'ko' ? "문의 유형" : "Inquiry Type *"}
                        </label>
                        <select
                            className={styles.select}
                            required
                            value={form.inquiry}
                            onChange={(e) => {
                                updateForm('inquiry', e.target.value as Inquiry);
                                updateForm('subject', '');
                                updateForm('englishTest', '');
                            }}
                        >
                            <option value="">Select Inquiry Type</option>
                            {inquiries.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subject */}
                    {(form.inquiry === 'Online Courses' ||
                        form.inquiry === 'School Courses' ||
                        form.inquiry === 'Summer School') && (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Subject *</label>
                                <select
                                    className={styles.select}
                                    required
                                    value={form.subject}
                                    onChange={(e) => updateForm('subject', e.target.value as Subject)}
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                    {/* AP */}
                    {form.inquiry === 'AP Courses' && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>AP Course Name *</label>
                            <input
                                className={styles.input}
                                required
                                value={form.apCourse}
                                onChange={(e) => updateForm('apCourse', e.target.value)}
                                placeholder="e.g. AP Calculus BC"
                            />
                        </div>
                    )}

                    {/* English Test */}
                    {form.inquiry === 'English Tests' && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>English Test *</label>
                            <select
                                className={styles.select}
                                required
                                value={form.englishTest}
                                onChange={(e) => updateForm('englishTest', e.target.value as EnglishTest)}
                            >
                                <option value="">Select Test</option>
                                <option>IELTS</option>
                                <option>TOEFL</option>
                                <option>CELPIP</option>
                            </select>
                        </div>
                    )}

                    {/* Location Selection */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MapPin size={18} className={styles.labelIcon} />
                            {lang === 'ko' ? "학원 위치" : "Location *"}
                        </label>
                        <div className={styles.locationButtons}>
                            {Object.keys(locationData).map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={`${styles.locationButton} ${form.location === key ? styles.locationButtonActive : ''
                                        }`}
                                    onClick={() => updateForm('location', key as keyof typeof locationData)}
                                >
                                    {locationData[key as keyof typeof locationData].name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <SquarePen size={18} className={styles.labelIcon} />
                            {lang === 'ko' ? "문의 내용" : "Message"}
                        </label>
                        <textarea
                            className={styles.textarea}
                            rows={5}
                            value={form.message}
                            onChange={(e) => updateForm('message', e.target.value)}
                            placeholder={lang === 'ko'
                                ? "현재 상태가 어떠신지, 어떤 목표를 가지고 계신지, 그리고 시간은 언제쯤 괜찮으신지 설명 부탁드립니다."
                                : "Please describe your situation, goals, and schedule."}
                        />
                    </div>

                    {/* Privacy */}
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} required />
                            <span>{lang === 'ko' ? "개인정보 수집 및 이용에 동의합니다. *" : "I agree to the collection and use of personal information. *"}</span>
                        </label>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                        className={styles.submitButton}
                        disabled={submitting}
                    >
                        <Send size={20} />
                        <span>Submit Inquiry</span>
                    </button>
                </form>
            </section>

            <Toast
                message={toastMessage}
                visible={toastVisible}
            />
        </div>
    );
}
