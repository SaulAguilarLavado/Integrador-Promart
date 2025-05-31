import conexion from "../DB/db.js";

class ReclamacionesDAO {
    insertarReclamacion(id_usuario, nombre, dni, categoria, reclamacion) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO reclamaciones (id_usuario, nombre, dni, categoria, reclamacion) VALUES (?, ?, ?, ?, ?)
            `;
            conexion.query(query, [id_usuario, nombre, dni, categoria, reclamacion], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    obtenerUsuarioPorId(id_usuario) {
        return new Promise((resolve, reject) => {
            const query = "SELECT dni FROM usuarios WHERE id = ?";
            conexion.query(query, [id_usuario], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
}

export default new ReclamacionesDAO();