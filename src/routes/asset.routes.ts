import { Router } from 'express';
import { createAsset, getAssets, getAssetById } from '../controllers/asset.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getAssets);
router.get('/:id', getAssetById);

// Protected routes for listing assets
router.post('/', protect, authorize('ASSET_OWNER', 'ADMIN', 'CLIENT'), createAsset);

export default router;
