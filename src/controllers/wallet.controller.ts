import * as walletService from '../services/wallet.service';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Transaction } from '../models/transaction.model';

export const getBalance = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const wallet = await walletService.getOrCreateWallet(req.user._id);
    res.status(200).json({
      success: true,
      data: {
        balance: wallet.balance,
        escrowHold: wallet.escrowHold,
        currency: wallet.currency
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deposit = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount, paymentMethod } = req.body;
    if (!amount || Number(amount) <= 0) {
      res.status(400).json({ success: false, message: 'Valid deposit amount required' });
      return;
    }

    const methodLabel = paymentMethod ? `${paymentMethod} Deposit` : 'Wallet Deposit';
    const { wallet, transaction } = await walletService.depositFunds(req.user._id, Number(amount), methodLabel);

    res.status(200).json({
      success: true,
      message: 'Funds deposited successfully',
      data: {
        balance: wallet.balance,
        escrowHold: wallet.escrowHold,
        transaction
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email avatar')
      .populate('receiver', 'name email avatar');

    res.status(200).json({
      success: true,
      data: {
        transactions
      }
    });
  } catch (error) {
    next(error);
  }
};
