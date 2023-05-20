/*
const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'nuevo-usuario',
  password: 'ABC123abc@#$',
  database: 'proyectoweb',
  connectionLimit: 10 // Establece el límite de conexiones en 10
});

const getConnection = util.promisify(pool.getConnection).bind(pool);
const query = util.promisify(pool.query).bind(pool);

module.exports = {
  getConnection,
  query
};
*/
const sqlite3 = require('sqlite3').verbose();

// Crea una conexión con la base de datos
const db = new sqlite3.Database('mi_bd.db');

const getConnection = ()=>{};
// Función que ejecuta una consulta y devuelve los resultados
query = (sql, param) => {
  return new Promise((resolve, reject) => {
    db.all(sql, param, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  query,
  getConnection
};






