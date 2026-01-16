import express from 'express'
import cors from 'cors'

import { errorHandler } from './middlewares/error.middleware'
import { addRoutes } from './config/routes.config'

export function createApp() {
  const app: express.Express = express()

  // Parse incoming JSON request bodies
  app.use(express.json())

  app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3001'

    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // 쿠키/세션 전송 필요 시
  }))

  addRoutes(app);

  app.use(errorHandler)

  return app;
}