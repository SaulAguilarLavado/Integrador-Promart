//DECLARAR VALIABLES
const mysql = require("mysql");

//CREAR CONEXION A LA BASE DE DATOS
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saul_UTP11",
    database: "Integrador"
});
conexion.connect(function (err) {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    }
    console.log("Connected to the database");
});
///

module.exports = conexion;