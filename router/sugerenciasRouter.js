import express from "express";
import sugerenciasService from "../service/sugerenciasService.js";

const router = express.Router();

router.post("/sugerencias", async (req, res) => {
    const { nombre, email, categoria, sugerencia } = req.body;
    const id_usuario = req.session?.userId || null;

    console.log("Datos recibidos:", { nombre, email, categoria, sugerencia, id_usuario });

    try {
        let nombreFinal = nombre;
        let emailFinal = email;

        // Si el usuario no ha iniciado sesión, validar que nombre y email no sean nulos o vacíos
        if (!id_usuario) {
            if (!nombre || !email) {
                return res.status(400).send("El nombre y el correo electrónico son obligatorios.");
            }
        } else {
            // Si el usuario ha iniciado sesión, usar el nombre y el email de la sesión
            nombreFinal = req.session.userName;
            emailFinal = req.session.userEmail;

            if (!emailFinal) {
                return res.status(400).send("No se pudo obtener el correo electrónico del usuario autenticado.");
            }
        }

        // Guardar la sugerencia
        await sugerenciasService.guardarSugerencia(id_usuario, nombreFinal, emailFinal, categoria, sugerencia);
        console.log("Sugerencia guardada correctamente");
        res.redirect("/sugerencias?registro=exitoso");
    } catch (err) {
        console.error("Error al guardar la sugerencia:", err);
        res.status(500).send("Error al guardar la sugerencia");
    }
});

export default router;