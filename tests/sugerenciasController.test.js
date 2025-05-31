import { jest } from '@jest/globals';

jest.unstable_mockModule("../service/sugerenciasService.js", () => ({
    default: {
        guardarSugerencia: jest.fn(() => Promise.resolve({ insertId: 1 })),
    }
}));

import request from "supertest";
import express from "express";
import session from "express-session";

let app;

beforeAll(async () => {
    const { default: sugerenciasRoutes } = await import("../router/sugerenciasRouter.js");
    app = express();
    app.use(express.json());
    app.use(session({ secret: "test", resave: false, saveUninitialized: true }));
    app.use(sugerenciasRoutes);
});

describe("POST /sugerencias", () => {
    test("debe responder 400 si falta el nombre o email", async () => {
        const res = await request(app).post("/sugerencias").send({
            sugerencia: "Una sugerencia"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si el email es inválido", async () => {
        const res = await request(app).post("/sugerencias").send({
            nombre: "Saul",
            email: "correo-invalido",
            categoria: "General",
            sugerencia: "Una sugerencia"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si la sugerencia está vacía", async () => {
        const res = await request(app).post("/sugerencias").send({
            nombre: "Saul",
            email: "saul@mail.com",
            categoria: "General",
            sugerencia: ""
        });
        expect(res.status).toBe(400);
    });

    test("debe redirigir si la sugerencia es exitosa", async () => {
        const res = await request(app).post("/sugerencias").send({
            nombre: "Saul",
            email: "saul@mail.com",
            categoria: "General",
            sugerencia: "Una sugerencia"
        });
        expect(res.status).toBe(302); // Redirección
        expect(res.headers.location).toBe("/sugerencias?sugerencia=exitoso");
    });
});