import reclamacionesService from "../service/reclamacionesService.js";

function validarDNI(dni) {
    return /^\d{8}$/.test(dni);
}

export const enviarReclamacion = async (req, res) => {
    const { nombre, dni, categoria, reclamacion } = req.body;
    const id_usuario = req.session?.userId || null;

    try {
        let dniFinal = dni;
        let nombreFinal = nombre;

        if (!dniFinal || dniFinal.trim() === "") {
            return res.status(400).send("El DNI es obligatorio.");
        }
        if (!validarDNI(dniFinal)) {
            return res.status(400).send("El DNI debe tener 8 dígitos numéricos.");
        }
        if (!categoria || categoria.trim() === "") {
            return res.status(400).send("La categoría es obligatoria.");
        }
        if (!reclamacion || reclamacion.trim() === "") {
            return res.status(400).send("La reclamación no puede estar vacía.");
        }

        if (id_usuario) {
            nombreFinal = req.session.userName;
        }

        await reclamacionesService.guardarReclamacion(id_usuario, nombreFinal, dniFinal, categoria, reclamacion);
        res.redirect("/reclamaciones?reclamaciones=exitoso");
    } catch (err) {
        console.error("Error al guardar la reclamación:", err);
        res.status(500).send("Error al guardar la reclamación");
    }
};
