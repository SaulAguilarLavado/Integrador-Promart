import reclamacionesDAO from "../DAO/reclamacionesDAO.js";

class ReclamacionesService {
    guardarReclamacion(id_usuario, nombre, dni, categoria, reclamacion) {
        // Aquí puedes agregar validaciones si lo necesitas
        return reclamacionesDAO.insertarReclamacion(id_usuario, nombre, dni, categoria, reclamacion);
    }

    obtenerUsuarioPorId(id_usuario) {
        return reclamacionesDAO.obtenerUsuarioPorId(id_usuario);
    }
}

export default new ReclamacionesService();