import axios from 'axios';
import { Task, TaskStatus } from '@/types/task';
import { stat } from 'fs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get(`/tasks`);
    return response.data;
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  filterTasks: async (status: TaskStatus): Promise<Task[]> => {
    console.log(`Called filter by ${status}`);
    const response = await api.get(`/tasks/filter/${status}`);
    console.log(`Returned successfully with ${response.data.length} tasks`);
    return response.data;
  },
}; 