const express = require("express");
const bcrypt = require("bcryptjs");
const conexion = require("./db"); // Importa la conexión directamente

const router = express.Router();

// REGISTRAR USUARIO
router.post("/validar", function (req, res) {
    const { nombre_usuario, correo, contra } = req.body;

    console.log("Datos recibidos:", { nombre_usuario, correo, contra }); // Verifica los datos recibidos

    if (!nombre_usuario || !correo || !contra) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    bcrypt.hash(contra, 10, function (err, hash) {
        if (err) {
            console.error("Error al encriptar la contraseña:", err);
            return res.status(500).send("Error en el servidor");
        }

        const insertarUsuario = "INSERT INTO usuarios (nombre_usuario, correo, contra) VALUES (?, ?, ?)";
        conexion.query(insertarUsuario, [nombre_usuario, correo, hash], function (err, result) {
            if (err) {
                console.error("Error al registrar el usuario:", err);
                return res.status(500).send("Error en el servidor");
            }

            console.log("Usuario registrado:", nombre_usuario);
            res.status(201).send("Usuario registrado exitosamente");
        });
    });
});

module.exports = router;