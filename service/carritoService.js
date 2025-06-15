import * as carritoDAO from "../dao/carritoDAO.js";

export const agregarAlCarrito = async (userId, productId) => {
    const existente = await carritoDAO.findByUserAndProduct(userId, productId);
    if (existente) {
        await carritoDAO.incrementProduct(userId, productId);
    } else {
        await carritoDAO.addProduct(userId, productId);
    }
};

export const obtenerCarritoUsuario = async (userId) => {
    return await carritoDAO.getCarritoByUser(userId);
};
export const incrementProduct = async (userId, productId) => {
    await carritoDAO.incrementProduct(userId, productId);
};
export const decrementProduct = async (userId, productId) => {
    await carritoDAO.decrementProduct(userId, productId);
};
export const eliminarProducto = async (userId, productId) => {
    await carritoDAO.eliminarProducto(userId, productId);
};