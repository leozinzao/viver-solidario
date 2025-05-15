import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { eventRouter } from "./routes/events.js";

dotenv.config();

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/users.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", userRouter);

app.get("/", (_req, res) => res.send("Viver Solidário API 🚀"));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

app.use("/api/events", eventRouter);