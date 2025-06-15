import express from "express";
import session from "express-session";

import sugerenciasRouter from "../router/sugerenciasRouter.js";
import reclamacionesRouter from "../router/reclamacionesRouter.js";
import logInRoutes from "../router/logInRouter.js";
import signUpRoutes from "../router/signUpRouter.js";
import generalRouter from "../router/generalRouter.js";
import productosRouter from "../router/productosRouter.js";
import apiCarritoRouter from "../router/apiCarritoRouter.js";
import adminRouter from "../router/adminRouter.js";

const app = express();

// Configurar el motor de vistas
app.set("view engine", "ejs");

// Registrar middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar express-session (esto debe ir ANTES de cualquier ruta que use req.session)
app.use(session({
    secret: "56052c33951507ef8628e475ea97902864ad9ad224f7575133267b5c8125a387fbaeb982fa99d6f98eaf8aadfd60747c145936aebcfed63dc79eaf3660f1d0d1",
    resave: false,
    saveUninitialized: true
}));

// Ahora sí, aquí la ruta que usa req.session
app.get('/api/user', (req, res) => {
    res.json({ userId: req.session.userId || null });
});

// Registrar las rutas
app.use(sugerenciasRouter);
app.use(reclamacionesRouter);
app.use(logInRoutes);
app.use(signUpRoutes);
app.use(generalRouter);
app.use('/uploads', express.static('public/uploads'));
app.use("/productos", productosRouter);
app.use("/admin", adminRouter);
app.use("/api/carrito", apiCarritoRouter);

// Iniciar el servidor
app.listen(3000, () => {
    console.log("User Server is running on port http://localhost:3000");
    console.log("Admin Server is running on port http://localhost:3000/admin/login");
});