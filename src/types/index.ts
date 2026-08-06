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

export type AssetCategory = 'VEHICLE' | 'TECH_EQUIPMENT' | 'TOOLS' | 'WORKSPACE';

export interface IAsset {
  _id?: any;
  owner: any;
  title: string;
  description: string;
  category: AssetCategory;
  rentalRate: number;
  securityDeposit: number;
  location: string;
  images?: string[];
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface IRentalBooking {
  _id?: any;
  asset: any;
  renter: any;
  owner: any;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  depositAmount: number;
  status: BookingStatus;
  escrowReferenceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
