import productosDAO from "../DAO/productosDAO.js";

export const renderCategoria = (nombreCategoria, vista) => async (req, res) => {
    const productos = await productosDAO.obtenerPorCategoria(nombreCategoria);
    const userName = req.session?.userName || null;
    res.render(`productos/${vista}`, { productos, userName });
};

// Exporta funciones específicas para cada categoría:
export const renderAudio = renderCategoria("audio", "audio");
export const renderCamarasDrones = renderCategoria("camaras-drones", "camaras-drones");
export const renderCelulares = renderCategoria("celulares", "celulares");
export const renderComputo = renderCategoria("computo", "computo");
export const renderGamer = renderCategoria("gamer", "gamer");
export const renderOficina = renderCategoria("oficina", "oficina");
export const renderMovilidad = renderCategoria("movilidad", "movilidad");
export const renderPilasCargadores = renderCategoria("pilas-cargadores", "pilas-cargadores");
export const renderSmartHome = renderCategoria("smart-home", "smart-home");
export const renderTV = renderCategoria("tv", "tv");