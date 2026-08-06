import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { GigTask } from '../models/gigTask.model';
import { Proposal } from '../models/proposal.model';
import * as walletService from '../services/wallet.service';

export const createGig = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, category, budget, deadline } = req.body;

    if (!title || !description || !category || !budget || !deadline) {
      res.status(400).json({ success: false, message: 'Please provide all required gig fields' });
      return;
    }

    const gigBudget = Number(budget);

    // Create Gig Task Document
    const gig = await GigTask.create({
      client: req.user._id,
      title,
      description,
      category,
      budget: gigBudget,
      deadline: new Date(deadline),
      status: 'OPEN'
    });

    // Lock Escrow Budget from Client's Wallet
    const { transaction } = await walletService.lockEscrow(
      req.user._id,
      gigBudget,
      String(gig._id),
      `Escrow Budget Lock for Gig: ${title}`
    );

    gig.escrowReferenceId = String(transaction._id);
    await gig.save();

    res.status(201).json({
      success: true,
      message: 'Gig task posted and budget locked in Escrow successfully',
      data: { gig }
    });
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search, status } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) filter.title = new RegExp(String(search), 'i');

    const gigs = await GigTask.find(filter)
      .sort({ createdAt: -1 })
      .populate('client', 'name email avatar')
      .populate('assignedFreelancer', 'name email avatar');

    res.status(200).json({
      success: true,
      data: { gigs }
    });
  } catch (error) {
    next(error);
  }
};

export const getGigById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const gig = await GigTask.findById(req.params.id)
      .populate('client', 'name email avatar')
      .populate('assignedFreelancer', 'name email avatar');

    if (!gig) {
      res.status(404).json({ success: false, message: 'Gig task not found' });
      return;
    }

    const proposals = await Proposal.find({ gigTask: gig._id }).populate('freelancer', 'name email avatar skills');

    res.status(200).json({
      success: true,
      data: { gig, proposals }
    });
  } catch (error) {
    next(error);
  }
};

export const applyForGig = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { coverLetter, proposedRate } = req.body;
    const gigId = req.params.id;

    const gig = await GigTask.findById(gigId);
    if (!gig || gig.status !== 'OPEN') {
      res.status(400).json({ success: false, message: 'Gig is not open for applications' });
      return;
    }

    if (String(gig.client) === String(req.user._id)) {
      res.status(400).json({ success: false, message: 'Client cannot apply to their own gig' });
      return;
    }

    const existingProposal = await Proposal.findOne({ gigTask: gigId as any, freelancer: req.user._id });
    if (existingProposal) {
      res.status(400).json({ success: false, message: 'You have already applied for this gig' });
      return;
    }

    const proposal = await Proposal.create({
      gigTask: gigId as any,
      freelancer: req.user._id,
      coverLetter,
      proposedRate: Number(proposedRate || gig.budget)
    });

    res.status(201).json({
      success: true,
      message: 'Proposal submitted successfully',
      data: { proposal }
    });
  } catch (error) {
    next(error);
  }
};

export const assignFreelancer = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { proposalId } = req.body;
    const gig = await GigTask.findById(req.params.id);

    if (!gig) {
      res.status(404).json({ success: false, message: 'Gig task not found' });
      return;
    }

    if (String(gig.client) !== String(req.user._id)) {
      res.status(403).json({ success: false, message: 'Only the gig client can select a freelancer' });
      return;
    }

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      res.status(404).json({ success: false, message: 'Proposal not found' });
      return;
    }

    proposal.status = 'ACCEPTED';
    await proposal.save();

    gig.assignedFreelancer = proposal.freelancer;
    gig.status = 'IN_PROGRESS';
    await gig.save();

    res.status(200).json({
      success: true,
      message: 'Freelancer assigned and Kanban status updated to IN_PROGRESS',
      data: { gig, proposal }
    });
  } catch (error) {
    next(error);
  }
};

export const submitWork = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { proofSubmission } = req.body;
    const gig = await GigTask.findById(req.params.id);

    if (!gig) {
      res.status(404).json({ success: false, message: 'Gig task not found' });
      return;
    }

    if (String(gig.assignedFreelancer) !== String(req.user._id)) {
      res.status(403).json({ success: false, message: 'Only the assigned freelancer can submit work' });
      return;
    }

    gig.status = 'UNDER_REVIEW';
    await gig.save();

    // Update proposal proof submission
    await Proposal.findOneAndUpdate(
      { gigTask: gig._id, freelancer: req.user._id },
      { proofSubmission }
    );

    res.status(200).json({
      success: true,
      message: 'Work submitted for review and Kanban status updated to UNDER_REVIEW',
      data: { gig }
    });
  } catch (error) {
    next(error);
  }
};

export const approveWork = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const gig = await GigTask.findById(req.params.id);

    if (!gig) {
      res.status(404).json({ success: false, message: 'Gig task not found' });
      return;
    }

    if (String(gig.client) !== String(req.user._id)) {
      res.status(403).json({ success: false, message: 'Only the gig client can approve work' });
      return;
    }

    if (gig.status === 'COMPLETED') {
      res.status(400).json({ success: false, message: 'Gig is already completed' });
      return;
    }

    // Release Escrow Payment to Freelancer
    await walletService.releaseEscrow(
      gig.client,
      gig.assignedFreelancer,
      gig.budget,
      String(gig._id),
      `Escrow Payment Release for Completed Gig: ${gig.title}`
    );

    gig.status = 'COMPLETED';
    await gig.save();

    res.status(200).json({
      success: true,
      message: 'Work approved, Escrow payment released to freelancer, and Kanban status updated to COMPLETED',
      data: { gig }
    });
  } catch (error) {
    next(error);
  }
};
