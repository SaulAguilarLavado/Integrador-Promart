import express from "express";
import conexion from "../DB/db.js"; // Importa la conexión a la base de datos

const router = express.Router();

// Ruta para guardar reclamaciones
router.post("/reclamaciones", (req, res) => {
    const { nombre, dni, categoria, reclamacion } = req.body;
    const id_usuario = req.session?.userId || null; // Obtén el id del usuario si está registrado

    // Si el usuario está registrado, usa los datos de la sesión
    const nombreFinal = id_usuario ? req.session.userName : nombre;
    const dniFinal = id_usuario ? "DNI_REGISTRADO" : dni; // Puedes reemplazar "DNI_REGISTRADO" con un valor predeterminado o real

    if (!nombreFinal || !dniFinal) {
        return res.status(400).send("El nombre y el DNI son obligatorios.");
    }

    const insertarReclamacion = `
        INSERT INTO reclamaciones (id_usuario, nombre, dni, categoria, reclamacion) VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(insertarReclamacion, [id_usuario, nombreFinal, dniFinal, categoria, reclamacion], (err, result) => {
        if (err) {
            console.error("Error al guardar la reclamación:", err);
            return res.status(500).send("Error al guardar la reclamación");
        }

        console.log("Reclamación guardada correctamente:", result);
        res.redirect("/reclamaciones?registro=exitoso"); // Redirige con un mensaje de éxito
    });
});

export default router;