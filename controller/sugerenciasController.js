import sugerenciasService from "../service/sugerenciasService.js";

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

export const enviarSugerencia = async (req, res) => {
    const { nombre, email, categoria, sugerencia } = req.body;
    const id_usuario = req.session?.userId || null;

    try {
        let nombreFinal = nombre;
        let emailFinal = email;

        if (!id_usuario) {
            if (!nombre || !email) {
                return res.status(400).send("El nombre y el correo electrónico son obligatorios.");
            }
            if (!validarCorreo(email)) {
                return res.status(400).send("El correo electrónico no tiene un formato válido.");
            }
        } else {
            nombreFinal = req.session.userName;
            emailFinal = req.session.userEmail;

            if (!emailFinal) {
                return res.status(400).send("No se pudo obtener el correo electrónico del usuario autenticado.");
            }
        }

        if (!sugerencia || sugerencia.trim() === "") {
            return res.status(400).send("La sugerencia no puede estar vacía.");
        }

        await sugerenciasService.guardarSugerencia(id_usuario, nombreFinal, emailFinal, categoria, sugerencia);
        res.redirect("/sugerencias?sugerencia=exitoso");
    } catch (err) {
        console.error("Error al guardar la sugerencia:", err);
        res.status(500).send("Error al guardar la sugerencia");
    }
};
