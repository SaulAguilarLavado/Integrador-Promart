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
    renderTV
} from "../controller/productosController.js";

const router = express.Router();

router.get("/audio", renderAudio);
router.get("/camaraDrones", renderCamarasDrones);
router.get("/celulares", renderCelulares);
router.get("/computo", renderComputo);
router.get("/gamer", renderGamer);
router.get("/oficina", renderOficina);
router.get("/pilasCargadores", renderPilasCargadores);
router.get("/smartHome", renderSmartHome);
router.get("/tv", renderTV);

export default router;