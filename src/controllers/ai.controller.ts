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

export const verifyDelivery = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { taskRequirements, imageBase64 } = req.body;

    if (!taskRequirements) {
      res.status(400).json({ success: false, message: 'Task requirements needed for verification' });
      return;
    }

    const verificationResult = await aiService.verifyProofOfDelivery(taskRequirements, imageBase64);

    res.status(200).json({
      success: true,
      message: 'AI proof-of-delivery verification complete',
      data: verificationResult
    });
  } catch (error) {
    next(error);
  }
};

export const calculateFare = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { pickup, dropoff, category, vehicleType } = req.body;

    if (!pickup || !dropoff) {
      res.status(400).json({ success: false, message: 'Pickup and dropoff locations are required' });
      return;
    }

    const fareResult = await aiService.calculateDynamicFare(
      pickup,
      dropoff,
      category || 'Ride',
      vehicleType || 'Car'
    );

    res.status(200).json({
      success: true,
      message: 'AI dynamic fare calculated',
      data: fareResult
    });
  } catch (error) {
    next(error);
  }
};

export const matchRoute = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { pickup, dropoff } = req.body;

    if (!pickup || !dropoff) {
      res.status(400).json({ success: false, message: 'Current route pickup and dropoff required' });
      return;
    }

    const matchedAddon = await aiService.findOptimizedRouteAddons({ pickup, dropoff });

    res.status(200).json({
      success: true,
      message: 'AI optimal route addon matched',
      data: matchedAddon
    });
  } catch (error) {
    next(error);
  }
};
