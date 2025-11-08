
-- Creacion y uso de Base de Datos
CREATE DATABASE eCommerce;
USE eCommerce;

CREATE TABLE usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(100) NOT NULL,
    avatar VARCHAR(250) DEFAULT 'default.jpg',
    nacionalidad VARCHAR(100),
    
    -- columnas de auditoria
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    
    -- claves foraneas
    );
    
CREATE TABLE productos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    imagen VARCHAR(250) NOT NULL,
	nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    
    usuario_id INT UNSIGNED NOT NULL,
    
    -- columnas de auditoria
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    
    -- claves foraneas test
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    );

CREATE TABLE comentarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    producto_id INT UNSIGNED NOT NULL,
	usuario_id INT UNSIGNED NOT NULL,
    comentario TEXT,
    
    -- columnas de auditoria
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    -- claves foraneas
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
	FOREIGN KEY (producto_id) REFERENCES productos (id)
    );
    
    -- INSERTS
    
INSERT INTO usuarios (usuario, email, contrasenia, nacionalidad) VALUES
('Admin', 'admin@gmail.com', '12345', 'Argentina'), 
('Admin1', 'usuario1@gmail.com', '12345', 'Chile'), 
('Admin2', 'usuario2@gmail.com', '12345', 'Uruguay'), 
('Admin3','usuario3@gmail.com', '12345', 'Paraguay'), 
('Admin4', 'usuario4@gmail.com', '12345', 'Brasil');

INSERT INTO productos (imagen, nombre, descripcion, usuario_id) VALUES
('/images/products/notebook-gamer.webp','Notebook Gamer', 'Notebook con 16GB RAM, 512GB SSD y tarjeta gráfica dedicada.', 1),
('/images/products/auriculares.webp','Auriculares Inalámbricos', 'Auriculares Bluetooth 5.0 con cancelación de ruido activa.', 1),
('/images/products/mouse.webp','Mouse Gamer RGB', 'Mouse con sensor de alta precisión y luces RGB personalizables.', 1),
('/images/products/teclado.webp','Teclado Mecánico', 'Teclado mecánico con switches táctiles y retroiluminación LED..', 1),
('/images/products/monitor.webp','Monitor 27\" 144Hz', 'Monitor Full HD de 27 pulgadas con tasa de refresco de 144Hz.', 1),
('/images/products/consolaVideojuegos.webp','Consola de Videojuegos', 'Consola de última generación con gráficos en 4K.', 1),
('/images/products/sillaGamer.webp','Silla Gamer', 'Silla ergonómica con soporte lumbar y reclinable.', 1),
('/images/products/webCam.webp','Webcam HD', 'Webcam con resolución 1080p ideal para streaming y reuniones.', 1),
('/images/products/discoSSD.webp','Disco SSD 1TB', 'Disco sólido con gran velocidad de lectura y escritura.', 1),
('/images/products/auricularesMicrofo.webp','Auriculares con Micrófono', 'Auriculares con micrófono integrado, ideales para gaming y llamadas.', 1);

INSERT INTO comentarios (usuario_id, producto_id, comentario) VALUES
-- Producto 1: Notebook Gamer
(2, 1, 'Excelente notebook, corre todos los juegos sin problemas.'),
(3, 1, 'La batería podría durar más, pero en general muy buena.'),
(4, 1, 'El teclado retroiluminado es un plus para jugar de noche.'),

-- Producto 2: Auriculares Inalámbricos
(2, 2, 'Muy cómodos y la cancelación de ruido funciona perfecto.'),
(3, 2, 'El sonido es bueno, pero a veces pierde conexión.'),
(5, 2, 'La batería dura todo el día, recomendados.'),

-- Producto 3: Mouse Gamer RGB
(2, 3, 'Muy preciso para juegos FPS, lo recomiendo.'),
(4, 3, 'Las luces RGB son espectaculares.'),
(5, 3, 'El tamaño es un poco grande, pero de buena calidad.'),

-- Producto 4: Teclado Mecánico
(2, 4, 'Los switches son cómodos y hacen buen sonido.'),
(3, 4, 'La retroiluminación tiene varios colores, genial.'),
(5, 4, 'Un poco caro, pero vale la pena.'),

-- Producto 5: Monitor 27" 144Hz
(2, 5, 'La fluidez de 144Hz se nota mucho en juegos.'),
(3, 5, 'Los colores son muy vivos, excelente calidad.'),
(4, 5, 'Lo uso también para trabajo y es perfecto.'),

-- Producto 6: Consola de Videojuegos
(2, 6, 'Gráficos impresionantes, se ve muy realista.'),
(3, 6, 'Los tiempos de carga son rapidísimos.'),
(5, 6, 'Ojalá hubiera más stock, difícil de conseguir.'),

-- Producto 7: Silla Gamer
(2, 7, 'Muy cómoda para largas horas de juego.'),
(3, 7, 'El soporte lumbar realmente ayuda.'),
(4, 7, 'La armé en 20 minutos, fácil de montar.'),

-- Producto 8: Webcam HD
(2, 8, 'La imagen es clara y nítida.'),
(3, 8, 'Mejoró mucho mis videollamadas.'),
(5, 8, 'Funciona perfecto con Zoom y Discord.'),

-- Producto 9: Disco SSD 1TB
(2, 9, 'La PC enciende en segundos con este SSD.'),
(3, 9, 'Muy buena velocidad de escritura.'),
(4, 9, 'Ideal para instalar juegos pesados.'),

-- Producto 10: Auriculares con Micrófono
(2, 10, 'El micrófono capta la voz con claridad.'),
(3, 10, 'Cómodos incluso después de horas de uso.'),
(5, 10, 'Muy útiles para trabajar desde casa.');
    
