
import { Router } from "express";
import { register, login, verifyCurrentToken } from "../controllers/authController.js";
import { verifyToken } from "../utils/authMiddleware.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify", verifyToken, verifyCurrentToken);
