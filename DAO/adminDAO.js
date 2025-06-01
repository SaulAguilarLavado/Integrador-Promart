import { pool } from "../DB/db.js";

export async function buscarAdminPorCredenciales(correo, contra) {
    const [rows] = await pool.query(
        "SELECT * FROM admin WHERE correo = ? AND contra = ?",
        [correo, contra]
    );
    return rows;
}