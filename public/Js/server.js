const express = require("express");
const session = require("express-session");
const app = express();
const conexion = require("../DB/db"); // Importa la conexión desde el archivo db.js

// Importar las rutas
const logInRoutes = require("./logIn");
const signUpRoutes = require("./signUp");

//CONFIGURAR EL MOTOR DE VISTAS
app.set("view engine", "ejs");

app.use(express.static("public")); //archivos estaticos desde public
app.use(express.json()); //peticiones json
app.use(express.urlencoded({ extended: true })); // Para manejar formularios

// Configurar express-session
app.use(session({
    secret: "clave_secreta", // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: true
}));

// Registrar las rutas
app.use(logInRoutes); // Rutas de inicio de sesión
app.use(signUpRoutes); // Rutas de registro

app.get("/", function(req, res) {
    const userName = req.session?.userName || "Mi Cuenta"; // Obtén el nombre del usuario desde la sesión o usa un valor predeterminado
    res.render("index", { userName }); // Pasa la variable userName a la vista
  });

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});


module.exports = {
    app,
    conexion
};