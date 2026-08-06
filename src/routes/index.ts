import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import walletRoutes from './wallet.routes';
import assetRoutes from './asset.routes';
import rentalRoutes from './rental.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
router.use('/assets', assetRoutes);
router.use('/rentals', rentalRoutes);

export default router;
