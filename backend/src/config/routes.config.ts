import { Express } from "express";
import { healthRouter } from "../routes/health.route";
import { inquiryRouter } from "../routes/inquiry.route";
import teacherRouter from "../routes/teacher.route";
import achievementRouter from "../routes/achievement.route";
import serviceRouter from "../routes/service.route";

// register all application routes
export function addRoutes(app: Express) {
    app.use("/health", healthRouter)
    app.use("/inquiries", inquiryRouter);
    app.use('/teachers', teacherRouter);
    app.use('/achievements', achievementRouter);
    app.use('/services', serviceRouter)
}