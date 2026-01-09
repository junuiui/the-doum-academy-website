import express from 'express'
import healthRouter from './routes/health.route'

const app: express.Express = express()

// Parse incoming JSON request bodies
app.use(express.json())

// Register health check route
// All requests starting with /health will be handled here
app.use('/health', healthRouter)

export default app