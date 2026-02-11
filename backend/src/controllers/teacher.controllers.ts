import { Request, Response, NextFunction } from 'express';
import { Teacher } from '../models/teacher.model';

/**
 * GET /teachers
 * ?lang=en | ko
 */
export const getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teachers = await Teacher.find().sort({ id: 1 });
    res.json(teachers);
  } catch (error) {
    next(error);
  }
};
