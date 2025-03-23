import { PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface CreateTaskDTO {
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export class TaskService {
  async getAllTasks(): Promise<Task[]> {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTaskById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    return prisma.task.create({
      data: {
        ...data,
        status: data.status || 'PENDING',
      },
    });
  }

  async updateTask(id: number, data: UpdateTaskDTO): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return prisma.task.delete({
      where: { id },
    });
  }
} 