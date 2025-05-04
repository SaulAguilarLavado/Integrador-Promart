import mysql from "mysql";

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saul_UTP11",
    database: "Integrador"
});

conexion.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
    } else {
        console.log("Conexión a la base de datos exitosa");
    }
});

export default conexion;