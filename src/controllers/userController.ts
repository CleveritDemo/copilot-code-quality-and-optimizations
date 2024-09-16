import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed', error });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await userService.createAdmin(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed', error });
  }
};

export const createProjectManager = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await userService.createProjectManager(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: 'Fail' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Fail', error });
  }
};
