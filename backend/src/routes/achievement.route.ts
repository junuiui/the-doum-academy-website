import { Router } from 'express';
import { Achievement } from '../models/achievement.model';

const achievementRouter = Router();

achievementRouter.get('/', async (req, res) => {
    try {
        const {
            year,
            school,
            major,
            name,
            sort = 'year',
            order = 'desc',
        } = req.query;

        const filter: any = {};

        // filtering
        if (year) filter.year = Number(year);
        if (school) filter.School = school;
        if (major) filter.Major = major;
        if (name) filter.name = { $regex: name, $options: 'i' };

        // sorting
        const sortOption: any = {};
        sortOption[sort as string] = order === 'asc' ? 1 : -1;

        const achievements = await Achievement.find(filter).sort(sortOption);

        res.json(achievements);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch achievements' });
    }
});

export default achievementRouter;
