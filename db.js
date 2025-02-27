const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: '1234',
    database: 'cruddb2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//vrificar conexión y crear tablas
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');

    //crear tabla oficina
    connection.query(`CREATE TABLE IF NOT EXISTS oficina (
        id INT AUTO_INCREMENT PRIMARY KEY,
        denominacion VARCHAR(255) NOT NULL
    )`, (err) => {
        if (err) {
            console.log("Error al crear tabla oficina:", err);
            return;
        }
        console.log("Tabla oficina verificada/creada");
    });

    //crear tabla persona
    connection.query(`CREATE TABLE IF NOT EXISTS persona (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        oficina_id INT,
        FOREIGN KEY (oficina_id) REFERENCES oficina(id)
    )`, (err) => {
        if (err) {
            console.log("Error al crear tabla persona:", err);
            return;
        }
        console.log("Tabla persona verificada/creada");
    });

    //liberar la conexión
    connection.release();
});

// Promisify para uso con async/await
const promisePool = pool.promise();

module.exports = pool;