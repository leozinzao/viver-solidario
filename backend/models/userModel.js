
import { pool } from "../config/db.js";

export const findByEmail = async(email) => {
    const { rows } = await pool.query("select * from api.voluntarios where email = $1", [email]);
    return rows[0];
};

export const findById = async(id) => {
    const { rows } = await pool.query("select * from api.voluntarios where id = $1", [id]);
    return rows[0];
};

export const create = async({ nome, email, hash, role = "donor" }) => {
    const { rows } = await pool.query(
        `insert into api.voluntarios (nome, email, senha_hash, role, theme)
     values ($1, $2, $3, $4, 'light')
     returning id, nome, email, role, theme`, [nome, email, hash, role]
    );
    return rows[0];
};

export const updateProfile = async(userId, { nome, email, theme }) => {
    const { rows } = await pool.query(
        `update api.voluntarios 
         set nome = COALESCE($2, nome), 
             email = COALESCE($3, email),
             theme = COALESCE($4, theme)
         where id = $1
         returning id, nome, email, role, theme`, 
        [userId, nome, email, theme]
    );
    return rows[0];
};

export const updatePassword = async(userId, hash) => {
    const { rows } = await pool.query(
        `update api.voluntarios set senha_hash = $2 where id = $1 returning id`, 
        [userId, hash]
    );
    return rows[0];
};
