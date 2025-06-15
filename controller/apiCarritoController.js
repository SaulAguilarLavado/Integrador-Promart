import * as carritoService from "../service/carritoService.js";

export const agregarAlCarrito = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id_producto, accion } = req.body;
        if (!userId) return res.status(401).json({ error: "No autenticado" });
        if (!id_producto) return res.status(400).json({ error: "Datos incompletos" });

        if (accion === "sumar") {
            await carritoService.incrementProduct(userId, id_producto);
        } else if (accion === "restar") {
            await carritoService.decrementProduct(userId, id_producto);
        } else if (accion === "eliminar") {
            await carritoService.eliminarProducto(userId, id_producto);
        } else {
            await carritoService.agregarAlCarrito(userId, id_producto);
        }
        res.json({ ok: true });
    } catch (err) {
        console.error("Error en agregarAlCarrito:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const obtenerCarritoUsuario = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: "No autenticado" });

    const productos = await carritoService.obtenerCarritoUsuario(userId);
    res.json(productos);
};
export const actualizarCantidadCarrito = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id_producto, accion } = req.body;
        if (!userId) return res.status(401).json({ error: "No autenticado" });
        if (!id_producto || !accion) return res.status(400).json({ error: "Datos incompletos" });

        if (accion === "sumar") {
            await carritoService.incrementProduct(userId, id_producto);
        } else if (accion === "restar") {
            await carritoService.decrementProduct(userId, id_producto);
        }
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const eliminarDelCarrito = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id_producto } = req.body;
        if (!userId) return res.status(401).json({ error: "No autenticado" });
        if (!id_producto) return res.status(400).json({ error: "Datos incompletos" });

        await carritoService.eliminarProducto(userId, id_producto);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};