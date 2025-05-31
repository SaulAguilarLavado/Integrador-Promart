import sugerenciasDAO from "../DAO/sugerenciasDAO.js";

class SugerenciasService {
    guardarSugerencia(id_usuario, nombre, email, categoria, sugerencia) {
        return sugerenciasDAO.insertarSugerencia(id_usuario, nombre, email, categoria, sugerencia);
    }
}

export default new SugerenciasService();