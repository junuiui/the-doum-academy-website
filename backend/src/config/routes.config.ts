import { Express } from "express";
import inquiryRouter from "../routes/inquiry.route";
import teacherRouter from "../routes/teacher.route";
import achievementRouter from "../routes/achievement.route";
import serviceRouter from "../routes/service.route";
import locationRouter from "../routes/location.route";

// register all application routes
export function addRoutes(app: Express) {
    app.use('/teachers', teacherRouter);
    app.use('/achievements', achievementRouter);
    app.use('/services', serviceRouter)
    app.use('/inquiries', inquiryRouter);
    app.use('/locations', locationRouter)
}