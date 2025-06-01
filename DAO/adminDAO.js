import { conectarDB } from "../DB/db.js";

export async function buscarAdminPorCredenciales(correo, contra) {
    const db = await conectarDB();
    const [rows] = await db.query(
        "SELECT * FROM admin WHERE correo = ? AND contra = ?",
        [correo, contra]
    );
    return rows;
}