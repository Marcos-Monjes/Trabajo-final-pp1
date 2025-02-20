const mysql = require('mysql2');

function handleConnection() {
    const db = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        password: '1234',
        database: 'cruddb2'
    });

    db.connect(function(err) {
        if(err) {
            console.log('Error al conectar a la BD:', err);
            setTimeout(handleConnection, 2000);
            return;
        }
        console.log('Conectado a MySQL!');
        
        //crear tablas una vez que la conexión sea exitosa
        const createTableSQLoficina = `
            CREATE TABLE IF NOT EXISTS oficina (
                id INT AUTO_INCREMENT PRIMARY KEY,
                denominacion VARCHAR(255)            
            )
        `;
        
        const createTableSQLpersona = `
            CREATE TABLE IF NOT EXISTS persona (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255),
                email VARCHAR(255),
                oficina_id INT,
                FOREIGN KEY (oficina_id) REFERENCES oficina(id)
            )
        `;
        
        db.query(createTableSQLoficina);
        db.query(createTableSQLpersona);
    });

    db.on('error', function(err) {
        console.log('Error en la BD:', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnection();
        } else {
            throw err;
        }
    });

    return db;
}

module.exports = handleConnection();