import express from "express";
import { registrar } from "../controller/signUpController.js";

const router = express.Router();

router.post("/validar", registrar);

export default router;