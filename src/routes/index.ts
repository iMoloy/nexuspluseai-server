import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// Section 1 Core Routes
router.use('/', healthRoutes);

export default router;
