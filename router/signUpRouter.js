import express from "express";
import bcrypt from "bcryptjs";
import userService from "../service/userService.js";

const router = express.Router();

router.post("/validar", async (req, res) => {
    const { nombre_usuario, correo, contra } = req.body;

    if (!nombre_usuario || !correo || !contra) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    try {
        const hashedPassword = await bcrypt.hash(contra, 10);
        await userService.registrarUsuario(nombre_usuario, correo, hashedPassword);
        console.log("Usuario registrado correctamente");
        res.redirect("/?registro=exitoso");
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        res.status(500).send("Error en el servidor");
    }
});

export default router;