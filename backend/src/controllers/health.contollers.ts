import { Request, Response } from 'express'

// Controller for health check endpoint
export const healthCheck = (req: Request, res: Response) => {

    // send simple status response
    res.json({ status: 'ok' })
}