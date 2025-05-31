export const renderAudio = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/audio", { userName });
};
export const renderCamarasDrones = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/camaras-drones", { userName });
};
export const renderCelulares = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/celulares", { userName });
};
export const renderComputo = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/computo", { userName });
};
export const renderGamer = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/gamer", { userName });
};
export const renderOficina = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/oficina", { userName });
};
export const renderMovilidad = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/movilidad", { userName });
};
export const renderPilasCargadores = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/pilas-cargadores", { userName });
};
export const renderSmartHome = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/smart-home", { userName });
};
export const renderTV = (req, res) => {
    const userName = req.session?.userName || "Mi Cuenta";
    res.render("productos/tv", { userName });
};