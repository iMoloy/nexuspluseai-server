import mongoose, { Schema, Document } from 'mongoose';
import { ProposalStatus } from '../types';

export interface IProposalDocument extends Document {
  gigTask: mongoose.Types.ObjectId;
  freelancer: mongoose.Types.ObjectId;
  coverLetter: string;
  proposedRate: number;
  status: ProposalStatus;
  proofSubmission?: string;
}

const proposalSchema = new Schema<IProposalDocument>({
  gigTask: {
    type: Schema.Types.ObjectId,
    ref: 'GigTask',
    required: true
  },
  freelancer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: [true, 'Cover letter is required']
  },
  proposedRate: {
    type: Number,
    required: [true, 'Proposed rate is required'],
    min: [1, 'Rate must be greater than zero']
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    default: 'PENDING'
  },
  proofSubmission: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const Proposal = mongoose.model<IProposalDocument>('Proposal', proposalSchema);
