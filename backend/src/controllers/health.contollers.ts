import { Request, Response, NextFunction } from 'express'

// Controller for health check endpoint
export const healthCheck = (req: Request, res: Response) => {

    // send simple status response
    res.json({ status: 'ok' })
}

// Controller to test error handling
export const healthErrorTest = (req: Request, res: Response, next: NextFunction) => {

    // Intentionally throw an error to test global error handler
    try {
        throw new Error('Health error test')
    } catch (error) {
        next(error);
    }

}