import express from "express";
import reclamacionesService from "../service/reclamacionesService.js";

const router = express.Router();

router.post("/reclamaciones", async (req, res) => {
    const { nombre, dni, categoria, reclamacion } = req.body;
    const id_usuario = req.session?.userId || null;

    try {
        let dniFinal = dni;
        let nombreFinal = nombre;

        // Validar que el DNI no sea nulo o vacío
        if (!dniFinal || dniFinal.trim() === "") {
            return res.status(400).send("El DNI es obligatorio.");
        }

        // Si el usuario ha iniciado sesión, usar el nombre de la sesión
        if (id_usuario) {
            nombreFinal = req.session.userName;
        }

        // Guardar la reclamación
        await reclamacionesService.guardarReclamacion(id_usuario, nombreFinal, dniFinal, categoria, reclamacion);
        console.log("Reclamación guardada correctamente");
        res.redirect("/reclamaciones?registro=exitoso");
    } catch (err) {
        console.error("Error al guardar la reclamación:", err);
        res.status(500).send("Error al guardar la reclamación");
    }
});

export default router;