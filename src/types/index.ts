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
