import { Schema, model } from 'mongoose'

// language object: { en, ko }
const LangSchema = new Schema(
    {
        en: { type: Schema.Types.Mixed },
        ko: { type: Schema.Types.Mixed },
    },
    { _id: false }
)

const TeacherSchema = new Schema(
    {
        // custom numeric id (for ordering, frontend use)
        id: { type: Number, required: true, unique: true },

        // director or instructor
        role: {
            type: String,
            enum: ['director', 'instructor'],
            required: true,
        },

        // name in multiple languages
        name: {
            en: { type: String, required: true },
            ko: { type: String, required: true },
        },

        profileImage: {
            type: String,
            default: null,
        },

        // common but optional
        education: LangSchema,

        // director-only fields
        subject: LangSchema,
        bio: LangSchema,
        experience: LangSchema,
        certificate: LangSchema,
        achievements: LangSchema,

        // instructor-only field
        core: LangSchema,
    },
    {
        timestamps: true,
    }
)

export const Teacher = model('Teacher', TeacherSchema)
