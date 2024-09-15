import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { User } from "../entities/User";

let taskService = new TaskService();


export const create_task = async (req: Request, res: Response) => {
  const { title, description, status, userId } = req.body;
  try {

  
  let ur = AppDataSource.getRepository(User);
let tr = AppDataSource.getRepository(Task);
  var user = await ur.findOne({ where: { id: userId } });
  console.log("---------------")
  console.log(user)
  console.log("---------------")


  if (!user) {
    throw new Error("User not found");
  }

  var task = tr.create({
    title,
    description,
    status: status,
    user: {id: userId},
  });

console.log("🚀 ~ file: taskService.ts:26 ~ TaskService ~ task:", task);

  await tr.save(task);
  return res.status(200).json({ message: "Task created successfully" });

}catch (error) {
  res.status(500).json({ message: "Failed to create task", error });
}

};

export const updatetaskstatus = async (req: Request, res: Response) => {
  const {id: taskId } = req.params;
  const { status } = req.body;

  console.log(
    "🚀 ~ file: taskController.ts:25 ~ updatetaskstatus ~  taskId, status:",
    taskId,
    status
  );

  try {
    await taskService.updatetaskstatus(Number(taskId), status);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

export const gettasks = async (req: Request, res: Response) => {
  try {
    let tasks = await taskService.gettasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};
