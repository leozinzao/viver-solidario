import { pool } from "../config/db.js";

export const listVoluntarios = async(_req, res) => {
    const { rows } = await pool.query(
        "select id, nome, email, ativo from api.voluntarios order by nome"
    );
    res.json(rows);
};