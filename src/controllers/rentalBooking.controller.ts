import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Asset } from '../models/asset.model';
import { RentalBooking } from '../models/rentalBooking.model';
import * as walletService from '../services/wallet.service';

export const createBooking = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { assetId, startDate, endDate } = req.body;

    if (!assetId || !startDate || !endDate) {
      res.status(400).json({ success: false, message: 'Asset ID, start date and end date are required' });
      return;
    }

    const asset = await Asset.findById(assetId);
    if (!asset || !asset.isAvailable) {
      res.status(404).json({ success: false, message: 'Asset is not available for rental' });
      return;
    }

    if (String(asset.owner) === String(req.user._id)) {
      res.status(400).json({ success: false, message: 'You cannot rent your own asset' });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));

    const totalPrice = days * asset.rentalRate;
    const depositAmount = asset.securityDeposit || 0;
    const totalEscrowLock = totalPrice + depositAmount;

    // Create Booking Document
    const booking = await RentalBooking.create({
      asset: asset._id,
      renter: req.user._id,
      owner: asset.owner,
      startDate: start,
      endDate: end,
      totalPrice,
      depositAmount,
      status: 'PENDING'
    });

    // Lock Escrow Funds (Rental Cost + Deposit)
    const { transaction } = await walletService.lockEscrow(
      req.user._id,
      totalEscrowLock,
      String(booking._id),
      `Escrow Lock for Asset Rental: ${asset.title}`
    );

    booking.escrowReferenceId = String(transaction._id);
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Rental booking created and Escrow funds locked successfully',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

export const confirmBooking = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await RentalBooking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ success: false, message: 'Rental booking not found' });
      return;
    }

    if (String(booking.owner) !== String(req.user._id)) {
      res.status(403).json({ success: false, message: 'Only the asset owner can confirm this booking' });
      return;
    }

    booking.status = 'ACTIVE';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Rental booking confirmed & status activated',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

export const completeBooking = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await RentalBooking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ success: false, message: 'Rental booking not found' });
      return;
    }

    if (booking.status === 'COMPLETED') {
      res.status(400).json({ success: false, message: 'Booking is already completed' });
      return;
    }

    // Release Escrow payment to Asset Owner
    await walletService.releaseEscrow(
      booking.renter,
      booking.owner,
      booking.totalPrice,
      String(booking._id),
      `Escrow Payment Release for Rental Completion`
    );

    // Refund security deposit back to Renter if deposit was paid
    if (booking.depositAmount > 0) {
      await walletService.refundEscrow(
        booking.renter,
        booking.depositAmount,
        String(booking._id),
        `Security Deposit Refund for Asset Rental`
      );
    }

    booking.status = 'COMPLETED';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Rental completed, Escrow payment released to owner, and security deposit refunded to renter',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};
