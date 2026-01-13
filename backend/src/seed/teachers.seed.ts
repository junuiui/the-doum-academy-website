import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Teacher } from '../models/teachers.model';
import teachers from './teachers.json';

dotenv.config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        console.log('MongoDB connected');

        await Teacher.deleteMany(); // 초기화
        await Teacher.insertMany(teachers);

        console.log('Teachers seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
