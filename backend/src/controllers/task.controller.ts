import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
    this.getAllTasks = this.getAllTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTaskDone = this.toggleTaskDone.bind(this);
  }

  async getAllTasks(_req: Request, res: Response) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const { title, description, completed } = req.body;
      const task = await this.taskService.createTask({ title, description, completed });
      res.status(201).json(task);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { title, description, completed } = req.body;
      const task = await this.taskService.updateTask(id, { title, description, completed });
      res.json(task);
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(500).json({ error: 'Failed to update task' });
      }
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await this.taskService.deleteTask(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(500).json({ error: 'Failed to delete task' });
      }
    }
  }

  async toggleTaskDone(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const task = await this.taskService.toggleTaskCompleted(id);
      res.json(task);
    } catch (error: any) {
      if (error.message === 'Task not found') {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(500).json({ error: 'Failed to toggle task status' });
      }
    }
  }
}
