import { buscarAdminPorCredenciales } from "../dao/adminDao.js";

export const renderAdminLogin = (req, res) => {
    res.render("admin/loginAdmin", { error: null });
};

export const procesarAdminLogin = async (req, res) => {
    const { correo, contra } = req.body;
    try {
        const rows = await buscarAdminPorCredenciales(correo, contra);
        if (rows.length > 0) {
            req.session.isAdmin = true;
            return res.redirect("/admin/dashboard");
        }
        res.render("admin/loginAdmin", { error: "Credenciales incorrectas" });
    } catch (error) {
        res.render("admin/loginAdmin", { error: "Error de conexión" });
    }
};

export const adminLogout = (req, res) => {
    req.session.destroy(() => res.redirect("/admin/login"));
};