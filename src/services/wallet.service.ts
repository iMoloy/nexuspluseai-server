import { Wallet } from '../models/wallet.model';
import { Transaction } from '../models/transaction.model';

// Helper to get or create wallet
export const getOrCreateWallet = async (userId: string | any) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({ user: userId, balance: 0, escrowHold: 0 });
  }
  return wallet;
};

// Deposit Funds (Stripe / SSLCommerz Simulation)
export const depositFunds = async (userId: string | any, amount: number, description = 'In-App Wallet Deposit') => {
  if (amount <= 0) throw new Error('Deposit amount must be positive');

  const wallet = await getOrCreateWallet(userId);
  wallet.balance += amount;
  await wallet.save();

  const transaction = await Transaction.create({
    receiver: userId,
    type: 'DEPOSIT',
    amount,
    status: 'COMPLETED',
    description
  });

  return { wallet, transaction };
};

// Lock Funds into Escrow
export const lockEscrow = async (clientId: string | any, amount: number, referenceId: string, description = 'Escrow Lock for Booking/Gig') => {
  if (amount <= 0) throw new Error('Escrow amount must be positive');

  const wallet = await getOrCreateWallet(clientId);

  if (wallet.balance < amount) {
    throw new Error('Insufficient wallet balance for Escrow lock');
  }

  wallet.balance -= amount;
  wallet.escrowHold += amount;
  await wallet.save();

  const transaction = await Transaction.create({
    sender: clientId,
    type: 'ESCROW_LOCK',
    amount,
    status: 'COMPLETED',
    referenceId,
    description
  });

  return { wallet, transaction };
};

// Release Escrow Funds to Service Provider / Freelancer / Asset Owner
export const releaseEscrow = async (clientId: string | any, providerId: string | any, amount: number, referenceId: string, description = 'Escrow Payment Release') => {
  if (amount <= 0) throw new Error('Release amount must be positive');

  const clientWallet = await getOrCreateWallet(clientId);
  const providerWallet = await getOrCreateWallet(providerId);

  if (clientWallet.escrowHold < amount) {
    throw new Error('Insufficient Escrow hold balance to release');
  }

  clientWallet.escrowHold -= amount;
  await clientWallet.save();

  providerWallet.balance += amount;
  await providerWallet.save();

  const transaction = await Transaction.create({
    sender: clientId,
    receiver: providerId,
    type: 'ESCROW_RELEASE',
    amount,
    status: 'COMPLETED',
    referenceId,
    description
  });

  return { clientWallet, providerWallet, transaction };
};

// Refund Escrow Funds Back to Client
export const refundEscrow = async (clientId: string | any, amount: number, referenceId: string, description = 'Escrow Refund to Client') => {
  if (amount <= 0) throw new Error('Refund amount must be positive');

  const clientWallet = await getOrCreateWallet(clientId);

  if (clientWallet.escrowHold < amount) {
    throw new Error('Insufficient Escrow hold balance to refund');
  }

  clientWallet.escrowHold -= amount;
  clientWallet.balance += amount;
  await clientWallet.save();

  const transaction = await Transaction.create({
    receiver: clientId,
    type: 'ESCROW_REFUND',
    amount,
    status: 'COMPLETED',
    referenceId,
    description
  });

  return { clientWallet, transaction };
};
