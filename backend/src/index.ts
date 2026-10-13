import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || '*';

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to AI Mentor Backend API',
    status: 'healthy',
    endpoints: {
      health: '/health',
      api: '/api'
    }
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'AI Mentor Backend API is active and running',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
