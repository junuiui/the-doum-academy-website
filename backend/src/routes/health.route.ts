import { Router } from 'express'
import { healthCheck } from '../controllers/health.contollers'

const router = Router()

// Health check endpoint
// /GET /health
router.get('/', healthCheck)

export default router