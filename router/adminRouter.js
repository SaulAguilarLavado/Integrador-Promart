import express from "express";
import {
    renderAdminLogin,
    procesarAdminLogin,
    adminLogout
} from "../controller/adminLoginController.js";
import {
    renderDashboard,
    renderAdminProductos,
    renderAdminUsuarios
} from "../controller/adminNavController.js";

const router = express.Router();

router.get("/login", renderAdminLogin);
router.post("/login", procesarAdminLogin);
router.get("/logout", adminLogout); // si quieres agregar logout de admin
router.get("/dashboard", renderDashboard);
router.get("/productos", renderAdminProductos);
router.get("/usuarios", renderAdminUsuarios);

export default router;