import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use(errorHandler);

export default app;
