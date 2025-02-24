const mysql = require('mysql2');

const connectWithRetry = () => {
    const db = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        password: '1234',
        database: 'cruddb2'
    });

    db.connect(err => {
        if (err) {
            console.log('Error al conectar a la BD:', err);
            console.log('Reintentando en 5 segundos...');
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Conectado a la BD MySQL');
        }
    });

    return db;
};

const db = connectWithRetry();

module.exports = db;