import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use(errorHandler);

export default app;
