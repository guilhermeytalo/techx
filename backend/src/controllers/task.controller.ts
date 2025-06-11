import { Request, Response, NextFunction } from 'express';
import * as TaskService from '../services/task.service';
import { logger }  from '../utils/logger'

export async function getAllTasks(req: Request, res: Response, next: NextFunction) {
  try {
    await TaskService.getAllTasks(req, res, next);
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

    await TaskService.createTask(req, res, next);
  } catch (error) {
    logger.error('Failed to create task', error);
    next(error);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    await TaskService.updateTask(req, res, next);
  } catch (error) {
    logger.error(`Failed to update task with ID ${req.params.id}`, error);
    next(error);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    await TaskService.deleteTask(req, res, next);
  } catch (error) {
    logger.error(`Failed to delete task with ID ${req.params.id}`, error);
    next(error);
  }
}
