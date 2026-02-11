import express, { Request, Response } from 'express'
import cors from 'cors'

import { errorHandler } from './middlewares/error.middleware'
import { addRoutes } from './config/routes.config'

export function createApp() {
  const app: express.Express = express()

  // Parse incoming JSON request bodies
  app.use(express.json())

  app.use(cors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // 쿠키/세션 전송 필요 시
  }))

  addRoutes(app);

  app.use(errorHandler)

  app.get('/', (req: Request, res: Response) => {
    res.send('The Doum Academy API Server is Running!');
  });

  return app;
}