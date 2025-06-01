import { pool } from "../DB/db.js";

class SugerenciasDAO {
    async insertarSugerencia(id_usuario, nombre, email, categoria, sugerencia) {
        const query = `
            INSERT INTO sugerencias (id_usuario, nombre, email, categoria, sugerencia) VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [id_usuario, nombre, email, categoria, sugerencia]);
        return result;
    }

    async obtenerTodas() {
        const [rows] = await pool.query("SELECT * FROM sugerencias");
        return rows;
    }
}

export default new SugerenciasDAO();