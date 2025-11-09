
const db = require('../database/models');
let op = db.Sequelize.Op;

const controladorHome = {
    home: function (req, res) {
        const logueado = false;

        db.Producto.findAll({

            include: [
                {
                    model: db.Usuario,
                    as: 'usuario', // si usaste un alias
                },
                {
                    model: db.Comentario,
                    as: "comentarios"
                }
            ],

        })
            .then(function (productos) {
                //console.log(productos[0].comentarios[0]);

                return res.render('index', { productos, logueado }); // Muestra todos los productos en la página principal


            })
            .catch(function (error) {
                return res.send(error.message)
            })
    }
};


module.exports = controladorHome;


