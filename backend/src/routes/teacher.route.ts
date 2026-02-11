import { Router } from 'express';
import { getAllTeachers } from '../controllers/teacher.controllers';

const teacherRouter = Router();

/**
 * GET /teachers
 * ?lang=en | ko
 */
teacherRouter.get('/', getAllTeachers);

export default teacherRouter;