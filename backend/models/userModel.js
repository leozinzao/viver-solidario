import { pool } from "../config/db.js";

export const findByEmail = async(email) => {
    const { rows } = await pool.query("select * from api.voluntarios where email = $1", [email]);
    return rows[0];
};

export const create = async({ nome, email, hash }) => {
    const { rows } = await pool.query(
        `insert into api.voluntarios (nome, email, senha_hash)
     values ($1, $2, $3)
     returning id, nome, email`, [nome, email, hash]
    );
    return rows[0];
};