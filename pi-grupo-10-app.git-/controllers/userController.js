const localData = require('../localData/localData');

const controladorUsuarios = {
     profile: function(req, res) {
         const usuario = localData.usuario;
         const logueado = true;
        const productos = localData.productos;
        return res.render("profile", { usuario, productos, logueado });
    },

    login: function(req, res) {
        const logueado = false;
        return res.render("login", {logueado});
    },

    register: function(req, res) {
        const logueado = false;
        return res.render("register", {logueado});
    }
}
   
module.exports = controladorUsuarios;
    


