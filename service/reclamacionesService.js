import conexion from "../DB/db.js";

class ReclamacionesService {
    guardarReclamacion(id_usuario, nombre, dni, categoria, reclamacion) {
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
}

export default new ReclamacionesService();