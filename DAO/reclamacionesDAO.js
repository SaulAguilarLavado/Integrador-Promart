import { pool } from "../DB/db.js";

class ReclamacionesDAO {
    async insertarReclamacion(id_usuario, nombre, dni, categoria, reclamacion) {
        const query = `
            INSERT INTO reclamaciones (id_usuario, nombre, dni, categoria, reclamacion) VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [id_usuario, nombre, dni, categoria, reclamacion]);
        return result;
    }

    async obtenerUsuarioPorId(id_usuario) {
        const query = "SELECT dni FROM usuarios WHERE id = ?";
        const [results] = await pool.query(query, [id_usuario]);
        return results[0];
    }

    async obtenerTodas() {
        const [rows] = await pool.query("SELECT * FROM reclamaciones");
        return rows;
    }
}

export default new ReclamacionesDAO();