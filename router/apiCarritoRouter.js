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
router.get("/admin/detalle-compras", verDetalleCompras);

export default router;