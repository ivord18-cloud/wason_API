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
// servicios
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
// citas
app.post('/citas', (req, res) => {
    const { nombre_cliente, servicio_id, fecha, hora } = req.body;
    const sql = 'INSERT INTO citas (nombre_cliente, servicio_id, fecha, hora) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [nombre_cliente, servicio_id, fecha, hora], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            mensaje: '✅ Cita agendada con éxito en la Barbería Wason', 
            id_cita: result.insertId 
        });
    });
});
app.listen(3000, () => console.log(" Servidor en puerto 3000"));