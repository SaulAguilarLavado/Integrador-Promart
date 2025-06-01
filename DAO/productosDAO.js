import { pool } from "../DB/db.js";

class ProductosDAO {
    async obtenerPorCategoria(nombreCategoria) {
        const [rows] = await pool.query(
            `SELECT productos.*, categorias.nombre_categoria 
             FROM productos 
             JOIN categorias ON productos.id_categoria = categorias.id 
             WHERE categorias.nombre_categoria = ?`,
            [nombreCategoria]
        );
        return rows;
    }

    async obtenerTodosConCategoria() {
        const [rows] = await pool.query(
            `SELECT productos.*, categorias.nombre_categoria 
             FROM productos 
             LEFT JOIN categorias ON productos.id_categoria = categorias.id`
        );
        return rows;
    }

    async agregarProducto(nombre_producto, descripcion, precio, stock, imagen, id_categoria) {
        await pool.query(
            "INSERT INTO productos (nombre_producto, descripcion, precio, stock, imagen, id_categoria) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre_producto, descripcion, precio, stock, imagen, id_categoria]
        );
    }
    async eliminarProducto(id) {
        await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    }

    async obtenerPorId(id) {
        const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
        return rows[0];
    }

    async actualizarProducto(id, nombre_producto, descripcion, precio, stock, imagen, id_categoria) {
        await pool.query(
            "UPDATE productos SET nombre_producto=?, descripcion=?, precio=?, stock=?, imagen=?, id_categoria=? WHERE id=?",
            [nombre_producto, descripcion, precio, stock, imagen, id_categoria, id]
        );
    }
}

export default new ProductosDAO();