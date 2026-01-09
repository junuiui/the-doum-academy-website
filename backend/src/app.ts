import express from 'express'

// Routes =================
import healthRouter from './routes/health.route'

// Middleware =================
import { errorHandler } from './middlewares/error.middleware'

const app: express.Express = express()

// Parse incoming JSON request bodies
app.use(express.json())

// Register health check route
// All requests starting with /health will be handled here
app.use('/health', healthRouter)


// Register global error handler
app.use(errorHandler);

export default app