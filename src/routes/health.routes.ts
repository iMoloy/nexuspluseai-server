import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import redisClient from '../config/redis';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  let redisStatus = 'Disconnected';

  if (redisClient && redisClient.status === 'ready') {
    redisStatus = 'Connected';
  }

  res.status(200).json({
    success: true,
    message: 'NexusPulse AI Backend Service (TypeScript) is healthy',
    timestamp: new Date().toISOString(),
    services: {
      mongodb: mongoStatus,
      redis: redisStatus
    }
  });
});

export default router;
