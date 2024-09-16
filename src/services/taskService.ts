import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { User } from '../entities/User';
import { TaskStatus } from '../enums/taskStatus';

export class TaskService {
  private tr = AppDataSource.getRepository(Task);
  private ur = AppDataSource.getRepository(User);

  private async findUserById(userId: number): Promise<User | null> {
    return await this.ur.findOne({ where: { id: userId } });
  }

  private async findTaskById(taskId: number): Promise<Task> {
    const task = await this.tr.findOne({ where: { id: taskId } });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async createTask(
    title: string,
    description: string,
    status: TaskStatus,
    userId: number,
  ): Promise<void> {
    const user = await this.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const task = this.tr.create({
      title,
      description,
      status,
      user: { id: userId },
    });

    await this.tr.save(task);
  }

  async updateTaskStatus(taskId: number, status: string): Promise<void> {
    const task = await this.findTaskById(taskId);

    switch (status) {
      case TaskStatus.DONE:
        task.completedAt = new Date();
        break;
      case TaskStatus.IN_PROGRESS:
        task.startedAt = new Date();
        break;
      case TaskStatus.OPEN:
        task.startedAt = null;
        task.completedAt = null;
        break;
      default:
        throw new Error('Invalid status');
    }

    await this.tr.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return await this.tr.find({ relations: ['user'] });
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.findTaskById(id);
  }

  async getTasksByUserId(id: number): Promise<Task[]> {
    return await this.tr.find({ where: { user: { id } } });
  }
}
