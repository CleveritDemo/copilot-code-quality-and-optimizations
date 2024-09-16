import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, userId } = req.body;
  try {
    await taskService.createTask(title, description, status, userId);
    return res.status(200).json({ message: 'Task created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create task', error });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { id: taskId } = req.params;
  const { status } = req.body;

  try {
    await taskService.updateTaskStatus(Number(taskId), status);
    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update task', error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve tasks', error });
  }
};
