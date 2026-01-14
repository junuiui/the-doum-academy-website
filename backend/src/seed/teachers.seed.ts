import mongoose from 'mongoose';
import dotenv from 'dotenv';
import teachersData from './teachers.json';
import { Teacher } from '../models/teachers.model';

dotenv.config();

const seedTeachers = async () => {
    try {

        if (!process.env.DB_URL || !process.env.DB_NAME) {
            throw new Error('DB_URL or DB_NAME is missing in .env');
        }
        
        await mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        });
        console.log('MongoDB connected');

        // director / instructor combined and add role
        const directors = teachersData.director.map(d => ({
            ...d,
            role: 'director'
        }));

        const instructors = teachersData.instructors.map(i => ({
            ...i,
            role: 'instructor'
        }));

        // to one array
        const allTeachers = [...directors, ...instructors];

        // double checking
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
