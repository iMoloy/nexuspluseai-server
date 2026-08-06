import mongoose, { Schema, Document } from 'mongoose';
import { AssetCategory } from '../types';

export interface IAssetDocument extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: AssetCategory;
  rentalRate: number;
  securityDeposit: number;
  location: string;
  images: string[];
  isAvailable: boolean;
}

const assetSchema = new Schema<IAssetDocument>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Asset title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    enum: ['VEHICLE', 'TECH_EQUIPMENT', 'TOOLS', 'WORKSPACE'],
    required: [true, 'Category is required']
  },
  rentalRate: {
    type: Number,
    required: [true, 'Daily rental rate is required'],
    min: [0, 'Rental rate cannot be negative']
  },
  securityDeposit: {
    type: Number,
    default: 0,
    min: [0, 'Deposit cannot be negative']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Asset = mongoose.model<IAssetDocument>('Asset', assetSchema);
