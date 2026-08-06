import { Router } from 'express';
import { generateTask, matchmaker, resolveDispute } from '../controllers/ai.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.post('/generate-task', generateTask);
router.post('/match', matchmaker);
router.post('/resolve-dispute', resolveDispute);

export default router;
