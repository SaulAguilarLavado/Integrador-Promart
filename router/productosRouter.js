import express from "express";
import {
    renderAudio,
    renderCamarasDrones,
    renderCelulares,
    renderComputo,
    renderGamer,
    renderOficina,
    renderPilasCargadores,
    renderSmartHome,
    renderMovilidad,
    renderTV
} from "../controller/productosController.js";

const router = express.Router();

router.get("/audio", renderAudio);
router.get("/camaras-drones", renderCamarasDrones);
router.get("/celulares", renderCelulares);
router.get("/computo", renderComputo);
router.get("/gamer", renderGamer);
router.get("/oficina", renderOficina);
router.get("/movilidad", renderMovilidad);
router.get("/pilas-cargadores", renderPilasCargadores);
router.get("/smart-home", renderSmartHome);
router.get("/tv", renderTV);

export default router;