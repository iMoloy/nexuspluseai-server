import { Router } from 'express';
import { createBooking, confirmBooking, completeBooking } from '../controllers/rentalBooking.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.post('/book', createBooking);
router.patch('/:id/confirm', confirmBooking);
router.patch('/:id/complete', completeBooking);

export default router;
