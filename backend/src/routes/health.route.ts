import { Router } from 'express'
import { healthCheck, healthErrorTest } from '../controllers/health.contollers'

const healthRouter = Router()

// Health check endpoint
// /GET /health
healthRouter.get('/', healthCheck)

// Error checking 
// /GET /health/error
healthRouter.get('/error', healthErrorTest)

export default healthRouter