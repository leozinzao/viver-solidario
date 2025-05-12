import { Router } from "express";
import {
    listEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController.js";
import { verifyToken } from "../utils/authMiddleware.js";
import { validateEvent } from "../utils/validators.js";

export const eventRouter = Router();

/* Públicos */
eventRouter.get("/", listEvents); // GET /api/events
eventRouter.get("/:id", getEvent); // GET /api/events/:id

/* Protegidos (role = internal) */
eventRouter.post("/", verifyToken, validateEvent, createEvent);
eventRouter.put("/:id", verifyToken, validateEvent, updateEvent);
eventRouter.delete("/:id", verifyToken, deleteEvent);