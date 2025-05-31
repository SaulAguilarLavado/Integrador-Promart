import { jest } from '@jest/globals';

jest.unstable_mockModule("../service/userService.js", () => ({
    default: {
        buscarUsuarioPorCorreo: jest.fn((correo) => {
            if (correo === "existe@mail.com") {
                return Promise.resolve({ id: 1, nombre_usuario: "Saul", correo: "existe@mail.com" });
            }
            return Promise.resolve(null);
        }),
        registrarUsuario: jest.fn(() => Promise.resolve({ insertId: 2 })),
    }
}));

jest.mock("bcryptjs", () => ({
    hash: jest.fn((contra) => Promise.resolve("hashedPassword")),
}));

import request from "supertest";
import express from "express";
import session from "express-session";

let app;

beforeAll(async () => {
    const { default: signUpRoutes } = await import("../router/signUpRouter.js");
    app = express();
    app.use(express.json());
    app.use(session({ secret: "test", resave: false, saveUninitialized: true }));
    app.use(signUpRoutes);
});

describe("POST /signup", () => {
    test("debe responder 400 si faltan campos", async () => {
        const res = await request(app).post("/validar").send({ correo: "" });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si el correo es inválido", async () => {
        const res = await request(app).post("/validar").send({
            nombre_usuario: "Saul",
            correo: "correo-invalido",
            contra: "123456"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 400 si la contraseña es muy corta", async () => {
        const res = await request(app).post("/validar").send({
            nombre_usuario: "Saul",
            correo: "nuevo@mail.com",
            contra: "123"
        });
        expect(res.status).toBe(400);
    });

    test("debe responder 409 si el correo ya está registrado", async () => {
        const res = await request(app).post("/validar").send({
            nombre_usuario: "Saul",
            correo: "existe@mail.com",
            contra: "123456"
        });
        expect(res.status).toBe(409);
    });

    test("debe redirigir si el registro es exitoso", async () => {
        const res = await request(app).post("/validar").send({
            nombre_usuario: "Nuevo",
            correo: "nuevo@mail.com",
            contra: "123456"
        });
        expect(res.status).toBe(302); // Redirección
        expect(res.headers.location).toBe("/?registro=exitoso");
    });
});