import { Router } from "express";
import { getAllLocations } from "../controllers/location.controllers";

const locationRouter = Router();

locationRouter.get('/', getAllLocations)

export default locationRouter;
