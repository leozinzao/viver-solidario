
import { Router } from "express";
import { 
    getTestimonials, 
    getTestimonial, 
    createTestimonial, 
    updateTestimonial, 
    deleteTestimonial,
    togglePublishStatus
} from "../controllers/testimonialController.js";
import { verifyToken, hasRole, hasAdvancedPermissions } from "../utils/authMiddleware.js";

export const testimonialRouter = Router();

// Rotas públicas
testimonialRouter.get("/", getTestimonials);  // Lista todos os depoimentos (públicos)
testimonialRouter.get("/:id", getTestimonial); // Obtém um depoimento específico

// Rotas protegidas
testimonialRouter.post("/", verifyToken, hasRole(['admin', 'internal', 'editor']), createTestimonial);
testimonialRouter.put("/:id", verifyToken, hasRole(['admin', 'internal', 'editor']), updateTestimonial);
testimonialRouter.delete("/:id", verifyToken, hasRole(['admin', 'internal']), deleteTestimonial);
testimonialRouter.patch("/:id/publish", verifyToken, hasRole(['admin', 'internal', 'editor']), togglePublishStatus);

export default testimonialRouter;
