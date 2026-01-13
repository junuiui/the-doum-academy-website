import { Router } from 'express';
import { Teacher } from '../models/teachers.model';

const teacherRouter = Router();

teacherRouter.get('/', async (req, res) => {
    const teachers = await Teacher.find().sort({ id: 1 });
    res.json(teachers);
});

export default teacherRouter;