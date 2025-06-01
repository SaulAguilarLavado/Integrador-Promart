import { jest } from '@jest/globals';

// Mockea los DAOs y services usados en el controller
jest.unstable_mockModule("../DAO/categoriasDAO.js", () => ({
    default: {
        obtenerTodas: jest.fn(() => Promise.resolve([{ id: 1, nombre_categoria: "audio" }])),
    }
}));
jest.unstable_mockModule("../service/productosService.js", () => ({
    default: {
        obtenerTodosConCategoria: jest.fn(() => Promise.resolve([{ id: 1, nombre_producto: "Echo" }])),
    }
}));
jest.unstable_mockModule("../DAO/sugerenciasDAO.js", () => ({
    default: {
        obtenerTodas: jest.fn(() => Promise.resolve([{ id: 1, sugerencia: "Más productos" }])),
    }
}));
jest.unstable_mockModule("../DAO/reclamacionesDAO.js", () => ({
    default: {
        obtenerTodas: jest.fn(() => Promise.resolve([{ id: 1, reclamo: "Demora" }])),
    }
}));
jest.unstable_mockModule("../DAO/dashboardDAO.js", () => ({
    obtenerTotalesDashboard: jest.fn(() => Promise.resolve({ totalUsuarios: 10, totalProductos: 5 })),
}));

import request from "supertest";
import express from "express";

let app;

beforeAll(async () => {
    const {
        renderDashboard,
        renderAdminProductos,
        renderAdminUsuarios,
        renderAdminSugerencias,
        renderAdminReclamaciones
    } = await import("../controller/adminNavController.js");

    app = express();

    // Mock render para capturar el renderizado
    app.response.render = function (view, options) {
        this.status(200).json({ view, ...options });
    };

    // Rutas para testear los renders
    app.get("/admin/dashboard", renderDashboard);
    app.get("/admin/productos", renderAdminProductos);
    app.get("/admin/usuarios", renderAdminUsuarios);
    app.get("/admin/sugerencias", renderAdminSugerencias);
    app.get("/admin/reclamaciones", renderAdminReclamaciones);
});

describe("Admin Nav Controller", () => {
    test("GET /admin/dashboard renderiza dashboard con totales", async () => {
        const res = await request(app).get("/admin/dashboard");
        expect(res.body.view).toBe("admin/dashboard");
        expect(res.body.totalUsuarios).toBe(10);
        expect(res.body.totalProductos).toBe(5);
    });

    test("GET /admin/productos renderiza productos y categorías", async () => {
        const res = await request(app).get("/admin/productos");
        expect(res.body.view).toBe("admin/productos");
        expect(res.body.categorias[0].nombre_categoria).toBe("audio");
        expect(res.body.productos[0].nombre_producto).toBe("Echo");
    });

    test("GET /admin/usuarios renderiza usuarios", async () => {
        const res = await request(app).get("/admin/usuarios");
        expect(res.body.view).toBe("admin/usuarios");
        expect(Array.isArray(res.body.usuarios)).toBe(true);
    });

    test("GET /admin/sugerencias renderiza sugerencias", async () => {
        const res = await request(app).get("/admin/sugerencias");
        expect(res.body.view).toBe("admin/sugerenciasAdmin");
        expect(res.body.sugerencias[0].sugerencia).toBe("Más productos");
    });

    test("GET /admin/reclamaciones renderiza reclamaciones", async () => {
        const res = await request(app).get("/admin/reclamaciones");
        expect(res.body.view).toBe("admin/reclamacionesAdmin");
        expect(res.body.reclamaciones[0].reclamo).toBe("Demora");
    });
});