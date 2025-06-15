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
