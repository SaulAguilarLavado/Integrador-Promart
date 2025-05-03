const app = require("./server.js");
const bcrypt = require('bcryptjs');
const conexion = require("./conexion");


//VALIDAR INICIO DE SESION
app.post('/login', function (req, res) {
    const { correo, contra } = req.body;
    console.log('Datos recibidos:', { correo, contra });
  
    // Validar que los campos no estén vacíos
    if (!correo || !contra) {
        return res.status(400).send('Correo y contraseña son obligatorios');
    }
  
    // Buscar al usuario en la base de datos
    const buscarLogin = 'SELECT * FROM usuarios WHERE correo = ?';
    conexion.query(buscarLogin, [correo], function (err, rows) {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).send('Error en el servidor');
      }
  
      if (rows.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      // Comparar la contraseña ingresada con el hash almacenado
      bcrypt.compare(contra, rows[0].contra, function (err, result) {
        console.log('Contraseña ingresada:', contra);
        console.log('Hash almacenado:', rows[0].contra);

        if (err) {
          console.error('Error al comparar contraseñas:', err);
          return res.status(500).send('Error en el servidor');
        }
  
        if (result) {
          res.status(200).send('Inicio de sesión exitoso');
        } else {
          res.status(401).send('Contraseña incorrecta');
        }
      });
    });
});