import { Request, Response, NextFunction } from "express";
import { InquiryModel } from "../models/inquiry.model";

// POST /inquiries
export const createInquiry = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const inquiry = await InquiryModel.create(req.body);

        res.status(201).json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        next(error);
    }
};
