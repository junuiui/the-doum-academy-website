import { Router } from 'express';
import { Teacher } from '../models/teachers.model';

const teacherRouter = Router();

/**
 * GET /teachers
 * ?lang=en | ko
 */
teacherRouter.get('/', async (req, res) => {
  const teachers = await Teacher.find().sort({ id: 1 });

  // Language option
  // const { lang } = req.query;

  // if (lang === 'en' || lang === 'ko') {
  //     const localized = teachers.map(s => ({
  //         id: s.id,
  //         title: s.title[lang],
  //         body: s.body.map(b => b[lang]),
  //     }));
  //     return res.json(localized);
  // }

  res.json(teachers);
});

export default teacherRouter;