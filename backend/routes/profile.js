
import { Router } from "express";
import { getProfile, updateProfile, updatePassword } from "../controllers/profileController.js";
import { verifyToken } from "../utils/authMiddleware.js";

export const profileRouter = Router();

// Apply authentication middleware to all profile routes
profileRouter.use(verifyToken);

profileRouter.get("/profile", getProfile);
profileRouter.put("/profile", updateProfile);
profileRouter.put("/profile/password", updatePassword);
