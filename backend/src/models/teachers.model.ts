import { Schema, model } from "mongoose";

const LocalizedString = {
    en: { type: String, required: true },
    ko: { type: String, required: true }
};

const TeacherSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },

        name: LocalizedString,

        bio: LocalizedString,

        education: LocalizedString,

        subject: {
            en: [String],
            ko: [String]
        },

        profileImage: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

export const Teacher = model('Teacher', TeacherSchema);
