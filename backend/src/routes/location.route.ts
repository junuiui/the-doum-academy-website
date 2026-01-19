import { Router } from "express";
import { Location } from "../models/location.model";

const locationRouter = Router();

locationRouter.get('/', async (req, res) => {
  try {
    const locations = await Location.find().sort({ location: 1 })
    res.json(locations)
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch locations' })
  }
})