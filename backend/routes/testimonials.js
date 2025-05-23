import express from "express";
import { verifyToken } from "../utils/authMiddleware.js"; // padronize o nome
import * as controller from "../controllers/testimonialController.js";

const router = express.Router();

// Rotas protegidas
router.post("/", verifyToken, controller.createTestimonial);
router.put("/:id", verifyToken, controller.updateTestimonial);
router.delete("/:id", verifyToken, controller.deleteTestimonial);

// Rota pública
router.get("/", controller.getAllTestimonials);

export default router;