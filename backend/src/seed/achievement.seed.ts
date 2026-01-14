import mongoose from 'mongoose';
import dotenv from 'dotenv';
import achievementsData from './achievement.json';
import { Achievement } from '../models/achievement.model';

dotenv.config();

const seedAchievements = async () => {
    try {
        if (!process.env.DB_URL || !process.env.DB_NAME) {
            throw new Error('DB_URL or DB_NAME is missing in .env');
        }

        await mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        });

        console.log('MongoDB connected');

        // check dup
        await Achievement.deleteMany({});
        console.log('Old achievements removed');

        const achievements = achievementsData.map((a: any) => ({
            name: a.Name,
            year: a.Year,
            School: a.School,
            Major: a.Major,
            ScholarshipName: a['Scholarship Name'],
            ScholarshipAmount: a['Scholarship Amount'],
        }));

        await Achievement.insertMany(achievements);

        console.log(`${achievements.length} achievements seeded successfully`);

        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (err) {
        console.error('Achievement seeding failed');
        console.error(err);
        process.exit(1);
    }
};

seedAchievements();
