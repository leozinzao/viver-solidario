import express from "express";
import { verifyToken } from "../utils/authMiddleware.js";
import * as controller from "../controllers/testimonialController.js";

const testimonialRouter = express.Router();

// Rotas protegidas
testimonialRouter.post("/", verifyToken, controller.createTestimonial);
testimonialRouter.put("/:id", verifyToken, controller.updateTestimonial);
testimonialRouter.delete("/:id", verifyToken, controller.deleteTestimonial);

// Rota pública
testimonialRouter.get("/", controller.getAllTestimonials);

export default testimonialRouter;