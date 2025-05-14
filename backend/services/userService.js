
import { pool } from "../config/db.js";

// Serviços para usuários
export const findAllVoluntarios = async (limit = 10, offset = 0) => {
    const { rows } = await pool.query(
        "select id, nome, email, ativo, role, theme from api.voluntarios order by nome LIMIT $1 OFFSET $2", 
        [limit, offset]
    );
    return rows;
};

export const countVoluntarios = async () => {
    const { rows } = await pool.query('SELECT COUNT(*) FROM api.voluntarios');
    return parseInt(rows[0].count);
};

export const findUserByEmail = async (email) => {
    const { rows } = await pool.query(
        "select * from api.voluntarios where email = $1", [email]
    );
    return rows[0];
};

export const findUserById = async (id) => {
    const { rows } = await pool.query(
        "select * from api.voluntarios where id = $1", [id]
    );
    return rows[0];
};

export const createUser = async ({ nome, email, hash, role = "donor" }) => {
    const { rows } = await pool.query(
        `insert into api.voluntarios (nome, email, senha_hash, role, theme)
         values ($1, $2, $3, $4, 'light')
         returning id, nome, email, role, theme`, 
        [nome, email, hash, role]
    );
    return rows[0];
};

export const updateUserProfile = async (userId, { nome, email, theme }) => {
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

export const updateUserPassword = async (userId, hash) => {
    const { rows } = await pool.query(
        `update api.voluntarios set senha_hash = $2 where id = $1 returning id`, 
        [userId, hash]
    );
    return rows[0];
};

export const updateUserRole = async (userId, role) => {
    const { rows } = await pool.query(
        `update api.voluntarios set role = $2 where id = $1 returning id, nome, email, role`, 
        [userId, role]
    );
    return rows[0];
};

export const findUsersByRole = async (role, limit = 10, offset = 0) => {
    const { rows } = await pool.query(
        `select id, nome, email, ativo, role, theme from api.voluntarios 
         where role = $1 
         order by nome LIMIT $2 OFFSET $3`, 
        [role, limit, offset]
    );
    return rows;
};

export const countUsersByRole = async (role) => {
    const { rows } = await pool.query(
        'SELECT COUNT(*) FROM api.voluntarios WHERE role = $1',
        [role]
    );
    return parseInt(rows[0].count);
};
