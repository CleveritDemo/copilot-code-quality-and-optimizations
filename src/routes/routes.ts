import { Router } from "express";
import {
  create_task,
  gettasks,
  updatetaskstatus,
} from "../controllers/taskController";
import {
  create_admin,
  create_project_manager,
  createuser,
  get_user_byid,
  getusers,
} from "../controllers/userController";

const router = Router();

router.post("/users", createuser);
  router.post("/users/admin", create_admin);
router.post("/users/project_manager", create_project_manager);

  router.get("/users", getusers);
  router.get("/users/:id", get_user_byid);

router.post("/tasks", create_task);
router.get("/tasks", gettasks);
router.patch("/tasks/:id", updatetaskstatus);

export default router;
