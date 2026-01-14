import { Router } from 'express';
import { Service } from '../models/service.model';

const serviceRouter = Router();

/**
 * GET /services
 * ?lang=en | ko
 */
serviceRouter.get('/', async (req, res) => {
    const { lang } = req.query;

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
});

export default serviceRouter;