import express from "express";
import conexion from "../DB/db.js"; // Importa la conexión a la base de datos

const router = express.Router();

// Ruta para guardar sugerencias
router.post("/sugerencias", (req, res) => {
    const { nombre, email, categoria, sugerencia } = req.body;

    const insertarSugerencia = `
        INSERT INTO sugerencias (nombre, email, categoria, sugerencia)
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(insertarSugerencia, [nombre, email, categoria, sugerencia], (err, result) => {
        if (err) {
            console.error("Error al guardar la sugerencia:", err);
            return res.status(500).send("Error al guardar la sugerencia");
        }

        console.log("Sugerencia guardada correctamente:", result);
        res.redirect("/sugerencias?registro=exitoso"); // Redirige con un mensaje de éxito
    });
});

// Ruta para guardar reclamaciones
router.post("/reclamaciones", (req, res) => {
    const { nombre, dni, categoria, reclamacion } = req.body;

    const insertarReclamacion = `
        INSERT INTO reclamaciones (nombre, dni, categoria, reclamacion)
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(insertarReclamacion, [nombre, dni, categoria, reclamacion], (err, result) => {
        if (err) {
            console.error("Error al guardar la reclamación:", err);
            return res.status(500).send("Error al guardar la reclamación");
        }

        console.log("Reclamación guardada correctamente:", result);
        res.redirect("/reclamaciones?registro=exitoso"); // Redirige con un mensaje de éxito
    });
});

export default router;