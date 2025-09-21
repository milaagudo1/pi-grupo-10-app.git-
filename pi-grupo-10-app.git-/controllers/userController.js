const localData = require('../localData/localData');

const controladorUsuarios = {
     profile: function(req, res) {
         const usuario = localData.usuario;
        const productos = localData.productos;
        return res.render("profile", { usuario, productos });
    },

    login: function(req, res) {
        return res.render("login");
    },

    register: function(req, res) {
        return res.render("register");
    }
}
   
module.exports = controladorUsuarios;
    


