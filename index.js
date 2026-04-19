const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'barberia_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Conectado a la Base de Datos");
});

app.get('/servicios', (req, res) => {
    db.query('SELECT * FROM servicios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => console.log(" Servidor en puerto 3000"));