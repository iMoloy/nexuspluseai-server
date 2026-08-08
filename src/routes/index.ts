import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import walletRoutes from './wallet.routes';
import assetRoutes from './asset.routes';
import rentalRoutes from './rental.routes';
import gigTaskRoutes from './gigTask.routes';
import aiRoutes from './ai.routes';
import eventRoutes from './event.routes';
import supportRoutes from './support.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
router.use('/assets', assetRoutes);
router.use('/rentals', rentalRoutes);
router.use('/gigs', gigTaskRoutes);
router.use('/ai', aiRoutes);
router.use('/events', eventRoutes);
router.use('/support', supportRoutes);

export default router;
