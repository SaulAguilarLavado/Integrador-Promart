import express from "express";
import reclamacionesService from "../service/reclamacionesService.js";

const router = express.Router();

router.post("/reclamaciones", async (req, res) => {
    const { nombre, dni, categoria, reclamacion } = req.body;
    const id_usuario = req.session?.userId || null;

    // Si el usuario no está registrado, verifica que nombre y DNI no sean nulos
    if (!id_usuario && (!nombre || !dni)) {
        return res.status(400).send("El nombre y el DNI son obligatorios.");
    }

    const nombreFinal = id_usuario ? req.session.userName : nombre;

    try {
        await reclamacionesService.guardarReclamacion(id_usuario, nombreFinal, dni, categoria, reclamacion);
        console.log("Reclamación guardada correctamente");
        res.redirect("/reclamaciones?registro=exitoso");
    } catch (err) {
        console.error("Error al guardar la reclamación:", err);
        res.status(500).send("Error al guardar la reclamación");
    }
});

export default router;