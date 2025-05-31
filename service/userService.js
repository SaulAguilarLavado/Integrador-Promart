import userDAO from "../DAO/userDAO.js";

class UserService {
    buscarUsuarioPorCorreo(correo) {
        return userDAO.buscarUsuarioPorCorreo(correo);
    }

    registrarUsuario(nombre_usuario, correo, contra) {
        return userDAO.registrarUsuario(nombre_usuario, correo, contra);
    }
}

export default new UserService();