import express from "express";
import {
    agregarAlCarrito,
    obtenerCarritoUsuario
} from "../controller/apiCarritoController.js";

const router = express.Router();

router.post("/", agregarAlCarrito);
router.get("/", obtenerCarritoUsuario);

export default router;