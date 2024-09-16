import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { User } from '../entities/User';
import { UserType } from '../enums/userType';
import { Task } from '../entities/Task';

const userService = new UserService();

export const create_user = async (req: Request, res: Response) => {
  console.log('-------------');
  console.log(req.body);
  console.log('-------------');
  const { name, email } = req.body;

  try {
    const user = await userService.create_user(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed', error });
  }
};

export const create_admin = async (req: Request, res: Response) => {
  console.log('-------------');
  console.log(req.body);
  console.log('-------------');
  const { name, email } = req.body;

  try {
    const user = await userService.create_admin(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed', error });
  }
};

export const create_project_manager = async (req: Request, res: Response) => {
  console.log('-------------');
  console.log(req.body);
  console.log('-------------');

  const { name, email } = req.body;

  try {
    const user = await userService.create_project_manager(name, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed' });
  }
};

export const get_users = async (req: Request, res: Response) => {
  try {
    const users = await userService.get_users();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Fail' });
  }
};

export const get_user_byid = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Fail' });
  }
};
