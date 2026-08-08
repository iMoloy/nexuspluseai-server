import { Router } from 'express';
import { register, login, refresh, logout, getProfile, googleSync } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.get('/me', protect, getProfile);
router.post('/google-sync', googleSync);

export default router;
