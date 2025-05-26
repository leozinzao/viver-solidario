import { Router } from "express";
import { register, login, verifyCurrentToken } from "../controllers/authController.js";
import { verifyToken } from "../utils/authMiddleware.js";

const authRouter = Router();

// Cadastro de usuário (com perfil - doador/voluntário)
authRouter.post("/register", register);

// Login de usuário
authRouter.post("/login", login);

// Verificação de token (rota protegida)
authRouter.get("/verify", verifyToken, verifyCurrentToken);

export { authRouter };