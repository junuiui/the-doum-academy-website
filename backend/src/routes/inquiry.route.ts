import { Router } from 'express';
import { Inquiry } from '../models/inquiry.model';
import { createInquiry } from '../controllers/inquiry.controllers';

const inquiryRouter = Router();

// /**
//  * POST /inquiries
//  */
// inquiryRouter.post('/', async (req, res, next) => {
//   try {
//     const inquiry = await Inquiry.create(req.body);
//     res.status(201).json(inquiry);
//   } catch (err) {
//     next(err);
//   }
// });
inquiryRouter.post('/', createInquiry);

/**
 * GET /inquiries
 */
inquiryRouter.get('/', async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

export default inquiryRouter;
