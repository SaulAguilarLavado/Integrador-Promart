const express = require("express");
const session = require("express-session");
const app = express();
const conexion = require("../DB/db"); // Importa la conexión desde el archivo db.js

// Importar las rutas
const logInRoutes = require("../Js/logIn");
const signUpRoutes = require("../Js/signUp");

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
app.get("/acerca", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta"; // Obtén el nombre del usuario o usa un valor predeterminado
    res.render("general/Acerca", { userName }); // Pasa la variable userName a la vista
});
app.get("/politicas", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Politicas", { userName });
});

app.get("/terminos", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Terminos", { userName });
});

app.get("/sugerencias", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Sugerencias", { userName });
});

app.get("/reclamaciones", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Reclamaciones", { userName });
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/"); // Redirige al inicio después de cerrar sesión
    });
});
// Ruta Servidor
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});


module.exports = {
    app,
    conexion
};