import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../types';

export const generateAccessToken = (user: IUser | any): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any
  };
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'nexus_pulse_super_secret_jwt_key_2026',
    options
  );
};

export const generateRefreshToken = (user: IUser | any): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any
  };
  return jwt.sign(
    { id: user._id || user.id },
    process.env.JWT_REFRESH_SECRET || 'nexus_pulse_refresh_secret_key_2026',
    options
  );
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'nexus_pulse_super_secret_jwt_key_2026');
};

export const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'nexus_pulse_refresh_secret_key_2026');
};
