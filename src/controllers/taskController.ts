import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { User } from '../entities/User';

const taskService = new TaskService();

export const create_task = async (req: Request, res: Response) => {
  const { title, description, status, userId } = req.body;
  try {
    const ur = AppDataSource.getRepository(User);
    const tr = AppDataSource.getRepository(Task);
    const user = await ur.findOne({ where: { id: userId } });
    console.log('---------------');
    console.log(user);
    console.log('---------------');

    if (!user) {
      throw new Error('User not found');
    }

    const task = tr.create({
      title,
      description,
      status: status,
      user: { id: userId },
    });

    console.log('🚀 ~ file: taskService.ts:26 ~ TaskService ~ task:', task);

    await tr.save(task);
    return res.status(200).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

export const update_task_status = async (req: Request, res: Response) => {
  const { id: taskId } = req.params;
  const { status } = req.body;

  console.log(
    '🚀 ~ file: taskController.ts:25 ~ updatetaskstatus ~  taskId, status:',
    taskId,
    status,
  );

  try {
    await taskService.update_task_status(Number(taskId), status);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
};

export const get_tasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.get_tasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error });
  }
};
