import { jest } from '@jest/globals';

jest.unstable_mockModule("../service/userService.js", () => ({
    default: {
        buscarUsuarioPorCorreo: jest.fn((correo) => {
            if (correo === "existe@mail.com") {
                return Promise.resolve({ id: 1, nombre_usuario: "Saul", correo: "existe@mail.com", contra: "$2a$10$hash" });
            }
            return Promise.resolve(null);
        }),
    }
}));

// Usa unstable_mockModule para bcryptjs también
jest.unstable_mockModule("bcryptjs", () => ({
    compare: jest.fn((input, hash) => Promise.resolve(input === "correcta")),
}));

import request from "supertest";
import express from "express";
import session from "express-session";

let app;

beforeAll(async () => {
    const bcryptjs = await import("bcryptjs");
    console.log("bcryptjs compare mock:", bcryptjs.compare);

    const { default: logInRoutes } = await import("../router/logInRouter.js");
    app = express();
    app.use(express.json());
    app.use(session({ secret: "test", resave: false, saveUninitialized: true }));
    app.use(logInRoutes);
});

describe("POST /login", () => {
    test("debe responder 400 si faltan campos", async () => {
        const res = await request(app).post("/login").send({ correo: "" });
        expect(res.status).toBe(400);
    });

    test("debe responder 404 si el usuario no existe", async () => {
        const res = await request(app).post("/login").send({ correo: "noexiste@mail.com", contra: "123456" });
        expect(res.status).toBe(404);
    });

    test("debe responder 401 si la contraseña es incorrecta", async () => {
        const res = await request(app)
            .post("/login")
            .send({ correo: "existe@mail.com", contra: "incorrecta" });
        expect(res.status).toBe(401);
    });

    test("debe redirigir si el login es exitoso", async () => {
        const res = await request(app)
            .post("/login")
            .send({ correo: "existe@mail.com", contra: "correcta" });
        expect(res.status).toBe(302); // Redirección
        expect(res.headers.location).toBe("/?login=exitoso");
    });
});