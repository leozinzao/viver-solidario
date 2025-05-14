
import { pool } from "../config/db.js";

export const findAll = async(limit = 10, offset = 0) => {
    const { rows } = await pool.query(`
        SELECT id, titulo, conteudo, autor_nome, autor_cargo, publicado, criado_em 
        FROM api.depoimentos 
        ORDER BY criado_em DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset]);
    return rows;
};

export const count = async() => {
    const { rows } = await pool.query('SELECT COUNT(*) FROM api.depoimentos');
    return parseInt(rows[0].count);
};

export const findById = async(id) => {
    const { rows } = await pool.query(`
        SELECT * FROM api.depoimentos WHERE id = $1
    `, [id]);
    return rows[0];
};

export const create = async({ titulo, conteudo, autor_nome, autor_cargo, publicado = true }) => {
    const { rows } = await pool.query(`
        INSERT INTO api.depoimentos 
        (titulo, conteudo, autor_nome, autor_cargo, publicado, criado_em)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *
    `, [titulo, conteudo, autor_nome, autor_cargo, publicado]);
    return rows[0];
};

export const update = async(id, { titulo, conteudo, autor_nome, autor_cargo, publicado }) => {
    const { rows } = await pool.query(`
        UPDATE api.depoimentos 
        SET titulo = COALESCE($2, titulo),
            conteudo = COALESCE($3, conteudo),
            autor_nome = COALESCE($4, autor_nome),
            autor_cargo = COALESCE($5, autor_cargo),
            publicado = COALESCE($6, publicado),
            atualizado_em = NOW()
        WHERE id = $1
        RETURNING *
    `, [id, titulo, conteudo, autor_nome, autor_cargo, publicado]);
    return rows[0];
};

export const remove = async(id) => {
    const { rows } = await pool.query(`
        DELETE FROM api.depoimentos WHERE id = $1 RETURNING id
    `, [id]);
    return rows[0];
};
