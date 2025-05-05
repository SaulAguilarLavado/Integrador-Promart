import express from "express";
import bcrypt from "bcryptjs";
import userService from "../service/userService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { correo, contra } = req.body;

    try {
        const user = await userService.buscarUsuarioPorCorreo(correo);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const isPasswordValid = await bcrypt.compare(contra, user.contra);
        if (!isPasswordValid) {
            return res.status(401).send("Contraseña incorrecta");
        }

        // Guardar datos del usuario en la sesión
        req.session.userId = user.id;
        req.session.userName = user.nombre_usuario;

        res.redirect("/?login=exitoso");
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        res.status(500).send("Error en el servidor");
    }
});

export default router;