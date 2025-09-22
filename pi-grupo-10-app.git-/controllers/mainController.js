
const localData = require('../localData/localData');

const controladorHome = {
    home: function(req, res) {
         const logueado = false;
        // Muestra todos los productos en la página principal
        return res.render('index', { productos: localData.productos, logueado });
    }
};


module.exports = controladorHome;


