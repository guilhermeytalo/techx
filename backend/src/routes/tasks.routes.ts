import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();
const taskController = new TaskController();

router.get('/', (req, res) => taskController.getAllTasks(req, res));
router.post('/', (req, res) => taskController.createTask(req, res));
router.put('/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));
router.patch('/:id/done', (req, res) => taskController.toggleTaskDone(req, res));

export default router; 