import express from "express";
// import * as controller from "../controllers/testimonialController.js";

const testimonialRouter = express.Router();

// Rotas protegidas (removidas, pois não há mais autenticação/backend próprio)
// testimonialRouter.post("/", verifyToken, controller.createTestimonial);
// testimonialRouter.put("/:id", verifyToken, controller.updateTestimonial);
// testimonialRouter.delete("/:id", verifyToken, controller.deleteTestimonial);

// Rota pública (removida se não houver mais controller)
// testimonialRouter.get("/", controller.getAllTestimonials);

export default testimonialRouter;