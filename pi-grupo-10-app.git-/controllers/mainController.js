
const localData = require('../localData/localData');
const db = require('../database/models');
let op = db.Sequelize.Op;

const controladorHome = {
    home: function (req, res) {
        const logueado = false;

        db.Producto.findAll()
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


