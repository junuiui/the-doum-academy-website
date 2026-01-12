import express from 'express'
import { errorHandler } from './middlewares/error.middleware'
import { addRoutes } from './config/routes.config'

export function createApp() {
    const app: express.Express = express()

    // Parse incoming JSON request bodies
    app.use(express.json())

    addRoutes(app);
    
    app.use(errorHandler)

    return app;
}