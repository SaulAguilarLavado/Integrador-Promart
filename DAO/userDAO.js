import { pool } from "../DB/db.js";

class UserDAO {
    async buscarUsuarioPorCorreo(correo) {
        const query = "SELECT * FROM usuarios WHERE correo = ?";
        const [results] = await pool.query(query, [correo]);
        return results[0];
    }

    async registrarUsuario(nombre_usuario, correo, contra) {
        const query = "INSERT INTO usuarios (nombre_usuario, correo, contra) VALUES (?, ?, ?)";
        const [result] = await pool.query(query, [nombre_usuario, correo, contra]);
        return result;
    }
}

export default new UserDAO();