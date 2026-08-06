import { Router } from 'express';
import { getBalance, deposit, getTransactions } from '../controllers/wallet.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/balance', getBalance);
router.post('/deposit', deposit);
router.get('/transactions', getTransactions);

export default router;
