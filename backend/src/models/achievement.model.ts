import { Schema, model } from 'mongoose'

const AchievementSchema = new Schema(
    {
        name: { type: String, required: true, unique: false },
        year: { type: Number, required: true },
        School: { type: String, required: true },
        Major: { type: String, required: true },
        ScholarshipName: { type: String },
        ScholarshipAmount: { type: Number },
    },
    {
        timestamps: true,
    }
)

export const Achievement = model('Achievement', AchievementSchema)