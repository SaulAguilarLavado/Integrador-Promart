export const renderIndex = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("index", { userName });
};
export const mostrarCarrito = (req, res) => {
    const userName = req.session?.userName || null;
    const userId = req.session.userId || null;
    res.render("general/Carrito", { userName, userId });
};

export const renderAcerca = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Acerca", { userName });
};

export const renderPoliticas = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Politicas", { userName });
};

export const renderTerminos = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("general/Terminos", { userName });
};

export const renderSugerencias = (req, res) => {
    const userName = req.session?.userName || null;
    res.render("general/Sugerencias", { userName });
};

export const renderReclamaciones = (req, res) => {
    const userName = req.session?.userName || null;
    res.render("general/Reclamaciones", { userName });
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/");
    });
};