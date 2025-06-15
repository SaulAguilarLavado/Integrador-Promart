import express from "express";
import * as generalController from "../controller/generalController.js";

const router = express.Router();

router.get("/", generalController.renderIndex);
router.get("/carrito", generalController.mostrarCarrito);
router.get("/acerca", generalController.renderAcerca);
router.get("/politicas", generalController.renderPoliticas);
router.get("/terminos", generalController.renderTerminos);
router.get("/sugerencias", generalController.renderSugerencias);
router.get("/reclamaciones", generalController.renderReclamaciones);
router.get("/logout", generalController.logout);

export default router;