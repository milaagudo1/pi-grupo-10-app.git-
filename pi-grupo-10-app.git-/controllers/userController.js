const localData = require('../localData/localData');

const controladorUsuarios = {
    profile: function(req, res) {
        return res.render("profile", { usuario: localData.usuario });
    },

    login: function(req, res) {
        return res.render("login");
    },

    register: function(req, res) {
        return res.render("register");
    }
};

module.exports = controladorUsuarios;

