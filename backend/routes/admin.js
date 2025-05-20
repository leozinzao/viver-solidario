
import { Router } from "express";
import { 
    listUsers, 
    listUsersByRole, 
    getUserDetails, 
    updateUserRole, 
    deactivateUser,
    getUserStats
} from "../controllers/adminController.js";
import { verifyToken, isAdmin, hasSystemPermissions } from "../utils/authMiddleware.js";

export const adminRouter = Router();

// Aplicar verificação de token e permissões em todas as rotas
adminRouter.use(verifyToken);
adminRouter.use(hasSystemPermissions);

// Rotas de gerenciamento de usuários
adminRouter.get("/users", listUsers);
adminRouter.get("/users/role/:role", listUsersByRole);
adminRouter.get("/users/:userId", getUserDetails);

// Rotas que exigem privilégios de administrador
adminRouter.put("/users/:userId/role", isAdmin, updateUserRole);
adminRouter.delete("/users/:userId", isAdmin, deactivateUser);

// Estatísticas para dashboard de administrador
adminRouter.get("/stats/users", getUserStats);

export default adminRouter;
