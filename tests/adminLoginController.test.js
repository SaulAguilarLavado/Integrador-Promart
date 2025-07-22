import { jest } from '@jest/globals';

jest.unstable_mockModule("../dao/adminDao.js", () => ({
    buscarAdminPorCredenciales: jest.fn((correo, contra) => {
        if (correo === "admin@mail.com" && contra === "admin123") {
            return Promise.resolve([{ id: 1, correo }]);
        }
        return Promise.resolve([]);
    }),
}));

import request from "supertest";
import express from "express";
import session from "express-session";

let app;

beforeAll(async () => {
    const { renderAdminLogin, procesarAdminLogin, adminLogout } = await import("../controller/adminLoginController.js");
    app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(session({ secret: "test", resave: false, saveUninitialized: true }));

    app.get("/admin/login", renderAdminLogin);
    app.post("/admin/login", procesarAdminLogin);
    app.get("/admin/logout", adminLogout);
    
    app.response.render = function (view, options) {
        this.status(200).json({ view, ...options });
    };
});

describe("Admin Login Controller", () => {
    test("GET /admin/login renderiza el login", async () => {
        const res = await request(app).get("/admin/login");
        expect(res.body.view).toBe("admin/loginAdmin");
        expect(res.body.error).toBeNull();
    });

    test("POST /admin/login con credenciales correctas redirige al dashboard", async () => {
        const res = await request(app)
            .post("/admin/login")
            .send("correo=admin@mail.com&contra=admin123");
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe("/admin/dashboard");
    });

    test("POST /admin/login con credenciales incorrectas renderiza error", async () => {
        const res = await request(app)
            .post("/admin/login")
            .send("correo=admin@mail.com&contra=wrong");
        expect(res.body.view).toBe("admin/loginAdmin");
        expect(res.body.error).toBe("Credenciales incorrectas");
    });

    test("GET /admin/logout destruye la sesión y redirige", async () => {
        const res = await request(app).get("/admin/logout");
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe("/admin/login");
    });
    test("POST /admin/login maneja error de conexión", async () => {
        const { buscarAdminPorCredenciales } = await import("../dao/adminDao.js");
        buscarAdminPorCredenciales.mockRejectedValueOnce(new Error("DB error"));
        const res = await request(app)
            .post("/admin/login")
            .send("correo=admin@mail.com&contra=admin123");
        expect(res.body.view).toBe("admin/loginAdmin");
        expect(res.body.error).toBe("Error de conexión");
    });
});
