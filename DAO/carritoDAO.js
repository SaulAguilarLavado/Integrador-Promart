import { pool as db } from "../DB/db.js";

export const findByUserAndProduct = async (userId, productId) => {
    const [rows] = await db.query(
        "SELECT * FROM carritos WHERE id_usuario = ? AND id_producto = ?",
        [userId, productId]
    );
    return rows[0];
};

export const addProduct = async (userId, productId) => {
    await db.query(
        "INSERT INTO carritos (id_usuario, id_producto, cantidad) VALUES (?, ?, 1)",
        [userId, productId]
    );
};

export const incrementProduct = async (userId, productId) => {
    await db.query(
        "UPDATE carritos SET cantidad = cantidad + 1 WHERE id_usuario = ? AND id_producto = ?",
        [userId, productId]
    );
};

export const getCarritoByUser = async (userId) => {
    const [rows] = await db.query(
        `SELECT 
            p.id, 
            p.nombre_producto, 
            p.precio, 
            c.cantidad, 
            p.imagen
        FROM carritos c
        JOIN productos p ON c.id_producto = p.id
        WHERE c.id_usuario = ?`,
        [userId]
    );
    return rows;
};

export const decrementProduct = async (userId, productId) => {
    await db.query(
        "UPDATE carritos SET cantidad = GREATEST(cantidad - 1, 1) WHERE id_usuario = ? AND id_producto = ?",
        [userId, productId]
    );
};

export const eliminarProducto = async (userId, productId) => {
    await db.query(
        "DELETE FROM carritos WHERE id_usuario = ? AND id_producto = ?",
        [userId, productId]
    );
};

export const crearCompra = async (userId, total) => {
    const [result] = await db.query(
        "INSERT INTO compras (id_usuario, total) VALUES (?, ?)",
        [userId, total]
    );
    return result.insertId;
};
export const insertarDetalleCompra = async (compraId, productoId, cantidad, precio) => {
    await db.query(
        "INSERT INTO detalle_compra (id_compra, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
        [compraId, productoId, cantidad, precio]
    );
};
export const actualizarStock = async (productoId, cantidadComprada) => {
    await db.query(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [cantidadComprada, productoId]
    );
};
export const vaciarCarrito = async (userId) => {
    await db.query("DELETE FROM carritos WHERE id_usuario = ?", [userId]);
};

export const getDetalleCompras = async () => {
    const [rows] = await db.query(
        `SELECT dc.id, dc.id_compra, dc.id_producto, dc.cantidad, dc.precio_unitario,
                c.fecha_compra, c.total,
                u.nombre_usuario, u.correo,
                p.nombre_producto, p.imagen
         FROM detalle_compra dc
         JOIN compras c ON dc.id_compra = c.id
         JOIN usuarios u ON c.id_usuario = u.id
         JOIN productos p ON dc.id_producto = p.id
         ORDER BY c.fecha_compra DESC`
    );
    return rows;
};