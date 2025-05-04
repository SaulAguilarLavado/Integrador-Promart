import express from "express";
import session from "express-session";

import sugerencias from "../router/sugerencias.js";
import reclamaciones from "../router/reclamaciones.js";
import logInRoutes from "../router/logInRouter.js";
import signUpRoutes from "../router/signUpRouter.js";
import generalRouter from "../router/generalRouter.js";

const app = express();

// Configurar el motor de vistas
app.set("view engine", "ejs");

// Registrar middlewares
app.use(express.static("public")); // Archivos estáticos
app.use(express.json()); // Peticiones JSON
app.use(express.urlencoded({ extended: true })); // Formularios

// Configurar express-session
app.use(session({
    secret: "56052c33951507ef8628e475ea97902864ad9ad224f7575133267b5c8125a387fbaeb982fa99d6f98eaf8aadfd60747c145936aebcfed63dc79eaf3660f1d0d1",
    resave: false,
    saveUninitialized: true
}));

// Registrar las rutas
app.use(sugerencias);
app.use(reclamaciones);
app.use(logInRoutes);
app.use(signUpRoutes);
app.use(generalRouter);

// Iniciar el servidor
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});