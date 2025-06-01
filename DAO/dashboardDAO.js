import { pool } from "../DB/db.js";

export async function obtenerTotalesDashboard() {
    const [[{ total: totalUsuarios }]] = await pool.query("SELECT COUNT(*) AS total FROM usuarios");
    const [[{ total: totalProductos }]] = await pool.query("SELECT COUNT(*) AS total FROM productos");
    const [[{ total: totalSugerencias }]] = await pool.query("SELECT COUNT(*) AS total FROM sugerencias");
    const [[{ total: totalReclamaciones }]] = await pool.query("SELECT COUNT(*) AS total FROM reclamaciones");
    const [[{ total: totalCompras }]] = await pool.query("SELECT COUNT(*) AS total FROM compras");
    return { totalUsuarios, totalProductos, totalSugerencias, totalReclamaciones, totalCompras };
}