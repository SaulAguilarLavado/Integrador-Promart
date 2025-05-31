import reclamacionesService from "../service/reclamacionesService.js";
import reclamacionesDAO from "../DAO/reclamacionesDAO.js";

describe("reclamacionesService", () => {
    beforeAll(() => {
        jest.spyOn(reclamacionesDAO, "insertarReclamacion").mockImplementation(
            (id_usuario, nombre, dni, categoria, reclamacion) => Promise.resolve({ insertId: 1 })
        );
        jest.spyOn(reclamacionesDAO, "obtenerUsuarioPorId").mockImplementation(
            (id_usuario) => Promise.resolve({ dni: "12345678" })
        );
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("guardarReclamacion retorna insertId", async () => {
        const result = await reclamacionesService.guardarReclamacion(1, "Saul", "12345678", "Producto", "Detalle");
        expect(result).toHaveProperty("insertId");
    });

    test("obtenerUsuarioPorId retorna dni", async () => {
        const result = await reclamacionesService.obtenerUsuarioPorId(1);
        expect(result).toHaveProperty("dni", "12345678");
    });
});