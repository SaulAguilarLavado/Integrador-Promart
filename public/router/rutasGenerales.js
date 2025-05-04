const express = require("express");
const router = express.Router();

// Rutas generales
router.get("/", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("index", { userName });
});

router.get("/acerca", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Acerca", { userName });
});

router.get("/politicas", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Politicas", { userName });
});

router.get("/terminos", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Terminos", { userName });
});

router.get("/sugerencias", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Sugerencias", { userName });
});

router.get("/reclamaciones", (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Reclamaciones", { userName });
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/");
    });
});

module.exports = router;