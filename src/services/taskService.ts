import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { User } from '../entities/User';
import { TaskStatus } from '../enums/taskStatus';

export class TaskService {
  private tr = AppDataSource.getRepository(Task);
  private ur = AppDataSource.getRepository(User);

  updateTaskStatus = async (taskId: number, status: string) => {
    const task = await this.tr.findOne({ where: { id: taskId } });

    if (!task) {
      throw new Error('Task not found');
    }

    if (status === TaskStatus.DONE) {
      task.completedAt = new Date();
    } else if (status === TaskStatus.IN_PROGRESS) {
      task.startedAt = new Date();
    } else if (status === TaskStatus.OPEN) {
      task.startedAt = null;
      task.completedAt = null;
    } else {
      throw new Error('Invalid status');
    }

    await this.tr.save(task);
  };

  async getTasks(): Promise<Task[]> {
    return await this.tr.find({ relations: ['user'] });
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.tr.findOne({ where: { id: id } });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  async getTasksByUserId(id: number): Promise<Task[]> {
    return await this.tr.find({ where: { user: { id } } });
  }
}
