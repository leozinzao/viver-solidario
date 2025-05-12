// backend/utils/validators.js
import { body, validationResult } from "express-validator";

export const validateEvent = [
    body("titulo")
    .isLength({ min: 3 })
    .withMessage("Título deve ter ao menos 3 caracteres"),
    body("data_inicio").optional().isISO8601().toDate(),
    body("data_fim").optional().isISO8601().toDate(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
];