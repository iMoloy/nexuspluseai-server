import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexuspulse_db');
    console.log(`[MongoDB TS] Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`[MongoDB Error] ${error.message}`);
  }
};
