import { Request, Response, NextFunction } from 'express'

// Gobal error handling middleware
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error"

    res.status(statusCode).json({
        success: false,
        message,
    })
}