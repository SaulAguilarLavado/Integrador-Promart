const app = require("./server.js");
const bcrypt = require('bcryptjs');
const conexion = require("./conexion");

//VALIDAR REGISTRO DE USUARIOS
app.post("/validar", function(req, res) {
    const datos = req.body;
    let nombre_usuario = datos.nombre_usuario;
    let correo = datos.correo;
    let contra = datos.contra;

    // Verificar si el correo ya existe en la base de datos
    let buscarCorreo = "SELECT * FROM usuarios WHERE correo = ?";
    conexion.query(buscarCorreo, [correo], function(err, rows) {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).send("Error en el servidor");
        } else if (rows.length > 0) {
            // El correo ya está registrado
            res.status(409).send("El correo ya está registrado");
        } else {
            // Si no existe, ciframos la contraseña
            bcrypt.hash(contra, 10, function(err, hash) {
                if (err) {
                    console.error("Error al cifrar la contraseña:", err);
                    return res.status(500).send("Error al registrar usuario");
                }

                // Insertamos el nuevo usuario con la contraseña cifrada
                let registrar = "INSERT INTO usuarios (nombre_usuario, correo, contra) VALUES (?, ?, ?)";
                conexion.query(registrar, [nombre_usuario, correo, hash], function(err) {
                    if (err) {
                        console.error("Error al insertar los datos:", err);
                        return res.status(500).send("Error al registrar usuario");
                    } else {
                        res.status(200).send("Usuario registrado correctamente");
                    }
                });
            });
        }
    });
});
