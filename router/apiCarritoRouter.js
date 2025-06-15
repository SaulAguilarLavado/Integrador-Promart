import express from "express";
import {
    agregarAlCarrito,
    obtenerCarritoUsuario,
    realizarCompra,
    verDetalleCompras
} from "../controller/apiCarritoController.js";

const router = express.Router();

router.post("/", agregarAlCarrito);
router.get("/", obtenerCarritoUsuario);
router.post("/comprar", realizarCompra);

export default router;