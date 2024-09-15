// src/controllers/helloController.ts
import { Request, Response } from "express";
import { getHelloMessage } from "../services/helloService";

export const helloController = (req: Request, res: Response) => {
  const message = getHelloMessage();
  res.send(message);
};
