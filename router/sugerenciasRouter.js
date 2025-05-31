import express from "express";
import { enviarSugerencia } from "../controller/sugerenciasController.js";

const router = express.Router();

router.post("/sugerencias", enviarSugerencia);

export default router;