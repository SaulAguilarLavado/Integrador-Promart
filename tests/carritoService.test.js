import { jest } from '@jest/globals';

const findByUserAndProduct = jest.fn();
const addProduct = jest.fn();
const incrementProduct = jest.fn();
const crearCompra = jest.fn();
const insertarDetalleCompra = jest.fn();
const actualizarStock = jest.fn();
const decrementProduct = jest.fn();
const eliminarProducto = jest.fn();
const vaciarCarrito = jest.fn();
const getCarritoByUser = jest.fn();
const getDetalleCompras = jest.fn();

jest.unstable_mockModule("../dao/carritoDAO.js", () => ({
    findByUserAndProduct,
    addProduct,
    incrementProduct,
    crearCompra,
    insertarDetalleCompra,
    actualizarStock,
    decrementProduct,
    eliminarProducto,
    vaciarCarrito,
    getCarritoByUser,
    getDetalleCompras,
}));

let carritoService;
beforeAll(async () => {
    carritoService = await import("../service/carritoService.js");
});

describe("carritoService", () => {
    beforeEach(() => {
        findByUserAndProduct.mockReset();
        addProduct.mockReset();
        incrementProduct.mockReset();
        crearCompra.mockReset();
        insertarDetalleCompra.mockReset();
        actualizarStock.mockReset();
    });

    test("agregarAlCarrito agrega si no existe", async () => {
        findByUserAndProduct.mockResolvedValue(null);
        await carritoService.agregarAlCarrito(1, 2);
        expect(addProduct).toHaveBeenCalledWith(1, 2);
    });

    test("agregarAlCarrito incrementa si existe", async () => {
        findByUserAndProduct.mockResolvedValue({ id: 1 });
        await carritoService.agregarAlCarrito(1, 2);
        expect(incrementProduct).toHaveBeenCalledWith(1, 2);
    });

    test("crearCompra llama a insertarDetalleCompra y actualizarStock", async () => {
        crearCompra.mockResolvedValue(10);
        const productos = [{ id: 2, cantidad: 3, precio: 100 }];
        await carritoService.crearCompra(1, 300, productos);
        expect(insertarDetalleCompra).toHaveBeenCalledWith(10, 2, 3, 100);
        expect(actualizarStock).toHaveBeenCalledWith(2, 3);
    });
});