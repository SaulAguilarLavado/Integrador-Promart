const express = require("express");
const bcrypt = require("bcryptjs");
const conexion = require("./db"); // Importa la conexión directamente

const router = express.Router();

// VALIDAR INICIO DE SESIÓN
router.post("/login", function (req, res) {
    const { correo, contra } = req.body;
    console.log("Datos recibidos:", { correo, contra });

    if (!correo || !contra) {
        return res.status(400).send("Correo y contraseña son obligatorios");
    }

    const buscarLogin = "SELECT * FROM usuarios WHERE correo = ?";
    conexion.query(buscarLogin, [correo], function (err, rows) {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).send("Error en el servidor");
        }

        if (rows.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        bcrypt.compare(contra, rows[0].contra, function (err, result) {
            if (err) {
                console.error("Error al comparar contraseñas:", err);
                return res.status(500).send("Error en el servidor");
            }

            if (result) {
                req.session.userName = rows[0].nombre_usuario;
                console.log("Inicio de sesión exitoso para:", rows[0].nombre_usuario);
                res.redirect("/");
            } else {
                res.status(401).send("Contraseña incorrecta");
            }
        });
    });
});

module.exports = router;