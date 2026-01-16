import { Schema, model } from 'mongoose';

const InquirySchema = new Schema(
  {
    studentName: { type: String, required: true },
    grade: { type: String, required: true },
    schoolName: { type: String, required: true },

    phone: { type: String },
    kakao: { type: String },
    
    inquiry: { type: String, required: true },

    subject: { type: String },
    englishTest: { type: String },
    apCourse: { type: String },
    otherCourse: { type: String },

    location: { type: String, required: true },
    message: { type: String },

    // @todo admin.. for later
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = model('Inquiry', InquirySchema);
