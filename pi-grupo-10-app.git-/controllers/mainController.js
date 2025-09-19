
const localData = require('../localData/localData');

const controladorHome = {
    home: function(req, res) {
        // Muestra todos los productos en la página principal
        return res.render('index', { productos: localData.productos });
    }
};

module.exports = controladorHome;
