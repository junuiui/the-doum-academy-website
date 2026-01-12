import { Express } from "express";
import { healthRouter } from "../routes/health.route";
import { inquiryRouter } from "../routes/inquiry.route";

// register all application routes
export function addRoutes(app: Express) {
    app.use("/health", healthRouter)
    app.use("/inquiries", inquiryRouter);
}