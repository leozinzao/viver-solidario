import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import * as controller from "../controllers/testimonialController.js";

const router = express.Router();

// Rota protegida: só acessa se estiver autenticado
router.post("/", authenticateToken, controller.createTestimonial);
router.put("/:id", authenticateToken, controller.updateTestimonial);
router.delete("/:id", authenticateToken, controller.deleteTestimonial);

// Rota pública
router.get("/", controller.getAllTestimonials);

export default router;