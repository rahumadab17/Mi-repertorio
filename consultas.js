const { Pool } = require('pg');

const config = {
    host: "127.0.0.1",
    port: 5432,
    database: "repertorio",
    user: "postgres",
    password: "7804"
};

const pool = new Pool(config);

const insertarCancion = async (datos) => {
    const consulta = {
        text: "insert into canciones (titulo, artista, tono) values ($1, $2, $3);",
        values: datos
    };

    const result = await pool.query(consulta);
    return result;
};

const consultarCanciones = async () => {
    const result = await pool.query("select * from canciones;");
    return result;
};

const editarCancion = async (id, datos) => {
    const actualizar = {
        text: `update canciones set titulo = $1, artista = $2, tono = $3 where id = ${id} RETURNING *`,
        values: datos,
    };

    const result = await pool.query(actualizar);
    return result;
};

const eliminarCancion = async (id) => {
    const borrar = {
        text: `delete from canciones where id = '${id}'`
    }

    const result = pool.query(borrar);
    return result
};

module.exports = { insertarCancion, consultarCanciones, editarCancion, eliminarCancion }