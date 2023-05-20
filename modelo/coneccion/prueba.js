const sqlite3 = require('sqlite3').verbose();

// crea una instancia de la base de datos
const db = new sqlite3.Database('../../mi_bd.db');

// consulta los datos de la tabla
db.all('SELECT * FROM Alumno', [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
});

// cierra la conexión a la base de datos
db.close();
