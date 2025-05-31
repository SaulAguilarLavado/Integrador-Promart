import conexion from "../DB/db.js";

class SugerenciasDAO {
    insertarSugerencia(id_usuario, nombre, email, categoria, sugerencia) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO sugerencias (id_usuario, nombre, email, categoria, sugerencia) VALUES (?, ?, ?, ?, ?)
            `;
            conexion.query(query, [id_usuario, nombre, email, categoria, sugerencia], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

export default new SugerenciasDAO();