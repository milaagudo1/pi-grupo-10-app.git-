DROP DATABASE IF EXISTS eCommerce;

-- Creacion y uso de Base de Datos
CREATE DATABASE eCommerce;
USE eCommerce;

CREATE TABLE usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    photo VARCHAR(250) DEFAULT 'default.jpg',
    
    -- constraints obligatorios
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    
    -- claves foraneas
    );
    
CREATE TABLE productos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    imagen VARCHAR(250) NOT NULL,
	nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    
    usuario_id INT UNSIGNED NOT NULL,
    
    -- constraints obligatorios
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    -- claves foraneas
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    );

CREATE TABLE comentarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    producto_id INT UNSIGNED NOT NULL,
	usuario_id INT UNSIGNED NOT NULL,
    comentario TEXT,
    
    -- constraints obligatorios
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    -- claves foraneas
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
	FOREIGN KEY (producto_id) REFERENCES productos (id)
    );
    
    -- INSERTS
    
INSERT INTO usuarios (email, password) VALUES
('admin@gmail.com', '12345'), 
('usuario1@gmail.com', '12345'), 
('usuario2@gmail.com', '12345'), 
('usuario3@gmail.com', '12345'), 
('usuario4@gmail.com', '12345');

INSERT INTO productos (imagen, nombre, descripcion, usuario_id) VALUES
('producto1.jpg','Notebook Gamer', 'Notebook con 16GB RAM, 512GB SSD y tarjeta gráfica dedicada.', 1)
('producto2.jpg','Auriculares Inalámbricos', 'Auriculares Bluetooth 5.0 con cancelación de ruido activa.', 1)
('producto3.jpg','Mouse Gamer RGB', 'Mouse con sensor de alta precisión y luces RGB personalizables.', 1)
('producto4.jpg','Teclado Mecánico', 'Teclado mecánico con switches táctiles y retroiluminación LED..', 1)
('producto5.jpg','Monitor 27\" 144Hz', 'Monitor Full HD de 27 pulgadas con tasa de refresco de 144Hz.', 1)
('producto6.jpg','Consola de Videojuegos', 'Consola de última generación con gráficos en 4K.', 1)
('producto7.jpg','Silla Gamer', 'Silla ergonómica con soporte lumbar y reclinable.', 1)
('producto8.jpg','Webcam HD', 'Webcam con resolución 1080p ideal para streaming y reuniones.', 1)
('producto9.jpg','Disco SSD 1TB', 'Disco sólido con gran velocidad de lectura y escritura.', 1)
('producto10.jpg','Auriculares con Micrófono', 'Auriculares con micrófono integrado, ideales para gaming y llamadas.', 1)


    
    
    
    
    