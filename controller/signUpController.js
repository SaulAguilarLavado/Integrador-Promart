import bcrypt from "bcryptjs";
import userService from "../service/userService.js";

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarPassword(contra) {
    return typeof contra === "string" && contra.length >= 6;
}

export const registrar = async (req, res) => {
    const { nombre_usuario, correo, contra } = req.body;

    if (!nombre_usuario || !correo || !contra) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    if (!validarCorreo(correo)) {
        return res.status(400).send("El correo no tiene un formato válido");
    }

    if (!validarPassword(contra)) {
        return res.status(400).send("La contraseña debe tener al menos 6 caracteres");
    }

    try {
        const usuarioExistente = await userService.buscarUsuarioPorCorreo(correo);
        if (usuarioExistente) {
            return res.status(409).send("El correo ya está registrado");
        }

        const hashedPassword = await bcrypt.hash(contra, 10);
        await userService.registrarUsuario(nombre_usuario, correo, hashedPassword);
        console.log("Usuario registrado correctamente");
        res.redirect("/?registro=exitoso");
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        res.status(500).send("Error en el servidor");
    }
};
