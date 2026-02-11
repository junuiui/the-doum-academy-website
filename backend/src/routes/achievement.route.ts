import { Router } from 'express'
import { getAllAchievements } from '../controllers/achievement.controllers'

const achievementRouter = Router()

achievementRouter.get('/', getAllAchievements)

export default achievementRouter
