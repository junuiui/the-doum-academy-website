import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from "express";
import { Inquiry } from "../models/inquiry.model";
import { transporter } from "../utils/mailer.util";


/**
 * side-effect: send admin email
 */
const sendInquiryMail = async (inquiry: any) => {
  try {
    await transporter.sendMail({
      from: `"Doum Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry from ${inquiry.studentName}`,
      html: `
        <h3>New Inquiry</h3>
        <p><strong>Name:</strong> ${inquiry.studentName}</p>
        <p><strong>Contact:</strong> ${inquiry.phone ? inquiry.phone : inquiry.kakao
        }</p>
        <p><strong>Message:</strong></p>
        <p>${inquiry.message}</p>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }
};

// POST /inquiries
export const createInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("CREATE INQUIRY ROUTE HIT");
  try {
    const inquiry = await Inquiry.create(req.body);

    // fire and forget
    await sendInquiryMail(inquiry);

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};
