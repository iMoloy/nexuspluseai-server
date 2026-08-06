export type UserRole = 'CLIENT' | 'FREELANCER' | 'ASSET_OWNER' | 'ADMIN';

export interface IUser {
  _id?: any;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  kycVerified?: boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWallet {
  _id?: any;
  user: any;
  balance: number;
  escrowHold: number;
  currency: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAW' | 'ESCROW_LOCK' | 'ESCROW_RELEASE' | 'ESCROW_REFUND';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface ITransaction {
  _id?: any;
  sender?: any;
  receiver?: any;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  referenceId?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
