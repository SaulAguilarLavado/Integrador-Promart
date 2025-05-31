import express from "express";
import { enviarReclamacion } from "../controller/reclamacionesController.js";

const router = express.Router();

router.post("/reclamaciones", enviarReclamacion);

export default router;