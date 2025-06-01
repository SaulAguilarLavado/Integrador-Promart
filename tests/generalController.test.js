import { jest } from '@jest/globals';
import request from "supertest";
import express from "express";

let app;

beforeAll(async () => {
    const {
        renderIndex,
        renderAcerca,
        renderPoliticas,
        renderTerminos,
        renderSugerencias,
        renderReclamaciones
    } = await import("../controller/generalController.js");
    app = express();

    // Mock render para capturar el renderizado
    app.response.render = function (view, options) {
        this.status(200).json({ view, ...options });
    };

    app.get("/", renderIndex);
    app.get("/acerca", renderAcerca);
    app.get("/politicas", renderPoliticas);
    app.get("/terminos", renderTerminos);
    app.get("/sugerencias", renderSugerencias);
    app.get("/reclamaciones", renderReclamaciones);
});

describe("General Controller", () => {
    test("GET / renderiza la vista index", async () => {
        const res = await request(app).get("/");
        expect(res.body.view).toBe("index");
    });

    test("GET /acerca renderiza la vista general/Acerca", async () => {
        const res = await request(app).get("/acerca");
        expect(res.body.view).toBe("general/Acerca");
    });

    test("GET /politicas renderiza la vista general/Politicas", async () => {
        const res = await request(app).get("/politicas");
        expect(res.body.view).toBe("general/Politicas");
    });

    test("GET /terminos renderiza la vista general/Terminos", async () => {
        const res = await request(app).get("/terminos");
        expect(res.body.view).toBe("general/Terminos");
    });

    test("GET /sugerencias renderiza la vista general/Sugerencias", async () => {
        const res = await request(app).get("/sugerencias");
        expect(res.body.view).toBe("general/Sugerencias");
    });

    test("GET /reclamaciones renderiza la vista general/Reclamaciones", async () => {
        const res = await request(app).get("/reclamaciones");
        expect(res.body.view).toBe("general/Reclamaciones");
    });
});