import { jest } from '@jest/globals';

// Mockea productosService
jest.unstable_mockModule("../service/productosService.js", () => ({
    default: {
        obtenerPorCategoria: jest.fn((categoria) => Promise.resolve([{ id: 1, nombre_producto: "Test", categoria }])),
    }
}));

import request from "supertest";
import express from "express";

let app;

beforeAll(async () => {
    const { renderAudio, renderCamarasDrones } = await import("../controller/productosController.js");
    app = express();

    // Mock render para capturar el renderizado
    app.response.render = function (view, options) {
        this.status(200).json({ view, ...options });
    };

    // Rutas de ejemplo para testear
    app.get("/productos/audio", renderAudio);
    app.get("/productos/camaras-drones", renderCamarasDrones);
});

describe("Productos Controller", () => {
    test("GET /productos/audio renderiza la vista de audio con productos", async () => {
        const res = await request(app).get("/productos/audio");
        expect(res.body.view).toBe("productos/audio");
        expect(Array.isArray(res.body.productos)).toBe(true);
        expect(res.body.productos[0].nombre_producto).toBe("Test");
    });

    test("GET /productos/camaras-drones renderiza la vista de camaras-drones con productos", async () => {
        const res = await request(app).get("/productos/camaras-drones");
        expect(res.body.view).toBe("productos/camaras-drones");
        expect(Array.isArray(res.body.productos)).toBe(true);
        expect(res.body.productos[0].categoria).toBe("camaras-drones");
    });
});