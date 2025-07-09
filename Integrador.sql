use Integrador;
FLUSH PRIVILEGES;

-- Formulario Usuarios (Ingresar y Registrarse)
CREATE table usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100),
    correo VARCHAR(150) UNIQUE,
    contra VARCHAR(255)
);
SELECT*FROM usuarios;
ALTER TABLE usuarios ADD UNIQUE (correo);

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_admin VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contra VARCHAR(255) NOT NULL
);
SELECT * FROM admin;
INSERT INTO admin (nombre_admin, correo, contra)
VALUES ('admin_promart', 'admin@admin.com', 'admin123');
-- Tabla para categorías de productos
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);
SELECT*FROM categorias;
INSERT INTO categorias (nombre_categoria, descripcion) VALUES
('audio', ''),
('camaras-drones', ''),
('celulares', ''),
('computo', ''),
('gamer', ''),
('movilidad', ''),
('oficina', ''),
('pilas-cargadores', ''),
('smart-home', ''),
('tv', '');

-- Tabla para productos
CREATE table productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(150) NOT NULL,
    descripcion TEXT, 
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen VARCHAR(255),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);
SELECT*FROM productos;

-- Tabla para compras realizadas
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
SELECT*FROM compras;

-- Tabla detalle de compras (qué productos se compraron en cada compra)
CREATE TABLE detalle_compra (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compras(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);
SELECT*FROM detalle_compra;

-- Tabla de sugerencias (con opción de usuario registrado o no)
CREATE TABLE sugerencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    categoria ENUM('producto', 'servicio', 'soporte', 'otro') NOT NULL,
    sugerencia TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
SELECT*FROM sugerencias;

-- Tabla de reclamaciones (con opción de usuario registrado o no)
CREATE TABLE reclamaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NULL,
    nombre VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    categoria ENUM('producto', 'servicio', 'soporte', 'otro') NOT NULL,
    reclamacion TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
SELECT*FROM reclamaciones;

CREATE TABLE carritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);
SELECT*FROM carritos;

