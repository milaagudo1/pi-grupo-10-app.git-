
const db = require('../database/models');

const controladorHome = {
    home: function (req, res) {

        if (req.session.usuarioLogueado) {
            var usuarioLogueado = req.session.usuarioLogueado;
        }

        db.Producto.findAll({
            include: [
                {
                    model: db.Usuario,
                    as: 'usuario',
                },
                {
                    model: db.Comentario,
                    as: 'comentarios',
                    include: [
                        {
                            model: db.Usuario,
                            as: 'usuario'
                        }
                    ]
                }
            ],
        })
        .then(function (productos) {
           
            return res.render("index", {
                productos: productos,
                usuario: usuarioLogueado
            });
        })
        .catch(function (error) {
            console.log(error);
            return res.send("Error al cargar los productos");
        });
    }
};

module.exports = controladorHome;



