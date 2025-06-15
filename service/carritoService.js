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

export const crearCompra = async (userId, total, productos) => {
    const compraId = await carritoDAO.crearCompra(userId, total);
    for (const item of productos) {
        await carritoDAO.insertarDetalleCompra(compraId, item.id, item.cantidad, item.precio);
        await carritoDAO.actualizarStock(item.id, item.cantidad);
    }
    return compraId;
};
export const vaciarCarrito = async (userId) => {
    await carritoDAO.vaciarCarrito(userId);
};
export const getCarritoByUser = async (userId) => {
    return await carritoDAO.getCarritoByUser(userId);
};
export const getDetalleCompras = async () => {
    return await carritoDAO.getDetalleCompras();
};