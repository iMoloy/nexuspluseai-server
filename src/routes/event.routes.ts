import { Router } from 'express';
import { streamEvents } from '../controllers/event.controller';

const router = Router();

// Public / Auth Event Stream endpoint
router.get('/stream', streamEvents);

export default router;
