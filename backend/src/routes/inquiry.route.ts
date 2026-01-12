import { Router } from "express";
import { createInquiry } from "../controllers/inquiry.controllers";

export const inquiryRouter = Router();

// POST /inquiries
inquiryRouter.post("/", createInquiry);
