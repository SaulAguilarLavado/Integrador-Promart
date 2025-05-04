const express = require("express");
const session = require("express-session");
const app = express();

// Importar las rutas
const conexion = require("../DB/db"); // Importa la conexión desde el archivo db.js
const sugerenciasReclamacionesRoutes = require("../router/sugerenciasReclamaciones");
const logInRoutes = require("../router/logIn");
const signUpRoutes = require("../router/signUp");
const rutasGenerales = require("../router/rutasGenerales");

//CONFIGURAR EL MOTOR DE VISTAS
app.set("view engine", "ejs");

// Registrar las rutas
app.use(express.static("public")); //archivos estaticos desde public
app.use(express.json()); //peticiones json
app.use(express.urlencoded({ extended: true })); // Para manejar formularios
app.use(sugerenciasReclamacionesRoutes); // Rutas para sugerencias y reclamaciones
app.use(logInRoutes); // Rutas de inicio de sesión
app.use(signUpRoutes); // Rutas de registro
app.use(rutasGenerales);

// Configurar express-session
app.use(session({
    secret: "clave_secreta", // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: true
}));

// Ruta Servidor
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});