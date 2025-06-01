import { pool } from "../DB/db.js";
import categoriasDAO from "../DAO/categoriasDAO.js";
import productosService from "../service/productosService.js"; 
import { obtenerTotalesDashboard } from "../DAO/dashboardDAO.js";
import sugerenciasDAO from "../DAO/sugerenciasDAO.js";
import reclamacionesDAO from "../DAO/reclamacionesDAO.js";

export const renderDashboard = async (req, res) => {
    const totales = await obtenerTotalesDashboard();
    res.render("admin/dashboard", totales);
};

export const renderAdminProductos = async (req, res) => {
    const categorias = await categoriasDAO.obtenerTodas();
    const productos = await productosService.obtenerTodosConCategoria();
    res.render("admin/productos", { categorias, productos });
};

export const renderAdminUsuarios = async (req, res) => {
    const [usuarios] = await pool.query("SELECT * FROM usuarios");
    res.render("admin/usuarios", { usuarios });
};

export const renderAdminSugerencias = async (req, res) => {
    const sugerencias = await sugerenciasDAO.obtenerTodas();
    res.render("admin/sugerenciasAdmin", { sugerencias });
};

export const renderAdminReclamaciones = async (req, res) => {
    const reclamaciones = await reclamacionesDAO.obtenerTodas();
    res.render("admin/reclamacionesAdmin", { reclamaciones });
};