import dotenv from 'dotenv';
dotenv.config();

import postgres from 'postgres';
import pkg from 'pg';

const { Pool } = pkg;

// Verifica se a variável DATABASE_URL existe
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('A variável de ambiente DATABASE_URL não está definida no arquivo .env');
}

// Conexão com pg (pool) – usada com pg Pool tradicional
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Supabase usa certificado self-signed
    },
});

// Conexão com postgres.js (opcional)
const sql = postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
});

// Exporta as duas formas
export default sql;
export { pool };