import sugerenciasDAO from "../DAO/sugerenciasDAO.js";

class SugerenciasService {
    guardarSugerencia(id_usuario, nombre, email, categoria, sugerencia) {
        // Aquí puedes agregar validaciones si lo necesitas
        return sugerenciasDAO.insertarSugerencia(id_usuario, nombre, email, categoria, sugerencia);
    }
}

export default new SugerenciasService();