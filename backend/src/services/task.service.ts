import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  userId: number;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export class TaskService {
  async getAllTasks(userId: number) {
    try {
      return await prisma.task.findMany({ 
        where: { 
          user: {
            id: userId
          }
        } 
      });
    } catch (error) {
      logger.error('Error in TaskService.getAllTasks:', error);
      throw error;
    }
  }

  async getTaskById(id: number, userId: number) {
    try {
      const task = await prisma.task.findFirst({
        where: { 
          id,
          user: {
            id: userId
          }
        }
      });

      if (!task) {
        throw new Error('Task not found');
      }

      return task;
    } catch (error) {
      logger.error(`Error in TaskService.getTaskById for id ${id}:`, error);
      throw error;
    }
  }

  async createTask(data: CreateTaskInput) {
    try {
      return await prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          completed: data.completed ?? false,
          user: {
            connect: {
              id: data.userId
            }
          }
        }
      });
    } catch (error) {
      logger.error('Error in TaskService.createTask:', error);
      throw error;
    }
  }

  async updateTask(id: number, userId: number, data: UpdateTaskInput) {
    try {
      const task = await this.getTaskById(id, userId);
      return await prisma.task.update({
        where: { id },
        data
      });
    } catch (error) {
      logger.error(`Error in TaskService.updateTask for id ${id}:`, error);
      throw error;
    }
  }

  async deleteTask(id: number, userId: number) {
    try {
      const task = await this.getTaskById(id, userId);
      return await prisma.task.delete({
        where: { id }
      });
    } catch (error) {
      logger.error(`Error in TaskService.deleteTask for id ${id}:`, error);
      throw error;
    }
  }

  async toggleTaskCompleted(id: number, userId: number) {
    try {
      const task = await this.getTaskById(id, userId);
      return await prisma.task.update({
        where: { id },
        data: {
          completed: !task.completed
        }
      });
    } catch (error) {
      logger.error(`Error in TaskService.toggleTaskCompleted for id ${id}:`, error);
      throw error;
    }
  }
}
