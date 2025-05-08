// backend/utils/authMiddleware.js
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) return res.sendStatus(401);

    const token = auth.slice(7);

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(403);
    }
};