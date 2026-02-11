import { Request, Response, NextFunction } from "express";
import { Location } from "../models/location.model";

/**
 * GET /locations
 */
export const getAllLocations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await Location.find().sort({ location: 1 })
    res.json(locations)
  } catch (e) {
    next(e)
  }
}
