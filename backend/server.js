import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorMiddleware.js";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/users.js";
import { profileRouter } from "./routes/profile.js";
import testimonialRouter from "./routes/testimonials.js";

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", profileRouter);
app.use("/api/testimonials", testimonialRouter);

app.get("/", (_req, res) => res.send("Viver Solidário API 🚀"));

// Middleware de tratamento de erros (deve estar depois das rotas)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});