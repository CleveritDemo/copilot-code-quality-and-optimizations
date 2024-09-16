import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { User } from '../entities/User';

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, userId } = req.body;
  try {
    const ur = AppDataSource.getRepository(User);
    const tr = AppDataSource.getRepository(Task);
    const user = await ur.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const task = tr.create({
      title,
      description,
      status: status,
      user: { id: userId },
    });

    await tr.save(task);
    return res.status(200).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { id: taskId } = req.params;
  const { status } = req.body;

  try {
    await taskService.updateTaskStatus(Number(taskId), status);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error });
  }
};
