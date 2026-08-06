import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as aiService from '../services/ai.service';

export const generateTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { prompt, category } = req.body;

    if (!prompt) {
      res.status(400).json({ success: false, message: 'Prompt is required for AI task generation' });
      return;
    }

    const aiGeneratedData = await aiService.generateTaskDescription(prompt, category || 'General');

    res.status(200).json({
      success: true,
      message: 'AI task description generated successfully',
      data: aiGeneratedData
    });
  } catch (error) {
    next(error);
  }
};

export const matchmaker = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userQuery, items } = req.body;

    if (!userQuery || !items || !Array.isArray(items)) {
      res.status(400).json({ success: false, message: 'Valid query and items array required' });
      return;
    }

    const rankedItems = await aiService.recommendFreelancersOrAssets(userQuery, items);

    res.status(200).json({
      success: true,
      message: 'AI matchmaking recommendations generated',
      data: { rankedItems }
    });
  } catch (error) {
    next(error);
  }
};

export const resolveDispute = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { gigTitle, chatLogs, submissionProof } = req.body;

    if (!gigTitle || !submissionProof) {
      res.status(400).json({ success: false, message: 'Gig title and submission proof required for dispute analysis' });
      return;
    }

    const disputeAnalysis = await aiService.analyzeDispute(gigTitle, chatLogs || '', submissionProof);

    res.status(200).json({
      success: true,
      message: 'AI dispute settlement recommendation generated',
      data: disputeAnalysis
    });
  } catch (error) {
    next(error);
  }
};
