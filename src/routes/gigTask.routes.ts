import { Router } from 'express';
import {
  createGig,
  getGigs,
  getGigById,
  applyForGig,
  assignFreelancer,
  submitWork,
  approveWork
} from '../controllers/gigTask.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getGigs);
router.get('/:id', getGigById);

// Protected Gig & Kanban routes
router.post('/', protect, authorize('CLIENT', 'ADMIN'), createGig);
router.post('/:id/apply', protect, authorize('FREELANCER', 'CLIENT', 'ADMIN'), applyForGig);
router.patch('/:id/assign', protect, authorize('CLIENT', 'ADMIN'), assignFreelancer);
router.post('/:id/submit', protect, authorize('FREELANCER', 'ADMIN'), submitWork);
router.patch('/:id/approve', protect, authorize('CLIENT', 'ADMIN'), approveWork);

export default router;
