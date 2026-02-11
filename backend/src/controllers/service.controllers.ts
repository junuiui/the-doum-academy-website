import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/service.model';

/**
 * GET /services
 * ?lang=en | ko
 */
export const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lang } = req.query as { lang?: 'en' | 'ko' };

    const services = await Service.find().sort({ id: 1 });

    if (lang === 'en' || lang === 'ko') {
      const localized = services.map(s => ({
        id: s.id,
        title: s.title[lang],
        body: s.body.map(b => b[lang]),
      }));
      return res.json(localized);
    }

    res.json(services);
  } catch (error) {
    next(error);
  }
};
