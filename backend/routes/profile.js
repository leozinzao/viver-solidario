
import { Router } from "express";
import { 
    getProfile, 
    updateProfile, 
    updatePassword, 
    getUserRole 
} from "../controllers/profileController.js";
import { verifyToken } from "../utils/authMiddleware.js";

export const profileRouter = Router();

// Aplicar middleware de autenticação em todas as rotas de perfil
profileRouter.use(verifyToken);

profileRouter.get("/profile", getProfile);
profileRouter.put("/profile", updateProfile);
profileRouter.put("/profile/password", updatePassword);
profileRouter.get("/profile/role", getUserRole);
