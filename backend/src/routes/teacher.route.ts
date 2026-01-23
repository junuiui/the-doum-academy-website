import { Request, Response, Router } from 'express';
import { Teacher } from '../models/teacher.model';

const teacherRouter = Router();

/**
 * GET /teachers
 * ?lang=en | ko
 */
teacherRouter.get('/', async (req: Request, res: Response) => {
  const teachers = await Teacher.find().sort({ id: 1 });

  res.json(teachers);
});

export default teacherRouter;