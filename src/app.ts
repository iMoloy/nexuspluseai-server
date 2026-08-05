import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes';
import { notFoundMiddleware } from './middlewares/notFound.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Route
app.get('/', (req: Request, res: Response) => {
  res.json({
    app: 'NexusPulse AI TypeScript API',
    version: '1.0.0',
    status: 'Active',
    documentation: '/api/v1/health'
  });
});

// API Routes
app.use('/api/v1', router);

// Error Middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
