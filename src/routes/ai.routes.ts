import { Router } from 'express';
import { generateTask, matchmaker, resolveDispute, verifyDelivery, calculateFare, matchRoute } from '../controllers/ai.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.post('/generate-task', generateTask);
router.post('/match', matchmaker);
router.post('/resolve-dispute', resolveDispute);
router.post('/verify-delivery', verifyDelivery);
router.post('/calculate-fare', calculateFare);
router.post('/match-route', matchRoute);

export default router;
