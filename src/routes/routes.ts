import { Router } from "express";
import {
  create_task,
  get_tasks,
  update_task_status,
} from "../controllers/taskController";
import {
  create_admin,
  create_project_manager,
  create_user,
  get_user_byid,
  get_users,
} from "../controllers/userController";

const router = Router();

router.post("/users", create_user);
  router.post("/users/admin", create_admin);
router.post("/users/project_manager", create_project_manager);

  router.get("/users", get_users);
  router.get("/users/:id", get_user_byid);

router.post("/tasks", create_task);
router.get("/tasks", get_tasks);
router.patch("/tasks/:id", update_task_status);

export default router;
