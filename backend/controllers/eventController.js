import { pool } from "../config/db.js";

// Controlador para eventos
export const listEvents = async(_req, res) => {
    const { rows } = await pool.query(
        "select * from api.eventos order by data_inicio desc"
    );
    res.json(rows);
};

export const getEvent = async(req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query(
        "select * from api.eventos where id = $1", [id]
    );
    rows[0] ? res.json(rows[0]) : res.sendStatus(404);
};

export const createEvent = async(req, res) => {
    const { titulo, resumo, link, data_inicio, data_fim } = req.body;
    const { rows } = await pool.query(
        `insert into api.eventos (titulo, resumo, link, data_inicio, data_fim)
     values ($1,$2,$3,$4,$5) returning *`, [titulo, resumo, link, data_inicio, data_fim]
    );
    res.status(201).json(rows[0]);
};

export const updateEvent = async(req, res) => {
    const { id } = req.params;
    const { titulo, resumo, link, data_inicio, data_fim } = req.body;
    const { rows } = await pool.query(
        `update api.eventos
     set titulo=$2, resumo=$3, link=$4, data_inicio=$5, data_fim=$6
     where id=$1 returning *`, [id, titulo, resumo, link, data_inicio, data_fim]
    );
    rows[0] ? res.json(rows[0]) : res.sendStatus(404);
};

export const deleteEvent = async(req, res) => {
    const { id } = req.params;
    await pool.query("delete from api.eventos where id=$1", [id]);
    res.sendStatus(204);
};