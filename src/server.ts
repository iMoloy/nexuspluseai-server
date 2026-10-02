import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import { createServer } from 'http';
import { initSocket } from './socket';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();

  const httpServer = createServer(app);
  initSocket(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`[NexusPulse Server TS] Running on http://localhost:${PORT}`);
    console.log(`[Health Check TS] Available at http://localhost:${PORT}/api/v1/health`);
  });
};

startServer();
