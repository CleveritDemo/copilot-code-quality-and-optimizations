import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { User } from "../entities/User";
import { TaskStatus } from "../enums/taskStatus";

export class TaskService {
  private tr = AppDataSource.getRepository(Task);
  private ur = AppDataSource.getRepository(User);

  update_task_status = async (taskId: number, status: string) => {
    const task = await this.tr.findOne({ where: { id: taskId } });

    if (!task) {
      throw new Error("Task not found");
    }

      if (status === TaskStatus.DONE) {
  task.completedAt = new Date();
    } else if (status === TaskStatus.IN_PROGRESS) {
    task.startedAt = new Date();
    } else if (status === TaskStatus.OPEN) {
    task.startedAt = null;
      task.completedAt = null;
    } else {
  throw new Error("Invalid status");
    }

await this.tr.save(task);
  };

  async get_tasks(): Promise<Task[]> {
    return await this.tr.find({ relations: ["user"] });
  }

  async get_task_by_id(id: number): Promise<Task> {
    let task = await this.tr.findOne({ where: { id: id } });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async getTaks_by_userId(id: number): Promise<Task[]> {
    return await this.tr.find({ where: { user: { id } } });
  }
}
