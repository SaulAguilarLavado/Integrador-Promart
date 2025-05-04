import express from "express";
import bcrypt from "bcryptjs";
import conexion from "../DB/db.js";

const router = express.Router();

// VALIDAR INICIO DE SESIÓN
router.post("/login", function (req, res) {
    const { correo, contra } = req.body;
    console.log("Datos recibidos:", { correo, contra });

    if (!correo || !contra) {
        return res.status(400).send("Correo y contraseña son obligatorios");
    }

    const buscarLogin = "SELECT * FROM usuarios WHERE correo = ?";
    conexion.query(buscarLogin, [correo], (err, rows) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).send("Error en el servidor");
        }

        if (rows.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        bcrypt.compare(contra, rows[0].contra, (err, result) => {
            if (err) {
                console.error("Error al comparar contraseñas:", err);
                return res.status(500).send("Error en el servidor");
            }

            if (result) {
                req.session.userId = rows[0].id; // Guarda el id del usuario en la sesión
                req.session.userName = rows[0].nombre_usuario; // Guarda el nombre del usuario en la sesión
                req.session.userEmail = rows[0].correo; // Guarda el correo del usuario en la sesión
                res.redirect("/?login=exitoso");
            } else {
                res.status(401).send("Contraseña incorrecta");
            }
        });
    });
});

export default router;