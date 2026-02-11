import { Router } from 'express';
import { getAllServices } from '../controllers/service.controllers';

const serviceRouter = Router();

serviceRouter.get('/', getAllServices);

export default serviceRouter;