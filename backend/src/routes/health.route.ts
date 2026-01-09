import { Router } from 'express'
import { healthCheck, healthErrorTest } from '../controllers/health.contollers'

const router = Router()

// Health check endpoint
// /GET /health
router.get('/', healthCheck)

// Error checking 
// /GET /health/error
router.get('/error', healthErrorTest)

export default router