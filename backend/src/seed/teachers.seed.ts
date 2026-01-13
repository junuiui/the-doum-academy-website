import mongoose from 'mongoose';
import dotenv from 'dotenv';
import teachersData from './teachers.json';
import { Teacher } from '../models/teachers.model';

dotenv.config();

const seedTeachers = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log('MongoDB connected');

        // director / instructor 합치고 role 추가
        const directors = teachersData.director.map(d => ({
            ...d,
            role: 'director'
        }));

        const instructors = teachersData.instructors.map(i => ({
            ...i,
            role: 'instructor'
        }));

        // 모든 데이터를 하나의 배열로
        const allTeachers = [...directors, ...instructors];

        // insertMany로 넣기 전에 각 객체가 스키마 필드와 맞는지 확인
        const sanitizedTeachers = allTeachers.map(t => ({
            id: t.id,
            role: t.role,
            name: t.name,
            education: t.education || { en: '', ko: '' },
            experience: 'experience' in t ? t.experience : { en: [], ko: [] },
            bio: 'bio' in t ? t.bio : { en: '', ko: '' },
            profileImage: t.profileImage || null,
            certificate: 'certificate' in t ? t.certificate : { en: [], ko: [] },
            achievements: 'achievements' in t ? t.achievements : { en: '', ko: '' },
            subject: 'subject' in t ? t.subject : { en: [], ko: [] },
            core: 'core' in t ? t.core : { en: '', ko: '' },
        }));

        await Teacher.insertMany(sanitizedTeachers);
        console.log('Teachers seeded successfully');

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

seedTeachers();
