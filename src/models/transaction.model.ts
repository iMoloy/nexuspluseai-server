import mongoose, { Schema, Document } from 'mongoose';
import { TransactionType, TransactionStatus } from '../types';

export interface ITransactionDocument extends Document {
  sender?: mongoose.Types.ObjectId;
  receiver?: mongoose.Types.ObjectId;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  referenceId?: string;
  description?: string;
}

const transactionSchema = new Schema<ITransactionDocument>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['DEPOSIT', 'WITHDRAW', 'ESCROW_LOCK', 'ESCROW_RELEASE', 'ESCROW_REFUND'],
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required'],
    min: [0.01, 'Amount must be greater than zero']
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'COMPLETED'
  },
  referenceId: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const Transaction = mongoose.model<ITransactionDocument>('Transaction', transactionSchema);
