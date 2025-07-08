require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const express = require('express');
const sql = require('mssql');
const app = express();
const cors = require('cors');
const path = require('path'); // Módulo para manejar rutas de archivos
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8000' // Cambia este a tu puerto de front-end
}));

// Configuración de conexión a SQL Server
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Conectar a la base de datos
sql.connect(dbConfig).then(pool => {
    console.log("Conectado a la base de datos SQL Server");
}).catch(err => {
    console.log("Error en la conexión: ", err);
    process.exit(1);  // Salir del proceso si la conexión falla
});

// Configurar Express para manejar archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));  // Servir archivos desde la raíz

// Ruta principal que sirve el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Sirve el archivo index.html desde la raíz
});

// Rutas de la API para barberos, servicios, reservas y productos
app.use('/api/barberos', require('./routes/barbero'));
app.use('/api/servicios', require('./routes/Servicio'));
app.use('/api/reservas', require('./routes/reserva'));
app.use('/api/productos', require('./routes/Product'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor API ejecutándose en http://localhost:${port}`);
});
