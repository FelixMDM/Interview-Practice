import { Request, Response } from 'express';
import { TaskService, CreateTaskDTO, UpdateTaskDTO } from '../services/taskService';
import { parseArgs } from 'util';

const taskService = new TaskService();

export class TaskController {
  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const task = await taskService.getTaskById(id);
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const taskData: CreateTaskDTO = req.body;
      const task = await taskService.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const taskData: UpdateTaskDTO = req.body;
      const task = await taskService.updateTask(id, taskData);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  async filterTasks(req: Request, res: Response) {
    try {
      const status = req.params.status;
      console.log(`Filtering by status: ${status}`);
      
      if (!['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status parameter' });
      }
      
      const tasks = await taskService.filterTasks(status);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks by status' });
    }
  }
} 