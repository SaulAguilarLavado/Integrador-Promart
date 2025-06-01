import productosDAO from "../DAO/productosDAO.js";

class ProductosService {
    obtenerTodosConCategoria() {
        return productosDAO.obtenerTodosConCategoria();
    }

    obtenerPorCategoria(nombreCategoria) {
        return productosDAO.obtenerPorCategoria(nombreCategoria);
    }

    agregarProducto(data) {

        return productosDAO.agregarProducto(
            data.nombre_producto,
            data.descripcion,
            data.precio,
            data.stock,
            data.imagen,
            data.id_categoria
        );
    }

    eliminarProducto(id) {
        return productosDAO.eliminarProducto(id);
    }

    obtenerPorId(id) {
        return productosDAO.obtenerPorId(id);
    }

    actualizarProducto(id, data) {
        return productosDAO.actualizarProducto(
            id,
            data.nombre_producto,
            data.descripcion,
            data.precio,
            data.stock,
            data.imagen,
            data.id_categoria
        );
    }
}

export default new ProductosService();