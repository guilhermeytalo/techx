import express from 'express';
import tasksRoutes from './routes/tasks.routes';

const app = express();
app.use(express.json());

app.use('/tasks', tasksRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});