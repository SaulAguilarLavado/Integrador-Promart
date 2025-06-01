import { pool } from "../DB/db.js";

class CategoriasDAO {
    async obtenerTodas() {
        const [rows] = await pool.query("SELECT * FROM categorias");
        return rows;
    }
}
export default new CategoriasDAO();