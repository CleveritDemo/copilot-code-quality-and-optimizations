// src/routes/helloRoutes.ts
import { Router } from "express";
import { helloController } from "../controllers/helloController";

const router = Router();

router.get("/", helloController);

export default router;
