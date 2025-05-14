
import { pool } from "../config/db.js";

// Serviços para eventos
export const findAllEvents = async () => {
    const { rows } = await pool.query(
        "select * from api.eventos order by data_inicio desc"
    );
    return rows;
};

export const findEventById = async (id) => {
    const { rows } = await pool.query(
        "select * from api.eventos where id = $1", [id]
    );
    return rows[0];
};

export const insertEvent = async ({ titulo, resumo, link, data_inicio, data_fim }) => {
    const { rows } = await pool.query(
        `insert into api.eventos (titulo, resumo, link, data_inicio, data_fim)
         values ($1,$2,$3,$4,$5) returning *`, 
        [titulo, resumo, link, data_inicio, data_fim]
    );
    return rows[0];
};

export const modifyEvent = async (id, { titulo, resumo, link, data_inicio, data_fim }) => {
    const { rows } = await pool.query(
        `update api.eventos
         set titulo=$2, resumo=$3, link=$4, data_inicio=$5, data_fim=$6
         where id=$1 returning *`, 
        [id, titulo, resumo, link, data_inicio, data_fim]
    );
    return rows[0];
};

export const removeEvent = async (id) => {
    await pool.query("delete from api.eventos where id=$1", [id]);
    return true;
};
