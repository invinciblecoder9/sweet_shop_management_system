import express from 'express';
import authRouter from './routes/authRouter';
import sweetsRouter from './routes/sweetsRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/sweets', sweetsRouter);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;