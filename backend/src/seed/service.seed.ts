import mongoose from 'mongoose';
import dotenv from 'dotenv';
import servicesData from './services.json';
import { Service } from '../models/service.model';

dotenv.config();

const seedServices = async () => {
    try {

        if (!process.env.DB_URL || !process.env.DB_NAME) {
            throw new Error('DB_URL or DB_NAME is missing in .env');
        }
        
        await mongoose.connect(process.env.DB_URL!, {
            dbName: process.env.DB_NAME,
        });

        console.log('MongoDB connected');

        // id 기준 중복 방지 (선택)
        await Service.deleteMany({});

        const sanitized = servicesData.map((s: any) => ({
            id: s.id,
            title: {
                en: s.title.en,
                ko: s.title.ko,
            },
            body: s.body.map((b: any) => ({
                en: b.en,
                ko: b.ko,
            })),
        }));

        await Service.insertMany(sanitized);

        console.log('Services seeded successfully');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Service seeding failed');
        console.error(err);
    }
};

seedServices();
