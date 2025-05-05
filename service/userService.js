import conexion from "../DB/db.js";

class UserService {
    buscarUsuarioPorCorreo(correo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM usuarios WHERE correo = ?";
            conexion.query(query, [correo], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }

    registrarUsuario(nombre_usuario, correo, contra) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO usuarios (nombre_usuario, correo, contra) VALUES (?, ?, ?)";
            conexion.query(query, [nombre_usuario, correo, contra], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

export default new UserService();