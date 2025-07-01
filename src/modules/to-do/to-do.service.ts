import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTasks() {
    const tasks = await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return this.successResponse('Tasks retrieved successfully', tasks, tasks.length);
  }

  async getTaskById(id: number) {
    const task = await this.ensureTaskExists(id);
    return this.successResponse('Task retrieved successfully', task);
  }

  async createTask(dto: CreateTaskDto) {
    const task = await this.prisma.task.create({ data: dto });
    return this.successResponse('Task created successfully', task);
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    await this.ensureTaskExists(id);
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: { ...dto, updatedAt: new Date() },
    });
    return this.successResponse('Task updated successfully', updatedTask);
  }

  async completeTask(id: number) {
    const task = await this.ensureTaskExists(id);

    if (task.completed)
      throw new BadRequestException('Task is already completed');

    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        completed: true,
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return this.successResponse('Task completed successfully', updated);
  }

  async updateArchiveStatus(id: number, archived: boolean) {
    const task = await this.ensureTaskExists(id);

    if (task.archived === archived)
      throw new BadRequestException(`Task is already ${archived ? 'archived' : 'unarchived'}`);

    const updated = await this.prisma.task.update({
      where: { id },
      data: { archived, updatedAt: new Date() },
    });
    return this.successResponse(
      `Task ${archived ? 'archived' : 'unarchived'} successfully`,
      updated
    );
  }

  async deleteTask(id: number) {
    await this.ensureTaskExists(id);
    await this.prisma.task.delete({ where: { id } });
    return { success: true, message: 'Task deleted successfully' };
  }

  private async ensureTaskExists(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  private successResponse(message: string, data: any, count?: number) {
    return {
      success: true,
      message,
      data,
      ...(count !== undefined && { count }),
    };
  }
}
