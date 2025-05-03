const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saul_UTP11",
    database: "Integrador"
});

conexion.connect(function (err) {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database");
    }
});

module.exports = conexion;