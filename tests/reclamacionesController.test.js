import { jest } from '@jest/globals';

jest.unstable_mockModule("../service/reclamacionesService.js", () => ({
    default: {
        guardarReclamacion: jest.fn(() => Promise.resolve({ insertId: 1 })),
    }
}));

import request from "supertest";
import express from "express";
import session from "express-session";

let app;

beforeAll(async () => {
    const { default: reclamacionesRoutes } = await import("../router/reclamacionesRouter.js");
    app = express();
    app.use(express.json());
    app.use(session({ secret: "test", resave: false, saveUninitialized: true }));
    app.use(reclamacionesRoutes);
});

describe("POST /reclamaciones", () => {
    test("debe responder 400 si falta el DNI", async () => {
        const res = await request(app).post("/reclamaciones").send({
            nombre: "Saul",
            categoria: "Producto",
            reclamacion: "Detalle"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si el DNI es inválido", async () => {
        const res = await request(app).post("/reclamaciones").send({
            nombre: "Saul",
            dni: "1234",
            categoria: "Producto",
            reclamacion: "Detalle"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si la categoría está vacía", async () => {
        const res = await request(app).post("/reclamaciones").send({
            nombre: "Saul",
            dni: "12345678",
            categoria: "",
            reclamacion: "Detalle"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si la reclamación está vacía", async () => {
        const res = await request(app).post("/reclamaciones").send({
            nombre: "Saul",
            dni: "12345678",
            categoria: "Producto",
            reclamacion: ""
        });
        expect(res.status).toBe(400);
    });

    test("debe redirigir si la reclamación es exitosa", async () => {
        const res = await request(app).post("/reclamaciones").send({
            nombre: "Saul",
            dni: "12345678",
            categoria: "Producto",
            reclamacion: "Detalle"
        });
        expect(res.status).toBe(302); // Redirección
        expect(res.headers.location).toBe("/reclamaciones?reclamaciones=exitoso");
    });
});