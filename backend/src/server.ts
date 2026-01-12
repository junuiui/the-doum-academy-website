// import "reflect-metadata"

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { createApp } from './app';

// Load environment variables from .env file
dotenv.config();

const app = createApp();

const PORT = process.env.PORT || 3000;

// bootstrap function to start server
async function bootstrap() {
    try {
        if (!process.env.DB_URL || !process.env.DB_NAME) {
            throw new Error("ERRPR: DB env is not right");
        }

        // connect to db
        await mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME
        })

        console.log("==========\nMongo DB Connected\n==========")

        // start server
        app.listen(PORT, () => {
            console.log(`==========\nServer running on http://localhost:${PORT}\n==========`)
        });
    } catch (error) {
        console.error("ERROR: Server failed: ", error)
        process.exit(1);
    }

    
}

bootstrap();

