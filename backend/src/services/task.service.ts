import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export async function getAllTasksData(): Promise<any[]> {
  return [];
}

export async function getAllTasksHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tasks = await getAllTasksData();
    res.json(tasks);
  } catch (error) {
    logger.error('Failed to get all tasks', error);
    next(error);
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, completed = false } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await TaskService.createTask({ title, completed });
    res.status(201).json(task);
  } catch (error) {
    logger.error('Failed to create task', error);
    next(error);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;

    const updatedTask = await TaskService.updateTask(id, { title, completed });
    res.json(updatedTask);
  } catch (error) {
    logger.error(`Failed to update task with ID ${req.params.id}`, error);
    next(error);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    await TaskService.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Failed to delete task with ID ${req.params.id}`, error);
    next(error);
  }
}
