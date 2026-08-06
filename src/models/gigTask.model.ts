import mongoose, { Schema, Document } from 'mongoose';
import { GigStatus } from '../types';

export interface IGigTaskDocument extends Document {
  client: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: Date;
  status: GigStatus;
  assignedFreelancer?: mongoose.Types.ObjectId;
  escrowReferenceId?: string;
}

const gigTaskSchema = new Schema<IGigTaskDocument>({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Task description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [1, 'Budget must be greater than zero']
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETED', 'CANCELLED'],
    default: 'OPEN'
  },
  assignedFreelancer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  escrowReferenceId: {
    type: String
  }
}, {
  timestamps: true
});

export const GigTask = mongoose.model<IGigTaskDocument>('GigTask', gigTaskSchema);
