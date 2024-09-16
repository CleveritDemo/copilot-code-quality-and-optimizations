import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from '../controllers/taskController';
import {
  createAdmin,
  createProjectManager,
  createUser,
  getUserById,
  getUsers,
} from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.post('/users/admin', createAdmin);
router.post('/users/project_manager', createProjectManager);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.patch('/tasks/:id', updateTaskStatus);

export default router;
