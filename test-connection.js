const sql = require('mssql');

const config = {
    user: 'admin', // Usuario de SQL Server
    password: 'fullstack', // Contraseña
    server: 'localhost', // Dirección del servidor
    port: 1434, // Puerto (puedes cambiarlo si lo has configurado de otra manera)
    database: 'MrMoustache', // Nombre de la base de datos
    options: {
        encrypt: true, // Usar encriptación
        trustServerCertificate: true, // Confía en certificados no válidos
    }
};

(async () => {
    try {
        console.log('Intentando conectar...');
        const pool = await sql.connect(config);
        console.log('Conexión exitosa a SQL Server');
        const result = await pool.request().query('SELECT * FROM Productos');
        console.log(result.recordset);
        await pool.close();
    } catch (err) {
        console.error('Error conectando a SQL Server:', err);
    }
})();
