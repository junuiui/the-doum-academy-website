import { Schema, model } from "mongoose";

// Inquiry schema definition
// @todo more needs to be added
const inquirySchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true},
        message: {type: String, required: true, trim: true},
    },
    {
        timestamps: true, // auto creation at createAt, updateAt
    }
);

// exporting the Model
export const InquiryModel = model("Inquiry", inquirySchema)