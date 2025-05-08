import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // ex: postgres://user:pass@host:5432/db
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});