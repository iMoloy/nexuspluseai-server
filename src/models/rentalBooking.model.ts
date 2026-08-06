import mongoose, { Schema, Document } from 'mongoose';
import { BookingStatus } from '../types';

export interface IRentalBookingDocument extends Document {
  asset: mongoose.Types.ObjectId;
  renter: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  depositAmount: number;
  status: BookingStatus;
  escrowReferenceId?: string;
}

const rentalBookingSchema = new Schema<IRentalBookingDocument>({
  asset: {
    type: Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  renter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  depositAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  escrowReferenceId: {
    type: String
  }
}, {
  timestamps: true
});

export const RentalBooking = mongoose.model<IRentalBookingDocument>('RentalBooking', rentalBookingSchema);
