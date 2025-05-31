import { jest } from '@jest/globals';
import userService from "../service/userService.js";
import userDAO from "../DAO/userDAO.js";

describe("userService", () => {
    beforeAll(() => {
        jest.spyOn(userDAO, "buscarUsuarioPorCorreo").mockImplementation((correo) => {
            if (correo === "existe@mail.com") {
                return Promise.resolve({ id: 1, nombre_usuario: "Saul", correo: "existe@mail.com", contra: "hash" });
            }
            return Promise.resolve(null);
        });
        jest.spyOn(userDAO, "registrarUsuario").mockImplementation((nombre_usuario, correo, contra) => {
            return Promise.resolve({ insertId: 2 });
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("buscarUsuarioPorCorreo devuelve usuario si existe", async () => {
        const user = await userService.buscarUsuarioPorCorreo("existe@mail.com");
        expect(user).toHaveProperty("id");
        expect(user.nombre_usuario).toBe("Saul");
    });

    test("buscarUsuarioPorCorreo devuelve null si no existe", async () => {
        const user = await userService.buscarUsuarioPorCorreo("noexiste@mail.com");
        expect(user).toBeNull();
    });

    test("registrarUsuario retorna insertId", async () => {
        const result = await userService.registrarUsuario("Nuevo", "nuevo@mail.com", "hash");
        expect(result).toHaveProperty("insertId");
    });
});