import { jest } from '@jest/globals';
import productosService from "../service/productosService.js";
import productosDAO from "../DAO/productosDAO.js"; // Importa normalmente

describe("productosService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("obtenerTodosConCategoria llama al DAO", async () => {
        productosDAO.obtenerTodosConCategoria = jest.fn().mockResolvedValue([{ id: 1 }]);
        const result = await productosService.obtenerTodosConCategoria();
        expect(productosDAO.obtenerTodosConCategoria).toHaveBeenCalled();
        expect(result).toEqual([{ id: 1 }]);
    });

    test("obtenerPorCategoria llama al DAO con el nombre correcto", async () => {
        productosDAO.obtenerPorCategoria = jest.fn().mockResolvedValue([{ id: 2 }]);
        const result = await productosService.obtenerPorCategoria("audio");
        expect(productosDAO.obtenerPorCategoria).toHaveBeenCalledWith("audio");
        expect(result).toEqual([{ id: 2 }]);
    });

    test("agregarProducto llama al DAO con los datos correctos", async () => {
        productosDAO.agregarProducto = jest.fn().mockResolvedValue();
        const data = { nombre_producto: "Test", descripcion: "desc", precio: 10, stock: 5, imagen: "img.jpg", id_categoria: 2 };
        await productosService.agregarProducto(data);
        expect(productosDAO.agregarProducto).toHaveBeenCalledWith(
            "Test", "desc", 10, 5, "img.jpg", 2
        );
    });

    test("eliminarProducto llama al DAO con el id correcto", async () => {
        productosDAO.eliminarProducto = jest.fn().mockResolvedValue();
        await productosService.eliminarProducto(5);
        expect(productosDAO.eliminarProducto).toHaveBeenCalledWith(5);
    });

    test("obtenerPorId llama al DAO con el id correcto", async () => {
        productosDAO.obtenerPorId = jest.fn().mockResolvedValue({ id: 3 });
        const result = await productosService.obtenerPorId(3);
        expect(productosDAO.obtenerPorId).toHaveBeenCalledWith(3);
        expect(result).toEqual({ id: 3 });
    });

    test("actualizarProducto llama al DAO con los datos correctos", async () => {
        productosDAO.actualizarProducto = jest.fn().mockResolvedValue();
        const data = { nombre_producto: "Nuevo", descripcion: "desc2", precio: 20, stock: 10, imagen: "img2.jpg", id_categoria: 4 };
        await productosService.actualizarProducto(7, data);
        expect(productosDAO.actualizarProducto).toHaveBeenCalledWith(
            7, "Nuevo", "desc2", 20, 10, "img2.jpg", 4
        );
    });
});