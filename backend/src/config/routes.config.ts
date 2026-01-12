import { Express } from "express";
import healthRouter from "../routes/health.route";

// register all application routes
export function addRoutes(app: Express) {
    app.use("/health", healthRouter)
}