import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import walletRoutes from './wallet.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);

export default router;
