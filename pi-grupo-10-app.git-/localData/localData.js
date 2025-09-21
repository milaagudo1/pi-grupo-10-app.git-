
const localData = {
  usuario: {
    email: "paezcamila@email.com",
    usuario: "CamilaPaez",
    contraseña: "123456",
    avatar: "profile-default.png" // nombre del archivo de la imagen del usuario
  },
  productos: [
    {
      id: 1,
      imagen: "notebook-gamer.webp",  // en la vista ejs tengo que indicar la ruta correspondiente 
      nombre: "Notebook Gamer",
      descripcion: "Notebook con 16GB RAM, 512GB SSD y tarjeta gráfica dedicada.",
      comentarios: [
        { nombreUsuario: "Ana", texto: "Excelente rendimiento.", imagenPerfil: "ana.jpg" }, // imagenperfil: nombre del archivo con la imagen de perfil.
        { nombreUsuario: "Luis", texto: "Muy buena compra.", imagenPerfil: "luis.jpg" }  //----->lo mismo para todos los comentarios 
      ]
    },
    {
      id: 2,
      imagen: "auriculares.webp",
      nombre: "Auriculares Inalámbricos",
      descripcion: "Auriculares Bluetooth 5.0 con cancelación de ruido activa.",
      comentarios: [
        { nombreUsuario: "Carlos", texto: "La batería dura muchísimo.", imagenPerfil: "carlos.jpg" },
        { nombreUsuario: "Marta", texto: "Cómodos y con buen sonido.", imagenPerfil: "marta.jpg" }
      ]
    },
    {
      id: 3,
      imagen: "mouse.webp",
      nombre: "Mouse Gamer RGB",
      descripcion: "Mouse con sensor de alta precisión y luces RGB personalizables.",
      comentarios: [
        { nombreUsuario: "Pedro", texto: "Muy preciso para juegos FPS.", imagenPerfil: "pedro.jpg" }
      ]
    },
    {
      id: 4,
      imagen: "teclado.webp",
      nombre: "Teclado Mecánico",
      descripcion: "Teclado mecánico con switches táctiles y retroiluminación LED.",
      comentarios: [
        { nombreUsuario: "Laura", texto: "Las teclas responden muy bien.", imagenPerfil: "laura.jpg" }
      ]
    },
    {
      id: 5,
      imagen: "monitor.webp",
      nombre: "Monitor 27\" 144Hz",
      descripcion: "Monitor Full HD de 27 pulgadas con tasa de refresco de 144Hz.",
      comentarios: [
        { nombreUsuario: "Diego", texto: "Ideal para juegos competitivos.", imagenPerfil: "diego.jpg" }
      ]
    },
    {
      id: 6,
      imagen: "consolaVideojuegos.webp",
      nombre: "Consola de Videojuegos",
      descripcion: "Consola de última generación con gráficos en 4K.",
      comentarios: [
        { nombreUsuario: "Nico", texto: "La mejor compra del año.", imagenPerfil: "nico.jpg" }
      ]
    },
    {
      id: 7,
      imagen: "sillaGamer.webp",
      nombre: "Silla Gamer",
      descripcion: "Silla ergonómica con soporte lumbar y reclinable.",
      comentarios: [
        { nombreUsuario: "Sofía", texto: "Muy cómoda para largas horas de estudio.", imagenPerfil: "sofia.jpg" }
      ]
    },
    {
      id: 8,
      imagen: "webCam.webp",
      nombre: "Webcam HD",
      descripcion: "Webcam con resolución 1080p ideal para streaming y reuniones.",
      comentarios: [
        { nombreUsuario: "Pablo", texto: "Se ve muy nítida y clara.", imagenPerfil: "pablo.jpg" }
      ]
    },
    {
      id: 9,
      imagen: "discoSSD.webp",
      nombre: "Disco SSD 1TB",
      descripcion: "Disco sólido con gran velocidad de lectura y escritura.",
      comentarios: [
        { nombreUsuario: "Valentina", texto: "La PC arranca en segundos.", imagenPerfil: "valentina.jpg" }
      ]
    },
    {
      id: 10,
      imagen: "auricularesMicrofo.webp",
      nombre: "Auriculares con Micrófono",
      descripcion: "Auriculares con micrófono integrado, ideales para gaming y llamadas.",
      comentarios: [
        { nombreUsuario: "Ricardo", texto: "Muy útiles para trabajar desde casa.", imagenPerfil: "ricardo.jpg" }
      ]
    }
  ]
};

module.exports =  localData;
