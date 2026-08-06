import mongoose, { Schema, Document } from 'mongoose';

export interface IWalletDocument extends Document {
  user: mongoose.Types.ObjectId;
  balance: number;
  escrowHold: number;
  currency: string;
}

const walletSchema = new Schema<IWalletDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: [0, 'Wallet balance cannot be negative']
  },
  escrowHold: {
    type: Number,
    default: 0,
    min: [0, 'Escrow hold cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD'
  }
}, {
  timestamps: true
});

export const Wallet = mongoose.model<IWalletDocument>('Wallet', walletSchema);
