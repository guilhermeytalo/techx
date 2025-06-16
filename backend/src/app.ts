import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import tasksRoutes from './routes/tasks.routes';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use(errorHandler);

export default app;
