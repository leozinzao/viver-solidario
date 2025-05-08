import { Router } from "express";
import { listVoluntarios } from "../controllers/userController.js";
import { verifyToken } from "../utils/authMiddleware.js";

export const userRouter = Router();
userRouter.get("/voluntarios", verifyToken, listVoluntarios);