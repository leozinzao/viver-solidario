import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorMiddleware.js";

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS conforme necessário
app.use(cors({
    origin: [
        "http://localhost:8080",
        "http://192.168.40.42:8080",
        "https://viver-solidario.vercel.app",
        "https://www.viver-solidario.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],