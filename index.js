require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USUARIO,
    host: process.env.DB_HOST,
    database: process.env.DB_NOMBRE,
    password: process.env.DB_CONTRASENA,
    port: process.env.DB_PUERTO,
});
// crear usuario
const crear = async (id, nombre) => {
    const consulta = 'INSERT INTO usuarios (id, nombre) VALUES ($1, $2) RETURNING *';
    const valores = [id, nombre];
    const response = await pool.query(consulta, valores);
    return response.rows[0];
};
//obtener todos los usuarios
const obtener = async () => {
    const consulta = 'SELECT * FROM usuarios';
    const response = await pool.query(consulta);
    return response.rows;
};
// modificar
const modificar = async (id, nombre) => {
    const consulta = 'UPDATE usuarios SET nombre = $2 WHERE id = $1 RETURNING *';
    const valores = [id, nombre];
    const response = await pool.query(consulta, valores);
    return response.rows[0];
};
// eliminar
const eliminar = async (id) => {
    const consulta = 'DELETE FROM usuarios WHERE id = $1';
    const response = await pool.query(consulta, [id]);
    return response.rowCount;
};
(async () => {
    try {
        console.log('Creando usuario:', await crear(1, 'Martin'));
        console.log('Obteniendo usuarios:', await obtener());
        console.log('Modificando usuario:', await modificar(1, 'Martino Rivas'));
        console.log('Eliminando usuario:', await eliminar(1));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
})();
