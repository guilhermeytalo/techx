import { Request, Response, NextFunction } from 'express';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];
let nextId = 1;

export function getAllTasks(req: Request, res: Response) {
  res.json(tasks);
}

export function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, completed = false } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task: Task = { id: nextId++, title, completed };
    tasks.push(task);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, completed } = req.body;
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id, 10);
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}