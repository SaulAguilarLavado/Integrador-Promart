//DECLARAR VALIABLES
const mysql = require("mysql");
const express = require("express");
const app = express();

//CONFIGURAR EL MOTOR DE VISTAS
app.set("view engine", "ejs");

app.use(express.static("public")); //archivos estaticos desde public
app.use(express.json()); //peticiones json

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});

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

module.exports = app;
module.exports = conexion;