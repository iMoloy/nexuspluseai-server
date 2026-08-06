import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Asset } from '../models/asset.model';

export const createAsset = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, category, rentalRate, securityDeposit, location, images } = req.body;

    if (!title || !description || !category || !rentalRate || !location) {
      res.status(400).json({ success: false, message: 'Please provide all required asset fields' });
      return;
    }

    const asset = await Asset.create({
      owner: req.user._id,
      title,
      description,
      category,
      rentalRate: Number(rentalRate),
      securityDeposit: Number(securityDeposit || 0),
      location,
      images: images || ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500']
    });

    res.status(201).json({
      success: true,
      message: 'Asset listed successfully',
      data: { asset }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssets = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, location, search } = req.query;
    const filter: any = { isAvailable: true };

    if (category) filter.category = category;
    if (location) filter.location = new RegExp(String(location), 'i');
    if (search) filter.title = new RegExp(String(search), 'i');

    const assets = await Asset.find(filter)
      .sort({ createdAt: -1 })
      .populate('owner', 'name email avatar');

    res.status(200).json({
      success: true,
      data: { assets }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssetById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const asset = await Asset.findById(req.params.id).populate('owner', 'name email avatar');
    if (!asset) {
      res.status(404).json({ success: false, message: 'Asset not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: { asset }
    });
  } catch (error) {
    next(error);
  }
};
