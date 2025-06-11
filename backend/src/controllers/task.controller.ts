import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskController {
  constructor() {
    this.getAllTasks = this.getAllTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTaskDone = this.toggleTaskDone.bind(this);
  }

  async getAllTasks(_req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const task = await prisma.task.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const task = await prisma.task.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
        },
      });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  async toggleTaskDone(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      });

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: {
          done: !task.done,
        },
      });

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Failed to toggle task status' });
    }
  }
}
