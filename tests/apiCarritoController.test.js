import { jest } from '@jest/globals';

const incrementProduct = jest.fn();
const getCarritoByUser = jest.fn();

jest.unstable_mockModule("../service/carritoService.js", () => ({
    incrementProduct,
    getCarritoByUser,
}));

let apiCarritoController;
beforeAll(async () => {
    apiCarritoController = await import("../controller/apiCarritoController.js");
});

describe("apiCarritoController", () => {
    let req, res;

    beforeEach(() => {
        incrementProduct.mockReset();
        getCarritoByUser.mockReset();
        req = { session: { userId: 1 }, body: {} };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn(), render: jest.fn() };
    });

    test("agregarAlCarrito suma producto", async () => {
        incrementProduct.mockResolvedValue();
        req.body = { id_producto: 2, accion: "sumar" };
        await apiCarritoController.agregarAlCarrito(req, res);
        expect(incrementProduct).toHaveBeenCalledWith(1, 2);
        expect(res.json).toHaveBeenCalledWith({ ok: true });
    });

    test("realizarCompra responde error si carrito vacío", async () => {
        getCarritoByUser.mockResolvedValue([]);
        req.body = { montoPagado: 100 };
        await apiCarritoController.realizarCompra(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "El carrito está vacío." });
    });

    test("realizarCompra responde error si monto insuficiente", async () => {
        getCarritoByUser.mockResolvedValue([{ precio: 100, cantidad: 2 }]);
        req.body = { montoPagado: 100 };
        await apiCarritoController.realizarCompra(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Monto insuficiente." });
    });
});