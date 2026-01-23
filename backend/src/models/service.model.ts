import { Schema, model } from 'mongoose';

const LangSchema = new Schema(
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
      type: LangSchema,
      required: true,
    },

    body: {
      type: [LangSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = model('Service', ServiceSchema);
