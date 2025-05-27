import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorMiddleware.js";
import { userRouter } from "./routes/users.js";
import { profileRouter } from "./routes/profile.js";
import testimonialRouter from "./routes/testimonials.js";

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS com todas as origens permitidas
const allowedOrigins = [
    "http://localhost:8080",
    "http://192.168.40.42:8080",
    "https://viver-solidario.vercel.app",
    "https://www.viver-solidario.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// Rotas da API
app.use("/api", userRouter);
app.use("/api", profileRouter);
app.use("/api/testimonials", testimonialRouter);

app.get("/", (_req, res) => res.send("Viver Solidário API 🚀"));

// Middleware de tratamento de erros (deve estar depois das rotas)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});