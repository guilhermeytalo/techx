import { Router, Request, Response, RequestHandler } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
  };
}

const router = Router();
const taskController = new TaskController();

router.use(authenticateToken as RequestHandler);

router.get('/', taskController.getAllTasks as RequestHandler);
router.post('/', taskController.createTask as RequestHandler);
router.put('/:id', taskController.updateTask as RequestHandler);
router.delete('/:id', taskController.deleteTask as RequestHandler);
router.patch('/:id/done', taskController.toggleTaskDone as RequestHandler);

export default router; 