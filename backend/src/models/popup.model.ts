import { Schema, model } from 'mongoose';

// language object: { en, ko }
const LangSchema = new Schema(
  {
    en: { type: String, required: true },
    ko: { type: String, required: true },
  },
  { _id: false }
);


const PopupSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },

    title: {
      type: LangSchema,
      required: true
    },

    body: {
      type: [LangSchema],
      required: true
    }
  }
)

export const Popup = model('Popup', PopupSchema)