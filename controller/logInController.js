import * as bcrypt from "bcryptjs";
import userService from "../service/userService.js";

export const login = async (req, res) => {
    const { correo, contra } = req.body;

    if (!correo || !contra) {
        return res.status(400).send("Correo y contraseña son obligatorios");
    }

    try {
        const user = await userService.buscarUsuarioPorCorreo(correo);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        const isPasswordValid = await bcrypt.compare(contra, user.contra);
        if (!isPasswordValid) {
            return res.status(401).send("Contraseña incorrecta");
        }

        req.session.userId = user.id;
        req.session.userName = user.nombre_usuario;
        req.session.userEmail = user.correo;

        res.redirect("/?login=exitoso");
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        res.status(500).send("Error en el servidor");
    }
};