import { Schema, model } from 'mongoose';

const LocalizedTextSchema = new Schema(
    {
        en: { type: String, required: true },
        ko: { type: String, required: true },
    },
    { _id: false }
);

const ServiceBodySchema = new Schema(
    {
        en: { type: String, required: true },
        ko: { type: String, required: true },
    },
    { _id: false }
);

const ServiceSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },

        title: {
            type: LocalizedTextSchema,
            required: true,
        },

        body: {
            type: [ServiceBodySchema],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Service = model('Service', ServiceSchema);
