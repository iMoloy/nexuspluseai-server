import { Request, Response } from 'express';
import { eventService } from '../services/event.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const streamEvents = (req: AuthRequest, res: Response): void => {
  const userId = req.user ? String(req.user._id) : undefined;
  eventService.addClient(userId, res);
};
