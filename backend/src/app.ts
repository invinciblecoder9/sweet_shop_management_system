import express from 'express';
import authRouter from './routes/authRouter';
import sweetsRouter from './routes/sweetsRouter';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if not set

app.use(express.json());

// Mount routers
app.use('/api/auth', authRouter);
app.use('/api/sweets', sweetsRouter);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

export default app;