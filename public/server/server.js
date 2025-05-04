import express from "express";
import session from "express-session";

import sugerenciasReclamacionesRoutes from "../router/sugerenciasReclamaciones.js";
import logInRoutes from "../router/logIn.js";
import signUpRoutes from "../router/signUp.js";
import rutasGenerales from "../router/rutasGenerales.js";

const app = express();

// Configurar el motor de vistas
app.set("view engine", "ejs");

// Registrar middlewares
app.use(express.static("public")); // Archivos estáticos
app.use(express.json()); // Peticiones JSON
app.use(express.urlencoded({ extended: true })); // Formularios

// Configurar express-session
app.use(session({
    secret: "clave_secreta", // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: true
}));

// Registrar las rutas
app.use(sugerenciasReclamacionesRoutes);
app.use(logInRoutes);
app.use(signUpRoutes);
app.use(rutasGenerales);

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});