import express from "express";
import sugerenciasService from "../service/sugerenciasService.js";

const router = express.Router();

router.post("/sugerencias", async (req, res) => {
    const { nombre, email, categoria, sugerencia } = req.body;
    const id_usuario = req.session?.userId || null;

    if (!id_usuario && (!nombre || !email)) {
        return res.status(400).send("El nombre y el email son obligatorios.");
    }

    const nombreFinal = id_usuario ? req.session.userName : nombre;
    const emailFinal = id_usuario ? req.session.userEmail : email;

    try {
        await sugerenciasService.guardarSugerencia(id_usuario, nombreFinal, emailFinal, categoria, sugerencia);
        res.redirect("/sugerencias?registro=exitoso");
    } catch (err) {
        console.error("Error al guardar la sugerencia:", err);
        res.status(500).send("Error al guardar la sugerencia");
    }
});

export default router;