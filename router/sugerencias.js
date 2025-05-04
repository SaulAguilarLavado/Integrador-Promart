import express from "express";
import conexion from "../DB/db.js"; // Importa la conexión a la base de datos

const router = express.Router();

// Ruta para guardar sugerencias
router.post("/sugerencias", (req, res) => {
    const { nombre, email, categoria, sugerencia } = req.body;
    const id_usuario = req.session?.userId || null;

    // Si el usuario no está registrado, verifica que nombre y email no sean nulos
    if (!id_usuario && (!nombre || !email)) {
        return res.status(400).send("El nombre y el email son obligatorios.");
    }

    const nombreFinal = id_usuario ? req.session.userName : nombre;
    const emailFinal = id_usuario ? req.session.userEmail : email;

    const insertarSugerencia = `
        INSERT INTO sugerencias (id_usuario, nombre, email, categoria, sugerencia) VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(insertarSugerencia, [id_usuario, nombreFinal, emailFinal, categoria, sugerencia], (err, result) => {
        if (err) {
            console.error("Error al guardar la sugerencia:", err);
            return res.status(500).send("Error al guardar la sugerencia");
        }

        console.log("Sugerencia guardada correctamente:", result);
        res.redirect("/sugerencias?registro=exitoso");
    });
});

export default router;