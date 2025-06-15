import express from "express";
import {
    renderAdminLogin,
    procesarAdminLogin,
    adminLogout
} from "../controller/adminLoginController.js";
import {
    renderDashboard,
    renderAdminProductos,
    renderAdminUsuarios,
    renderAdminSugerencias,
    renderAdminReclamaciones,
    renderAdminDetalleCompras
} from "../controller/adminNavController.js";
import multer from "multer";
import productosDAO from "../DAO/productosDAO.js";
import categoriasDAO from "../DAO/categoriasDAO.js";

const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.get("/login", renderAdminLogin);
router.post("/login", procesarAdminLogin);
router.get("/logout", adminLogout);
router.get("/dashboard", renderDashboard);
router.get("/productos", renderAdminProductos);
router.post("/productos", upload.single("imagen"), async (req, res) => {
    const { nombre_producto, descripcion, precio, stock, id_categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;
    await productosDAO.agregarProducto(nombre_producto, descripcion, precio, stock, imagen, id_categoria);
    res.redirect("/admin/productos");
});

// Para eliminar
router.post("/productos/:id", async (req, res) => {
    const { id } = req.params;
    await productosDAO.eliminarProducto(id);
    res.redirect("/admin/productos");
});

// Para mostrar el formulario de edición
router.get("/productos/:id/editar", async (req, res) => {
    const { id } = req.params;
    const producto = await productosDAO.obtenerPorId(id);
    const categorias = await categoriasDAO.obtenerTodas();
    res.render("admin/editarProducto", { producto, categorias });
});

// Para actualizar el producto
router.post("/productos/:id/editar", upload.single("imagen"), async (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion, precio, stock, id_categoria } = req.body;
    const imagen = req.file ? req.file.filename : req.body.imagen_actual;
    await productosDAO.actualizarProducto(id, nombre_producto, descripcion, precio, stock, imagen, id_categoria);
    res.redirect("/admin/productos");
});
router.get("/usuarios", renderAdminUsuarios);
router.get("/sugerencias", renderAdminSugerencias);
router.get("/reclamaciones", renderAdminReclamaciones);
router.get("/detalle-compras", renderAdminDetalleCompras);

export default router;