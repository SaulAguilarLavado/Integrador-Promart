import { jest } from '@jest/globals';
import sugerenciasService from "../service/sugerenciasService.js";
import sugerenciasDAO from "../DAO/sugerenciasDAO.js";

describe("sugerenciasService", () => {
    beforeAll(() => {
        jest.spyOn(sugerenciasDAO, "insertarSugerencia").mockImplementation(
            (id_usuario, nombre, sugerencia) => Promise.resolve({ insertId: 1 })
        );
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("guardarSugerencia retorna insertId", async () => {
        const result = await sugerenciasService.guardarSugerencia(1, "Saul", "Una sugerencia");
        expect(result).toHaveProperty("insertId");
    });
});